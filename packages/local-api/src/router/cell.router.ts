import express, { Request, Response } from "express";

const router = express.Router();

const createFileRouter = (filename: string, dir: string) => {
  router.get("/cells", async (req: Request, res: Response) => {
    // make sure that the file exist
    // if not add default
    // if yes read the file and send to the browser
  });

  router.get("/post", async (req: Request, res: Response) => {
    // make sure file exist
    // if not create it
    // take the list from the request object and serialize them
    // write in the file
  });
};

export default createFileRouter;
