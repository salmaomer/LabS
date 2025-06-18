/* defining a Node class the first step in building many data structures */
class Node{
    constructor(data) {
        /* The Node Have Two Part Inside It Data + Pointer*/
        /* Because It Have Pointer We Call It Node */ 
        
        /* Stores The Actual Value The Node Holds */
        this.data = data;  
        
        /* Creates A Pointer (Link) To The Next Node In The Structure */
        this.next = null;   
        
    }
}

module.exports = Node;