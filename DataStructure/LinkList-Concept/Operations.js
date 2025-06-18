const Node = require('./Node');

class Operations {
    /* Because The Constructor Runs First, We Set The Header To The Default Value.*/
    constructor(){
        this.head = null;
    }

    /* The InsertEnd Method Is Used To Add A New Node To The End Of The Linked List */
    InsertEnd(data){

        /* Create A New Node With The Given Data */
        /* The New Node Will Have Its Next Pointer Set To Null */
        let newNode = new Node(data);


        /* If The List Is Empty, Set The Head To The New Node */
        if(!this.head){
            this.head = newNode;
            /* Then Brack The if */
            return;
        }

        /* We create this valable(current) to we can walk through (traverse) it node by node.  */
        /* We Start From The Head */
        let current = this.head; 

        
        /* To Traverse To The Last Node */
        while(current.next){
            /* Set The Next Pointer Of The Last Node To The New Node */ 
            current = current.next;
            /* This Will Continue Until We Reach The Last Node, Which Has Its Next Pointer Set To Null */
        }
        /* Now We Have Reached The Last Node, So We Set Its Next Pointer To The New Node */
        current.next = newNode;
    }

    /* The Remove Method Is Used To Remove A Node From The Linked List */
    Print(){
        /* Make The Current Variable Point To The Head To Start */
        let current = this.head;

        /* This Will Check If The Head Is Null, Which Means The List Is Empty */
        if(!current){
            console.log("List Is Empty");
            return;
        }
        
        let Result = "";

        /* We Traverse The List And Save Each Node's Data In Result Variable*/
        while(current){
            Result += current.data + " -> ";
            console.log("Current Node: ", current.data);
            /* Move To The Next Node */
            current = current.next;
            /* If The Next Node Is Null, We Stop */
        }
        
        Result += "null";

        console.log("head -> ", Result);
    }

    /* The InsertFirst Method Is Used To Add A New Node To The First Of The Linked List */
    InsertFirst(data) {
        let newNode = new Node(data);

        /* Point the new node to the current head */
        newNode.next = this.head; 
        /* Update head to the new node */
        this.head = newNode;      
    }

    InsertAt(data, index) {
        /* If The Index Is Less Than 0, We Do Nothing */
        if (index < 0) {
            console.log("Index Can Not Be Negative");
            return;
        }

        /* If The Index Is 0, We Insert At The Beginning */
        if (index === 0) {
            /* Call The InsertFirst Method */
            console.log("Inserting at index 0");
            this.InsertFirst(data);
            return;
        }

        /* Create A New Node */
        let newNode = new Node(data);
        let current = this.head;

        /* Traverse To The Node Before The Index */
        for (let i = 0; i < index - 1 && current; i++) {
            /* let i = 0: Start a counter from 0.
            i < index - 1: Keep looping until we reach the node just before the target index.
            && current: Make sure current is not null — to avoid errors (end of list). */

            current = current.next;
        }

        /* If Current Is Null, It Means The Index Is Out Of Bounds */
        if (!current) {
            console.log("Index out of bounds");
            return;
        }

        /* This step links the new node to the rest of the list */
        /* We Make This Step First To Avoid Losing The Link */
        newNode.next = current.next;
        /* Now we update the link of the previous node (current) to point to the newNode */
        current.next = newNode;
    }

    /* The RemoveData Method Is Used To Remove A Node From The Linked List */
    RemoveData(data) {
        /* If The List Is Empty, We Do Nothing */
        if (!this.head) {
            console.log("List Is Empty");
            return;
        }

        /* If The Head Node Contains The Data, We Remove It */
        if (this.head.data === data) {
            this.head = this.head.next; 
            return;
        }

        let current = this.head;

        /* Traverse The List To Find The Node To Remove */
        while (current.next && current.next.data !== data) {

        /* current.next Exists (We Haven’t Reached The End), 
        And The Data Of The Next Node Is Not Equal To The Value We're Trying To Remove.*/            
            current = current.next;
        }
        /* Eventually, We Stop At The Node Just Before The One That Needs To Be Deleted.

        /* If We Found The Node, We Remove It */
        if (current.next) {
            
            /* You're Telling The current Node To Skip The Next Node, And Point To The Node After It.*/
            /* You Want To Change Its .next Pointer So It Skips Over The Node You Want To Delete.*/
            current.next = current.next.next; 
        } 
        else {
            console.log("Data Not Found");
        }
    }

}
module.exports = Operations;