/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

    grunt.initConfig({
        responsive_images: {
            dev: {
                options: {
                    /* engine: 'im', */
                    sizes: [{
                        name: 'sm',
                        width: '270',
                        // suffix: '_270 1X',
                        quality: 20
                    }, {
                        name: 'med',
                        width: '540',
                        // suffix: '_540 2X',
                        quality: 40
                    }]
                },

                /*
                You don't need to change this part if you don't change
                the directory structure.
                */
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'img/',
                    dest: 'img/'
                }]
            }
        },

        /* Clear out the images directory if it exists */
        /* clean: {
            dev: {
                src: ['img/dist/'],
            },
        }, */

        /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['img/dist/']
                },
            },
        },

        /* Copy the "fixed" images that don't go through processing into the images/directory */
        copy: {
            dev: {
                files: [{
                    expand: true,
                    src: 'img/*.{gif,jpg,png}',
                    dest: 'img/dist/'
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-responsive-images');
    // grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mkdir');
    // grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);
    grunt.registerTask('default', ['mkdir', 'responsive_images']);


};