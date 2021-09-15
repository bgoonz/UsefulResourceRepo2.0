# Get the start and end of current week

```javascript
const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);

const currentWeek = `${dayjs()
  .startOf("isoWeek")
  .tz("Asia/Kolkata")
  .format("DD-MMMM")} - ${dayjs()
  .endOf("isoWeek")
  .tz("Asia/Kolkata")
  .format("DD-MMMM")}`;
```
