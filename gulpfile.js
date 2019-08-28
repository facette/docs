"use strict";

var fs = require('fs'),
    gulp = require('gulp'),
    chmod = require('gulp-chmod'),
    concat = require('gulp-concat'),
    environments = require('gulp-environments'),
    header = require('gulp-header'),
    merge = require('merge-stream'),
    myth = require('gulp-myth'),
    terser = require('gulp-terser'),
    uglifycss = require('gulp-uglifycss');

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

function copyScript() {
    return gulp.src(config.files.vendor.js)
        .pipe(concat('vendor.js'))
        .pipe(environments.production(terser()))
        .pipe(chmod(0o644))
        .pipe(gulp.dest('static/assets/js'));
}

function buildStyle() {
    return gulp.src(config.files.style)
        .pipe(concat('style.css'))
        .pipe(header(config.banner + '\n', {pkg: config.pkg}))
        .pipe(myth())
        .pipe(environments.production(uglifycss()))
        .pipe(chmod(0o644))
        .pipe(gulp.dest('static/assets/css'));
}

function copyStyle() {
    return merge(
        gulp.src(config.files.vendor.css)
            .pipe(concat('vendor.css'))
            .pipe(environments.production(uglifycss()))
            .pipe(chmod(0o644))
            .pipe(gulp.dest('static/assets/css')),

        gulp.src(config.files.vendor.fonts)
            .pipe(chmod(0o644))
            .pipe(gulp.dest('static/assets/fonts')),

        gulp.src(config.files.vendor.images)
            .pipe(chmod(0o644))
            .pipe(gulp.dest('static/assets/images'))
    );
}

var build = gulp.series(
    buildStyle,
    copyScript,
    copyStyle,
);

exports.build = build;

exports.default = build;
