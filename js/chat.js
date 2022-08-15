
(function () {
  $(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    // 发送按钮绑定事件
    $('#btnSend').on('click', function () {
      let text = $('#ipt').val().trim()
      if (text.length <= 0) return $('#ipt').val('')
      // 将用户输入的内容显示在聊天窗口中
      $('.talk_list').append(`<li class="right_word">
      <img src="img/chatImg/person02.png" /> <span>${text}</span></li>`)
      // 重置滚动条的位置
      resetui();
      $('#ipt').val('');
      // todo:发起请求，获取聊天信息
      getMsg(text);
    })
    // 输入框绑定键盘事件
    $('#ipt').on('keyup', function (e) {
      if (e.key === 'Enter') $('#btnSend').click();
    })

    // 发送请求，获取机器人聊天内容
    function getMsg(text) {
      $.ajax({
        method: 'GET',
        // url: 'http://ajax.frontend.itheima.net:3006/api/robot',
        url: 'http://www.liulongbin.top:3006/api/robot',
        data: {
          spoken: text
        },
        success: function (res) {
          let msg = res.data.info.text;
          $('.talk_list').append(`<li class="left_word"><img src="img/chatImg/person01.png" /> <span>${msg}</span></li>`);
          resetui();
          //TODO: 发起请求，将机器人的聊天信息转为语音格式
          getVoice(msg);
        }
      })
    }

    // 发起请求，将机器人的聊天信息转为语音格式
    function getVoice(text) {
      $.ajax({
        method: 'GET',
        url: 'http://www.liulongbin.top:3006/api/synthesize',
        data: {
          text: text
        },
        success: function (res) {
          // 如果请求成功，则res.voiceUrl是服务器返回的音频URL地址
          if (res.status === 200) {
            $('#voice').attr('src', res.voiceUrl)
          }
        }
      })
    }
  })
})();
