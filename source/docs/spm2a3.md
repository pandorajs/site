title: spm2 与 spm3 共存方案
---

## 安装脚本

```bash
git clone https://github.com/spmjs/spm ~/.spm3
cd ~/.spm3
cnpm install
ln -sf `pwd`/bin/spm /usr/local/bin/spm3
```

至此，spm -V 应该是 2，spm3 -V 应该是 3 。

## 安装脚本 II

上面的方案是在不影响 spm2 的情况下，安装 spm3，因此 spm -V == 2.x，而 spm3 -V == 3.x

但是对于多数情况下使用 spm3 的用户， 我个人推荐倒过来，默认的 spm -V == 3.x，而 spm2 -V == 2.x，更多的，spm3 -V == 3.x

```bash
git clone -b 2.x --depth 1 https://github.com/spmjs/spm ~/.spm2
cd ~/.spm2
npm install
ln -sf `pwd`/bin/spm /usr/local/bin/spm2
npm install spm -g
ln -sf /usr/local/bin/spm /usr/local/bin/spm3
```

## Windows 环境

Windows下通过clone安装需要自己编写下cmd脚本，把spm3加到PATH环境变量中（假设也是clone到当前用户根目录的.spm3目录，在.spm3/bin目录下将spm更名为spm3，新建spm3.cmd文件，输入以下内容）

```bash
@echo off
set NODE_PATH=C:%HOMEPATH%\.spm3\node_modules
@echo on
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\spm3" %*
) ELSE (
  node  "%~dp0\spm3" %*
)
```

## 插件使用

原有的其他插件和子命令可以保持原来的用法。比如 build :

在 spm2 中使用：

```bash
spm build
```

在 spm3 中使用：

```bash
spm3 build
```

