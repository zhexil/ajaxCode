
/**
 * 处理 data 参数
 * @param {*} data 需要发送到服务器的数据
 * @returns{string} 返回拼接好的查询字符串 name=zs&age=10
 */
function resolveData(data) {
  let arr = []
  for (let k in data) {
    arr.push(`${k}=${data[k]}`)
  }
  return arr.join('&')
}
// let str = resolveData(['pink', 'bule', 'red'])
// let objstr = resolveData({ oname: 'andy', age: 18 })
// // 0=pink&1=bule&2=red
// console.log(str);
// // oname=andy&age=18
// console.log(objstr);
/**
 * 
 * @param {*} options 服务器传过来的对象参数
 */
function ahAjax(options) {
  let xhr = new XMLHttpRequest()
  let qs = resolveData(options.data)
  // 设置超时时间
  xhr.timeout = 200
  xhr.ontimeout = function (event) {
    alert('请求超时！')
  }
  if (options.method.toUpperCase() === 'GET') {
    // 发起 GET 请求
    xhr.open(options.method, options.url + '?' + qs)
    xhr.send()
  } else if (options.method.toUpperCase() === 'POST') {
    // 发起 POST 请求
    xhr.open(options.method, options.url)
    // 这个content-type格式记不住，可以取postman发送请求界面的body找到
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(qs)
  }
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let res = JSON.parse(xhr.responseText)
      // success就是回调函数，当请求成功后需要执行的函数
      options.success(res)
    }
  })
}