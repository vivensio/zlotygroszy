'use strict';

module.exports = (number) => {
    var num = number.replace(/[ .]/g, "");
    var zl = num.split(',')[0],
        gr = num.split(',')[1];

    if (zl.length > 9)
        return zl > 0 ? "zbyt dużo" : "zbyt mało";
    
    if (gr && gr.length > 2)
        return 'zbyt dużo groszy';
        
    zl = processZloty(zl);
    gr = processGroszy(gr);
        
    return zl + (zl != 0 && gr != 0 ? ' i ' : '') + gr;
}

function processZloty(zl) {
    
    var minus = '';
    if (parseInt(zl, 10) < 0) {
        minus += "minus ";
    }

    if (zl && zl != 0)
        zl = process(zl) + 'złotych';
    else
        zl = '';
    
    return minus + zl;
}

function processGroszy(gr) {

    if (gr && gr != 0) {
        if (gr.length == 1)
            gr += '0';
            
        gr = process(gr) + 'groszy';
    } else
        gr = '';

    return gr;
}

var ONES = ["", "jeden ", "dwa ", "trzy ", "cztery ", "pięć ", "sześć ", "siedem ", "osiem ", "dziewięć "],
    TENS = ["", "dziesięć ", "dwadzieścia ", "trzydzieści ", "czterdzieści ", "pięćdziesiąt ", "sześćdziesiąt ", "siedemdziesiąt ", "osiemdziesiąt ", "dziewięćdziesiąt "],
    TEENS = ["", "jedenaście ", "dwanaście ", "trzynaście ", "czternaście ", "piętnaście ", "szesnaście ", "siedemnaście ", "osiemnaście ", "dziewiętnaście "],
    HUNDREDS = ["", "sto ", "dwieście ", "trzysta ", "czterysta ", "pięćset ", "sześćset ", "siedemset ", "osiemset ", "dziewięćset "],
    UNITS = ["milion ", "miliony ", "milionów ", "tysiąc ", "tysiące ", "tysięcy " ];

function process(number) {
    var digits,
        result = "";

    number = parseInt(number, 10);
    digits = String(Math.floor(Math.abs(number))).split("");

    for (var i = 0; i < digits.length; i++) {
        digits[i] = parseInt(digits[i], 10);
    }

    if (parseInt(number, 10) === 1) {
        return "jeden ";
    }

    while (digits.length < 9) {
        digits.unshift(0);
    }

    if (parseInt(number, 10) === 0) {
        result += "zero ";
    } else {
        for (i=0; i<9; i+=3) {
            var slice = digits.slice(i, i+3)
            result += words(slice);
            if (slice.join("") !== "000" && i < 6)
                result += UNITS[unit(slice, i)];
        }
    }
    return result;
}

function words(digits) {
    var ret = "";
    ret += HUNDREDS[digits[0]];

    if (digits[1] === 1 && digits[2] !== 0) {
        ret += TEENS[digits[2]];
    } else {
        ret += TENS[digits[1]];
        if (digits[2] === 1 && digits[1] === 0) 
            return ret; 
        ret += ONES[digits[2]];
    }

    return ret;
} 

function unit(digits, i) {
    if (digits.join("") === "001") {
        return i + 0;
    } else if (digits[1] !== 1 && (digits[2] === 2 || digits[2] === 3 || digits[2] === 4)) {
        return i + 1;
    } else {
        return i + 2;
    }
}