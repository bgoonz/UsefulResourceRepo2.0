function formatValue2(value, spaces = 0) {
    if (value == null) {
        return null;
    }

    if (value && !Array.isArray(value[0])) {
        return { Attribute: value[0], Operator: value[1], Value: value[2] };
    }
    let data = [];
    for (let index = 0; index < value.length; index++) {
        const item = value[index];
        if (item == "or" || item == "and") {
            data.push({ Logical: item });
        } else {
            data.push(formatValue2(item))
        }
    }
    return data;

}

var sum = 0;
for (let index = 1; index <= 200; index++) {
    sum += index;
}
console.log(sum)


function buildSql(value) {
    if (value == null) {
        return "";
    }
    if (value && !Array.isArray(value[0])) {

        let operator = "";
        switch (value[1]) {
            case '=':
            case '<':
            case '>':
            case '>=':
            case '<=':
            case '<>':
                return `${value[0]} ${value[1]} '${value[2]}'`;
            case 'contains':
                return `${value[0]} like '%${value[2]}%'`;
            case "notcontains":
                return `${value[0]} not like '%${value[2]}%'`;
            case "startswith":
                return `${value[0]} like '${value[2]}%'`;
            case "endswith":
                return `${value[0]} like '${value[2]}'`;
        }

    }

    var sql = "";
    for (let index = 0; index < value.length; index++) {
        const item = value[index];
        if (item == "or" || item == "and") {
            sql += ` ${item} `;
        } else {
            sql += `(${buildSql(item)})`;
        }
    }
    return `${sql}`;
}

var arr1 = [
    ["DisplayName", "contains", "test"],
    "or",
    ["UPN", "=", "abc"],
    "or",
    [["UPN", "contains", "abc"], "and", ["DisplayName", "contains", "test"]]
];
console.log(buildSql(arr1));