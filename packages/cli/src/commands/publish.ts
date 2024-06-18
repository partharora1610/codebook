import { Command } from "commander"
import path from "path"
import fs from "fs/promises"
import axios from "axios"

const SERIVCE_URL = "http://localhost:5000/upload"

export const publishCommand = new Command()
  .command("publish [filename]")
  .description("Publihsing the file")
  .action(async (filename = "codebook.js") => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      const file = path.basename(filename)

      // File Handler and creating read stream
      const fileHandler = await fs.open(path.join(dir, file), "r")
      const readStream = fileHandler.createReadStream()

      const response = await axios.post(SERIVCE_URL, readStream, {
        headers: {
          "Content-Type": "application/octet-stream", // Set correct content type
        },

        // Set max content length based on your requirement
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })
