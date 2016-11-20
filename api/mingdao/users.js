let auth = require('./auth');
let app = getApp();

class Users extends auth {

    static GetCurrentUserDetail(callback) {
        let url = 'https://api.mingdao.com/v1/passport/get_passport_detail';
        let method = 'GET';

        super.RequestApi(url, method, {}, (response) => {
            let user = response.data;
            let cacheUser = {
                accountid: user.account_id,
                avatar: user.avatar,
                email: user.email,
                phone: user.mobile_phone
            }
            app.globalData.mdUserInfo = cacheUser;
            typeof (callback) === 'function' ? callback(cacheUser) : null;
        });
    }

}


module.exports = Users;