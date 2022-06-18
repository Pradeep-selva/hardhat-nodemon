import {CompileArgs} from "../types";

export const isSpecifiedChange = (args: CompileArgs, fileName: string) => {
  const only = args.only.split(",").map((it) => it.trim());
  const except = args.except.split(",").map((it) => it.trim());

  return (
    only.some((it) => it.toLowerCase() === fileName.toLowerCase()) &&
    except.every((it) => it.toLowerCase() !== fileName.toLowerCase())
  );
};
