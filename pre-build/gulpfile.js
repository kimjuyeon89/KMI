// 모듈 가져오기
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass')); // SCSS 모듈
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cached = require('gulp-cached');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// 경로 설정
const src = {
    html: ['html/**/*.html'],
    js: ['js/*.js', 'js/**/*.js'],
    css: ['scss/*.scss', 'scss/**/*.scss'],
    imgs: ['images/**'],
};

const paths = {
    html: 'build/html/',
    js: 'build/js/',
    css: 'build/css/',
    imgs: 'build/images/',
};

// SCSS 옵션
const scssOptions = {
    outputStyle: 'compressed', // 압축된 CSS
    indentType: 'space',
    indentWidth: 2,
    precision: 6,
    sourceComments: false,
};

// HTML 컴파일
function htmlCompile() {
    return gulp
        .src(src.html)
        .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
        .pipe(gulp.dest(paths.html));
}

// SCSS 컴파일
function scssCompile() {
    return gulp
        .src(src.css)
        .pipe(sourcemaps.init())
        .pipe(scss(scssOptions).on('error', scss.logError))
        .pipe(autoPrefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css));
}

// JS 처리
function jsCompile() {
    return gulp
        .src(src.js)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js));
}

// 이미지 복사
function imgCopy() {
    return gulp.src(src.imgs).pipe(gulp.dest(paths.imgs));
}

// 빌드 작업 (Netlify 배포용)
const build = gulp.series(htmlCompile, scssCompile, jsCompile, imgCopy);

// 기본 작업 (로컬 개발용)
function watchFiles() {
    browserSync.init({
        server: { baseDir: 'build/', index: 'html/index.html' },
    });

    gulp.watch(src.html, htmlCompile).on('change', browserSync.reload);
    gulp.watch(src.css, scssCompile).on('change', browserSync.reload);
    gulp.watch(src.js, jsCompile).on('change', browserSync.reload);
    gulp.watch(src.imgs, imgCopy).on('change', browserSync.reload);
}

exports.build = build; // Netlify에서 실행할 빌드 명령어
exports.default = gulp.series(build, watchFiles); // 로컬 개발용
