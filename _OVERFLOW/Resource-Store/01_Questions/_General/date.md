date
====

Date utilities.

dayOfTheYear(date):Number
-------------------------

How many days elapsed since begining of the year (following gregorian calendar).

    // Jan 1st
    dayOfTheYear(new Date(2013, 0, 1)); // 1
    // Dec 31th
    dayOfTheYear(new Date(2013, 11, 31)); // 364

diff(date1, date2, \[unitName\]):Number
---------------------------------------

Calculate the difference between dates (range).

The returned value is always positive. The default `unitName` is `"ms"`.

Available units: `year`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`.

See: [`time/convert()`](time.html#convert)

    var d1 = new Date(2012, 4, 5);
    var d2 = new Date(2013, 4, 8);
    diff(d1, d2);          // 31795200000
    diff(d1, d2, 'hour');  // 8832
    diff(d1, d2, 'week');  // 52.57142857142857
    diff(d1, d2, 'month'); // 12.096774193548388
    diff(d1, d2, 'year');  // 1.0082191780821919

isLeapYear(fullYear|date):Boolean
---------------------------------

Checks if it’s a [leap year](http://en.wikipedia.org/wiki/Leap_year) according to the Gregorian calendar.

see: [`totalDaysInMonth()`](#totalDaysInMonth)

    isLeapYear(2012); // true
    isLeapYear(2013); // false
    isLeapYear(new Date(2012, 2, 28)); // true

isSame(date1, date2\[, period\]):Boolean
----------------------------------------

Check if both dates are the “same”.

You can pass an optional *period* used to set the comparisson precision.

Available periods: `year`, `month`, `week`, `day`, `hour`, `minute`, `second`.

    var date1 = new Date(2013, 1, 3);
    var date2 = new Date(2013, 2, 9);
    isSame(date1, date2);          // false
    isSame(date1, date2, 'day');   // false
    isSame(date1, date2, 'month'); // false
    isSame(date1, date2, 'year');  // true

parseIso(str):Number
--------------------

Parses an [ISO8601](http://en.wikipedia.org/wiki/Iso8601) date and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC, or `NaN` if it is not a valid ISO8601 date.

This parses *all* ISO8601 dates, including dates without times, [ordinal dates](https://en.wikipedia.org/wiki/ISO_8601#Ordinal_dates), and the compact representation (omitting delimeters). The only exception is [ISO week dates](https://en.wikipedia.org/wiki/ISO_week_date), which are not parsed.

If no time zone offset is specified, it assumes UTC time.

    // Jan 01, 1970 00:00 GMT
    parseIso('1970-01-01T00:00:00')    // 0
    parseIso('1970-001')               // 0
    parseIso('1970-01-01')             // 0
    parseIso('19700101T000000.00')     // 0
    parseIso('1970-01-01T02:00+02:00') // 0

    // Jan 02, 2000 20:10 GMT+04:00
    parseIso('2000-01-02T20:10+04:00') // 946829400000

quarter(date):Number
--------------------

Get a number between 1 to 4 that represents the quarter of the year.

    quarter(new Date(2013, 1, 19)); // 1
    quarter(new Date(2013, 4, 12)); // 2
    quarter(new Date(2013, 7, 25)); // 3
    quarter(new Date(2013, 10, 8)); // 4

startOf(date, period):Date
--------------------------

Get a new Date at the start of the period.

Available periods: `year`, `month`, `week`, `day`, `hour`, `minute`, `second`.

    // Apr 05 2013 11:27:43
    var date = new Date(2013, 3, 5, 11, 27, 43, 123);
    startOf(date, 'year');  // Jan 01 2013 00:00:00
    startOf(date, 'month'); // Apr 01 2013 00:00:00
    startOf(date, 'day');   // Apr 05 2013 00:00:00
    startOf(date, 'hour');  // Apr 05 2013 11:00:00

strftime(date, format, \[l10n\]):String
---------------------------------------

Format date based on strftime format.

Replaced tokens:

%a  
locale’s abbreviated weekday name.

%A  
locale’s full weekday name.

%b  
locale’s abbreviated month name.

%B  
locale’s full month name.

%c  
locale’s appropriate date and time representation.

%C  
century number (the year divided by 100 and truncated to an integer) as a decimal number \[00..99\].

%d  
day of the month as a decimal number \[01..31\].

%D  
same as %m/%d/%y.

%e  
day of the month as a decimal number \[1..31\]; a single digit is preceded by a space.

%F  
The ISO 8601 date format (%Y-%m-%d)

%h  
same as %b.

%H  
hour (24-hour clock) as a decimal number \[00..23\].

%I  
hour (12-hour clock) as a decimal number \[01..12\].

%j  
day of the year as a decimal number \[001..366\].

%l  
hour (12-hour clock) as a decimal number (range 1 to 12); single digits are preceded by a blank

%L  
zero-padded milliseconds \[000..999\]

%m  
month as a decimal number \[01..12\].

%M  
minute as a decimal number \[00..59\].

%n  
newline character.

%p  
locale’s equivalent of either “am” or “pm”

%P  
locale’s equivalent of either “AM” or “PM”

%r  
time in a.m. and p.m. notation; in the POSIX locale this is equivalent to %I:%M:%S %p.

%R  
time in 24 hour notation (%H:%M).

%s  
seconds since Epoch (1970-01-01 00:00:00 UTC)

%S  
second as a decimal number \[00..60\].

%t  
tab character.

%T  
time (%H:%M:%S).

%u  
weekday as a decimal number \[1..7\], with 1 representing Monday.

%U  
week number of the year (Sunday as the first day of the week) as a decimal number \[00..53\].

%V  
week number of the year (Monday as the first day of the week) as a decimal number \[01..53\]. If the week containing 1 January has four or more days in the new year, then it is considered week 1. Otherwise, it is the last week of the previous year, and the next week is week 1.

%w  
weekday as a decimal number \[0..6\], with 0 representing Sunday.

%W  
week number of the year (Monday as the first day of the week) as a decimal number \[00..53\]. All days in a new year preceding the first Monday are considered to be in week 0.

%x  
locale’s appropriate date representation.

%X  
locale’s appropriate time representation.

%y  
year without century as a decimal number \[00..99\].

%Y  
year with century as a decimal number.

%Z  
timezone name or abbreviation, or by no bytes if no timezone information exists.

%%  
is replaced by %.

    var date = new Date(2013, 3, 8, 9, 2, 4);
    strftime(date, '%Y-%m-%d'); // "2013-04-08"
    strftime(date, '%R'); // "09:02"
    strftime(date, '%Y-%m-%dT%H:%M:%S%z'); // "2013-04-08T09:02:04+0000"

You can also set a custom locale:

    var ptBr = require('mout/date/i18n/pt-BR');
    strftime(date, '%a, %d %b', ptBr); // 'Seg, 08 Abr'
    strftime(date, '%A, %d %B', ptBr); // 'Segunda, 08 Abril'

To set it globally:

    require('mout/date/i18n_').set( customLocaleData );

See [date/i18n](https://github.com/mout/mout/tree/master/src/date/i18n) for localization examples.

timezoneAbbr(date):String
-------------------------

Return timezone abbreviation or similar data.

The result will vary based on the OS/browser since some environments doesn’t provide enough info about the current locale.

    // IE 7-8
    timezoneAbbr(new Date()); // "-0500"
    // Chrome, FF, V8
    timezoneAbbr(new Date()); // "EST"

timezoneOffset(date):String
---------------------------

Return time zone as hour and minute offset from UTC (e.g. +0900).

It’s important to note that JavaScript Date object will use the system locale info to determinate the [timezone offset](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset) and that daylight saving time affects the result.

    // if system locale is EST
    timezoneOffset(new Date()); // -0500

totalDaysInMonth(fullYear, monthIndex):Number
---------------------------------------------

Returns the amount of days in the month taking into consideration leap years (following Gregorian calendar).

see: [`isLeapYear()`](#isLeapYear)

    totalDaysInMonth(2008, 1); // 29 (leap year)
    totalDaysInMonth(2009, 1); // 28

    // you can also pass a Date object as single argument
    totalDaysInMonth( new Date(2013, 0, 1) ); // 31

totalDaysInYear(fullYear):Number
--------------------------------

Returns the amount of days in the year taking into consideration leap years (following Gregorian calendar).

see: [`isLeapYear()`](#isLeapYear), [`totalDaysInMonth()`](#totalDaysInMonth)

    totalDaysInYear(2008); // 366 (leap year)
    totalDaysInYear(2009); // 365

    // you can also pass a Date object as single argument
    totalDaysInYear( new Date(2013, 0, 1) ); // 365

weekOfTheYear(date, \[firstDayOfWeek\]):Number
----------------------------------------------

Returns how many weeks elapsed since start of the year (`0..53`).

`firstDayOfWeek` can be `0` (Sunday) or `1` (Monday). By default weeks start at Sunday.

It will return `0` if `date` is before the first `firstDayOfWeek` of the year.

    // Tue Jan 01 2013
    weekOfTheYear( new Date(2013,0,1) ); // 0
    // Wed Jan 09 2013
    weekOfTheYear( new Date(2013,0,9) ); // 1
    // Sun Jan 01 2012
    weekOfTheYear( new Date(2012,0,1) ); // 1
    // Mon Jan 09 2012
    weekOfTheYear( new Date(2012,0,9) ); // 2

------------------------------------------------------------------------

For more usage examples check specs inside `/tests` folder. Unit tests are the best documentation you can get…
