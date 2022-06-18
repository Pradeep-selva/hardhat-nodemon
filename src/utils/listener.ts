import {FileChangeInfo, watch} from "fs/promises";

export const startListener = async (
  dirName: string,
  execute: (event: FileChangeInfo<string>) => Promise<void>,
) => {
  const watcher = watch(dirName, {recursive: true});
  for await (const event of watcher) {
    await execute(event);
  }
};
