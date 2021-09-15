// • add 
// • update 
// • delete 
// • reconfigure 
// • setPrototype 
// • preventExtensions

var obj = { a: 1, b: 2 };

Object.observe(obj, function (changes) { for (var change of changes) { console.log(change); } }, ["add", "update", "delete"]);

obj.c = 19; // { name: "c", object: obj, type: "add" } 

obj.a = 11; // { name: "a", object: obj, type: "update", oldValue: 1 } 

delete obj.b; // { name: "b", object: obj, type: "delete", oldValue: 2 }


function observer(changes) {
    for (var change of changes) {
        if (change.type == "recalc") {
            change.object.c = change.object.oldValue + change.object.a + change.object.b;
        }
    }
}

function changeObj(a, b) {
    var notifier = Object.getNotifier(obj); obj.a = a * 2; obj.b = b * 3;
    notifier.notify({ type: "recalc", name: "c", oldValue: obj.c });
}

var obj = { a: 1, b: 2, c: 3 };
Object.observe(obj, observer, ["recalc"]);
changeObj(3, 11);
obj.a;        // 12 obj.b;        // 30 obj.c;        // 3


