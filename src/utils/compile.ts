import chalk from "chalk";
import {CompileArgs} from "../types";

export const isSpecifiedChange = (
  args: CompileArgs,
  fileName: string,
): boolean => {
  const only =
    args.only !== "" ? args.only.split(",").map((it) => it.trim()) : [];
  const except =
    args.except !== "" ? args.except.split(",").map((it) => it.trim()) : [];

  return (
    (!only.length ||
      only.some((it) => it.toLowerCase() === fileName.toLowerCase())) &&
    (!except.length ||
      except.every((it) => it.toLowerCase() !== fileName.toLowerCase()))
  );
};

export const validateArgs = (args: CompileArgs): boolean => {
  const only =
    args.only !== "" ? args.only.split(",").map((it) => it.trim()) : [];
  const except =
    args.except !== "" ? args.except.split(",").map((it) => it.trim()) : [];

  const validPresence =
    (args.only.length === 0 && args.except.length > 0) ||
    (args.only.length > 0 && args.except.length === 0) ||
    args.except.length + args.only.length === 0;

  const validValues =
    (!only.length || only.every((it) => it.toLowerCase().endsWith(".sol"))) &&
    (!except.length || except.every((it) => it.toLowerCase().endsWith(".sol")));

  if (!validPresence) {
    console.log(chalk.red.bold("Only one of: only, except can be used"));
  }

  if (!validValues) {
    console.log(
      chalk.red.bold("Only (.sol) files can be passed to: only, except "),
    );
  }

  return validPresence && validValues;
};
