const {
    parse
} = require("node-html-parser"); // not exactly used for HTML lmao, similar enough though
const { Transform, Writable } = require('stream');
const path = require('path');
const crypto = require('crypto');
const zlib = require("zlib");
const fs = require("fs");

const KEY = Buffer.from(
    [0x69, 0x70, 0x75, 0x39, 0x54, 0x55, 0x76, 0x35, 0x34, 0x79, 0x76, 0x5d,
        0x69, 0x73, 0x46, 0x4d, 0x68, 0x35, 0x40, 0x3b, 0x74, 0x2e, 0x35, 0x77,
        0x33, 0x34, 0x45, 0x32, 0x52, 0x79, 0x40, 0x7b]
);

let encode_level = (level_string) => {
    let gzipped = zlib.gzipSync(level_string);
    let base64_encoded = gzipped
        .toString("base64")
        .replaceAll("/", "_")
        .replaceAll("+", "-");
    return base64_encoded;
};

let decode_level = (data) => {
    const base64_decoded = Buffer.from(
        data.replaceAll("_", "/").replaceAll("-", "+"),
        "base64"
    );
    const decompressed = zlib.gunzipSync(base64_decoded);
    return decompressed.toString();
};

class DecryptTransform extends Transform {
    constructor() {
        super();
        this.decipher = crypto.createDecipheriv('aes-256-ecb', KEY, null);
    }

    _transform(chunk, encoding, callback) {
        try {
            const decryptedChunk = this.decipher.update(chunk);
            this.push(decryptedChunk);
            callback();
        } catch (err) {
            callback(err);
        }
    }

    _flush(callback) {
        try {
            const finalChunk = this.decipher.final();
            const dataWithoutPadding = removePad(finalChunk);
            this.push(dataWithoutPadding);
            callback();
        } catch (err) {
            callback(err);
        }
    }
}

async function streamToString(stream) {
    return new Promise((resolve, reject) => {
        let result = '';

        // Create a Writable stream that will accumulate the data
        const writableStream = new Writable({
            write(chunk, encoding, cb) {
                result += chunk.toString();
                cb();
            }
        });

        // Handle stream completion and errors
        stream.pipe(writableStream);
        writableStream.on('finish', () => resolve(result));
        writableStream.on('error', reject);
    });
}

function addPad(data) {
    const lenR = data.length % 16;
    if (lenR) {
        const toAdd = 16 - lenR;
        const padding = Buffer.alloc(toAdd, toAdd);
        return Buffer.concat([data, padding]);
    }
    return data;
}

function removePad(data) {
    const last = data[data.length - 1];
    if (last < 16) {
        return data.slice(0, -last);
    }
    return data;
}

function macEncrypt(data) {
    const cipher = crypto.createCipheriv('aes-256-ecb', KEY, null);
    const paddedData = addPad(Buffer.from(data, 'utf-8'));
    return Buffer.concat([cipher.update(paddedData), cipher.final()]);
}

async function validateXMLHeader(filename) {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filename, { highWaterMark: 21 });
        let data = '';
        stream.on('data', chunk => {
            data += chunk.toString();
            if (data.length >= 21) {
                stream.close();
                resolve(data == '<?xml version="1.0"?>');
            }
        });
        stream.on('error', err => {
            reject(err);
        });
    });
}

let std_savefile_path;
switch (process.platform) {
    case "win32": std_savefile_path = path.join(process.env.localappdata, `GeometryDash/CCLocalLevels.dat`); break;
    case "darwin": std_savefile_path = path.join(process.env.HOME, `Library/Application Support/GeometryDash/CCLocalLevels.dat`); break;
    case "linux": std_savefile_path = path.join(process.env.HOME, `.steam/steam/steamapps/compatdata/322170/pfx/drive_c/users/steamuser/Local Settings/Application Data/GeometryDash/CCLocalLevels.dat`); break;
    case "android": std_savefile_path = `/data/data/com.robtopx.geometryjump/CCLocalLevels.dat`; break;
}

let cachedSavefile;

