/**
 * Created by ahadsheriff on 5/24/16.
 */

const is = true;

function isTrue(is) {

    if (typeof(is) === "boolean") {

        if (is === true) {
            return false;
        }
        else{
            return true;
        }
    }
    else {
        console.log('Not a boolean')
    }
}

console.log(isTrue(is));