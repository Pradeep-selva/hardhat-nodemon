import {TASK_TEST} from "hardhat/builtin-tasks/task-names";
import {task} from "hardhat/config";
import {command} from "../config";
import {TestArgs} from "../types/test";
import {showChange, showStatus} from "../utils";
import {startListener} from "../utils/listener";

task(TASK_TEST)
  .addFlag(
    command.watch,
    "Watch changes in files used in test (from testDir of config)",
  )
  .setAction(async (args: TestArgs, hre, runSuper) => {
    const testFiles = args.testFiles;
    const {testDir} = hre.config.compileWatch;

    await runSuper();

    showStatus();

    await startListener(testDir, async ({eventType, filename}) => {
      showChange(filename, eventType);

      const shouldReRun =
        !testFiles.length || testFiles.includes(`${testDir}/${filename}`);

      if (shouldReRun) {
        await runSuper();
      }

      showStatus(!shouldReRun);
    });
  });
