import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import getPreprocessor from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";
import path from "path";
const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);
const dedupe = (importee) =>
  importee === "svelte" || importee.startsWith("svelte/");

const postcssPlugins = (purgecss = false) => {
  return [
    require("postcss-import")(),
    require("postcss-url")(),
    require("postcss-nested"),
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer")(),
    // Do not purge the CSS in dev mode to be able to play with classes in the browser dev-tools.
    purgecss &&
      require("@fullhuman/postcss-purgecss")({
        content: ["./**/*.svelte", "./src/template.html"],
        defaultExtractor: (content) => {
          const regExp = new RegExp(/[\w-/.:]+(?<!:)/g);

          const matchedTokens = [];

          let match = regExp.exec(content);
          // To make sure that you do not lose any tailwind classes used in class directive.
          // https://github.com/tailwindcss/discuss/issues/254#issuecomment-517918397
          while (match) {
            if (match[0].startsWith("class:")) {
              matchedTokens.push(match[0].substring(6));
            } else {
              matchedTokens.push(match[0]);
            }

            match = regExp.exec(content);
          }

          return matchedTokens;
        },
        // Whitelist selectors to stop Purgecss from removing them from your CSS.
        whitelist: [],
      }),
    !dev && require("cssnano"),
  ].filter(Boolean);
};

const preprocess = getPreprocessor({
  transformers: {
    postcss: {
      plugins: postcssPlugins(), // Don't need purgecss because Svelte handle unused css for you.
    },
  },
});

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      resolve({
        browser: true,
        dedupe,
      }),
      commonjs(),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          runtimeHelpers: true,
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        generate: "ssr",
        dev,
        preprocess,
      }),
      resolve({
        dedupe,
      }),
      commonjs(),
      postcss({
        plugins: postcssPlugins(!dev),
        extract: path.resolve(__dirname, "./static/global.css"),
      }),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],
    onwarn,
  },
};
