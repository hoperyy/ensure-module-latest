## What is `ensure-module-latest`

This tool will ensure npm module exists and being latest at local.

## How to use

```
const ensureModuleLatest = require(ensure-module-latest);

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
    +   Desc: npm module
    +   default: `'https://registry.npmjs.org/'`

## @return `Promise Object`