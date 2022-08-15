$(function () {

  $('form').submit(function (e) {
    e.preventDefault()
    // 快速得到表单中的数据
    let data = $(this).serialize()
    // username=%E8%9A%A9%E5%B0%A4&content=%E5%A4%8D%E8%8B%8F%E4%BA%86
    // console.log(data);
    $.post('http://www.liulongbin.top:3006/api/addcmt', data, function (res) {
      if (res.status !== 201) return alert('发表评论失败')
      getCmtList()
      $('form')[0].reset()
    })
  })
  // 获取评论列表
  function getCmtList() {
    $.get('http://www.liulongbin.top:3006/api/cmtlist', function (res) {
      if (res.status !== 200) return alert('获取评论列表失败')
      let lis = []
      $.each(res.data, function (ename, value) {
        lis.push(`<li class="list-group-item">
        <span class="badge comtime">评论时间：${value.time}</span>
        <span class="badge compeople">评论人：${value.username}</span>
        ${value.content}</li>`)
      })
      $('ul').empty().append(lis.join(''))
    })
  }

  getCmtList()
})