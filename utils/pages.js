class Pages {


    pages(pageName) {
        return this.pages["pageName"];
    }

    constructor() {
        this.pages = {
            "today": "/page/calendar/today/today",
            "detail": "/page/calendar/detail/detail",
            "create": "/page/calendar/create/create",
            "edit": "/page/calendar/edit/edit",
            "list": "/page/calendar/list/list",

            "login":"/page/mingdao/login"
        }
    }
}

module.exports = new Pages().pages;