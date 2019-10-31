import React, { Component} from 'react';
import Header from './components/Header';
import AddCard from './components/AddCard';

import './App.css';



class App extends Component{
constructor(props){
  super(props);
  this.state={
    cardlist:""
  }
}

componentDidMount(){
  // this.getData();

}

render(){
  return(
    <div className="wrapper">
      <Header />
      <AddCard   />
      
    </div>
  )
}
}

export default App;
