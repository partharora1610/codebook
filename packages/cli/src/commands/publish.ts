import { Command } from "commander"
import path from "path"
import fs from "fs"
import os from "os"
import axios from "axios"
import FormData from "form-data"
import inquirer from "inquirer"

const SERVICE_URL = "http://localhost:5000/notebook"
const configPath = path.join(os.homedir(), ".mycli", "config.json")

function readToken() {
  try {
    const tokenObj = JSON.parse(fs.readFileSync(configPath, "utf8"))
    return tokenObj.token
  } catch (error) {
    return null
  }
}

export const publishCommand = new Command()
  .command("publish [filename]")
  .description("Publishing the file")
  .action(async (filename = "codebook.js") => {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "fileTitle",
          message: "Enter a suitable file title for your codebook:",
        },
      ])
      const { fileTitle } = answers

      const filePath = path.resolve(process.cwd(), filename)
      const token = readToken()

      await fs.promises.access(filePath)

      const form = new FormData()
      const readStream = fs.createReadStream(filePath)
      form.append("file", readStream, path.basename(filename))
      form.append("title", fileTitle)

      const response = await axios.post(SERVICE_URL, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      console.log({ response: response.data })

      if (response.status === 201) {
        console.log("File uploaded successfully")
      } else {
        console.log("Failed to upload the file")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })
