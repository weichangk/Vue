export function debounce(func, delay) {
  let timer = null
  //...可以传入多个参数
  return function (...args) {
    //延时delay时间后不被再次调用才执行调用
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
