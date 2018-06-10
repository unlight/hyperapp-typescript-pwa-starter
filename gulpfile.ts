/// <reference path="node_modules/typescript/lib/lib.esnext.d.ts" />
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import gulp = require('gulp');
import changed = require('is-changed');
const g = require('gulp-load-plugins')();
import log = require('fancy-log');
import execa = require('execa');

const buildPath = path.join(__dirname, 'dist');

gulp.task('build:libs', async () => {
    const libsChanged = changed.dependencies(path.resolve(buildPath, '.libs.dat'));
    if (!libsChanged.result && fs.existsSync(`${buildPath}/libs.json`) && fs.existsSync(`${buildPath}/libs.js`)) {
        return;
    }
    if (libsChanged.diff) {
        for (const [pkname, version] of Object.entries(libsChanged.diff)) {
           log(`${pkname} ${(version.$set)}`);
        }
    }
    log(('Need npm install'));
    await execa('npm', ['install'], { stdio: 'inherit' });
    log(('Rebuilding npm libs'));
    await execa('npm', ['run', 'build:libs'], { stdio: 'inherit' });
    libsChanged.update();
});

// Builds style for development only.
// gulp.task('build:style', () => {
//     const styleChanged = changed.file(`src/style.scss`, Path.resolve(buildPath, '.style.dat'));
//     if (styleChanged.result) {
//         del.sync(`${buildPath}/style.css`);
//     }
//     return new Promise((resolve, reject) => {
//         let [style] = glob.sync(`${buildPath}/style.css`);
//         if (!style) {
//             const proc = spawn('npm', ['run', 'build:style'], { stdio: 'inherit' });
//             proc.on('error', reject);
//             proc.once('exit', () => {
//                 styleChanged.update();
//                 resolve();
//             });
//         } else {
//             resolve();
//         }
//     });
// });

gulp.task('preserver', gulp.series(...[
    'build:libs',
    // 'build:style',
]));
