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

## 特色

1. 随机loading 效果
2. 白天/夜间模式
3. 收藏/搜索


### 问题
1. 后台解析 输出信息 如: `mermaid` 减少手机压力?
2. google 代码格式化