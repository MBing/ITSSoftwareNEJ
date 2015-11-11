'use strict';

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 3000,
    });
});
gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});
gulp.task('style', function() {
    gulp.src('./styles/*.styl')
        .pipe(stylus({
            'include css': true
        }))
        .pipe(gulp.dest('./public/css'));

});