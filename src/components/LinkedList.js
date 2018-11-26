export class Node {
    constructor(subject, amount) {
        this.subject = subject;
        this.amount = amount;
        this.next = null;
        this.prev = null;
    }
}

export class LinkedList {
    constructor(subject, amount) {
        this.head = new Node(subject, amount)
        this.length = 1;
        this.tail = this.head;
    }

    // add an element to the end of the linked list
    add(subject, amount) {
        const node = new Node(subject, amount);

        if (!this.head) {
          this.head = node;
          this.tail = this.head;
        } else {
            this.tail.next = node;
            node.prev = this.tail
            this.tail = node;
        }
        this.length += 1;

        return node
    }

    insert(node, subject, amount) {
        if(node.next === null) return false

        const insertedNode = new Node(subject, amount)
        const tail = node.next

        tail.prev = insertedNode
        insertedNode.next = tail
        insertedNode.prev = node
        node.next = insertedNode
        this.length++;

        return true
    }

    delete(node) {
        if(node === null) return false
        if(node.next === null  && node.prev === null) {
        console.log("ALL was NULL")
            this.head = null
            this.tail = null
        } else if(node.next === null) {
        console.log("Next was NULL")
            this.tail = node.prev
            this.tail.next = null
        } else if(node.prev === null) {
        console.log("PREV was NULL")
            this.head = node.next
            this.head.prev = null
        } else {
        console.log("WE ARE IN THE MIDDLE")
            let prevNode = node.prev
            let nextNode = node.next
            prevNode.next = nextNode
            nextNode.prev = prevNode
        }
        this.length--
        return true
    }

    first() {
        return this.head
    }

    prev(node) {
        if(node.prev === null) return this.tail
        return node.prev
    }

    next(node) {
       if(node.next === null) return this.head
        return node.next 
    }

    last() {
        return this.tail
    }
}
