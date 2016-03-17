var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var nodemon = require('gulp-nodemon');



function compile(watch) {
  	var bundler = watchify(browserify(
  		'./src/js/app.js', { debug: true }
  	)
  	.transform(babel.configure({
  		presets: ['react']
  	})));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
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
    gulp.src('./src/js/public/')
      .pipe(gulp.dest('./build'));
};

gulp.task('build', function() {
  console.log('Moving public elements to build');
  movePublicElements();
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
})

gulp.task('default', ['watch','server']);