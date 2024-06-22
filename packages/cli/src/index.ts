#!/usr/bin/env node

import { program } from "commander"
import { serveCommand } from "./commands/serve"
import { publishCommand } from "./commands/publish"
import { loginCommand } from "./commands/login"
import { checkAuth } from "./commands/test"

program.addCommand(serveCommand)
program.addCommand(publishCommand)
program.addCommand(loginCommand)
program.addCommand(checkAuth)

program.parse(process.argv)
