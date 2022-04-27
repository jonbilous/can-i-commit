#!/usr/bin/env node

import { program as cli } from "commander";
import { execSync } from "child_process";
import { config } from "./config";

cli.name("can-i-commit");
cli
  .description("Check if you can commit in the current Git state")
  .version("1.0.0");

cli
  .command("check")
  .description("Check if you can commit in the current state")
  .action(async () => {
    const staged = execSync("git diff --name-only --cached")
      .toString("utf-8")
      .trim();

    if (!staged) {
      console.error("⛔️ Sorry, no files staged for commit.");
      process.exit(1);
    }

    const currentBranch = execSync("git branch --show-current")
      .toString("utf-8")
      .trim();

    const configuration = await config.read().catch((err) => {
      console.error("⛔️ Error reading config file, ignoring...");
    });

    if (configuration?.prohibitedBranches?.includes(currentBranch)) {
      console.error(`⛔️ You may not commit on the ${currentBranch} branch.`);
      process.exit(1);
    }

    console.log("🤗 Ready to commit!");
  });

cli
  .command("init")
  .description("Create a config file in the current working directory")
  .action(() => {
    config
      .create()
      .then((path) => {
        console.log("🎉", "Config file created at", path);
      })
      .catch((err) => {
        console.error("There was an error creating the config file", err);
      });
  });

cli.parse(process.argv);
