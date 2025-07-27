// Child Component

/* Functional Component, It Accepts One Parameter: props (Short For Properties). */
function Welcome(props) {
  /* props >> Is An Object That Holds Data Passed To The Component From A Parent ,
  (like <Welocme name="Salma" />). */
  /* props >> Allows Your Component To Be Dynamic And Reusable */
  /* props.name >> Is Evaluated Dynamically. */
  return <h2>Welcome to my code {props.name} ..</h2>
}

/* props Are Read-Only >> Mean: You Cannot Modify props Inside A Component. */

/* The Second Method */
/* Call >> Destructuring Props */
// function Welocme({ name }) {
//   return <h2>Welcome to my code {name} ..</h2>;
// }

export default Welcome;