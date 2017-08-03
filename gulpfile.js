const gulp = require('gulp');
const ts = require('gulp-typescript');
const del = require('del');
const gulpCopy = require('gulp-copy');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const exec = require('child_process').exec

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');


gulp.task('webpack', cb => {
  return webpack(require('./webpack.config.js'))
});

gulp.task('compile',  cb => {
  return exec('npm run build', cb);
});

gulp.task('clean', function(cb) {
  return del('dist', cb);
})

gulp.task('copy-static', ['clean'], function() {
  var source = [
    'views/**/*',
    'public/**/*',
    'models/**/*'
    ]
  return gulp.src(source)
    .pipe(gulpCopy('dist'));
});

gulp.task('watch', ['compile'], () => {
  //gulp.watch('src/**/*.ts', ['compile','node bin/www']);

  var stream = nodemon({
                 script: 'bin/www'
               , ext: 'ts'
               , watch: '.'
               , tasks: ['compile']
            });
  return stream;
});

gulp.task('build', ['copy-static'], () => {
  return tsProject.src().pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch']);
