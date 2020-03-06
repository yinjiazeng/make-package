##  介绍
生成package.json小工具

## 安装
```sh
yarn global add make-package
```

## 使用
配置默认值
```sh
mpkg temp set version 1.0.0
mpkg temp set author username@email.com
mpkg temp set license MIT
```

初始化
```sh
mpkg init packageName
```

生成package.json
```
{
  "name": "packageName",
  "version": "1.0.0",
  "license": "MIT",
  "author": "username@email.com"
}
```

修改
```sh
mpkg set description balabala...
```

更新后package.json
```
{
  "name": "packageName",
  "version": "1.0.0",
  "license": "MIT",
  "author": "username@email.com",
  "description": "balabala..."
}
```
