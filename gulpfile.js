const {gulp , dest , task , watch , parallel , series, src } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));


function serve(){
    browserSync.init({
        server : {
            baseDir : "./app"
        }
    })
    watch(['./app/assets/styles/**/*.scss'] , scss)
    watch('./app/assets/styles/*.css').on('change' , browserSync.reload)
    watch('./app/assets/scripts/*.js').on('change' , browserSync.reload)
    watch("./app/**/*.html").on('change', browserSync.reload)
}

function scss(done){
    src('./app/assets/styles/**/*.scss')
    .pipe(sass().on('error' , sass.logError))
    .pipe(dest('./app/assets/css'))
    done();
}

task('serve' , serve);
task('scss' , scss);

task('default' , parallel(serve , scss));