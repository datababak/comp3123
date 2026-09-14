function max(a, b, c) {

    if (a >= b && a >= c) {

        return a;

    } else if (b >= c) {

        return b;

    } else {

        return c;

    }

}

console.log(max(1, 0, 1));

console.log(max(0, -10, -20));

console.log(max(1000, 510, 440));