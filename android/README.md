# Askui first test

Example to introduce  how to use the askui lib.
The lib is helps to control the operating system with commands.
Using Jest as test framework to execute all tests.

## Installation of Jest and Typescript

Use following command to set up Jest:
```shell
npm i -D jest @types/jest ts-jest typescript
```

## Setup
First [Set up your Android device](https://docs.askui.com/docs/general/Tutorials/setup-android)

Second: [Prepate askui environment](https://docs.askui.com/docs/general/Tutorials/android-search-in-browser#1-prepare-the-askui-test-environment)

Start UiController for Android (macOS):
```shell
./startUIControllerAndroid.sh
```

Start UiController for desktop (macOS):
```shell
./startUIControllerDesktop.sh
```

## How to Execute The Example

This test can be executed with the following command:
```shell
npm run test
```
