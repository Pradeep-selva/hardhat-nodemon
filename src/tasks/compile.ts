import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command} from "../config";

task(`${TASK_COMPILE}${command.watch}`).setAction(async (_, hre) => {
  await hre.run(TASK_COMPILE);
  console.log("\n wow what a cool function");
});
