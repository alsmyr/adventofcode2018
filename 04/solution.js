function solve(input, part) {

    /*
[1518-04-11 00:01] Guard #3259 begins shift
[1518-09-17 00:58] wakes up
[1518-05-03 00:53] wakes up
[1518-10-27 00:44] falls asleep
    */


    const dateRx = /[0-9]{4}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}/;
    const actionRx = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (Guard #|)(\d+|wakes|falls)/;

    input.sort((a, b) => {
        return new Date(a.match(dateRx)) - new Date(b.match(dateRx));
    });

    var guards = [];
    var guard;
    var fell;

    for (let element of input) {
        if (!element) continue;
        [,,,,, minute,, state] = actionRx.exec(element);

        switch (state) {
            case 'wakes':
                for (let i = fell; i <= parseInt(minute); i++) {
                    guards[guard][i]++;
                }
                break;

            case 'falls':
                fell = Number(minute);
                break;

            default:
                guard = state;
                if (!guards[guard]) {
                    guards[guard] = new Array(60).fill(0);
                }
        }
    }

    function mm(a) {
        let minute = Math.max(...a);
        let index = a.findIndex(v => { return v == minute; });
        return [minute, index];
    }

    var m = [-1, -1];
    guards.forEach((arr, id) => {
        let minutes = arr.reduce((a, b) => { return a + b; }, 0);
        [, index] = mm(arr);
        if (minutes > m[1]) m = [id, minutes, index];
    });

    if (part === 1) {
        return (m[0] * m[2])
    }

    m = [-1, -1];
    guards.forEach((arr, id) => {
        [minute, index] = mm(arr);
        if (minute > m[1]) {
            m = [id, minute, index];
        }
    });

    if (part === 2) {
        return (m[0] * m[2])
    }

    return null;
}

const expected = part => part === 1 ? 39422 : 65474;

module.exports = { solve, expected };