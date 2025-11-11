// // class LinkedListNode {
// //   constructor(value, next = null) {
// //     this.value = value;
// //     this.next = next;
// //   }
// // }

// // class LinkedList {
// //   constructor() {
// //     this.head = null;
// //     this.tail = null;
// //   }
// //   //   delete() {

// //   //   }
// //   insertAfter(value, prevNode) {
// //     if (prevNode === null) {
// //       return this;
// //     }
// //     const newNode = new LinkedListNode(value);
// //     newNode.next = prevNode.next;
// //     prevNode.next = newNode;
// //     if (newNode.next === null) {
// //       this.tail = newNode;
// //     }
// //     return this;
// //   }

// //   find(value) {
// //     if (!this.head) {
// //       return this;
// //     }
// //     let currentNode = this.head;
// //     while (currentNode) {
// //       if (currentNode.value === value) {
// //         return currentNode;
// //       }
// //       currentNode = currentNode.next;
// //     }
// //     return null;
// //   }
// //   prepend(value) {
// //     const newNode = new LinkedListNode(value, this.head);
// //     this.head = newNode;
// //     if (!this.tail) {
// //       this.tail = newNode;
// //     }
// //     return this;
// //   }
// //   append(value) {
// //     const newNode = new LinkedListNode(value);
// //     if (!this.head || !this.tail) {
// //       this.head = newNode;
// //       this.tail = newNode;
// //       return this;
// //     }
// //     this.tail.next = newNode;
// //     this.tail = newNode;
// //     return this;
// //   }
// //   toArray() {
// //     const nodes = [];
// //     let currentNode = this.head;
// //     while (currentNode) {
// //       nodes.push(currentNode);
// //       console.log("currentNode", currentNode);
// //       currentNode = currentNode.next;
// //     }
// //     return nodes;
// //   }
// // }

// // const list = new LinkedList();
// // console.log(list.append(10));
// // console.log(list.append(110));
// // console.log(list.append(1102));
// // console.log(list.toArray());
// // console.log(list.head === list.tail);

// class LinkedListNode {
//   constructor(value, next) {
//     this.value = value;
//     this.next = next;
//   }
// }

// class LinkedList {
//   constructor(head, tail) {
//     this.head = head;
//     this.tail = tail;
//   }
//   append(value) {
//     const newNode = new LinkedListNode(value);
//     if (!this.head || !this.tail) {
//       this.head = newNode;
//       this.tail = newNode;
//       return this;
//     }
//     this.tail.next = newNode;
//     this.tail = newNode;
//     return this;
//   }
//   prepend(value) {
//     const newNode = new LinkedListNode(value, this.head);
//     this.head = newNode;
//     //Если элементов не было до этого
//     if (!this.tail) {
//       this.tail = newNode;
//     }
//     return this;
//   }
//   find(value) {
//     if (!this.head) {
//       return this;
//     }
//     let currentNode = this.head;
//     while (currentNode) {
//       if (currentNode.value === value) {
//         return currentNode;
//       }
//       currentNode = currentNode.next;
//     }
//     return null;
//   }
//   insertAfter(value, prevNode) {
//     if (prevNode === null) {
//       return this;
//     }
//     const newNode = new LinkedListNode(value);
//     newNode.next = prevNode.next;
//     prevNode.next = newNode;
//     if (newNode.next === null) {
//       this.tail = prevNode;
//     }
//     return this;
//   }
//   toArray() {
//     const nodes = [];
//     let currentNode = this.head;
//     while (currentNode) {
//       nodes.push(currentNode);
//       currentNode = currentNode.next;
//     }
//     return nodes;
//   }
// }

class LinkedListNode {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  insertAfter(value, prevNode) {
    if (prevNode === null) {
      return this;
    }
    const newNode = new LinkedListNode(value);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
    return this;
  }
  append(value) {
    const newNode = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }
  find(value) {
    if (!this.head) {
      return this;
    }
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  toArray() {
    if (!this.head) {
      return this;
    }
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
}
