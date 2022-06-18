import {watch} from "fs/promises";
import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command} from "../config";

const showWatching = () => console.log("[Watching for contract changes...]");

task(`${TASK_COMPILE}${command.watch}`).setAction(async (_, hre) => {
  const {compileDir} = hre.config.compileWatch;

  await hre.run(TASK_COMPILE);

  showWatching();

  const watcher = watch(compileDir);
  for await (const event of watcher) {
    console.log(`${event.filename} -> ${event.eventType}`);

    await hre.run(`${TASK_COMPILE}`);

    showWatching();
  }
});