class LevelReader {
    constructor(
        level_name,
        filename = std_savefile_path,
        reencrypt = true
    ) {
        return new Promise(async (resolve, reject) => {
            const readStream = fs.createReadStream(filename, { highWaterMark: 1024 * 1024 });
            let isAlreadyDecoded = await validateXMLHeader(filename);
            let last_level;
            let add_to_level, set_level;

            // macos savefile decryption
            if (process.platform === 'darwin') {
                let output;
                if (!cachedSavefile) {
                    if (!isAlreadyDecoded) {
                        const decryptTransform = new DecryptTransform();
                        let macos_decrypted = readStream.pipe(decryptTransform);
                        output = await streamToString(macos_decrypted);
                        output = parse(output);
                    } else {
                        output = await streamToString(readStream);
                        output = parse(output);
                    }
                    cachedSavefile = output;
                } else output = cachedSavefile;
                let info = output.childNodes[1].childNodes[0].childNodes[1].childNodes;
                for (let i in info) {
                    let curr = info[i];
                    if (curr.rawTagName == "d") {
                        let tags = curr.childNodes; // tags reference
                        let dat = {};
                        tags.forEach((tag, i) => {
                            if (tag.rawTagName == "k") {
                                if (tag.childNodes[0]._rawText == "k4") {
                                    let lval = tags[i + 1].childNodes[0]._rawText;
                                    let dec = decode_level(lval);
                                    dat.levelstring = dec;
                                    dat.raw = lval;
                                    add_to_level = (lvlstr) => {
                                        tags[i + 1].childNodes[0]._rawText = encode_level(
                                            dec + lvlstr
                                        );
                                        dat.levelstring = dec + lvlstr;
                                        dat.raw = tags[i + 1].childNodes[0]._rawText;
                                    };

                                    set_level = (lvlstr) => {
                                        tags[i + 1].childNodes[0]._rawText = encode_level(lvlstr);
                                        dat.levelstring = lvlstr;
                                        dat.raw = tags[i + 1].childNodes[0]._rawText;
                                    };
                                }

                                if (tag.childNodes[0]._rawText == "k2") dat.name = tags[i + 1].childNodes[0]._rawText;
                            }
                        });
                        if (!level_name) {
                            last_level = dat;
                            break;
                        } else {
                            if (dat.name == level_name) {
                                last_level = dat;
                                break;
                            }
                        }
                    }
                }
                if (!last_level)
                    reject(`Level "${level_name}" not found in savefile!`);
                resolve({
                    data: last_level,
                    add: add_to_level,
                    set: set_level,
                    save: async () => {
                        let outstr = output.toString();
                        if (reencrypt) {
                            let alm = macEncrypt(outstr);
                            outstr = alm;
                        }
                        fs.writeFileSync(filename, outstr);
                    },
                });
                return;
            };
            let onEnd = async (output) => {
                let info = output.childNodes[1].childNodes[0].childNodes[1].childNodes;
                for (let i in info) {
                    let curr = info[i];
                    if (curr.rawTagName == "d") {
                        let tags = curr.childNodes; // tags reference
                        let dat = {};
                        tags.forEach((tag, i) => {
                            if (tag.rawTagName == "k") {
                                if (tag.childNodes[0]._rawText == "k4") {
                                    let lval = tags[i + 1].childNodes[0]._rawText;
                                    let dec = decode_level(lval);
                                    dat.levelstring = dec;
                                    dat.raw = lval;
                                    add_to_level = (lvlstr) => {
                                        tags[i + 1].childNodes[0]._rawText = encode_level(
                                            dec + lvlstr
                                        );
                                        dat.levelstring = dec + lvlstr;
                                        dat.raw = tags[i + 1].childNodes[0]._rawText;
                                    };

                                    set_level = (lvlstr) => {
                                        tags[i + 1].childNodes[0]._rawText = encode_level(lvlstr);
                                        dat.levelstring = lvlstr;
                                        dat.raw = tags[i + 1].childNodes[0]._rawText;
                                    };
                                }

                                if (tag.childNodes[0]._rawText == "k2") dat.name = tags[i + 1].childNodes[0]._rawText;
                            }
                        });
                        if (!level_name) {
                            last_level = dat;
                            break;
                        } else {
                            if (dat.name == level_name) {
                                last_level = dat;
                                break;
                            }
                        }
                    }
                }

                if (!last_level)
                    reject(`Level "${level_name}" not found in savefile!`);
                resolve({
                    data: last_level,
                    add: add_to_level,
                    set: set_level,
                    save: async () => {
                        let outstr = output.toString();
                        if (reencrypt) {
                            let alm = zlib.gzipSync(outstr);
                            alm = Buffer.from(
                                alm.toString("base64").replaceAll("/", "_").replaceAll("+", "-")
                            );
                            for (let i = 0; i < alm.length; i++) {
                                alm[i] = alm[i] ^ 11; // XOR decrypts buffer
                            }
                            outstr = alm;
                        }
                        fs.writeFileSync(filename, outstr);
                    },
                });
            }
            if (!cachedSavefile) {
                const size = fs.statSync(filename).size;
                let output = Buffer.alloc(size);
                // savefile reading stuff
                let offset = 0; // Offset for buffer
                readStream.on('data', buffer => {
                    buffer.copy(output, offset);
                    offset += buffer.length;
                });
                readStream.on("end", () => {
                    if (!isAlreadyDecoded) {
                        for (let i = 0; i < output.length; i++) {
                            output[i] = output[i] ^ 11;
                        }
                        let b64out = Buffer.from(output.toString(), "base64");
                        output = zlib
                            .unzipSync(b64out)
                            .toString();
                    } else {
                        output = output.toString();
                    }
                    output = parse(output); // Base64 decodes savefile, then unzips savefile and parses XML
                    cachedSavefile = output;
                    onEnd(output);
                });
            } else {
                let output = cachedSavefile;
                onEnd(output);
            }
        });
    }
}

module.exports = LevelReader;
