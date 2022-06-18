import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    compileWatch?: {
      noCompile?: boolean;
      compileDir?: string;
      testDir?: string;
    };
  }

  interface HardhatConfig {
    compileWatch: {
      noCompile: boolean;
      compileDir: string;
      testDir: string;
    };
  }
}
