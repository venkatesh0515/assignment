import React, {Component} from 'react';
const HeaderCols=['Name','Card Number','Balance','Limit'] ;
class CardList extends Component{

    render(){
        return(
            <div>
             <h3>{(this.props.data !== null && this.props.data.length >0) ? "Existing cards" : null}</h3>   
            <table>
            {this.props.data !== null && this.props.data.length >0 ? 
               <thead>
                <tr>
                {HeaderCols.map((name)=>(
                <th key={name}>{name}</th>
             )) }
            </tr>
            </thead> : null}
            {this.props.data ?
            <tbody>
              {this.props.data.map(card=>
              <tr key={card.cardnumber}>
                  <td>{card.name}</td>
                  <td>{card.cardnumber}</td>
                  <td>&pound;{card.limit}</td>
                  <td>&pound;{card.balance}</td>
              </tr>) }
            </tbody> : null}
            </table>
            </div>
           
        )
    }
}
export default CardList