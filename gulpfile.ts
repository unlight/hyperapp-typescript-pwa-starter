/// <reference path="node_modules/typescript/lib/lib.esnext.d.ts" />
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import gulp = require('gulp');
import changed = require('is-changed');
const g = require('gulp-load-plugins')();
import log = require('fancy-log');
import execa = require('execa');
import del = require('del');
import glob = require('glob');

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
gulp.task('build:style', async () => {
    const styleChanged = changed.file(`src/style.scss`, path.resolve(buildPath, '.style.dat'));
    if (styleChanged.result) {
        del.sync(`${buildPath}/style.css`);
    }
    let [style] = glob.sync(`${buildPath}/style.css`);
    if (!style) {
        await execa('npm', ['run', 'build:style'], { stdio: 'inherit' });
        styleChanged.update();
    }
});

gulp.task('preserver', gulp.series(...[
    'build:libs',
    'build:style',
]));
