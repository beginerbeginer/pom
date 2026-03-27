import Mocha from "mocha";
import * as path from "path";

// esbuild が CJS にバンドルするため、実行時に __dirname は利用可能
declare const __dirname: string;

/**
 * @vscode/test-electron の runTests から呼ばれるエントリポイント。
 * mocha を起動し、extension.test.js を実行する。
 */
export async function run(): Promise<void> {
  const mocha = new Mocha({ ui: "tdd", timeout: 20000 });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- typescript-eslint@8 は TS6 未対応
  mocha.addFile(path.resolve(__dirname, "extension.test.js"));

  return new Promise<void>((resolve, reject) => {
    mocha.run((failures) => {
      if (failures > 0) {
        reject(new Error(`${failures} tests failed`));
      } else {
        resolve();
      }
    });
  });
}
