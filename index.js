module.exports = ({ moduleName = '', cwd = process.cwd(), registry = 'https://registry.npmjs.org/', beforeInstall = () => {} } = {}) => {
    return new Promise((resolve) => {
        const fs = require('fs');
        const path = require('path');
        const fse = require('fs-extra');

        const getInstalledPath = require('get-installed-path');
        const getNpmPackageVersion = require('get-npm-package-version');

        const childProcess = require('child_process');

        function writeFileSync(filePath, content) {
            fse.ensureFileSync(filePath);
            const fd = fs.openSync(filePath, 'w+');
            fs.writeFileSync(filePath, content);
            fs.close(fd);
        }

        function installModule() {
            beforeInstall(cwd);

            const pkgJsonExists = fs.existsSync(path.join(cwd, 'package.json'));

            if (!pkgJsonExists) {
                writeFileSync(path.join(cwd, 'package.json'), JSON.stringify({
                    name: 'installing-module',
                    version: '1.0.0',
                }));
            }

            try {
                childProcess.execSync(`npm --registry ${registry} install ${moduleName}@latest --silent`, { cwd, stdio: 'inherit' });
            } catch (err) {
                throw Error(err);
            }

            if (!pkgJsonExists) {
                fse.removeSync(path.join(cwd, 'package.json'));
            }
        }

        function ensureModuleLatest(modulePath) {
            let latestVersion = getNpmPackageVersion(moduleName, {
                registry,
                timeout: 2000,
            });

            latestVersion += '';

            const pkgFile = path.join(modulePath, 'package.json');
            let currentVersion = JSON.parse(fs.readFileSync(pkgFile).toString()).version;

            currentVersion += '';

            if (latestVersion && latestVersion !== 'null' && latestVersion !== currentVersion) {
                console.log(`${moduleName} currentVersion: ${currentVersion}; latestVersion: ${latestVersion};`);
                console.log(`updating ${moduleName}...`);
                installModule();
                console.log(`${moduleName} updated\n`);
            }
        }

        // get cmd module successfully
        getInstalledPath(moduleName, { local: true, cwd }).then((modulePath) => {
            ensureModuleLatest(modulePath);
            resolve(modulePath);
        }).catch(() => {});

        // get cmd module failed
        getInstalledPath(moduleName, { local: true, cwd }).catch(() => {
            console.log(`installing module ${moduleName}...`);
            installModule();
            console.log(`module ${moduleName} installed succeefully.\n`);

            resolve(getInstalledPath.sync(moduleName, { local: true, cwd }));
        });
    });
};
