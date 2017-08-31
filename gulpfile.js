var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell');

var jsFiles = ['*.js', 'src/**/*.js'];

var localtunnelCommand = 'lt --port ' + 3000 + ' --subdomain ampmlstokes';

gulp.task('lt', shell.task([
  localtunnelCommand
]));

gulp.task('style', function () {
    return gulp.src(jsFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css',
                              './public/js/*.js'],
                              {read: false});
    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.html')
      .pipe(wiredep(options)) //this is for the bower inject
      .pipe(inject(injectSrc, injectOptions))
      .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});
