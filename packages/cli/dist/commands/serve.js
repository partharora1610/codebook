"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port tp run server on ", "4005")
    .action((filename = "codebook.js", options) => {
    console.log(options);
    console.log("Getting ready to serve a file");
});
