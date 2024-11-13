(function (React, ReactDOM) {
    

    // 思路
    // 页面创建confirm容器
    // confirm逻辑，加载弹窗组件，返回Promise,
    // 点击确定resolve  Promise结果为 `ture`,
    // 点击取消resolve  Promise结果为 `false`,
    // 在window上注册confirm

    // tips
    // 由于没有使用脚手架,所以不是JSX,使用React.createElement

    var node = document.createElement('div');
    document.body.appendChild(node)

    class Confirm extends React.Component {
        render() {
            const { onConfirm, onCancel, text } = this.props
            // return (
            // <div class="confirm__layer">
            //     <div class="confirm__title">{{title}}</div>
            //     <div class="confirm__opr">
            //         <button onClick={onConfirm}>确定</button>
            //         <button onClick={onCancel}>取消</button>
            //     </div>
            // </div>)
            const button1 = React.createElement("button", { onClick: onConfirm }, "\u786E\u5B9A");
            const button2 = React.createElement("button", { onClick: onCancel }, "\u53D6\u6D88");
            const oprationBox = React.createElement("div", { className: "confirm__opr" }, button1, button2);
            const titleBox = React.createElement("div", { className: "confirm__title" }, text);
            const layer = React.createElement("div", { className: "confirm__layer" }, titleBox, oprationBox);
            return layer
        }
    }

    var confirm = function (title) {
        const handler = (r, res) => {
            r(res)
            ReactDOM.unmountComponentAtNode(node);
        }

        const text = title || "确定？";

        return new Promise((resolve, reject) => {
            const element = React.createElement(Confirm, { onConfirm: () => handler(resolve, true), onCancel: () => handler(resolve, false), text: text })
            ReactDOM.render(element, node);
        })
    }

    window.confirms = confirm

})(window.React, window.ReactDOM)
