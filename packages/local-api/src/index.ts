import express, { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app: Express = express();

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:5173",
        ws: true,
      })
    );
  } else {
    const packagePath = require.resolve("local-client/dist/index.html");
    // console.log(packagePath);
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(
          `Opened ${filename}. Naivgate to the http://localhost:${port} to edit`
        );
        resolve();
      })
      .on("error", reject);
  });
};
