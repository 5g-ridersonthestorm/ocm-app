# ocm-app
The OCM web and mobile app

Implemented using Ionic, Angular and TypeScript

Install Ionic CLI & Cordova:
> npm install -g cordova ionic

Build and test:
> npm install

> ionic serve

Web build:
> ionic cordova build browser --prod

Platform Specifics
- Web uses a web/js mapping provider for the browser version
    - ionic cordova plugin remove cordova-plugin-inappbrowser
    - ionic cordova build browser --prod
- Android and iOS currently use the Google Maps Native mapping provider
    - ionic cordova plugin add cordova-plugin-inappbrowser
    - iOS and Android versions historically have different bundle ids.
    - iOS fresh setup: install and update latest cocoapods version, then  /platforms/ios/ pod deintegrate, pod install
        - change bundle id to org.openchargemap.app and name to Open Charge (Open Charge Map is too long)
        - Use square icon for iOS
        - File> Workspace> Legacy Build
        - ionic cordova platform remove ios
        - ionic cordova platform add ios
        - platforms/ios/ pod deintegrate, pod install
        - ionic cordova prepare ios --prod


Type Docs
    `typedoc --options typedoc.json --exclude '**/*+(e2e|spec|index).ts' ./src/`