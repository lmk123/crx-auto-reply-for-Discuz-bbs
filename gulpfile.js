/**
 * 实验阶段，准备用来替代 grunt。
 */
var gulp    = require( 'gulp' ) ,
minifyJSON  = require( 'gulp-jsonmin' ) ,
minifyJS    = require( 'gulp-uglify' ) ,
minifyCSS   = require( 'gulp-minify-css' ) ,
minifyImage = require( 'gulp-imagemin' ) ,
minifyHTML  = require( 'gulp-htmlmin' ) ,
changed     = require( 'gulp-changed' ) ,
deleteFile  = require( 'del' ) ,

SRC         = 'src' ,
DIST        = 'build' ,

paths       = {

    otherJsFiles : [
        SRC + '/**/*.js'
    ] ,

    jsonFiles : SRC + '/**/*.json' ,

    cssFiles : [ SRC + '/**/*.css' ] ,

    htmlFiles : SRC + '/**/*.html' ,

    imageFiles : SRC + '/**/*.{png,jpg,gif}' ,

    copyFiles : [ SRC + '/**/*' , '!' + SRC + '/**/*.{js,css,html,json}' ]
};

function clean( cb ) {
    deleteFile( DIST , cb );
}

function js() {
    return gulp.src( paths.otherJsFiles )
        .pipe( changed( DIST ) )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DIST ) );
}

function css() {
    return gulp.src( paths.cssFiles )
        .pipe( changed( DIST ) )
        .pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );
}

function html() {
    return gulp.src( paths.htmlFiles , { base : SRC } )
        .pipe( changed( DIST ) )
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DIST ) );
}

function json() {
    return gulp.src( paths.jsonFiles )
        .pipe( minifyJSON() )
        .pipe( gulp.dest( DIST ) );
}

function copy() {
    return gulp.src( paths.copyFiles )
        .pipe( changed( DIST ) )
        .pipe( gulp.dest( DIST ) );
}

gulp.task( clean );

gulp.task( js );

gulp.task( css );

gulp.task( html );

gulp.task( copy );

gulp.task( json );

gulp.task( 'default' , gulp.parallel( js , json , css , html , copy ) );
