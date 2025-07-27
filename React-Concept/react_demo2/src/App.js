import logo from './logo.svg';
import './App.css';
import Welocme from './Components/Welcome';
import Product from './Components/Product';
import Profilecard from './Components/Profilecard';
import Cards from './Components/card/Cards';

// Parent Component

/* In React, Data Flows From Parent To Child Only,
Called >> Unidirectional Data Flow */

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //       {/* Rendering The Welocme Component Twice, With Different Name Values */}
  //       {/* <Welocme name={"SALMA"}/>
  //       <Product name={"Pizza"} price={3.50}/>
  //       <Product name={"Borger"} price={5.50}/> */}
  //       <Product name={"Basta"} price={7.10}/>
  //       {/* <Cards>
  //         <Profilecard 
  //           avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s"} 
  //           name={"Salma"} 
  //           age={24} 
  //           job={"Developer"}
  //         />
  //       </Cards>

  //       <Cards name={"My Profile"}>
  //         <Profilecard 
  //           avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s"} 
  //           name={"Amal"} 
  //           age={23} 
  //           job={"Developer"}
  //         />
  //       </Cards> */}

  //       {/* <Cards name={"My Profile"} style={{backgroundColor: "#cad7c8"}}>
  //         <Profilecard 
  //           avatar={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6zpeYqtKpIWB_q0SY3NrtlQa9CEkvUtl6eA&s"} 
  //           name={"Amal"} 
  //           age={23} 
  //           job={"Developer"}
  //         />
  //       </Cards> */}
        
  //     </header>
  //   </div>
  // );

  return(
    /* <></> >> The Is A Fragment, It A Way To Return Multiple Elements Without Adding Extra HTML */
    <>
      <Product.Product name={"Basta"} price={7.10}/>
      {Product.cards}
    </>
  );
}

export default App;
