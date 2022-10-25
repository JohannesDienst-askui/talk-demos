import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./helper/jest.setup.ts'],
  sandboxInjectedGlobals: [
    'Math',
  ],
  // reporters: [
  //   "default",
  //   ["jest-html-reporter", {
  //     "pageTitle": "Test Report"
  //   }]
  // ]
};

// eslint-disable-next-line import/no-default-export
export default config;
