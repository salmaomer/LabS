/* Use The Destructuring Props Concept */
// function Product({ name, price }) {
//   /* Product Component, It Accepts Two Parameters: name And price */
//   return (
//     /* Using Inline Styles For The Component */
//     <div style={{ border: "1px solid white", padding: "10px", margin: "10px" }}>
//       <h2>{name}</h2>
//       <p>Price: {price} JD</p>
//     </div>
//   );
// }

import Cards from "./card/Cards";
import Profilecard from "./Profilecard";

// function Product({ name, price }) {
//   return (
//     <div style={{ border: "1px solid white", padding: "10px", margin: "10px" }}>
//       <h2>{name}</h2>
//       <p>Price: {price} JD</p>
//       {/* We Can't Pass Anything Here, But It Will Override The Children Props. */}
//       <Cards children={
//         <Profilecard 
//             avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s"} 
//             name={"Amal"} 
//             age={23} 
//             job={"Developer"}
//           /> }>
//         test       
//       </Cards>
//     </div>
//   );
// }

const cards = ( 
  <Cards children={
    <Profilecard 
      avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s"} 
       name={"Amal"} 
      age={23} 
      job={"Developer"}
    /> }>              
  </Cards>
);

function Product({ name, price }) {
  return (
    <div style={{ border: "1px solid white", padding: "10px", margin: "10px" }}>
      <h2>{name}</h2>
      <p>Price: {price} JD</p>
     
    </div>
  );
}

const obj = {
  Product, cards
}

export default obj;