$(function () {
  // 防抖的定时器
  let timer = null
  // 全局缓存对象
  let cacheObj = []
  $('#ipt').on('keyup', function () {
    clearTimeout(timer)
    let keywords = $(this).val().trim()
    if (keywords.length <= 0) {
      return $('#suggest-list').empty().hide()
    }
    // 优先从缓存列表中获取搜索建议
    if(cacheObj[keywords]){
      return renderSuggestList(cacheObj[keywords])
    }
    // 获取搜索建议列表
    debounceSearch(keywords)
  })
  // 获取搜索建议列表
  function getSuggestList(kw) {
    $.ajax({
      url: 'https://suggest.taobao.com/sug?q=' + kw,
      dataType: 'jsonp',
      success: function (result) {
        renderSuggestList(result)
      }
    })
  }

  // 渲染建议列表
  function renderSuggestList(res) {
    console.log(res);
    if (res.result.length <= 0) {
      return $('#suggest-list').empty().hide()
    }
    // 渲染模板结构
    let htmlStr = template('tpl-suggestList', res)
    $('#suggest-list').html(htmlStr).show()
    // 将搜索的结果，添加到缓存对象中
    let k = $('#ipt').val().trim()
    cacheObj[k] = res
  }
  // 防抖函数
  function debounceSearch(keywords) {
    timer = setTimeout(function () {
      getSuggestList(keywords)
    }, 500)
  }
})
