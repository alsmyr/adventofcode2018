function solve(input, part) {


    if (part === 1) {
        var retval = input.reduce((acc, val) => {
            let letters = val.split('').reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});

            let has2 = false;
            let has3 = false;

            for (let a of Object.values(letters)) {
                if (a === 2) has2 = true;
                if (a === 3) has3 = true;
            }
            if (has2)++acc[0];
            if (has3)++acc[1];

            return acc;
        }, [0, 0]).reduce((acc, val) => acc * val, 1);
        return retval;

    } else if (part === 2) {

        const inputLength = input[0].length;

        for (let i = 0; i < inputLength; i++) {
            const shortIds = input.map(id => removeAtHelper(id, i));
            if (new Set(shortIds).size === input.length) {
                continue;
            }

            const duplicates = shortIds.filter((item, index) => shortIds.indexOf(item) != index);

            return duplicates[0];
        }
    }
    return retval;
}

const expected = part => part === 1 ? 6200 : 'xpysnnkqrbuhefmcajodplyzw';

function removeAtHelper(string, i) {
    return string.slice(0, i) + string.slice(i + 1);
}

module.exports = { solve, expected };