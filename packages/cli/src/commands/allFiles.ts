import { Command } from "commander"
import path from "path"
import fs from "fs"

export const allFilesCommand = new Command()
  .command("list")
  .description("All your files")
  .action(async () => {
    try {
      const files = fs.readdirSync(path.join(process.cwd(), "/dist/my_files"))

      // Present them in a better way...
      console.log("All Local Devsheets:")
      console.log({ files })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })
