var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var nodemon = require('gulp-nodemon');
var del = require('del');
var browserSync = require('browser-sync');

function reloadBrowser (delay) {
	setTimeout(function () {
		browserSync.reload();
	}, delay);
}

function compile (src, dst) {
	var bundler = browserify(src)
	.transform(babel.configure({
		presets: ['react']
	}));

	return bundler.bundle()
		.on('error', function (err) { console.error(err); this.emit('end'); })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(dst));
}

gulp.task('build', ['lint'], function () {
	return compile('./src/js/RenderApp.js', './build');
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.js', ['build']);
	gulp.watch('src/img/**', ['moveDepencies']);
});

gulp.task('server', ['clean', 'build', 'moveDepencies'], function () {
	// compile('./src/js/RenderApp.js', './build');
	nodemon({
		script: './server/server.js',
		ext: 'js html',
		ignore: ['./src/**, gulpfile.js'],
		env: { 'NODE_ENV': 'development' }
	}).on('restart', function () {
		reloadBrowser(1000);
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
	/* test is not yet implemented */
	// compile('./src/js/App', './test');
});

gulp.task('moveDepencies', function () {
	return gulp.src('./src/img/**')
		.pipe(gulp.dest('./build/img/'));
});

gulp.task('default', ['watch', 'server'], function () {
	/* What happens after everything is build and server is running in dev mode */
	browserSync({
		proxy: {
			target: 'http://localhost:8080'
		}
	});
	browserSync.pause();
});
