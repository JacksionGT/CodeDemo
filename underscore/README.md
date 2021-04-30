# Underscore练习


var length = 10;
function fn(){
    console.log(this.length);
}
var obj = {
    length: 5,
    method: function (fn1) {
        arguments[0]();     }
};
obj.method(fn, 123);