title: 开发一个组件
---

## 脚手架

```bash
$ mkdir now
$ cd now
$ yo pandora

```

输出如下：

```bash
     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

don't forget to run spm install after generator is done!
? What is the name of your project? now
? Your project description: 
? Base class that extended by: pandora-widget
   create examples/index.md
   create tests/index-spec.js
   create package.json
   create README.md
   create HISTORY.md
   create Gulpfile.js
   create index.js
   create .editorconfig
   create .spmignore
   create .jshintrc
   create .gitignore
   create .travis.yml
   create LICENSE-MIT
please run spm install and npm install!
```

此时已成功创建一个叫 now 的组件, 默认继承 pandora-widget

## 安装依赖

```bash
$ spm install
$ cnpm install
```

然后安装 moment 依赖

```
$ spm install moment --save
```

## 开发

编辑 index.js

```javascript
'use strict';

var Widget = require('pandora-widget');
var moment = require('moment');

var Now = Widget.extend({

  defaults: {
    container: null
  },

  setup: function() {
    this.option('content', '此时：' + moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
    this.render();
  },

  year: function() {
    return moment().year();
  }

});

module.exports = Now;

```

编辑 `examples/index.md`:

<pre>
# Demo

---
<style type="text/css">
  .widget {
    border: 1px solid #ccc;
    padding: 10px;
  }
</style>
## Normal usage

### HTML

````html
<div id="example" class="widget"></div>
````

### JavaScript

````javascript
var Now = require('./index');
new Now({
  element: '#example'
});
````
</pre>

## 本地调试

执行 `spm doc` 开启一个文档服务 127.0.0.1:8000 ：

```bash
$ spm doc
```

然后在浏览器里打开 [http://127.0.0.1:8000/examples/](http://127.0.0.1:8000/examples/) 即可看到结果。

你可以在 Markdown 文件里用 3 个 &#96; 来引用代码，也可以用 4 个 &#96;。

这是一条特殊规则，引用的代码首先会高亮显示，然后还会被插入一个 script 标签来同步执行。这一点非常有用，在调试 demo 的同时，还可以写出优雅的文档。

如果想在 demo 中插入 iframe，需声明代码为 frame 类型：

<pre>
````iframe:600
I am in a iframe of 600px high
````
</pre>

如果不想用 `spm doc` 来调试代码，你还可以试试 spm server 来调试开发模式下的 CommonJS 代码。

## 添加测试用例

编辑测试文件 `tests/index-spec.js`，我们默认引用了一个断言方案 [expect.js](http://spmjs.io/package/expect.js) 。

```javascript
var expect = require('expect.js');
var Now = require('../index');

describe('now', function() {

  it('normal usage', function() {
    var now = new Now({container: 'body'});

    expect(now.year()).to.be(2015);
  });

});

```

看看测试结果：

```bash
$ spm test
```

{% img /docs/setup/now-test.png %}

你也可以在浏览器里打开 [http://127.0.0.1:8000/tests/runner.html](http://127.0.0.1:8000/tests/runner.html) 查看结果。

此外，还可以打开 `coverage/lcov-report/index.html` 查看测试覆盖率。

## 发布

现在你已拥有一个包含完整功能和完善测试用例的组件里，尝试把他发布到内部的 spmjs 源。

```bash
$ spm publish
```

## 文档

内部 spmjs 源, 可以托管组件文档。你只需要编辑 README.md 和 examples 目录，通过 spm doc watch 预览，然后发布.

```bash
$ spm doc publish
```

最新版文档的 url 是 http://10.5.121.139:3001/docs/&lt;name&gt;/latest ，也可以通过 http://10.5.121.139:3001/docs/&lt;name&gt;/&lt;version&gt;/ 访问到所有版本。

比如：http://10.5.121.139:3001/docs/now/latest 。
