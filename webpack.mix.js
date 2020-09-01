const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

require("laravel-mix-react-typescript-extension");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

mix.reactTypeScript("resources/ts/index.tsx", "public/js").sass(
    "resources/sass/app.scss",
    "public/css"
);

if (mix.inProduction()) {
    mix.version();
} else {
    mix.webpackConfig(webpack => ({
        plugins: [
            mix.inProduction() && new ReactRefreshWebpackPlugin(),
        ]
    }));
}
