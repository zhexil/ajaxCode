$(function () {
  // 定义一个格式化时间的过滤器 dateFormat 如下：
  template.defaults.imports.dateFormat = function (dateStr) {
    let date = new Date(dateStr)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = makeUpZero(m)
    let d = makeUpZero(date.getDate())
    let hh = makeUpZero(date.getHours())
    let mm = makeUpZero(date.getMinutes())
    let ss = makeUpZero(date.getSeconds())
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}` // 注意，过滤器最后一定要 return 一个值
  }
  // 获取新闻列表
  function getNewsList() {
    $.get('http://www.liulongbin.top:3006/api/news', function (res) {
      if (res.status !== 200) return alert('获取新闻列表失败')
      // for(let i = 0;i<res.data.length;i++){
      //   // 把每一项tags 属性从字符串转为数组
      //   res.data[i].tags = res.data[i].tags.split(',')
      // }
      // 调用模板
      let htmlstr = template('tpl-user', res)
      $('#news-list').html(htmlstr)
    })
  }
  getNewsList();
  function makeUpZero(para) {
    return para >= 10 ? para : '0' + para
  }
})