import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

interface ConfigFile {
  prohibitedBranches?: string[];
}
const configFilePath = path.resolve(process.cwd(), "can-i-commit.json");

export const config = {
  read: async () => {
    if (existsSync(configFilePath)) {
      const file = await fs.readFile(configFilePath, { encoding: "utf-8" });
      return JSON.parse(file) as ConfigFile;
    }
  },
  create: async () => {
    await fs.writeFile(
      configFilePath,
      JSON.stringify({ prohibitedBranches: ["master", "develop"] }, null, 2)
    );

    return configFilePath;
  },
};
