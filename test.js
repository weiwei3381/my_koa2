// 在另一个函数中利用async/await关键字使用try/catch捕获异常
async function func2() {
  try {
    await func3()
  } catch (error) {
    console.log('error')
  }
}

// 自己创建一个promise
function func3() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const r = Math.random()
      // 随机抛出异常
      if (r > 0.5) {
        reject('error')
      } else {
        resolve('success')
      }
    }, 1000)
  })
}

func2() // 调用函数执行
