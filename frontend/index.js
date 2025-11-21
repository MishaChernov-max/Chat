class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
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
  toArray() {
    if (!this.head) {
      return [];
    }
    const nodes = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }
  find(value) {
    if (!this.head) {
      return null;
    }
    let currentNode = this.head;
    while (currentNode) {
      if (value === currentNode.value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  insertAfter(value, prevNode) {
    const newNode = new LinkedListNode(value);
    newNode.next = prevNode.next;
    prevNode.next = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    return this;
  }
  delete(value) {
    if (!this.head) {
      return null;
    }
    let deletedNode;
    if (this.head === value && this.head) {
      deletedNode = this.head;
      this.head = this.head.next;
      return deletedNode;
    }
    let currentNode = this.head;
    while (currentNode.next) {
      console.log("NEXT", currentNode.next);
      if (currentNode.next.value === value) {
        deletedNode = currentNode.next;
        currentNode.next = currentNode.next.next; //2 должна смениться на null
        console.log("Найденное значение", currentNode.next);
        if (!currentNode.next) {
          console.log("Попадаю в хвост", currentNode);
          this.tail = currentNode;
        }
        return deletedNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
  reverse() {
    let currentNode = this.head;
    let prev = null;
    this.tail = this.head;
    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.next = prev;
      prev = currentNode;
      currentNode = nextNode;
    }
    this.head = prev;
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
console.log("list", list);
list.reverse(2);
console.log("list", list);
