const { readFileSync } = require('fs');

import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;
const injectStyles = process.env?.INJECT_STYLES === 'true';
const buildPath = 'public/build';
const buildTargets = [
    'main',
    'coverified-breg-search',
];

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

export default buildTargets.map(target => {
    return {
        input: `src/${target}.js`,
        output: {
            sourcemap: true,
            format: 'iife',
            name: 'app',
            file: `${buildPath}/${target}.js`,
        },
        plugins: [
            svelte({
                preprocess: preprocess({
                    postcss: {
                        plugins: [autoprefixer()],
                    },
                }),
                exclude: /\.wc\.svelte$/,
                compilerOptions: {
                    // disable custom-element mode
                    customElement: false,
                    // enable run-time checks when not in production
                    dev: !production,
                },
            }),
            svelte({
                preprocess: preprocess({
                    postcss: {
                        plugins: [autoprefixer()],
                    },
                }),
                include: /\.wc\.svelte$/,
                compilerOptions: {
                    // enable custom-element mode
                    customElement: true,
                    // enable run-time checks when not in production
                    dev: !production,
                },
            }),
            replace({
                preventAssignment: true,
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css({ output: `${target}.css` }),

            // If you have external dependencies installed from
            // npm, you'll most likely need these plugins. In
            // some cases you'll need additional configuration -
            // consult the documentation for details:
            // https://github.com/rollup/plugins/tree/master/packages/commonjs
            resolve({
                browser: true,
                dedupe: ['svelte'],
            }),

            commonjs(),

            // In dev mode, call `npm run start` once
            // the bundle has been generated
            !production && serve(),

            // Watch the `public` directory and refresh the
            // browser on changes when not in production
            !production && livereload('public'),

            // If we're building for production (npm run build
            // instead of npm run dev), minify
            production && terser(),

            injectStyles && replace({
                preventAssignment: true,
                '{{{###STYLES###}}}': readFileSync(`${buildPath}/${target}.css`, 'utf8'),
                delimiters: ['', ''],
            }),
        ],
        watch: {
            clearScreen: true,
        },
    };
});
