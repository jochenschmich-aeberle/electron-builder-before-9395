# electron-builder-before-9395

This repository aims to help to resolve https://github.com/electron-userland/electron-builder/issues/9395.

This is the status before upgrading to `electron-builder@26.3.3`.

To reproduce the issue, run:

```
yarn install
yarn run buildElectronApp
```

Check the output in `dist/electron-app/win-unpacked/resources/app`:
- The `node_modules` folder is there and filled with all the dependencies.

This is a sister repository to [electron-builder-after-9395](https://github.com/jochenschmich-aeberle/electron-builder-before-9395), which uses `electron-builder@26.3.3`, where the issue does occur.