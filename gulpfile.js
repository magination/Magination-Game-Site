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

function compile (src, dst) {
	var bundler = browserify(
		src
	)
	.transform(babel.configure({
		presets: ['react']
	}));

	bundler.bundle()
		.on('error', function (err) { console.error(err); this.emit('end'); })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dst));
	return;
}

gulp.task('build', ['lint'], function() {
	console.log('building');
	return compile('./src/js/RenderApp.js','./build');
});

gulp.task('watch', function() {
	//gulp.watch('src/**/*.js', ['build']);
	gulp.watch('build/**', function () {
  		setTimeout(function () {
  			browserSync.reload();
  		}, 1000);
	});
});

gulp.task('server', ['clean'], function () {
	compile();
	nodemon({
	    script: './server/server.js',
		ext: 'js html',
		ignore: ['build/**'],
		env: { 'NODE_ENV': 'development' },
		tasks: function (changedFiles) {
			return ['build'];
		}
	}).on('restart', function () {
		console.log('reloading');
		browserSync.reload();
	});
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

gulp.task('test', function () {
	compile('./src/js/App', './test');
});

gulp.task('browserSync', function () {
	browserSync({
        proxy: {
        	target: 'http://localhost:8080'
        }
    });
});

gulp.task('default', ['watch', 'browserSync', 'server']);
