
(function ($) {
    if (!$) {
        console.error("请先引入jQuery")
        return;
    }

    // 身份证号码验证、手机电话号码、电子邮箱验证、必填字段验证、最大值/最小值验证
    var defaultOptions = {
        defaultEvent: "input", //自定义校验触发事件
        rules: [
            { rule: 'ID', pattern: /^\d{17}[\d|x]|\d{15}$/, message: '请输入正确的身份证号码' , handler:value=>/^\d{17}[\d|x]|\d{15}$/.test(value)},
            { rule: 'mobile', pattern: /^0?1[356789][0-9]{9}$/, message: '请输入正确的手机号码' , handler:value=>/^0?1[356789][0-9]{9}$/.test(value)},
            { 
                rule: 'email', pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的电子邮箱' , 
                handler:value=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
            },
            { rule: 'required', pattern: /^.+$/, message: '必填字段' ,handler:value=>/^.+$/.test(value)},
            { rule: 'min', message: '值太小' ,handler:(value,min)=>{ return value < min}},
            { rule: 'max', message: '值太大' ,handler:(value,max)=>{ return value > min}},
        ]
    }
    
    // 验证
    const validHandler = (info, validateRules) => {
        var errors = [];
        var  value = $(info).val();
        validateRules.forEach(vitem => {
            var validPass = true
            if (['ID','mobile','email','required'].includes(vitem.rule)) {
                validPass = vitem.handler(value)
            }else if(['min','max'].includes(vitem.rule)){
                validPass = vitem.handler(value,$(info).attr(vitem.rule))
            }
            else if(vitem.pattern){
                if(!vitem.handler){
                    validPass = vitem.pattern.test(value);
                }
                else{
                    validPass = vitem.handler(info);
                }
            }
            else{
                validPass = vitem.handler(info)
            }
            if(!validPass){
                errors.push(Object.assign({ rule: vitem.rule, message: vitem.message ,name:$(info).attr("name"),value:value}))
            }
        });
        info.callback && info.callback(errors)
        return errors
    }

    // 验证类
    class Validator {
        constructor(options) {
            this.element = options.element;
            this.rules = options.rules;
            this.defaultEvent = options.defaultEvent;
            this.callback = options.callback;
        }
        validate() {
            var allErrors = [];
            var handler = function(elements){
                elements.forEach(item => {
                    const attrs = Array.from(item.attributes).map(item => item.name);
                       
                    const rules = this.rules.filter(ritem => attrs.includes(ritem.rule));
                    allErrors = allErrors.concat(validHandler(item, rules));
                })
                this.callback && this.callback(allErrors)
            }
            
            handler.call(this,Array.from($("form").find("input,textarea")))

            var that = this;
            var eventHandler = function(){ handler.call(that,[item]) }
            $(this.element).find("input,textarea").each((index, item) => {
                $(item).on(item.getAttribute("trigger") || this.defaultEvent, eventHandler)
            })
            return allErrors;
        }
    }

    // 插件扩展入口
    const validator = function (opt) {
        options = opt || {};
        var defaultRules = defaultOptions.rules
        var rules = options.rules || [];
        if (rules) {
            if (toString.call(rules) === "[object Array]") {
                defaultRules = defaultRules.concat(rules)
            }
            if (toString.call(rules) === "[object Object]") {
                defaultRules.push(rules)
            }
        }
        options.rules = defaultRules;
        var errors = [];
        for (let i = 0; i < this.length; i++) {
            let element = this[i];
            var validator = $(element).data().validator;
            if (validator) {
                errors.push(validator.validate());
            }
            else {
                validator = new Validator(Object.assign({}, defaultOptions, options, { element: element }));
                $(element).data({ validator: validator })
                errors.push(validator.validate());
            }
        }
        // 支持取值和链式操作
        if(!opt){
            return errors
        }
        else{
            return this
        }
    }
    $.fn.extend({ validate: validator });

})(this.jQuery)
//===========插件ENd===========

// ========使用=============
$("form").validate({
    rules:[ { rule: 't6', pattern: /666/, message: '必须填写666' } ],
    rules:[ { rule: 't7', message: '这个规则不可能验证通过',handler:element=>false } ],
    callback:function(errors){
        console.log(errors);
    }
})

var errors = $("form").validate();
console.log(errors);
// ========使用End=============