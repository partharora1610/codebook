import express, { Request, Response } from "express"
import fs from "fs/promises"
import path from "path"

interface Cell {
  id: string
  content: string
  type: "text" | "code"
}

interface LocalApiError {
  code: string
}

const router = express.Router()
router.use(express.json())

const createCellRouter = (filename: string, dir: string) => {
  const fullPath = path.join(dir, filename)

  router.get("/cells", async (req: Request, res: Response) => {
    try {
      const cells = await fs.readFile(fullPath, { encoding: "utf-8" })
      console.log("Coming from get cells", JSON.parse(cells))

      return res.send(JSON.parse(cells))
    } catch (err) {
      if (err instanceof Error) {
        console.error(err)
        await fs.writeFile(fullPath, JSON.stringify([]), "utf-8")
      }
      return res.send(JSON.stringify([]))
    }
  })

  router.post("/cells", async (req: Request, res: Response) => {
    const { cells }: { cells: Cell[] } = req.body

    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8")

    res.status(200).json({
      status: "Ok",
    })
  })

  return router
}

export default createCellRouter
