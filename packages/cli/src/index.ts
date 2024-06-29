#!/usr/bin/env node

import { program } from "commander"
import { serveCommand } from "./commands/serve"
import { publishCommand } from "./commands/publish"
import { loginCommand } from "./commands/login"
import { checkAuth } from "./commands/test"
import { allFilesCommand } from "./commands/allFiles"
import { deleteCommand } from "./commands/deleteCommand"

program.addCommand(serveCommand)
program.addCommand(publishCommand)
program.addCommand(loginCommand)
program.addCommand(checkAuth)

// Add the new commands
program.addCommand(allFilesCommand)
program.addCommand(deleteCommand)

program.parse(process.argv)
