//app.js
let pages = require('./utils/pages')

App({
  onLaunch: function () {
    let accessToken = wx.getStorageSync('access-token');
    let refreshToken = wx.getStorageSync('refresh-token');

    if (accessToken && refreshToken) {
      this.globalData.accessToken = accessToken;
      this.globalData.refreshToken = refreshToken;
    }



  },
  onShow: function () {


  },
  onHide: function () {

  },

  isLogin: function () {
    return this.globalData.accessToken != null;
  },
  globalData: {
    wxUserInfo: null,
    mdUserInfo: null,
    category: null,

    accessToken: null,
    refreshToken: null,
    //上一次离开时的视图
    lastView: null,
    //上一次离开时的用户输入
    lastData: null,

    appKey: "02CAB33E3A1D",
    appSecret: "604FCD37EE933BE4D3275D4A20EB98E6"
  }
})