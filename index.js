
const getPrimitiveRoot = require('number-theory').primitiveRoot;
const bInt = require("big-integer");


function isPrime(num) {
    for (let i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function generatePrimeNumber() {
    let isFound = false;
    let candidate = getRandom(1000, 10000);

    while (!isFound) {
        if (isPrime(candidate) && candidate % 4 == 3) {
            isFound = true;
        } else {
            candidate++;
        }
    }
    return candidate;
}

class Person {
    constructor(n, g) {
        this.n = n;
        this.g = g;
        this.privateKey = getRandom(1000, 10000);
        this.publicKey = bInt(g).pow(this.privateKey).mod(n)
    }
    getPublicKey() {
        return this.publicKey;
    }
    setSessionKey(externalPublicKey) {
        this.sessionKey = bInt(externalPublicKey).pow(this.privateKey).mod(this.n);
    }
    getSessionKey() {
        return this.sessionKey;
    }
}

(function main() {
    const n = generatePrimeNumber();
    const g = getPrimitiveRoot(n);
    const alice = new Person(n, g);
    const bob = new Person(n, g);
    alice.setSessionKey(bob.getPublicKey());
    bob.setSessionKey(alice.getPublicKey());

    console.log(bob.getSessionKey())
    console.log(alice.getSessionKey())
})();


