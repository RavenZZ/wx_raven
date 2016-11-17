let app = getApp();

class Auth {

    static get AppKey() {
        return app.globalData.appKey;
    }

    static get AppSecret() {
        return app.globalData.appSecret;
    }

    static GetAccessToken(username, password, callback) {
        wx.request({
            url: 'https://api.mingdao.com/oauth2/access_token',
            data: {
                app_key: this.AppKey,
                app_secret: this.AppSecret,
                grant_type: "password",
                username: username,
                password: password,
                account: "show me the token"
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                console.dir(res.data);
                if (res.data.success == true) {
                    app.globalData.accessToken = res.data.access_token;
                    app.globalData.refreshToken = res.data.refresh_token;
                    wx.setStorageSync('access-token', res.data.access_token)
                    wx.setStorageSync('refresh-token', res.data.refresh_token)
                    callback(null, true);
                } else {
                    callback(res.data.error_msg, false)
                }
            },
            fail: function () {
            },
            complete: function () {
            }
        });
    }

    static RefreshToken(refreshToken, callback) {
        wx.request({
            url: 'https://api.mingdao.com/oauth2/access_token',
            data: {
                app_key: this.AppKey,
                app_secret: this.AppSecret,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                account: "show me the token"
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                if (res.data.success == true) {
                    app.globalData.accessToken = res.data.access_token;
                    app.globalData.refreshToken = res.data.refresh_token;
                    wx.setStorageSync('access-token', res.data.access_token);
                    wx.setStorageSync('refresh-token', res.data.refresh_token);
                    callback(null, true);
                } else {
                    callback(res.data.error_msg, false)
                }
            },
            fail: function () {
            },
            complete: function () {
            }
        })
    }

    static isTokenFailed(response){
        
    }


}


module.exports = Auth;