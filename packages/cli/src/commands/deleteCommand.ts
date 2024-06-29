import { Command } from "commander"
import path from "path"
import fs from "fs"

export const deleteCommand = new Command()
  .command("delete [filename]")
  .description("Delete a file")
  .action(async (filename: string) => {
    try {
      console.log({ filename })
      const dir = path.join(
        process.cwd(),
        path.dirname(filename),
        "dist",
        "my_files"
      )

      const file = path.basename(filename)
      fs.unlinkSync(path.join(dir, file))
      console.log(`Deleted ${filename}`)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })
