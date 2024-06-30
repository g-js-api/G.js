const {
    parse
} = require("node-html-parser"); // not exactly used for HTML lmao, similar enough though
const { Readable } = require('stream');
const zlib = require("zlib");
const fs = require("fs");

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

class LevelReader {
    constructor(
        level_name,
        filename = `${process.env.localappdata}\\GeometryDash\\CCLocalLevels.dat`
    ) {
        return new Promise((resolve, reject) => {
            const size = fs.statSync(filename).size;
            let output = Buffer.alloc(size);
            // savefile reading stuff
            const readStream = fs.createReadStream(filename, { highWaterMark: 1024 * 1024 });

            let offset = 0; // Offset for buffer
            readStream.on('data', buffer => {
                buffer.copy(output, offset);
                offset += buffer.length;
            });

            readStream.on("end", async () => {
                let last_level;
                let add_to_level, set_level;
                for (let i = 0; i < output.length; i++) {
                    output[i] = output[i] ^ 11;
                }
                let b64out = Buffer.from(output.toString(), "base64");
                output = zlib
                    .unzipSync(b64out)
                    .toString();
                output = parse(output); // Base64 decodes savefile, then unzips savefile and parses XML
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
                        let alm = zlib.gzipSync(outstr);
                        alm = Buffer.from(
                            alm.toString("base64").replaceAll("/", "_").replaceAll("+", "-")
                        );
                        for (let i = 0; i < alm.length; i++) {
                            alm[i] = alm[i] ^ 11; // XOR decrypts buffer
                        }
                        fs.writeFileSync(filename, alm);
                    },
                });
            });
        });
    }
}

module.exports = LevelReader;