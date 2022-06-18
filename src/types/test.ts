export interface TestArgs {
  watch: boolean;
  noCompile: boolean;
  parallel: boolean;
  bail: boolean;
  grep: boolean;
  testFiles: Array<string>;
}
