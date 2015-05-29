var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    size = require('gulp-filesize')
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imageMin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    liveReload = require('gulp-livereload'),
    del = require('del');

gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoPrefixer('last 2 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(notify({ message: 'Style complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    // .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(size())
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(size())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imageMin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function(cb) {
    del('dist', cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);

    // Liverelaod
  liveReload.listen();
  gulp.watch(['dist/**']).on('change', liveReload.changed);
});