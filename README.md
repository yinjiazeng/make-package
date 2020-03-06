
[![NPM version](https://img.shields.io/npm/v/make-package)](https://npmjs.org/package/make-package)
[![NPM downloads](https://img.shields.io/npm/dm/make-package)](https://npmjs.org/package/make-package)

##  介绍
`make-package` 是可以生成和编辑 `package.json`
的命令行小工具，可以对其配置通用模板，后期你所创建的包都可以使用这个模板，避免了不必要的重复劳动。

## 安装

#### npm
```sh
npm i -g make-package
```

#### yarn
```sh
yarn global add make-package
```

## 使用
#### 设置模板
```sh
mpkg temp set version 1.0.0
mpkg temp set author username@email.com
mpkg temp set license MIT
mpkg temp set files lib -a
mpkg temp set repository.type git
```

### 初始化
```sh
mpkg init packageName
```
生成package.json
```json
{
  "name": "packageName",
  "version": "1.0.0",
  "license": "MIT",
  "author": "username@email.com",
  "files": [
    "lib"
  ],
  "repository": {
    "type": "git"
  }
}
```

#### 增加字段
```sh
mpkg set description balabala...
mpkg set repository.url https://github.com/yinjiazeng/make-package.git
mpkg set files.1 pkg
```
更新package.json
```json
{
  "name": "packageName",
  "version": "1.0.0",
  "license": "MIT",
  "author": "username@email.com",
  "description": "balabala...",
  "files": [
    "lib",
    "pkg"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/yinjiazeng/make-package.git"
  }
}
```

#### 删除字段
```sh
mpkg del files.0
mpkg del repository.url
mpkg del description
```
更新package.json
```json
{
  "name": "packageName",
  "version": "1.0.0",
  "license": "MIT",
  "author": "username@email.com",
  "files": [
    "pkg"
  ],
  "repository": {
    "type": "git"
  }
}
```

#### 清除字段
```sh
mpkg clear
```
更新package.json
```json
{}
```

## 许可证
MIT

## 捐赠
如果觉得 `make-package` 对您有帮助，或者想请作者喝一杯咖啡的话，欢迎给我[捐赠](https://github.com/yinjiazeng/donate)。
