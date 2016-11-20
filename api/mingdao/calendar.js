let auth = require('./auth');
let formatEvents = require('./events').formatEvents;

class Calendar extends auth {

    static GetCalendarList(beginDate, endDate, account_ids, category, callback) {
        let url = 'https://api.mingdao.com/v1/calendar/get_events_by_conditions';
        let method = 'GET';
        let data = {
            account_ids: account_ids,
            event_category_types: 21,
            begin_date: beginDate,
            end_date: endDate,
            category_ids: category
        }
        super.RequestApi(url, method, data, (response) => {
            let events = formatEvents(response.data)
            callback(events);
        });
    }

    static GetUserCategory(callback) {
        let url = 'https://api.mingdao.com/v1/calendar/get_all_user_defined_categories';
        let method = 'GET';
        let data = {};
        super.RequestApi(url, method, data, (reponse) => {
            callback(reponse.data);
        });

    }


}






module.exports = Calendar;