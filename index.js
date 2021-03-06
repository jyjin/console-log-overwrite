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
    if (sessionStorage.getItem('__debugger') === keygen) {
      // 测试后门
    } else {
      sessionStorage.removeItem('__debugger')
    }
  } else {
    sessionStorage.setItem('__debugger', keygen)
  }

  var getStackTrace = function () {
    var obj = {};
    if (Error && Error.captureStackTrace) {
      Error.captureStackTrace(obj, getStackTrace);
      return obj.stack;
    } else {
      // 排除火狐不兼容
      return null
    }
  };
  var log = console.log;
  console.log = function () {

    if (sessionStorage.getItem('__debugger') !== keygen) {
      return
    }
    var argsArr = []
    for (var i = 0; i < arguments.length; i++) {
      argsArr.push(arguments[i])
    }

    var stack = getStackTrace() || ""
    if (!stack) {
      log.apply(console, argsArr)
      return
    }
    var matchResult = stack.match(/\(.*?\)/g) || []
    var line = matchResult[1] || ""
    log.apply(console, argsArr.concat(['\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + line.replace("(", "").replace(")", "")]))

  };
}

// 调用 正式环境屏蔽日志
// consoleLogOverwrite(process.env.envName, 'production', '123')
