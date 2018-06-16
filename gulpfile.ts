/// <reference path="node_modules/typescript/lib/lib.esnext.d.ts" />
import { execSync } from 'child_process';
import gulp = require('gulp');
import changed = require('is-changed');
const g = require('gulp-load-plugins')();
import log = require('fancy-log');
import execa = require('execa');
import glob = require('glob');
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import rimraf = require('rimraf');

const buildPath = join(__dirname, 'dist');

gulp.task('build:libs', async () => {
    const libsChanged = changed.dependencies(path.resolve(buildPath, '.libs.dat'));
    if (!libsChanged.result && existsSync(`${buildPath}/libs.json`) && existsSync(`${buildPath}/libs.js`)) {
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
    const styleChanged = changed.file(`src/style.scss`, resolve(buildPath, '.style.dat'));
    if (styleChanged.result) {
        rimraf.sync(`${buildPath}/style.css`);
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

function sourceLint() {
    return g.eslint();
}

function specLint() {
    return g.eslint({
        rules: {
            'lodash/import-scope': 0,
            'prefer-const': 0,
            'import/no-duplicates': 0,
            'import/max-dependencies': 0,
            'tsc/config': 0,
        }
    });
}

gulp.task('eslint', () => {
    return gulp.src('src/**/*.ts?', { since: g.memoryCache.lastMtime('source') })
        .pipe(g.memoryCache('source'))
        .pipe(g.ignore.exclude('*.d.ts'))
        .pipe(g.if('*.spec.ts', specLint(), sourceLint()))
        .pipe(g.eslint.format());
});

gulp.task('eslint:w', (done) => {
    const w = gulp.watch('src/**/*.ts?', { ignoreInitial: false }, gulp.series('eslint'));
    w.on('change', g.memoryCache.update('source'));
    process.on('SIGINT', () => {
        w.close();
        done();
    });
});
