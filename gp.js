var gulp=require('gulp');
var browserSync=require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
let cleanCSS = require('gulp-clean-css');


gulp.task('venderPrefix', () =>
    gulp.src('./app/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/minified/'))
)


    gulp.task('optimize', () =>
        gulp.src('./app/image/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [
                {
                    removeViewBox: true
                }
            ]
        }))
            .pipe(gulp.dest('./app/farid/'))
    );

gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'./app'
		}
	});
	gulp.watch('./app/*.html').on('change',browserSync.reload);
	gulp.watch('./app/namayndegi/*.html').on('change',browserSync.reload);
	gulp.watch('./app/articles/*.html').on('change',browserSync.reload);
	gulp.watch('./app/css/*.css').on('change',browserSync.reload);
	gulp.watch('./app/js/*.js').on('change',browserSync.reload);
})

gulp.task('minify-css', () => {
  return gulp.src('./app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/minified'));
});
//gulp.task('default',['test']);