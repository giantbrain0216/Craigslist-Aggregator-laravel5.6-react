let mix = require('laravel-mix');

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

mix.react('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

if (process.env.npm_lifecycle_event !== 'hot')
{
    mix.version();
    mix.sourceMaps(false);
}

if (process.env.npm_lifecycle_event === 'dev')
{
    mix.disableNotifications();
    mix.sourceMaps(false);
}