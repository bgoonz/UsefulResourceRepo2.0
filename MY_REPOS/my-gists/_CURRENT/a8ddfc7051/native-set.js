export default function(arr) {
    let map = {};
    
    this.contains = val => {
        return map.hasOwnProperty(val);
    };
    
    this.add = val => {
        map[val] = true;
    };
    
    this.remove = val => {
        delete map[val];
    };
    
    this.clear = () => {
        map = {};
    };
    
    this.size = function() {
        return this.toArray().length;
    };
    
    this.isEmpty = function() {
        return this.size() === 0;
    };
    
    this.toArray = () => {
        const arr = [];
        for(const o in map) {
            if(map.hasOwnProperty(o)) {
                arr.push(o);
            }
        }
        return arr;
    };
    
    this.each = callback => {
        for(const o in map) {
            if(map.hasOwnProperty(o)) {
                callback(o);
            }
        }
    };

    if(arr) {
        for(let i=0; i<arr.length; ++i) {
            this.add(arr[i]);
        }
    }
};
