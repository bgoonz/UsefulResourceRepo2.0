const isAnagram => (s, t) {
    var lens = s.length,
        lent = t.length;
    if(lens !== lent) return false;
    if(typeof s !== 'string' || typeof t !== 'string') return false;
    if(lens === 0 && lent === 0) return true;
    
    var charmap = {};
    for(let i=0; i<lens; i++){
        charmap[s[i]] = charmap[s[i]] ? charmap[s[i]]+1: 1; 
    }
    for(let j=0; j<lent; j++){
        if(charmap[t[j]]) charmap[t[j]]--;
        else return false;
    }
    
    var sum = Object.values(charmap).reduce(function(accumulator, element){
        return accumulator + element;
    });
    
    if(sum === 0) return true;
    return false;
}
