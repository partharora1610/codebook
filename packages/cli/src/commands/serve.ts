import { Command } from "commander"
import { serve } from "@devsheet/local-api"
import path from "path"
import fs from "fs"

const isProduction = process.env.NODE_ENV === "production"

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on ", "4005")
  .action(
    async (
      filename = "codebook.js",
      options: {
        port: string
      }
    ) => {
      try {
        const dir = path.join(
          process.cwd(),
          path.dirname(filename),
          "dist",
          "my_files"
        )
        fs.mkdirSync(dir, { recursive: true })

        const file = path.basename(filename)

        await serve(parseInt(options.port), file, dir, !isProduction)
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        }

        // force exit process
        // process.exit(1);
      }
    }
  )
