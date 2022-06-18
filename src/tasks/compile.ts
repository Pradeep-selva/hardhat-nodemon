import {task} from "hardhat/config";
import {TASK_COMPILE} from "hardhat/builtin-tasks/task-names";
import {command, flag} from "../config";
import {showChange, showStatus} from "../utils";
import {isSpecifiedChange, validateArgs} from "../utils/compile";
import {CompileArgs} from "../types";
import {startListener} from "../utils/listener";
import chalk from "chalk";

// extension task: compile
task(TASK_COMPILE)
  .addFlag(command.watch, "Watch changes in contract files")
  .addOptionalParam(
    flag.only,
    "A list of contracts to watch for compilation, separated by commas (.sol files)",
    "",
  )
  .addOptionalParam(
    flag.except,
    "A list of contracts to ignore while watching for compilation, separated by commas (.sol files)",
    "",
  )
  .setAction(async (args: CompileArgs, hre, runSuper) => {
    if (!args.watch) {
      if (args.only !== "" || args.except !== "") {
        console.error(
          chalk.red.bold(
            "flags: only, except are only to be used along with --watch",
          ),
        );
        return;
      }

      await runSuper();
      return;
    }

    if (!validateArgs(args)) {
      console.error(
        chalk.red.bold("Please run --"),
        chalk.bgYellow.black.bold("npx hardhat compile --help"),
      );
      return;
    }

    const {compileDir, noCompile} = hre.config.compileWatch;

    if (!noCompile) {
      await runSuper();
    }

    showStatus();

    await startListener(compileDir, async ({eventType, filename}) => {
      showChange(filename, eventType);

      const shouldChange =
        isSpecifiedChange(args, filename) && filename.endsWith(".sol");
      if (shouldChange) {
        await runSuper();
      }

      showStatus(!shouldChange);
    });
  });
