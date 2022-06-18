import {watch} from "fs/promises";
import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command} from "../config";
import {showChange, showWatching} from "../utils";

task(`${TASK_COMPILE}${command.watch}`).setAction(async (_, hre) => {
  const {compileDir} = hre.config.compileWatch;

  await hre.run(TASK_COMPILE);

  showWatching();

  const watcher = watch(compileDir, {recursive: true});
  for await (const {filename, eventType} of watcher) {
    showChange(filename, eventType);

    await hre.run(`${TASK_COMPILE}`);

    showWatching();
  }
});
