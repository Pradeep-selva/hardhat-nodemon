import {watch} from "fs/promises";
import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command} from "../config";
import {showChange, showStatus} from "../utils";
import {isSpecifiedChange} from "../utils/compile";
import {CompileArgs} from "../types";

task(`${TASK_COMPILE}${command.watch}`)
  .addOptionalParam(
    "only",
    "A list of contracts to watch for compilation, separated by commas (with extension)",
    "",
  )
  .addOptionalParam(
    "except",
    "A list of contracts to ignore while watching for compilation, separated by commas (with extension)",
    "",
  )
  .setAction(async (args: CompileArgs, hre) => {
    const {compileDir, noCompile} = hre.config.compileWatch;

    if (!noCompile) {
      await hre.run(TASK_COMPILE);
    }

    showStatus();

    const watcher = watch(compileDir, {recursive: true});
    for await (const {filename, eventType} of watcher) {
      showChange(filename, eventType);

      const shouldChange = isSpecifiedChange(args, filename);
      if (shouldChange) {
        await hre.run(`${TASK_COMPILE}`);
      }

      showStatus(!shouldChange);
    }
  });
