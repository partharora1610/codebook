import axios from "axios"
import { Command } from "commander"
import inquirer from "inquirer"
import fs from "fs"
import path from "path"
import os from "os"

const SERVICE_URL = "http://localhost:5000/auth/login"
const configPath = path.join(os.homedir(), ".mycli", "config.json")

export const loginCommand = new Command()
  .command("login")
  .description("Logging the user")
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "username",
          message: "Enter your username:",
        },
        {
          type: "password",
          name: "password",
          message: "Enter your password:",
          mask: "*",
        },
      ])
      const { username, password } = answers

      try {
        const { data } = await axios.post(SERVICE_URL, {
          username,
          password,
        })

        console.log("Login sucessful!")
        console.log({ data })

        fs.mkdirSync(path.dirname(configPath), { recursive: true })
        storeToken(data.token)
      } catch (error) {
        console.log("Error while reaching the server. Please try again later.")
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  })

function storeToken(token: string) {
  const tokenObj = { token }
  fs.writeFileSync(configPath, JSON.stringify(tokenObj, null, 2))
}

function readToken() {
  try {
    const tokenObj = JSON.parse(fs.readFileSync(configPath, "utf8"))
    return tokenObj.token
  } catch (error) {
    return null
  }
}

async function makeAuthenticatedRequest(
  url: string,
  data: {
    username: string
    password: string
  }
) {
  const token = readToken()

  if (!token) {
    console.log("Token not found. Please login first.")
    return
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.log("Error making authenticated request:", JSON.stringify(error))
  }
}

// Export additional functions or variables as needed
export { storeToken, readToken, makeAuthenticatedRequest }

/**
 *
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHhxMGw4NzIwMDAwM2dndjB3b2VvM3huIiwiaWF0IjoxNzE5MDU0NzQwLCJleHAiOjE3MTkxNDExNDB9.Y66sWURJSsI-Xk1yPjoJ0ZZXn2xTAJjxpBTwU-mHwKQ
 */
