import gulp from 'gulp';

// Config
import path from '../config/path.js';
import app from '../config/app.js';

// Plagins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';
import webpHtml from 'gulp-webp-html';

export default () => {
	return gulp.src(path.html.src)
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'HTML',
				message: error.message
			}))
		}))
		.on('data', (file) => {
			console.log(`Processing: ${file.path}`);
		})
		.pipe(fileInclude())
		.on('data', (file) => {
		  console.log(`File before webpHtml: ${file.path}`);
		})
		//
		// .pipe(webpHtml({}))
		.on('data', (file) => {
		   console.log(`File after webpHtml: ${file.path}`);
		})
		.pipe(size({ title: 'Before size' }))
		.pipe(htmlmin(app.htmlmin))
		.pipe(size({ title: 'After size' }))
		.pipe(webpHtml())
		.pipe(gulp.dest(path.html.dest))
}
