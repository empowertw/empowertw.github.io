'use strict';

var gulp = require('gulp');
var del = require('del');


var path = require('path');


// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),

    sourceFile = './app/scripts/app.js',

    destFolder = './dist/scripts',
    destFileName = 'app.js';


// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});


// Scripts
gulp.task('scripts', function () {
    var bundler = watchify(browserify({
        entries: [sourceFile],
        insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source(destFileName))
            .pipe(gulp.dest(destFolder));
    }

    return rebundle();

});


gulp.task('jade', function () {
    return gulp.src('app/template/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('dist'));
})

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// TEMPLATE novel
gulp.task('templates', function () {
    return gulp.src('app/templates/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/templates'))
        .pipe($.size());
});

//  STATEMENT novel
gulp.task('statement', function () {
    return gulp.src('app/statement/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/statement'))
        .pipe($.size());
});

//  CLAIM novel
gulp.task('claim', function () {
    return gulp.src('app/claim/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/claim'))
        .pipe($.size());
});

//  FLYINGV novel
gulp.task('flyingv', function () {
    return gulp.src('app/flyingv/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/flyingv'))
        .pipe($.size());
});

//  ALIAS novel
gulp.task('alias', function () {
    return gulp.src('app/alias/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/alias'))
        .pipe($.size());
});

//  PEOPLE novel
gulp.task('people', function () {
    return gulp.src('app/people/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/people'))
        .pipe($.size());
});

//  ACTION novel
gulp.task('action', function () {
    return gulp.src('app/action/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist/action'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});



gulp.task('jest', function () {
    var nodeModules = path.resolve('./node_modules');
    return gulp.src('app/scripts/**/__tests__')
        .pipe($.jest({
            scriptPreprocessor: nodeModules + '/gulp-jest/preprocessor.js',
            unmockedModulePathPatterns: [nodeModules + '/react']
        }));
});



// Clean
gulp.task('clean', function (cb) {
    cb(del.sync(['dist/styles', 'dist/scripts', 'dist/images']));
});


// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Webserver
gulp.task('serve', function () {
    gulp.src('./dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000
        }));
});

// Bower helper
gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
    return gulp.src(['app/*.txt', 'app/*.ico'])
        .pipe(gulp.dest('dist/'))
        .pipe($.size());
});

// Watch
gulp.task('watch', ['html', 'bundle', 'serve'], function () {

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);


    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);



    // Watch .jade files
    gulp.watch('app/template/**/*.jade', ['jade', 'html']);


    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});

// Build
gulp.task('build', ['html', 'bundle', 'images', 'extras', 'statement', 'claim', 'action', 'flyingv', 'alias', 'people']);

// Default task
gulp.task('default', ['clean', 'build', 'jest' ]);
