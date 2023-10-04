const { parse } = require("node-html-parser"); // not exactly used for HTML lmao, similar enough though
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
    backup = true
  ) {
    return new Promise((resolve, reject) => {
      const [filename, filename_2] = [`${process.env.localappdata}\\GeometryDash\\CCLocalLevels.dat`, `${process.env.localappdata}\\GeometryDash\\CCLocalLevels2.dat`];
      let addr = this;
      let output = [];

      const readStream = fs.createReadStream(filename);

      readStream.on("data", (chunk) => output.push(chunk));

      readStream.on("end", () => {
        let last_level;
        let add_to_level, set_level;

        output = Buffer.concat(output);
        for (let i = 0; i < output.length; i++) {
          output[i] = output[i] ^ 11;
        }
        output = zlib
          .unzipSync(Buffer.from(output.toString(), "base64"))
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
                  dat.levelstring = decode_level(
                    tags[i + 1].childNodes[0]._rawText
                  );
                  dat.raw = tags[i + 1].childNodes[0]._rawText;
                  add_to_level = (lvlstr) => {
                    tags[i + 1].childNodes[0]._rawText = encode_level(
                      decode_level(tags[i + 1].childNodes[0]._rawText) + lvlstr
                    );
                    dat.levelstring =
                      decode_level(tags[i + 1].childNodes[0]._rawText) + lvlstr;
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
          save: () => {
            let alm = zlib.gzipSync(output.toString());
            alm = Buffer.from(
              alm.toString("base64").replaceAll("/", "_").replaceAll("+", "-")
            );
            for (let i = 0; i < alm.length; i++) {
              alm[i] = alm[i] ^ 11; // XOR decrypts buffer
            }
            fs.writeFileSync(filename, alm);
            fs.writeFileSync(filename_2, alm)
          },
        });
      });
    });
  }
}

module.exports = LevelReader;
