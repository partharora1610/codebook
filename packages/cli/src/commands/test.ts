import { Command } from "commander"
import fs from "fs"
import path from "path"
import os from "os"

const configPath = path.join(os.homedir(), ".mycli", "config.json")
console.log({ configPath })

export const checkAuth = new Command()
  .command("check")
  .description("Checking")
  .action(async () => {
    try {
      const token = readToken()
      if (token) {
        console.log({ token })
        // need to make a request to the server to check if the token is valid...

        console.log("You are authenticated.")
      } else {
        console.log("You are not authenticated.")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })

function readToken() {
  try {
    const tokenObj = JSON.parse(fs.readFileSync(configPath, "utf8"))
    return tokenObj.token
  } catch (error) {
    return null
  }
}
