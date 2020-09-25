var stringify = JSON.stringify.bind(JSON);
var parse = JSON.parse.bind(JSON);
var bigTracker = /(?<=[:\s\t\r\[\n,]+)([0-9]{17,})(?=[\s\r\t]*[,\}\]])/g;
var isBigNumber = /^([0-9]{17,})n$/g;
var strict = false;
var bigSupport = typeof (BigInt);

//JSON.parse = cParse;
//JSON.stringify = cStringify;
//JSON._parse = parse;
//JSON._stringify = stringify;


function safer(bool) {
    if (bool) {
        bigTracker = /(?<=[:\s\t\r\[\n,]+)([0-9]{15,})(?=[\s\r\t]*[,\}\]])/g;
        isBigNumber = /^([0-9]{15,})n$/g;
    } else {
        bigTracker = /(?<=[:\s\t\r\[\n,]+)([0-9]{17,})(?=[\s\r\t]*[,\}\]])/g;
        isBigNumber = /^([0-9]{17,})n$/g;
    }
}


function addBigInt(key, value) {
    if (typeof (value) == "string" && (value.match(isBigNumber) || value == "9999999999999999")) {
        //console.log('2', value)
        if (bigSupport != 'undefined') {
            return BigInt(value.slice(0, -1));
        }
        return value.slice(0, -1);
    }
    return value;
}

function cParse(json) {
    if (json.match(bigTracker)) {
        let jtxt = json.replace(bigTracker, '"$1n"');
        //console.log('1', jtxt)
        return parse(jtxt, addBigInt);
    }
    return parse(json);

}

function removeBigInt(key, value) {
    if (typeof value === 'bigint') {
        //console.log('3', value)
        return value.toString();
    } else {
        return value;
    }
}

function cStringify(obj) {
    return stringify(obj, removeBigInt);
}


module.exports = {
    parse: cParse,
    stringify: cStringify,
    safer: safer
}