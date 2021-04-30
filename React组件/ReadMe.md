# React 组件 confirm

## 需求
要求实现一个满足以下要求的confirm方法组件：
* （1）能在任意组件(示例如下)的componentDidMount生命周期中挂载，并返回一个promise；
* （2）能通过该promise返回的结果判断confirm组件是否成功挂载。

``` js
async componentDidMount(){
    let res = await confirm("确定删除吗")
    if(res) {
        console.log("是")
    } else {
        console.log("否")
    }
}
```

## 思路分析
* 组件支持函数调用,该组件接口应该向外暴露一个函数
* 组件返回一个Promise,可以理解为向外暴露的函数返回了一个Promise
* 可能需要用到的API:React.render,Promise内部渲染confirm组件
* 按照交互习惯,组件应该提供两个操作:`确定`按钮和`取消`按钮.
* 组件实现时,应该3个必要的Props:onConfirm/onCancel/title

## 实现
实现过程见当前目录下[confirm.js](https://github.com/JacksionGT/felesons/blob/master/React%E7%BB%84%E4%BB%B6/confirm.js)

## 实现过程中遇到的坑
由于我个人觉得这个需求比较简单,所以不想使用JSX+babel的一套。因此必不可少地需要使用React.createElement这个方法来创建React DOM。本身JSX 元素只是调用 React.createElement(type, props, ...children) 的语法糖。如果参数不当就会抛出异常，导致程序出错，相关异常在下面介绍参数时会介绍。React.createElement 函数接收3个参数，返回一个React 元素实例。函数对参数的类型要求如下

### type 参数
这个参数是必需参数，参数的值可以是一个HTML元素的标签名(String)，React 组件类型 类组件(class)或者是函数式组件(function)，或是 React fragment 类型。
***
如果标签名(String)对应的HTML元素是自闭合的(比如`input`,`img`,`br`),React将抛出如下异常：
``` js
// 出现错误的语法
React.createElement('br',null,null)
// # 生产环境
Error: Minified React error #137; visit https://reactjs.org/docs/error-decoder.html?invariant=137&args[]=br&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings
// # 开发环境
Uncaught Error: br is a void element tag and must neither have 'children' nor use 'dangerouslySetInnerHTML'
```
### props 参数
这个参数不是必需的，接受一个`Object`对象
### ...children 参数
这个参数不是必需的，注意这参数前面有`...`，这个`...`表示children是一个rest参数。children可以接受任意多个`React元素`作为当前React DOM的children。children还可以接受一个包含任意多个`React元素`的数组。
***
当children为一个`React元素`数组时，应该为每一个`React元素`设置key属性，这将有助于React优化性能。如果不设置将在开发时，抛出警告。

``` js
// 出现警告的语法
var list = [
    React.createElement('div',null,null),
    React.createElement('div',null,null)
]
// 修正
var list = [
    React.createElement('div',{key:1}),
    React.createElement('div',{key:2})
]
```

如果将一个Object传递给children 参数，将会抛出如下异常
``` js
// 出现错误的语法
React.createElement('div',null,{title:""})
// 开发环境
Uncaught Error: Objects are not valid as a React child (found: object with keys {title}). If you meant to render a collection of children, use an array instead.
    in div
// 生产环境
react-dom.production.min.js:110 Error: Minified React error #31; visit https://reactjs.org/docs/error-decoder.html?invariant=31&args[]=object%20with%20keys%20%7Btitle%7D&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings. 
```
