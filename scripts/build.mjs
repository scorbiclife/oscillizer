import fs from "fs";
import { Parcel } from "@parcel/core";

fs.rmSync("docs", { recursive: true, force: true });
const bundler = new Parcel({
  entries: "src/index.html",
  defaultTargetOptions: {
    distDir: "docs",
    publicUrl: ".",
  },
  defaultConfig: "@parcel/config-default",
  mode: "production",
});
await bundler.run();
fs.writeFileSync("docs/.nojekyll", "");
