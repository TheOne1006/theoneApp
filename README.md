# theOne.io 个人网站同步 APP

个人爱好,欢迎指正

## 安装

### ios 真机测试准备
1. 确保系统安装xcode
2. 安装全局 ios-sim
3. xcode 支持ios版本,是否含有目标测试机的版本

使用 ionic 安装步骤

全局环境  
ionic v1.1.1
cordova v5.4.0


```bash
$ ionic start myApp tabs
$ cd myApp
$ ionic platform add ios

$ ionic build ios
$ ionic emulate ios
```

安装到真机

```bash
npm install -g ios-deploy (安装工具)
```

```shell
ionic run ios --device
```

## 目录结构

```
|- hooks/*            (ionic初始化)
|- node_modules
|- platforms          (ionic初始化)
|- plugins            (ionic初始化)
|- resources          (ionic初始化 系统资源图片)
|- scss
|- www                (ionic 初始化,主要编写目录)

|- app/               (用于gulp 工作生成, www 作为dest目录)
|-    /lib            (bower 项目目录)
|- gulp_tasks/
|- www_init/          (原始www)
```



## 构建工具

1. gulp

2. karma

## 特色

1. 随机loading 效果
2. 白天/夜间模式
3. 收藏/搜索


### 问题
