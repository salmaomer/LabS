import './Cards.css';

/* In React, children Is A Special prop. */
/* It Represents Any Content Placed Between The Opening And Closing Tags Of A Component. */
// function Cards({children}) {
//     return <div className="cards">{children}</div>;
// }

// function Cards({name, children}) {
//     return ( 
//         <div className="cards">
//             <h2>{name}</h2>
//             {children}
//         </div>
//     );
// }


function Cards({name, children, style}) {
    return ( 
        /* style={style} >> We Passed A Parameter To Override The Style*/
        <div className="cards" style={style}>
            <h2>{name}</h2>
            {children}

        </div>
    );
}

export default Cards;