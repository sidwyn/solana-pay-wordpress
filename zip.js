const fs = require("fs");
const archiver = require("archiver");

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir = "./", outPath = "../solana-pay-plugin.zip") {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  stream.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
  return new Promise((resolve, reject) => {
    archive

      // Exclude unwanted folders (optional)
      .glob("**", {
        ignore: ["node_modules/**", "zip.js"], // Optional: Exclude node_modules
      })
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

console.log("beginning zip");
zipDirectory();
