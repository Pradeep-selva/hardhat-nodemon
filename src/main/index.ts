import "./type-extension";
import {extendConfig} from "hardhat/config";
import {HardhatConfig, HardhatUserConfig} from "hardhat/types";

import "../tasks/compile";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    config.compileWatch = Object.assign(
      {
        noCompile: false,
        testDir: "test",
        compileDir: "src",
      },
      userConfig.compileWatch,
    );
  },
);
