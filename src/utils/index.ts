import chalk from "chalk";

export const showStatus = (skip: boolean = false) =>
  skip
    ? console.log(chalk.blue.bold("-- Skipping compilation for this --"))
    : console.log(chalk.green.bold("\n[Watching for file changes...]\n"));

export const showChange = (fileName: string, event: string) =>
  console.log(
    `[${chalk.yellow.bold(fileName)}] ${chalk.green(
      event === "rename" ? "MOVED" : "CHANGED",
    )}`,
  );
