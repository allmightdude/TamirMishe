const { gulp, dest, task, watch, parallel, series, src } = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const env = require("gulp-env");

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

function setEnv() {
  // read the env file
  env.set({ file: "env.json" });
  // set the web url based on the node environment
  switch (process.env.NODE_ENV) {
    case "dev":
      process.env.WEBAPP_URL = process.env.dev.WEBAPP_URL;
      break;
    case "prod":
      process.env.WEBAPP_URL = process.env.prod.WEBAPP_URL;
      break;
    case "prod:test":
      process.env.WEBAPP_URL = process.env["prod:test"].WEBAPP_URL;
      break;
    case "prod:demo":
      process.env.WEBAPP_URL = process.env["prod:demo"].WEBAPP_URL;
      break;
    default:
      process.env.WEBAPP_URL = "http://localhost:3000";
  }
}

task("serve", serve);
task("scss", scss);
task("setEnv", setEnv);

task("default", parallel(setEnv , serve, scss));
