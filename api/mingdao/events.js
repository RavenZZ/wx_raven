let datetime = require('../../utils/datetime');

function formatEvents(calendars) {
    let events = calendars.map((c) => {
        let id = c.event_id;
        if (c.is_recurring) {
            let recurTime = new Date(c.event_recurring_time);
            id += '_' + datetime.formatEventTime(recurTime);
        }
        c.event_id = id;

        let personDays = datetime.personlize(c.begin_date, c.end_date, c.is_all_day_event);
        c.dayName = personDays.date;
        c.ravenStart = personDays.start;
        c.ravenEnd = personDays.end;

        c.calendarName = c.calendarName.replace('(全天)', '');

        //Red = 0, Purple = 1, Cyan = 2, Orange = 3, Blue = 4, Green = 5, Yellow = 6,  Work = 99(蓝色),  任务日程Task=102（绿色）
        c.color = color(c.color);

        c.hideDetail = true;

        return c;
    });
    return events;
}

function color(colorEnum) {
    let colorStr = '';
    switch (colorEnum) {
        case 0:
            colorStr = 'red';
            break;
        case 1:
            colorStr = 'purple';
            break;
        case 2:
            colorStr = 'cyan';
            break;
        case 3:
            colorStr = 'orange';
            break;
        case 4:
            colorStr = 'blue';
            break;
        case 5:
            colorStr = 'green';
            break;
        case 6:
            colorStr = 'yellow';
            break;
        case 99:
            colorStr = 'blue';
            break;
        case 102:
            colorStr = 'green';
            break;
    }
    return colorStr;
}





module.exports = {
    formatEvents: formatEvents
}