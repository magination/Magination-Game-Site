var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var nodemon = require('gulp-nodemon');

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

function movePublicElements(){
    gulp.src('./src/js/public/Draganddrop.js')
      .pipe(gulp.dest('./build'));
};

gulp.task('build', function() {
  console.log('Compiling ReactApp');
  return compile(false); 
});
gulp.task('watch', function() {
 return watch(); 
});
gulp.task('server', function () {
  nodemon({
    script: './server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});
gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('default', ['watch','server']);
