import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command} from "../config";

task(`${TASK_COMPILE}${command.watch}`).setAction(async () => {
  console.log("Testing");
});
