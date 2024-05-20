import express, { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";
import createCellRouter from "./router/cell.router";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app: Express = express();

  app.use(createCellRouter(filename, dir));

  app.get("/health", async (req, res) => {
    res.send("Health");
  });

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:5173",
        ws: true,
      })
    );
  } else {
    const packagePath = require.resolve("local-client/dist/index.html");
    console.log(packagePath);
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(
          `Opened ${filename}. Naivgate to the http://localhost:${port} to edittt!!`
        );
        resolve();
      })
      .on("error", reject);
  });
};
