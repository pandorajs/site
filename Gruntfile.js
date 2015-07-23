module.exports = function(grunt){

  var allOpts = (function() {
    var mods = [
        'class',
        'events',
        'base',
        'widget',
        'overlay',
        'dialog',
        // 'select',
        'validate'
      ];
    var gitclone = {};
    var pkgs = {options: {}};
    var yuidoc = {};
    var copy = {};

    mods.forEach(function(mod, index) {
      gitclone[mod] = {
        options:{
          repository: 'https://github.com/pandorajs/' + mod + '.git',
          branch: 'master',
          directory: 'tmp/' + mod
        }
      };

      pkgs.options[mod] = 'tmp/' + mod + '/package.json';

      yuidoc[mod] = {
        name: '<%= ' + mod + '.name %>',
        description: '<%= ' + mod + '.description %>',
        version: '<%= ' + mod + '.version %>',
        options: {
          paths: 'tmp/' + mod + '/src',
          outdir: 'tmp/' + mod + '-out'
        }
      };

      copy[mod] = {
        src: 'tmp/' + mod + '-out/data.json',
        dest: 'source/_yuidoc/' + mod + '.json'
      };

    });


    return {
      gitclone: gitclone,
      pkgs: pkgs,
      yuidoc: yuidoc,
      copy: copy
    };
  })();

  grunt.initConfig({
    gitclone: allOpts.gitclone,
    read_pkg: allOpts.pkgs,
    yuidoc: allOpts.yuidoc,
    copy: allOpts.copy,
    clean: {
      tmp: ['tmp'],
      yuidoc: ['source/_yuidoc']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('tasks');

  grunt.registerTask('local', ['gitclone', 'read_pkg', 'yuidoc', 'copy']);

  grunt.registerTask('default', ['gitclone', 'read_pkg', 'yuidoc', 'copy', 'clean:tmp']);
};
