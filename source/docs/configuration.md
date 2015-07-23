title: 工具配置
---


> 本文章会帮助你安装 Pandora 配套的工具，包括 spm 和 git。

## 安装 Node

`Node.js` 支持 >= 0.10.29, 建议安装 >= 0.12.0

### osx, linux 环境

```bash
$ git clone git@github.com:creationix/nvm.git ~/.nvm
$ source ~/.nvm/nvm.sh
# 安装
$ nvm install v0.12.0
# 显示当前本地安装的所有 Node.js
$ nvm ls 
# 显示服务器所有可用的 Node.js
$ nvm ls-remote
# 本地可用的 Node.js 中使用 0.12.0
$ nvm use 0.12.0
# 设置每次启动默认版本
$ nvm alias default 0.12.0
```

### window 环境

这里假设大家都使用 `d:\git` 目录存放 git 项目。

```bash
$ d:
$ cd git
$ git clone git@github.com:nanjingboy/nvmw.git
# 设置 d:\git\nvmw 墓道到 PATH 环境变量
$ set "PATH=d:\git\nvmw;%PATH%"
# 安装
$ nvmw install 0.12.0
# 显示当前本地安装的所有 Node.js
$ nvmw ls 
# 显示服务器所有可用的 Node.js
$ nvmw ls-remote
# 本地可用的 Node.js 中使用 0.12.0
$ nvmw use 0.12.0
# 设置每次启动默认版本
$ nvmw switch 0.12.0
```

### node-gyp 编译环境配置 (可选)

https://github.com/TooTallNate/node-gyp#installation

## 安装 spm

Panodra 已经全面迁移到 [spm3](http://10.5.121.139:3001) 的体系上。

```bash
$ npm install spm -g
```

## 安装 generator-pandora

我们采用了 yeoman 来生成 pandora 组件，没有用 spm init 来初始

```bash
$ npm install yo generator-pandora -g
```

---

好，安装工作完成！
