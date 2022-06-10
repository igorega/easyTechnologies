const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');

const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();

// Clean build
function clear() {
  return src('./build/*', {
    read: false
  })
  .pipe(clean());
}

// BrowserSync
function browserSync() {
  browsersync.init({
    // injectChanges: true,
    server: {
      baseDir: './build/'
    },
    port: 3000
  });
}

// HTML function
function html() {
  const source = './src/pug/*.pug';

  return src(source)
    .pipe(changed(source))
    .pipe(plumber())
    .pipe(pug({pretty: true})) // compilation mode: false, true
    .pipe(dest('./build/'))
    .pipe(browsersync.stream());
}

// CSS function
function css() {
  const source = './src/scss/*.scss';

  return src(source)
    .pipe(changed(source))
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cssnano())
    .pipe(dest('./build/css/'))
    .pipe(browsersync.stream());
}

// JS function
function js() {
  const source = './src/js/*.js';

  return src(source)
    .pipe(changed(source))
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(dest('./build/js/'))
    .pipe(browsersync.stream());
}

// Optimize images
function img() {
  return src('./src/img/*')
    .pipe(newer('./build/img'))
    .pipe(imagemin())
    .pipe(dest('./build/img'));
}

// Watch files
function watchFiles() {
  watch(['./src/pug/*', './src/pug/**/*'], html);
  watch(['./src/scss/*', './src/scss/**/*'], css);
  watch(['./src/js/*', './src/js/**/*'], js);
}

// Tasks
exports.build = series(clear, parallel(html, css, js, img));
exports.default = parallel(html, css, js, img, browserSync, watchFiles);
