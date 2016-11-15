var user = require('../../../api/weixin/user.js')
Page({
  onReady: function () {
    user.getUserInfo(function (userInfo) {
      console.dir(userInfo);
    })
  }
})
