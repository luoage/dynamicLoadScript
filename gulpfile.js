'use strict';

var gulp = require('gulp');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({
	//browers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']
	browsers: ['last 20 versions']
});
var less = require('gulp-less');


gulp.task('less', function() {
	return gulp.src([
		'src/css/**/*.less'
	])
	.pipe(less({
		optimization: 10,
		env: 'production',
		compress: false,
		plugins: [autoprefix]
	}))
	.pipe(gulp.dest('dist/css'));
});
