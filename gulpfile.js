const  {src,dest,watch,series,parallel} = require('gulp');
const htmlClean = require('gulp-htmlclean');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const debug = require('gulp-strip-debug');
const less = require('gulp-less');
const cssClean = require('gulp-clean-css');
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const connect = require('gulp-connect');


const folder = {
    src:'src/',
    dist:'dist/'
}

let devMode = process.env.NODE_ENV == 'development'
// export NODE_ENV=development  设置环境变量
console.log(devMode)

// gulp.task('default',() => {
//     console.log(123)
// })
// gulp.task('html',function(){
//     gulp.src(`${folder.src}html/*`)
//         .pipe(gulp.dest(`${folder.dist}html/`))
// })

function html(){
    const page = src(`${folder.src}html/*`)
            .pipe(connect.reload());
            if(!devMode){
                page.pipe(htmlClean());
            }
            page.pipe(dest(`${folder.dist}html/`));
    return page
}

function css(){
   const page = src(`${folder.src}css/*`)
            .pipe(connect.reload())     
            .pipe(less())
            .pipe(postCss([autoprefixer()]));
            if(!devMode){
                page.pipe(cssClean());
            }
            page.pipe(dest(`${folder.dist}css/`));
    return page;
}

function js(){
    const page = src(`${folder.src}js/*`)
            .pipe(connect.reload());
            if(!devMode){
                page.pipe(debug())
                .pipe(uglify());
            }
            page.pipe(dest(`${folder.dist}js/`))
    return page;
}

function image(){
    return src(`${folder.src}image/*`)
            // .pipe(imageMin())
            .pipe(dest(`${folder.dist}/image`))
}

function server (){
    return connect.server({
        port:'8888',
        livereload:true
    })
}

function watching(){
    watch([`${folder.src}html/*`],html)
    watch([`${folder.src}css/*`],css)
    watch([`${folder.src}js/*`],js)
}



// gulp.task('default',['html'])
// gulp.task('default',gulp.series('html'));
exports.default = series(html,css,js,image,parallel(watching,server))




// gulp.src()
// gulp.dest()
// gulp.task()
// gulp.watch()