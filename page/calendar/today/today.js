let app = getApp();
let user = require('../../../api/weixin/user.js');
let pages = require('../../../utils/pages');
Page({

  onLoad: function () {
    
  },

  onShow: function () {
    this.loginRedirect();
  },
  onHide: function () {
    console.log('today onhide')
  },
  onUnload: function () {
    console.log('today onunload')
  },
  onReady: function () {
    console.log('today onready')



    // user.getUserInfo(function (userInfo) {

    // })
  },
  loginRedirect: function () {
    let isLogin = app.isLogin();
    if (!isLogin) {
      wx.navigateTo({
        url: pages['login'],
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  }


})
