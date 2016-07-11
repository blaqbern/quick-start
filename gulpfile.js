const gulp = require('gulp')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const livereload = require('gulp-livereload')
const del = require('del')

const clean = glob => del(glob)
gulp.task('clean', done => {
  clean('./public/styles.css')
  done()
})

gulp.task('css', ['clean'], () =>
  gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./public'))
    .pipe(livereload())
)

gulp.task('watch-markup', () =>
  gulp.src('./public/index.html')
    .pipe(livereload())
)

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('./scss/**/*.scss', ['css'])
  gulp.watch('./public/index.html', ['watch-markup'])
})

gulp.task('serve', () => require('./server.js')())

gulp.task('default', ['serve', 'css', 'watch'])
