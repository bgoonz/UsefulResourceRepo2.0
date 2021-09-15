define(["../number/pad"], function (pad) {
    /**
     * time zone as hour and minute offset from UTC (e.g. +0900)
     */
    function timezoneOffset(date) {
        let offset = date.getTimezoneOffset();
        let abs = Math.abs(offset);
        let h = pad(Math.floor(abs / 60), 2);
        let m = pad(abs % 60, 2);
        return (offset > 0 ? "-" : "+") + h + m;
    }

    return timezoneOffset;
});
