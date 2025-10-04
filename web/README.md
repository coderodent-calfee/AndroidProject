# Cross Platform Client Frontend code

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
Typescript based, with templated cruft removed.

This is intended as the frontend and app-resident interface pages of the game frame.
This repo should hold pages and components that will be in the apk/electron/ios app that is downloaded to the mobile or pc.

all components should be accessible from any of these local pages, as well as from any game related pages (for consistancy).


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


Todo:
- Frontend React:
   - App Contexts
   - Login 
- Frontend Send Input