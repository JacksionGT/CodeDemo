var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.data = [];
        this.head = null;
    }
    LinkedList.prototype.add = function (data) {
        if (this.head === null) {
            var node = {
                id: "" + Date.now(),
                data: data,
                prevNode: null,
                nextNode: null
            };
            this.head = node;
            this.data.push(node);
        }
        else {
            var nodeList = this.data;
            var node = {
                id: "" + Date.now(),
                data: data,
                prevNode: this.data[this.data.length - 1],
                nextNode: null
            };
            nodeList.push(node);
            nodeList[nodeList.length - 2].nextNode = nodeList[nodeList.length - 1];
        }
    };
    LinkedList.prototype.remove = function (data) {
        var tempHead = this.head, index = 0, nodeList = this.data;
        if (tempHead === null)
            return;
        while (Boolean(tempHead)) {
            console.log("index", tempHead.data);
            if (tempHead.data === data) {
                tempHead.prevNode.nextNode = tempHead.nextNode;
                console.log(tempHead);
                tempHead.nextNode.prevNode = tempHead.prevNode;
                tempHead = null;
                console.log(index);
                this.data = nodeList.slice(0, index).concat(nodeList.slice(index + 1));
                console.log(this.data);
                this.head = this.data.length > 0 ? this.data[0] : null;
                this.data[0].prevNode = null;
                break;
            }
            index += 1;
            tempHead = nodeList[index];
            if (index >= this.data.length - 1)
                tempHead = null;
        }
    };
    LinkedList.prototype.toString = function () {
        return JSON.stringify(this.data.map(function (_a) {
            var id = _a.id, data = _a.data;
            return ({ id: id, data: data });
        }));
    };
    return LinkedList;
}());
var testList = new LinkedList();
testList.add(1);
testList.add(2);
testList.add(3);
testList.add(4);
console.log(testList.toString());
testList.remove(3);
console.log(testList.toString());
