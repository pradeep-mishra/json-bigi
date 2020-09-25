# json-bigi
Big number support in JSON

```javascript
var json = require("json-bigi")
var obj = json.parse('{"age":13,"long_num":5229836185805052174}');
// Object {age: 13, long_num: 5229836185805052174n}

obj.long_num++;

json.stringify(obj);
// '{"age":13,"long_num":"5229836185805052175"}'

```