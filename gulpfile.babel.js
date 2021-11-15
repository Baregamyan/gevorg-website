// import babel from 'gulp-babel';
import { src, dest, series, parallel } from 'gulp';
import { readFileSync } from 'fs';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import rev from 'gulp-rev';
import revRewrite from 'gulp-rev-rewrite';
import paths from 'vinyl-paths';
import del from 'del';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import webp from 'gulp-webp';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
import svgmin from 'gulp-svgmin';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import terser from 'gulp-terser';
import buffer from 'vinyl-buffer';
import htmlValidator from 'gulp-html';

/*
  Tasks
*/
export const revision = () => src([
  'dist/fonts/*.woff2',
  'dist/fonts/*.woff',
  'dist/images/**/*.{svg,png,jpg,webp}',
  'dist/styles/styles.css',
  'dist/scripts/scripts.js',
], {
  base: 'dist',
})
  .pipe(paths(del))
  .pipe(rev())
  .pipe(dest(('dist/')))
  .pipe(rev.manifest())
  .pipe(dest('dist/'));

export const rewrite = () => {
  const manifest = readFileSync('dist/rev-manifest.json');
  return src('dist/*.html')
    .pipe(revRewrite({ manifest }))
    .pipe(dest('dist/'));
};

export const styles = () => src('dist/styles/styles.css')
  .pipe(postcss([
    require('postcss-import'),
    require('postcss-color-hex-alpha'),
    require('autoprefixer'),
    require('postcss-csso'),
  ]))
  .pipe(dest('dist/styles/'));

export const images = () => src('dist/images/**/*')
  .pipe(imagemin([
    imageminPngquant({ quality: [0.2, 0.8] }),
    imageminMozjpeg({ quality: 85 }),
  ]))
  .pipe(dest('dist/images/'))
  .pipe(webp({ quality: 85 }))
  .pipe(dest('dist/images/'));

export const sprite = () => {
  const config = {
    svg: {
      namespaceClassnames: false,
    },
    mode: {
      stack: {
        sprite: '../sprite.svg',
      },
    },
  };
  return src('src/images/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('[style]').removeAttr('style');
        $('[viewbox]').removeAttr('viewbox');
        $('[stroke]').removeAttr('stroke');
        $('[stroke-width]').removeAttr('stroke-width');
        $('[stroke-linecap]').removeAttr('stroke-linecap');
      },
    }))
    .pipe(svgmin())
    .pipe(dest('src/includes/'));
};

export const scripts = () => {
  const options = { input: 'src/scripts/index.js', format: 'umd' };
  return rollup(options)
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(terser())
    .pipe(dest('dist/scripts/'));
};

export const html = () => src('dist/**/*.html')
  .pipe(htmlValidator());

export const clean = () => del('dist/');

export const hashe = series(
  revision,
  rewrite
);

export const build = series(parallel(styles, images, scripts), hashe);
