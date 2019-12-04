## 前端日志控制
### 安装
```
npm install console-log-overwrite --save
```


### 使用
网站初始化前执行如下代码
```
const consoleLogOverwrite = require('console-log-overwrite')

// 当前环境变量为prod，console.log将失效
// dev环境不影响
consoleLogOverwrite(process.env.ENV, 'prod', '123')

```


当生产需要查看日志

```
// 去生产页面，打开控制台console，输入以下代码启用日志
// sessionStorage.setItem('__debugger', '123')
// 刷新页面，日志启用

// 再次关闭日志
// sessionStorage.removeItem('__debugger')
```


