let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')
let htmlmin = require('gulp-htmlmin')
let htmlclean = require('gulp-htmlclean')
let babel = require('gulp-babel') /* 转换为es2015 */
let uglify = require('gulp-uglify')
let imagemin = require('gulp-imagemin')

// 设置根目录
const root = './public'

// 匹配模式， **/*代表匹配所有目录下的所有文件
const pattern = '**/*'

// 压缩html
gulp.task('minify-html', function () {
    return gulp
        // 匹配所有 .html结尾的文件
        .src(`${root}/${pattern}.html`)
        .pipe(htmlclean())
        .pipe(
            htmlmin({
                removeComments: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            })
        )
        .pipe(gulp.dest('./public'))
})

// 压缩css
gulp.task('minify-css', function () {
    return gulp
        // 匹配所有 .css结尾的文件
        .src(`${root}/${pattern}.css`)
        .pipe(
            cleanCSS({
                advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀            
            })
        )
        .pipe(gulp.dest('./public'))
})

// 压缩js
gulp.task('minify-js', function () {
    return gulp
        // 匹配所有 .js结尾的文件
        .src([`${root}/${pattern}.js`, `!${root}/${pattern}.min.js`])
        .pipe(
            babel({
                presets: ['@babel/preset-env']
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest('./public'))
})

// 压缩图片
gulp.task('minify-images', function () {
    return gulp
        // 匹配public/images目录下的所有文件
        .src(`${root}/images/${pattern}`)
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true, optimizationLevel: 5 }),
                    imagemin.mozjpeg({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 7 }),
                    imagemin.svgo()
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest('./public/images'))
})

gulp.task('default', gulp.series(gulp.parallel('minify-html', 'minify-images', 'minify-css', 'minify-js')))
