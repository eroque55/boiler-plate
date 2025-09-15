# Welcome to MW Boilerplate

This is an Expo project template with a lot of batteries included to help you get started quickly.

## Get started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Create your development build:

   ```bash
   yarn android
   # or
   yarn ios
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

## Important changes to make

1. Change the name in `app.json` and `package.json` (search for `changethisname`).

2. Create the images for the app icon and splash screen in the `assets/expo` folder. You can use [this tool](https://www.figma.com/community/file/1466490409418563617/expo-app-icon-splash-v2-community) to generate the icons.

## Useful commands

- `npm typecheck` or `yarn typecheck`: Run TypeScript type checking.
- `npm run lint` or `yarn lint`: Run ESLint to check for code issues.
- `npm run format` or `yarn format`: Format the code using Prettier

## Building a apk

1. Install the EAS CLI globally if you haven't already:

   ```bash
   npm install -g eas-cli
   ```

2. Login to your Expo account:

   ```bash
   eas login
   ```

3. Configure your project for EAS Build:

   ```bash
   eas build:configure
   ```

4. Configure you project for future updates:

   ```bash
   eas update:configure
   ```

5. Build the APK:

   ```bash
   eas build --platform android --profile preview
   ```
