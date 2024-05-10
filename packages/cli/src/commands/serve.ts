import { Command } from "commander";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on ", "4005")
  .action((filename = "codebook.js", options) => {
    console.log(options);
    console.log("Getting ready to serve a file");
  });