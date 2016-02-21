'use strict';

module.exports = function (grunt) {

    grunt.config.init({
         eslint: {
             target: ['src/*.jsx']
         },
         csslint: {
             src: ['src/css/*.css']
         },
         babel: {
             options: {
                 sourceMap: true
             },
             dist: {
                 files: [
                     {
                         expand: true,
                         cwd: 'src/',
                         src: ['*.jsx'],
                         dest: 'dist/',
                         ext: '.js'
                     }
                 ]
             }
         },
         watch: {
             babel: {
                 files: ['src/*.jsx'],
                 tasks: ['babel']
             }
             //css: {
             //    files: ['src/css/*.css'],
             //    tasks: ['csslint']
             //}
         }
     });

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('check', ['eslint', 'csslint']);
    grunt.registerTask('default', ['babel']);
};
