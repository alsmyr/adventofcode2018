function solve(input, part) {
    let retval = 0;
    const freq = {};

    if(part === 1) {
        input.forEach(function(element) {
            retval += Number(element);
          });
    } else if(part === 2) {
        
        while (1) { 
            for (let i = 0; i < input.length; i++) {
                retval += Number(input[i]);
                if (freq[retval]) {
                    return retval;
                }
                freq[retval] = true;
            }
        }
    }
    return retval;
}

const expected = part => part === 1 ? 472 : 66932;

module.exports = {solve,expected};