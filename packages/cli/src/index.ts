import { program } from "commander"
import { serveCommand } from "./commands/serve"
import { publishCommand } from "./commands/publish"

program.addCommand(serveCommand)
program.addCommand(publishCommand)

program.parse(process.argv)
