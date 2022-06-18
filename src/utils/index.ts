import chalk from "chalk";

export const showWatching = () =>
  console.log(chalk.green.bold("\n[Watching for contract changes...]\n"));

export const showChange = (fileName: string, event: string) =>
  console.log(
    `[${chalk.yellow.bold(fileName)}] ${chalk.green(
      event === "rename" ? "MOVED" : "CHANGED",
    )}`,
  );
