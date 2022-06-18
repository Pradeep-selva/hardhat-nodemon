import "hardhat/types/config";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    compileWatch?: {
      only?: string[];
      except?: string[];
    };
  }

  interface HardhatConfig {
    compileWatch: {
      only: string[];
      except: string[];
    };
  }
}
