/// <binding AfterBuild='moveToLibs' />
/// <binding AfterBuild='moveBootstrap' />

var gulp = require('gulp');

var paths = {
    npmSrc: "./node_modules/",
    libTarget: "./www/libs/"
};

var libsToMove = [
   paths.npmSrc + '/angular2/bundles/angular2-polyfills.js',
   paths.npmSrc + '/systemjs/dist/system.js',
   paths.npmSrc + '/systemjs/dist/system-polyfills.js',
   paths.npmSrc + '/rxjs/bundles/Rx.js',
   paths.npmSrc + '/angular2/bundles/angular2.dev.js',
   paths.npmSrc + '/angular2/bundles/router.dev.js',
   paths.npmSrc + '/angular2/bundles/http.dev.js',
   paths.npmSrc + '/es6-shim/es6-shim.min.js'
];
gulp.task('moveToLibs', function () {
    return gulp.src(libsToMove).pipe(gulp.dest(paths.libTarget));
});

gulp.task('moveBootstrap', function () {
    return gulp.src(['./node_modules/bootstrap/dist/**/*']).pipe(gulp.dest('./www/libs/bootstrap/dist'));
});

gulp.task('movejQuery', function () {
    return gulp.src(['./node_modules/jQuery/dist/**/*']).pipe(gulp.dest('./www/libs/jQuery/dist'));
});

gulp.task('materialDesignLite', function () {
    return gulp.src(['./node_modules/material-design-lite/dist/**/*']).pipe(gulp.dest('./www/libs/material-design-lite/dist'));
});