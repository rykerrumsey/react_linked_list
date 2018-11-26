import React from 'react'
import { LinkedList } from './LinkedList'

export class LinkedListComp extends React.Component {
    constructor() {
        super();
        this.ll = null
        this.currentNode = null
        this.state = {
            subject: "",
            amount: "",
            node: "null"
        }
    }

    new = () => {
        this.ll = new LinkedList(this.state.subject, this.state.amount)
        this.currentNode = this.ll.head
        this.setState({
            subject: "",
            amount: "",
            node: this.formatNodeToString(this.currentNode)
        })
        this.clearInputs();
    }

    add = () => {
        if(this.currentNode === null) {
            this.ll = new LinkedList(this.state.subject, this.state.amount)
            this.currentNode = this.ll.first()
        } else {
            let newNode = this.ll.add(this.state.subject, this.state.amount)
            this.currentNode = newNode
        }

        this.setState({
            subject: "",
            amount: "",
            node: this.formatNodeToString(this.currentNode) 
        })
        this.clearInputs();
    }

    insert = () => {
        const success = this.ll.insert(this.currentNode, this.state.subject, this.state.amount)
        if(success) {
            this.currentNode = this.currentNode.next
           this.setState({
                subject: "",
                amount: "",
                node: this.formatNodeToString(this.currentNode) 
           })
        } else {
            console.error("ERROR could not insert node")
        }
       this.clearInputs();
    }

    delete = () => {
        if(this.currentNode) {
           const success = this.ll.delete(this.currentNode)
            if(success) {
                if(!this.currentNode.next)
                    this.currentNode = this.currentNode.prev
                else
                    this.currentNode = this.currentNode.next
               this.setState({
                    node: this.formatNodeToString(this.currentNode)
               })
           } else {
                console.error("ERROR could not delete node")
           }
        }
    }

    first = () => {
        if(this.currentNode) {
            this.currentNode = this.ll.first()
            this.setState({
                node: this.formatNodeToString(this.currentNode)
            })
        }
    }

    prev = () => {
        if(this.currentNode) {
            this.currentNode = this.ll.prev(this.currentNode)
            this.setState({
                node: this.formatNodeToString(this.currentNode)
            })
        }
    }

    next = () => {
        if(this.currentNode) {
            this.currentNode = this.ll.next(this.currentNode)
            this.setState({
                node: this.formatNodeToString(this.currentNode) 
            })
        }
    }

    last = () => {
        if(this.currentNode) {
            this.currentNode = this.ll.last()
            this.setState({
                node: this.formatNodeToString(this.currentNode)
            })
        }
    }

    formatNodeToString = (node) => {
        if(node === null)
            return 'null'
        else
            return `subject=${node.subject}, amount=${node.amount}`
    }

    clearInputs = () => {
        document.getElementById("newSubject").value = ''
        document.getElementById("newAmount").value = ''
    }

    onSubjectChange = (e) => {
        this.setState({
            subject: e.target.value
        })
    }

    onAmountChange = (e) => {
        this.setState({
            amount: e.target.value
        })
    }

    render() {
        return(
            <div>
                <button id="new" onClick={this.new}>New</button>
                <button id="add" onClick={this.add}>Add</button>
                <button id="add" onClick={this.insert}>Insert</button>
                <button id="add" onClick={this.delete}>Delete</button>
                <br />
                <input id="newSubject" className="inputs" type='text' placeholder="Subject" onChange={(e) => this.onSubjectChange(e)} />
                <input id="newAmount" className="inputs" type='text' placeholder="Amount" onChange={(e) => this.onAmountChange(e)}/>
                <br />
                <Display node={this.state.node}/>
                <button id="first" onClick={this.first}>First</button>
                <button id="prev" onClick={this.prev}>Prev</button>
                <button id="next" onClick={this.next}>Next</button>
                <button id="last" onClick={this.last}>Last</button>
            </div>
        )
    }
}

function Display(props) {
    return (
        <div className="display">
            <div className="display-inner display-node">{props.node}</div>
        </div>
    )
}
