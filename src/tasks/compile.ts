import {watch} from "fs/promises";
import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command} from "../config";

task(`${TASK_COMPILE}${command.watch}`).setAction(async (_, hre) => {
  await hre.run(TASK_COMPILE);

  console.log("[Watching for contract changes...]");

  const watcher = watch(hre.config.compileWatch.compileDir);
  for await (const event of watcher)
    console.log(`${event.filename} has been ${event.eventType}.`);
});
