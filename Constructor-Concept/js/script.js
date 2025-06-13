/* Constructor */

function Coffee(name, size, price) {
    this.name = name;
    this.size = size;
    this.price = price;

    this.describe = function() {  // method attached to object
        return `${this.name} ${this.size} ${this.price}`;
    }
}

/*const order = new Coffee("latte", "small", 1.5);  //constructor call
console.log(order.describe()); // method call*/


const Form = document.getElementById("orderform");
const OrderList = document.getElementById("orderlist");

const OrderArray =[];

Form.addEventListener("submit",
    function (Event){
        
        Event.preventDefault();

        const Name = document.getElementById("name").value;
        const Size = document.getElementById("size").value;
        const Price = document.getElementById("price").value;
        
        const newoder = new Coffee(Name,Size,Price);

        OrderArray.push(newoder);
        
        RanderData();
        
    }
);

function RanderData(){
    const ListElement = document.createElement("li");

    OrderArray.forEach(
        (orders)=>{
            ListElement.innerHTML=` ${orders.name} ${orders.size} ${orders.price}`;

            OrderList.appendChild(ListElement);
        }
    );
}