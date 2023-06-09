# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn electron`

Runs the electron app in the development mode.\
The app will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn electron-pack:[linux|windows|macos]`

Builds the app executable to the `dist` folder.\

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint`

Runs the eslinter on all js, jsx, ts and, tsx files. All thanks to https://github.com/wesbos/eslint-config-wesbos

### `yarn tsc`

Source code typechecking based on the defined typescript rules from [tsconfig.json](tsconfig.json)

### `yarn format`

Format all the ts, js, tsx, jsx, css, json, md, html and, yml files. All thanks to https://github.com/wesbos/eslint-config-wesbos

## About certificates

On macOS, [electron-builder](https://www.electron.build/) expects two certificates, _Developer ID Application_ and _3rd Party Mac Developer Application_, to be present on the Keychain Access. In scenarios where a specification of the certificates are necessary, the env variables _CSC_LINK_ and _CSC_KEY_PASSWORD_ can be specified. To export both certificates into a single _.p12_ file, follow this [guide](https://www.electron.build/code-signing#how-to-export-certificate-on-macos).

On Windows, _CSC_LINK_ and _CSC_KEY_PASSWORD_ variables must be set. If the _.p12_ contains more than one certificate the field _certificateSha1_ must be provided on the `package.json` file. Currently, the _Developer ID Application_ certificate are being used to sign the windows installer.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
