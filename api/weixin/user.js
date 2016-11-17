let app = getApp()
class Weixin {

  static getUserInfo(cb) {
    if (app.globalData.wxUserInfo) {
      typeof cb == "function" && cb(app.globalData.wxUserInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.wxUserInfo = res.userInfo
              typeof cb == "function" && cb(app.globalData.wxUserInfo)
            }
          })
        }
      })
    }
  }
}

module.exports = Weixin;
