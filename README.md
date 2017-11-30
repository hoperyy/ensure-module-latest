[![Npm Version](https://img.shields.io/badge/npm-%3E%3D%203.3.1-brightgreen.svg)](https://www.npmjs.com/package/get-npm-package-version) [![Node Version](https://img.shields.io/badge/node-%3E%3D%206.9.1-brightgreen.svg)](https://nodejs.org/en/) 

## What is `ensure-module-latest`

This tool will ensure npm module exists and being latest at local.

## How to use

```
const ensureModuleLatest = require('ensure-module-latest');

ensureModuleLatest({
    moduleName: 'zepto',
    cwd: process.cwd(),
    registry: 'https://registry.npmjs.org/' 
});
```

## @params

+   `moduleName`
    +   Type: String
    +   Desc: npm module
    +   default: `''`
+   `cwd`
    +   Type: String
    +   Desc: dir path to install module
    +   default: `process.cwd()`
+   `registry`
    +   Type: String
    +   Desc: npm registry
    +   default: `'https://registry.npmjs.org/'`
+   `beforeInstall`
    +   Type: Function
    +   Desc: do something before install module
    +   default: `(cwd) => {}`

## @return `Promise Object`

## LICENSE

MIT