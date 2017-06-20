"use strict";

var fs = require('fs'),
    gulp = require('gulp'),
    chmod = require('gulp-chmod'),
    concat = require('gulp-concat'),
    environments = require('gulp-environments'),
    footer = require('gulp-footer'),
    header = require('gulp-header'),
    myth = require('gulp-myth'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    vendor = require('gulp-concat-vendor');

var config = {
    pkg: JSON.parse(fs.readFileSync('./bower.json')),
    banner:
        '/*!\n' +
        ' * <%= pkg.name %> - <%= pkg.description %>\n' +
        ' * Website: <%= pkg.homepage %>\n' +
        ' */\n',
    files: {
        style: [
            'src/css/font.css',
            'src/css/common.css',
            'src/css/header.css',
            'src/css/sidebar.css',
            'src/css/content.css',
            'src/css/highlight.css',
            'src/css/footer.css'
        ],
        html: [
            'src/html/*',
        ],
        vendor: {
            css: [
                'vendor/bower_components/font-awesome/css/font-awesome.min.css'
            ],
            fonts: [
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.eot',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.svg',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.ttf',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.woff',
                'vendor/bower_components/font-awesome/fonts/fontawesome-webfont.woff2',
                'vendor/bower_components/roboto-googlefont/Roboto-Medium.ttf',
                'vendor/bower_components/roboto-googlefont/Roboto-Regular.ttf',
                'vendor/bower_components/roboto-googlefont/Roboto-Italic.ttf',
                'vendor/bower_components/robotomono-googlefont/RobotoMono-Medium.ttf',
                'vendor/bower_components/robotomono-googlefont/RobotoMono-Regular.ttf'
            ],
            images: [
                'src/images/*'
            ],
            js: [
                'vendor/bower_components/prism/prism.js'
            ]
        }
    }
};

gulp.task('default', [
    'build'
]);

gulp.task('build', [
    'build-style',
    'copy-script',
    'copy-style',
    'build-html'
]);

gulp.task('copy-script', function() {
    gulp.src(config.files.vendor.js)
        .pipe(vendor('vendor.js'))
        .pipe(environments.production(uglify()))
        .pipe(chmod(644))
        .pipe(gulp.dest('static/assets/js'));
});

gulp.task('build-style', function() {
    gulp.src(config.files.style)
        .pipe(concat('style.css'))
        .pipe(header(config.banner + '\n', {pkg: config.pkg}))
        .pipe(myth())
        .pipe(environments.production(uglifycss()))
        .pipe(chmod(644))
        .pipe(gulp.dest('static/assets/css'));
});

gulp.task('copy-style', function() {
    gulp.src(config.files.vendor.css)
        .pipe(vendor('vendor.css'))
        .pipe(environments.production(uglifycss()))
        .pipe(chmod(644))
        .pipe(gulp.dest('static/assets/css'));

    gulp.src(config.files.vendor.fonts)
        .pipe(chmod(644))
        .pipe(gulp.dest('static/assets/fonts'));

    gulp.src(config.files.vendor.images)
        .pipe(chmod(644))
        .pipe(gulp.dest('static/assets/images'));
});

gulp.task('build-html', function() {
    gulp.src(config.files.html)
        .pipe(chmod(644))
        .pipe(gulp.dest('layouts/partials'));
});
