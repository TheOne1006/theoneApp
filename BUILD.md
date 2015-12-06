## 创建过程

### 1. 初始化

```
$ ionic start myApp tabs
$ cd myApp
```

### 2. 目录结构调整

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


### 3.工具调整-gulp

1. gulp 
  * 引入 require-dir ,方便引入 gulp_tasks 分离 gulp 配置文件
  * 在 gulp_tasks中的文件相对路径依然是 `/`下
2. gulp-wiredep
  * grunt 中的wirdep
3. gulp-rev 混合 js代码
4. gulp-usemin 替换混合后的js
5. gulp-rename 替换
6. gulp-clean 清理
7. run-sequence 并行和串行执行
8. browser-sync 浏览器