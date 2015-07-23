title: 迁移 spm2 的模块到 spm3
---

## DEMO

以 [anima-widget](https://github.com/animajs/widget/tree/commonjs) 为例。

* [commit diff](https://github.com/animajs/widget/commit/024defa162c5cac80d440e6c8bfbea9de8ce375d?w=1)

## 迁移步骤

### 安装 spm3

```bash
$ npm install spm -g
```

### 修改 package.json

1. 合并 family 到 name，例如：

  ```diff
  - "name": "widget",
  - "family": "anima"
  + "name": "anima-widget"
  ```

  spm@3.x 中不再有 family，和 npm 一样我们使用唯一的 name 占坑的方式组织模块。

  以上是 Arale 等模块的迁移逻辑，形式统一且避免冲突。如果没有被占用，你当然可以直接使用原来的 name 。
    
2. 修改 spm.output 为 spm.main，注意 spm.main 需为字符串

  ```diff
  - "output": ["src/widget.js"]
  + "main": "src/widget"
  ```
  
  这里更推荐的做法是在根目录建立 `index.js`，package.json 里设 `"main": "index.js"`，然后 index.js 里 `module.exports = require("./src/widget");`
    
3. 修改 spm.alias 为 spm.dependencies，注意 dependencies 的格式为 `"{{name}}": "{{version}}"`

  ```diff
  - "alias": { "base": "anima/base/1.1.0/base" }
  + "dependencies": { "anima-base": "1.1.0" }
  ```

4. 如果原来有使用 jQuery，修正原来 require('$') 的写法为 require('jquery')，并在依赖中指明 jquery 版本号，建议为 1.7.2 。

  ```diff
  "dependencies": { 
  + "jquery": "1.7.2"
  }
  ```

### 修改源文件，通常只要做两点修改

1. 去 define 封装，采用 CommonJS 的书写规范。

  ```diff
  - define(function(require, module, exports) {
    ...
  - });
  ```

2. 如果有依赖其他 package，注意下依赖的 package 是否有修改 **name**，比如：

  ```diff
  - var base = require('base');
  + var base = require('anima-base');
  ```

3. spm install 安装依赖，然后运行 spm doc watch 并打开 http://127.0.0.1:8000/ ，确保文档和演示都能正确显示。

### 修改 tests 目录里的用例文件

1. 去 define 封装

  ```diff
  - define(function(require, module, exports) {
    ...
  - });
  ```

2. 修改 require 的绝对地址为相对地址。

3. 添加 expect 依赖到 devDependencies 中。

  ```diff
  "spm": {
    "devDependencies": {
  +   "expect.js": "0.3.1"
    }
  }
  ```

4. 运行 spm test 确保用例测试通过。

5. 运行 spm doc watch 并打开 http://127.0.0.1:8000/tests/runner.html ，确保用例跑过。

### 删除和忽略部分目录

1. 删除 dist 目录，构建后的文件不再存在源码中

2. 增加 .spmignore 文件，参考[这个](https://github.com/spmjs/spm/blob/a778d60b0b14ed83734900041ddab08e472cb5b1/lib/template/.spmignore)。

### spm 发布

```bash
# 发布
$ spm publish
```

## 参考链接

* [spm@3x package.json 详解](http://spmjs.io/documentation/package.json)
* [spm@3x difference From spm@2.x](http://spmjs.io/documentation/difference-from-2.x)
* [spm@3x 官网](http://spmjs.io/)
* [spm@3.0 和 spmjs.org 的未来](https://github.com/spmjs/spm/issues/718)
