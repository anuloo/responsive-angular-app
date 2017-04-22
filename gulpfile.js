var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoPrefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');

var paths = {
     sass: ['app/scss/**/*.scss'],
     js: ['app/js/**/*.js'],
     javascript: [
         'node_modules/angular/angular.js',
         'node_modules/angular-ui-router/release/angular-ui-router.js',
         'node_modules/lodash/dist/lodash.js',
         'node_modules/angular-simple-logger/dist/angular-simple-logger.js',
         'node_modules/angular-google-maps/dist/angular-google-maps.js',
         'app/js/main.js',
         'app/js/controllers/*.js'
     ],
     css: [
         'app/css/*.css'
     ]
 };

 gulp.task('index', function(){
     return gulp.src('app/index.html')
         .pipe(inject(
             gulp.src(paths.javascript,
                 {read: false}), {relative: true}))
         .pipe(gulp.dest('app'))
         .pipe(inject(
             gulp.src(paths.css,
             {read: false}), {relative: true}))
         .pipe(gulp.dest('app'));
 });

gulp.task('styles', function() {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './app',
            "routes" : { "/node_modules" : "./node_modules"} 
        }
    });
    gulp.watch(paths.sass, ['styles']);
    gulp.watch(paths.js).on('change', browserSync.reload);
    gulp.watch('app/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'index', 'serve']);
