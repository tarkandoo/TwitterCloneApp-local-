///////////////////////////////////////////
// Required
//////////////////////////////////////////

var gulp=require('gulp'),
	uglify=require('gulp-uglify'),
	rename=require('gulp-rename'),
	plumber=require('gulp-plumber'),
	browserSync=require('browser-sync').create(),
	reload=browserSync.reload,
	nodemon=require('gulp-nodemon'),
	minify=require('gulp-minify-css');

///////////////////////////////////////////
// HTML Task
//////////////////////////////////////////

gulp.task('html',function(){
	gulp.src('app/**/*.html')
	.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Scripts Task
//////////////////////////////////////////

gulp.task('scripts',function(){
	gulp.src(['app/**/*.js','!app/**/*min.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./app/'))
		.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Styles Task
//////////////////////////////////////////

gulp.task('styles',function(){
	gulp.src(['app/styles/*.css','!app/styles/*min.css'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(minify())
		.pipe(gulp.dest('./app/styles/'))
		.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Browser-Sync Task
//////////////////////////////////////////

gulp.task('browser-sync',['nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:3000",
        files: ['./app'],
        browser:['chrome.exe','firefox.exe'],
        port: 4000
    });
});
///////////////////////////////////////////
// start nodemon Task
//////////////////////////////////////////

gulp.task('nodemon',[], function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'server.js',
		watch:['./*.*']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
		} 
		started = true; 
	}).on('restart',function(){
		seTimeout(function(){
			reload();
		},200);
	});
});

///////////////////////////////////////////
// Watch Tasks
//////////////////////////////////////////

gulp.task('watch',function(){
	gulp.watch('app/**/*.js',['scripts']);
	gulp.watch('app/styles/*.css',['styles']);
	gulp.watch('app/**/*.html',['html']);
});

///////////////////////////////////////////
// Default Task
//////////////////////////////////////////

gulp.task('default',['browser-sync','watch']);