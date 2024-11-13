const key = [
    '1',
    '"1"',
    'true',
    'null',
    'undefined',
    '{}',
    'function(){ }'
]
var value = [
    1,
    "1",
    true,
    null,
    undefined,
    {},
    function () { }
]
var obj = value.map((item) => ({ value: item, 'typeof': typeof item }))
console.table(obj)