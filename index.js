var stringify = JSON.stringify.bind(JSON);
var parse = JSON.parse.bind(JSON);
var isBigx = /:[\s\t\r]*([0-9]{15,})[\s\r\t]*[,|\}]/g;
var isBig = /(?<=:[\s\t\r]*)([0-9]{15,})(?=[\s\r\t]*[,|\}])/g;
var isBigNumber = /^([0-9]{15,})n$/g;

//JSON.parse = cParse;
//JSON.stringify = cStringify;
//JSON._parse = parse;
//JSON._stringify = stringify;

if (typeof (BigInt) == 'undefined') {
    throw Error('BingInt is required, Please upgrade to nodejs 10.4 and above');
}

function addBigInt(key, value) {
    if (typeof (value) == "string" && value.match(isBigNumber)) {
        console.log('2', value)
        return BigInt(value.slice(0, -1));
    }
    return value;
}

function cParse(json) {
    if (json.match(isBig)) {
        let jtxt = json.replace(isBig, '"$1n"');
        console.log('1', jtxt)
        return parse(jtxt, addBigInt);
    }
    return parse(json);

}

function removeBigInt(key, value) {
    if (typeof value === 'bigint') {
        console.log('3', value)
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
    stringify: cStringify
}