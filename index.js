/**
 * 控制台日志清除
 *      - 重写console.log后，仍然可以追踪文件位置
 *      - 实现本地开发日志打印，上线后不用逐个删除
 * 
 * author: jyjin
 * date:   2019-12-04
 * 
 * @env: 环境变量 process.env.ENV
 * @envCompare: 环境变量 process.env.ENV 匹配的值
 * @keygen: 预留的开关值
 */
exports.consoleLogOverwrite = function (envName, envValue, keygen) {

  if (envName === envValue) {
    sessionStorage.removeItem('__debugger')
  } else {
    sessionStorage.setItem('__debugger', keygen)
  }

  var getStackTrace = function () {
    var obj = {};
    Error.captureStackTrace(obj, getStackTrace);
    return obj.stack;
  };
  var log = console.log;
  console.log = function () {

    if (sessionStorage.getItem('__debugger') !== keygen) {
      return
    }
    var stack = getStackTrace() || ""
    var matchResult = stack.match(/\(.*?\)/g) || []
    var line = matchResult[1] || ""
    for (var i in arguments) {
    }
    if (typeof arguments[i] == 'object') {
      arguments[i] = JSON.stringify(arguments[i])
    }
    arguments[i] += '\t\t\t\t\t\t\t\t\t\t\t' + line.replace("(", "").replace(")", "")
    log.apply(console, arguments)

  };
}

// 调用 正式环境屏蔽日志
// consoleLogOverwrite(process.env.envName, 'production', '123')






// 方法一
//      验证可行
//      但是无法在控制台追踪源代码位置
//      所有位置都会定位到本文件的 oriLogFunc.call(console, ...arguments); 这一行
// 
// console.log = (function (oriLogFunc) {
//   return function () {
//     console.info('hh')
//     //判断配置文件是否开启日志调试
//     if (sessionStorage.getItem('__debugger') === '__h5customer') {
//       try {
//         oriLogFunc.call(console, ...arguments);
//       } catch (e) {
//         console.error('console.log error', e);
//       }
//     }
//   }
// })(console.log);

