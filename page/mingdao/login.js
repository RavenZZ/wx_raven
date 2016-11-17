let user = require('../../api/mingdao/auth');

Page({
  data: {
    id: "raven.zhu@mingdao.com",
    pwd: "zhugege123",
    loading: false
  },

  idBlur: function (e) {
    this.setData({
      id: e.detail.value
    });
  },

  pwdBlur: function (e) {
    this.setData({
      pwd: e.detail.value
    });
  },

  formSubmit: function (e) {
    console.dir(this.data);
    this.setData({
      loading: true
    });


    user.GetAccessToken(this.data.id, this.data.pwd, (err, isSuccess) => {
      this.setData({
        loading: false
      });
      if (isSuccess) {
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function(){
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
        });
      } else {
        wx.showModal({
          title: '账号登录失败',
          content: err,
          showCancel:false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
    });
  },
  onReady: function () {

  },
  onLoad: function () {

  },
  onShow: function () {

  },
  onUnload: function () {

  }
})
