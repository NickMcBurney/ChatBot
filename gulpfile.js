// this is gulp init
var gulp = require('gulp');
// used for logging custom messages to the terminal
var gutil = require('gulp-util');
// used to combine files
var concat = require('gulp-concat');
// used to compile SCSS to CSS
var sass = require('gulp-sass');
// minify css
var cleanCSS = require('gulp-clean-css');
// used to minify CSS, JS, html
var uglify = require('gulp-uglify');
var pump = require('pump');
// used to rename files
var rename = require("gulp-rename");
// auto prefixes css properties
var autoprefixer = require('gulp-autoprefixer');

// connect to webserver
var browserSync = require('browser-sync').create();
//var connect = require('gulp-connect');


//script paths
var jsFiles = [
  './src/scripts/chat-data.js', 
  './src/scripts/chat-services.js', 
  './src/scripts/chat-finance.js', 
  './src/scripts/chat-bot.js'],
    jsDest = './dist/scripts/',
    cssFiles = './src/styles/*.scss',
    cssDest = './dist/styles';


// basic log example
gulp.task('log', function() {
  gutil.log(jsFiles)
});


// compile SCSS to CSS
gulp.task('handle-scss', function() {
  gulp.src(cssFiles) // source file(s)

  .pipe(sass({style: 'compressed'})) // output compressed
    .on('error', gutil.log) // if error log error
    .pipe(autoprefixer()) // auto prefix css properties
    .pipe(cleanCSS()) // minify css
    .pipe(rename({ suffix: '.min' })) // add .min to file name
    .pipe(gulp.dest(cssDest)) // destination location for compiled / compressed CSS
    //.pipe(browserSync.reload) // reload browser
});


// compress JS to minified version
gulp.task('handle-js', function () {
  gulp.src(jsFiles) // source file(s)
    .pipe(uglify()) // minify js
    .pipe(concat('scripts.js')) // combine files
    .pipe(rename({ suffix: '.min' })) // add .min to file name
    .pipe(gulp.dest(jsDest)) // destination location for compiled JS
    //.pipe(browserSync.reload) // reload browser
})


// handle html
gulp.task('handle-html', function() {
  gulp.src('./src/*.html')
  .pipe(gulp.dest('./dist'))
  //.pipe(browserSync.reload)
});


// watch for changes to JS / CSS
gulp.task('watch', function() {
  gulp.watch(jsFiles, ['handle-js']);
  gulp.watch(cssFiles, ['handle-scss']);
  gulp.watch('./src/*.html', ['handle-html']);
});


// connect to webserver
/*gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});*/
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// clean html, js and scss files
gulp.task('clean', ['handle-html', 'handle-js', 'handle-scss']);

// clean, setup server and watch for file changes
gulp.task('default', ['handle-html', 'handle-js', 'handle-scss', 'browser-sync', 'watch']);