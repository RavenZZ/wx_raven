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

    static RequestApi(url, method, data, callback) {
        let accessToken = wx.getStorageSync('access-token');
        data.access_token = accessToken;
        wx.request({
            url: url,
            data: data,
            method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: (res) => {
                if (Auth.isSuccess(res.data)) { // 请求成功
                    callback(res.data);
                } else { // 失败, 重新获取access_token
                    let refreshToken = wx.getStorageSync('refresh-token');
                    Auth.RefreshToken(refreshToken, () => {
                        Auth.RequestApi(url, method, data, () => {
                            callback(res.data);
                        });
                    });
                }
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }


    static isSuccess(response) {
        //请求失败, 重新获取token
        return response.success == true;
    }


}


module.exports = Auth;