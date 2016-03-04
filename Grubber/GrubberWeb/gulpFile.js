/// <binding AfterBuild='moveToLibs' />
/// <binding AfterBuild='moveBootstrap' />

var gulp = require('gulp');
var less = require('gulp-less');

var paths = {
    npmSrc: "./node_modules/",
    libTarget: "./wwwroot/libs/",
    cssTarget: "./wwwroot/css/"
};

var libsToMove = [
   paths.npmSrc + '/angular2/bundles/angular2-polyfills.js',
   paths.npmSrc + '/systemjs/dist/system.js',
   paths.npmSrc + '/systemjs/dist/system-polyfills.js',
   paths.npmSrc + '/rxjs/bundles/Rx.js',
   paths.npmSrc + '/angular2/bundles/angular2.dev.js',
   paths.npmSrc + '/angular2/bundles/router.dev.js',
   paths.npmSrc + '/angular2/bundles/http.dev.js',
   paths.npmSrc + '/es6-shim/es6-shim.min.js',
   paths.npmSrc + '/less/dist/less.js'
];
gulp.task('moveToLibs', function () {
    return gulp.src(libsToMove).pipe(gulp.dest(paths.libTarget));
});

gulp.task('moveBootstrap', function () {
    return gulp.src(['./node_modules/bootstrap-less/**/*']).pipe(gulp.dest('./wwwroot/libs/bootstrap-less'));
});

gulp.task('moveBootswatch', function () {
    return gulp.src(['./node_modules/bootswatch-less/bootswatch/sandstone/**/*']).pipe(gulp.dest('./wwwroot/libs/bootswatch/sandstone'));
});

gulp.task('movejQuery', function () {
    return gulp.src(['./node_modules/jQuery/dist/**/*']).pipe(gulp.dest('./wwwroot/libs/jQuery/dist'));
});

gulp.task('less', function () {
    gulp.src(paths.cssTarget + 'site.less') //path to your main less file
      .pipe(less())
      .pipe(gulp.dest(paths.cssTarget)); // your output folder
});