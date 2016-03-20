var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    file = require('gulp-file'),
    foreach = require('gulp-foreach'),
    through = require('through2'),
    jeet = require('jeet'),
    rupture = require('rupture'),
    nib = require('nib'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;



function createStyl(outname) {
    var paths = '';  // where we will push the path names with the @import

    var write = function (file, enc, cb) {
        if (file.path != "undefined") {
            paths = paths + '\n' + '@import "' + file.path + '"';
        }
        cb();
    };

    var flush = function (cb) {  // flush occurs at the end of the concating from write()
        gutil.log(gutil.colors.cyan(paths));  // log it

        var newFile = new gutil.File({  // create a new file
            base: __dirname,
            cwd: __dirname,
            path: __dirname + '/' + outname + '.styl',
            contents: new Buffer(paths)  // set the contents to the paths we created
        });

        this.push(newFile);  // push the new file to gulp's stream
        cb();
    };

    return through.obj(write, flush);  // return it
};


// Get one .styl file and render 
gulp.task('stylus', function () {
  
  var options = {
    use: [jeet(), rupture(), nib()]
  };

  gulp.src('./app/stylus/*.styl')
    .pipe(createStyl('screen'))
    .pipe(stylus(options))
    .pipe(gulp.dest('./app/css'))
    .pipe(reload({ stream:true }));
});


// watch files for changes and reload
gulp.task('serve', ['stylus'], function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });

  gulp.watch('app/stylus/*.styl', ['stylus']);
  gulp.watch(['*.html', 'css/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload);
});


gulp.task('default', ['stylus']);