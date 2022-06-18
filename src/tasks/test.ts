import {TASK_COMPILE, TASK_TEST} from "hardhat/builtin-tasks/task-names";
import {task} from "hardhat/config";
import {command} from "../config";
import {TestArgs} from "../types/test";
import {showChange, showStatus} from "../utils";
import {startListener} from "../utils/listener";

// extension task: test
task(TASK_TEST)
  .addFlag(
    command.watch,
    "Watch changes in files used in test (from testDir of config)",
  )
  .setAction(async (args: TestArgs, hre, runSuper) => {
    const testFiles = args.testFiles;
    const {testDir, compileDir} = hre.config.compileWatch;

    await runSuper();

    showStatus();

    await Promise.all([
      // listener for testing dir
      startListener(testDir, async ({eventType, filename}) => {
        showChange(filename, eventType);

        const shouldReRun =
          !testFiles.length || testFiles.includes(`${testDir}/${filename}`);

        if (shouldReRun) {
          await runSuper();
        }

        showStatus(!shouldReRun);
      }),
      // listener for compilation/contracts dir
      startListener(compileDir, async ({eventType, filename}) => {
        showChange(filename, eventType);

        await hre.run(TASK_COMPILE);
        await runSuper();

        showStatus(false);
      }),
    ]);
  });
