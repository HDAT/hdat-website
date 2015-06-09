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
    connect = require('gulp-connect'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    runSync = require('run-sequence')
    livereload = require('gulp-livereload'),
    del = require('del'),
    ghPages = require('gulp-gh-pages');

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
    // .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(size())
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('vendor', function () {
    return gulp.src([
                'bower_components/gsap/src/minified/TimelineMax.min.js',
                'bower_components/gsap/src/minified/TweenMax.min.js',
                'bower_components/firebase/firebase.js',
                'bower_components/jquery/dist/jquery.js'
            ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imageMin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('html', function() {  
  return gulp.src(['src/**/*.html'])
    .pipe(gulp.dest('dist'))
});

gulp.task('copy', function() {  
  return gulp.src(['src/CNAME'])
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', function(cb) {
    del('dist', cb)
});

gulp.task('serve', function(){
    // Start live-reload server
    connect.server({
        root: 'dist/',
        port: 8888,
        livereload: true
    });

    // Watches
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/**/*.html', ['html']);
});

gulp.task('default', ['clean'], function(cb){
 runSync(['styles', 'copy', 'scripts', 'vendor', 'images', 'html', 'serve'])
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});