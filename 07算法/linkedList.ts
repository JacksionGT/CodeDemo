interface ListNode {
  id: string;
  data: any;
  prevNode: ListNode;
  nextNode: ListNode;
}

class LinkedList {
  data: ListNode[] = [];
  head: ListNode = null;
  add(data: any) {
    if (this.head === null) {
      const node: ListNode = {
        id: `${Date.now()}`,
        data,
        prevNode: null,
        nextNode: null,
      };
      this.head = node;
      this.data.push(node);
    } else {
      const nodeList = this.data;
      const node: ListNode = {
        id: `${Date.now()}`,
        data,
        prevNode: this.data[this.data.length - 1],
        nextNode: null,
      };
      nodeList.push(node);
      nodeList[nodeList.length - 2].nextNode = nodeList[nodeList.length - 1];
    }
  }
  remove(data: any) {
    let tempHead = this.head,
      index = 0,
      nodeList = this.data;
    if (tempHead === null) return;
    while (Boolean(tempHead)) {
      if (tempHead.data === data) {
        tempHead.prevNode.nextNode = tempHead.nextNode;
        tempHead.nextNode.prevNode = tempHead.prevNode;
        tempHead = null;
        this.data = nodeList.slice(0, index).concat(nodeList.slice(index + 1));
        this.head = this.data.length > 0 ? this.data[0] : null;
        this.data[0].prevNode = null;
        break;
      }
      index += 1;
      tempHead = nodeList[index];
      if (index >= this.data.length - 1) tempHead = null;
    }
  }

  toString() {
    return JSON.stringify(this.data.map(({ id, data }) => ({ id, data })));
  }
}

const testList = new LinkedList();
testList.add(1);
testList.add(2);
testList.add(3);
testList.add(4);
console.log(testList.toString());

testList.remove(3);
console.log(testList.toString());
