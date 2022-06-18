import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command, flag} from "../config";
import {showChange, showStatus} from "../utils";
import {isSpecifiedChange} from "../utils/compile";
import {CompileArgs} from "../types";
import {startListener} from "../utils/listener";

// new task: compile:watch
task(`${TASK_COMPILE}:${command.watch}`)
  .addOptionalParam(
    flag.only,
    "A list of contracts to watch for compilation, separated by commas (with extension)",
    "",
  )
  .addOptionalParam(
    flag.except,
    "A list of contracts to ignore while watching for compilation, separated by commas (with extension)",
    "",
  )
  .setAction(async (args: CompileArgs, hre) => {
    const {compileDir, noCompile} = hre.config.compileWatch;

    if (!noCompile) {
      await hre.run(TASK_COMPILE);
    }

    showStatus();

    await startListener(compileDir, async ({eventType, filename}) => {
      showChange(filename, eventType);

      const shouldChange = isSpecifiedChange(args, filename);
      if (shouldChange) {
        await hre.run(`${TASK_COMPILE}`);
      }

      showStatus(!shouldChange);
    });
  });

// extension task: compile
task(TASK_COMPILE)
  .addFlag(command.watch, "Watch changes in contract files")
  .setAction(async (_, hre, runSuper) => {
    await runSuper();

    showStatus();

    await startListener("./", async ({eventType, filename}) => {
      showChange(filename, eventType);

      const shouldCHange = filename.endsWith(".sol");
      if (shouldCHange) {
        await runSuper();
      }

      showStatus(!shouldCHange);
    });
  });
