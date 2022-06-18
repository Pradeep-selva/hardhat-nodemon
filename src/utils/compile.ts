import {CompileArgs} from "../types";

export const isSpecifiedChange = (args: CompileArgs, fileName: string) => {
  const only = args.only.split(",").map((it) => it.trim());
  const except = args.except.split(",").map((it) => it.trim());

  console.log("args", only, except);

  return (
    (!only.length ||
      only.some((it) => it.toLowerCase() === fileName.toLowerCase())) &&
    (!except.length ||
      except.every((it) => it.toLowerCase() !== fileName.toLowerCase()))
  );
};
