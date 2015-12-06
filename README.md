# theOne.io 个人网站同步 APP

个人爱好,欢迎指正

## 安装

使用 ionic 安装步骤

```bash
$ ionic start myApp tabs
$ cd myApp
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
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

