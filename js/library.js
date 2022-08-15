$(function () {
  function getBooksList() {
    $.get('http://www.liulongbin.top:3006/api/getbooks', function (res) {
      if (res.status == 200) {
        // data.forEach 原生
        // let data = res.data
        // data.forEach((value, index) => {
        //   let tr = $('<tr></tr>')
        //   tr.append(`<td>${value.id}</td><td>${value.bookname}</td><td>${value.author}</td><td>${value.publisher}</td><td><a href='javascript:;'>删除</a></td>`)
        //   $('tbody').append(tr)
        // });
        let row = []
        $.each(res.data, function (ename, val) {
          row.push(`<tr><td>${val.id}</td><td>${val.bookname}</td><td>${val.author}</td><td>${val.publisher}</td><td><a href='javascript:;' class='del' data-id='${val.id}'>删除</a></td></tr>`)
        })
        $('#tb').empty().append(row.join(''))
      } else {
        return alert('获取数据失败')
      }
    })
  }
  getBooksList()
  // 删除功能
  $('#tb').on('click', '.del', function () {
    // $(this).parents('tr').remove() // 只删除了页面节点
    let id = $(this).attr('data-id')
    $.get('http://www.liulongbin.top:3006/api/delbook', { id: id }, function (res) {
      if (res.status !== 200) return alert('删除图书失败！')
      getBooksList()
    })
  })
  // 添加功能
  $('.addBtn').on('click', function () {
    let bookname = $.trim($('.bookName').val());
    let author = $.trim($('.author').val());
    let publisher = $.trim($('.publisher').val());
    if(bookname.length<=0||author.length<=0||publisher<=0) return alert('请填完全部信息！')
    $.post('http://www.liulongbin.top:3006/api/addbook', {
      bookname: bookname,
      author: author,
      publisher: publisher
    }, function (res) {
      if (res.status !== 201) return alert('添加失败！')
      getBooksList()
      $('.form-control').val('')
    })
    alert('添加成功！')
  })
})