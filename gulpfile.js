var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var nodemon = require('gulp-nodemon');
var del = require('del');
var browserSync = require('browser-sync');

function compile (watch) {
  var bundler = watchify(browserify(
      './src/js/app.js', { debug: true }
  )
  .transform(babel.configure({
    presets: ['react']
  })));

  function rebundle () {
    bundler.bundle()
      .on('error', function (err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('build', ['clean', 'lint'], function() {
  return compile(false);
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['build']);
	gulp.watch('build/**', function () {
  		setTimeout(function () {
  			browserSync.reload();
  		}, 1000);
	});
});

gulp.task('server', ['browserSync', 'build'], function () {
  nodemon({
    script: './server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('lint', function () {
	return gulp.src('./src/**')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('clean', function () {
	del.sync(['build/**', '!build']);
});

gulp.task('browserSync', function () {
	browserSync({
        proxy: {
        	target: 'http://localhost:8080'
        }
    });
});

gulp.task('default', ['watch' ,'browserSync', 'build']);
