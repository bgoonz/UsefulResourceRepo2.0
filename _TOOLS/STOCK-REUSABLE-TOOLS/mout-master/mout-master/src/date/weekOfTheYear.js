define(["./dayOfTheYear"], function (dayOfTheYear) {
    /**
     * Return the week of the year based on given firstDayOfWeek
     */
    function weekOfTheYear(date, firstDayOfWeek) {
        firstDayOfWeek = firstDayOfWeek == null ? 0 : firstDayOfWeek;
        let doy = dayOfTheYear(date);
        let dow = (7 + date.getDay() - firstDayOfWeek) % 7;
        let relativeWeekDay = 6 - firstDayOfWeek - dow;
        return Math.floor((doy + relativeWeekDay) / 7);
    }

    return weekOfTheYear;
});
