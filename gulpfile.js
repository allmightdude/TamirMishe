const {gulp , dest , task , watch , parallel , series, src } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));


function serve(){
    browserSync.init({
        server : {
            baseDir : "./app"
        }
    })
    watch(['./app/scss/**/*.scss'] , scss)
    watch('./app/css/*.css').on('change' , browserSync.reload)
    watch('./app/js/*.js').on('change' , browserSync.reload)
    watch("./app/**/*.html").on('change', browserSync.reload)
}

function scss(done){
    src('./app/scss/**/*.scss')
    .pipe(sass().on('error' , sass.logError))
    .pipe(dest('./app/css/'))
    done();
}

task('serve' , serve);
task('scss' , scss);

task('default' , parallel(serve , scss));