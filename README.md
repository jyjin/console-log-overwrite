# 前端日志控制
## 安装
```
npm install console-log-overwrite --save
```


## 使用



### 当为生产环境时，不打印`console.log`日志

ES5用法
```
const consoleLogOverwrite = require('console-log-overwrite')

consoleLogOverwrite(process.env.ENV, 'prod', '123')
```
> 注意：为确保全局覆盖，重写的调用请放在网站初始化期间

ES6用法
```
import { consoleLogOverwrite } from 'console-log-overwrite'

consoleLogOverwrite(process.env.ENV, 'prod', '123')

```



### 当生产环境需要查看日志

`打开所在页面控制台console`

`输入以下代码启用日志`

```
sessionStorage.setItem('__debugger', '123')
```

`刷新当前页面日志生效`

`输入以下代码再次关闭日志`

```
sessionStorage.removeItem('__debugger')
```

## API

`consoleLogOverwrite(env, envCompare, keygen)`


参数|是否必须|默认值|说明
---|:--:|---:|---
env|Y|无|环境变量
envCompare|Y|无|环境变量
env|Y|无|需要屏蔽的环境变量值，如：'prod'
keygen|内容|无|生产环境需要查看时的秘钥
