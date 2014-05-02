var links = {
  "class": 'https://github.com/pandorajs/class',
  events: 'https://github.com/pandorajs/events',
  base: 'https://github.com/pandorajs/base',
  widget: 'https://github.com/pandorajs/widget',
  overlay: 'https://github.com/pandorajs/overlay',
  validate: 'https://github.com/pandorajs/validate',
  dialog: 'https://github.com/pandorajs/dialog',
  "select": 'https://github.com/pandorajs/select',
};

var rTmpDir = /^tmp\/(\w+)\//;

hexo.extend.helper.register('github_link', function(data){
  var name = data.file.match(rTmpDir)[1];

  if (name === 'hexo') name = 'index';

  var path = data.file.replace(rTmpDir, ''),
    line = data.line,
    version = this.site.yuidoc.findByName(name);
  if (version) {
    version = version.project.version;
  } else {
    version = 'master';
  }
  // 直接查看 master 代码
  return '<a href="' + links[name] + '/blob/master/' + path + '#L' + line + '">' + path + ':' + line + '</a>';
});

hexo.extend.helper.register('item_flags', function(data){
  var result = '';

  ['static', 'chainable', 'async', 'final'].forEach(function(i){
    if (data[i]) result += '<span class="api-item-flag ' + i + '">' + i + '</span>';
  });

  return result;
});