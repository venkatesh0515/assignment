import React, {Component} from 'react';
import CardList from './CardList'


const validateForm = (errors) => {

    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class AddCard extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            cardnumber:"",
            limit:"",
            balance:0,
            visiblebtn:true,
            errors: {
                name: '',
                cardnumber: '',
                limit: ''
              },
            data:null,
            success:null 

        }
    }

    handleChange=(event)=>{
        // for creditcard number
        // const re = /^[0-9\b]+$/;
        const limitre=/^[1-9]\d*$/;
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        
    
        switch (name) {
          case 'name': 
            errors.name = 
              value.length < 5 && value.length > 0 
                ? 'name must be 5 characters long!'
                : '';
                
            break;
          case 'cardnumber': 
            errors.cardnumber = 
            this.checkLuhn(value)
                ? ''
                : 'card number not valid';
            break;
          case 'limit': 
            errors.limit = 
            limitre.test(value)
                ? ''
                : 'limit should greater than 0';
            break;
          default:
            break;
        }

       if(name==="limit"){
        this.setState({visiblebtn:false});   
       }
   
        this.setState({errors, [name]: value});
 
    }
    checkLuhn=(cardnumber)=>{
        if(cardnumber===""&cardnumber.length <=10){
          return false
        }
        const len=cardnumber.length;
        let nSum=0, isSecond=false;
            for (let i = len - 1; i >= 0; i--) { 
                let d = cardnumber[i] - '0';  
                if (isSecond === true) 
                    d = d * 2; 
                // We add two digits to handle 
                // cases that make two digits after 
                // doubling 
                nSum += parseInt(d / 10); 
                nSum += parseInt(d % 10); 
                console.log("this sum" +nSum +"<br>");
                isSecond = !isSecond; 
            } 
           
        return (nSum % 10 === 0); 
   
    }
    
    
    postData=(sendData)=>{
        fetch(`http://localhost:4000/api/card`,{
            method:"post",
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               },
            body:JSON.stringify(sendData)
            
            
        })
        .then(res => res.text())
        .then(text => {
             console.log(text);
            if(text === "true"){
              console.log(this.state)
            let prestate = [...this.state.data];  
            let finaldata=(this.state.data !== null)?[...prestate,...[sendData]]:sendData;
              this.setState({
               data:finaldata,
               name:"",
               cardnumber:"",
               limit:"",
               success:"card added successfully"
             },()=>{
               setTimeout(()=>{this.setState({success:null})},1000)
             })
            }
            else{
               
            }
        } ); 
    }
    


    getData= ()=>{
      fetch(`http://localhost:4000/api/cardlist`)
      .then(response => response.json())
      .then(data => { 
          
          this.setState({data:data.creditcard})})
      
    }
  
  componentDidMount(){
       this.getData()
  }

    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.state.name==="" || this.state.cardnumber==="" || this.state.limit===""){
            this.setState({visiblebtn:true});
        }
         
        if(validateForm(this.state.errors)) {
            // this.setState({visiblebtn:false})
            const sendData={
                name:this.state.name,
                cardnumber:this.state.cardnumber,
                limit:this.state.limit,
                balance:this.state.balance
    
            }
            this.postData(sendData);
        }else{
        console.error('Invalid Form')
        }
       
    }
    render(){
        const {errors} = this.state;
        return(
            <div className="add_card_block">
              <div className="add_title">Add</div>
              <form onSubmit={this.handleSubmit}>
                  <label htmlFor="name">Name</label><br />
                  <input 
                      type="text" 
                      name="name" 
                      id="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                  />
                  {errors.name.length > 0 && 
                <span className='errormsg'>{errors.name}</span>}
                  <br />
                  <label htmlFor="cardnumber">Card Number</label><br />
                  <input   
                     type="text" 
                     name="cardnumber" 
                     id="cardnumber" 
                     value={this.state.cardnumber}
                     onChange={this.handleChange}
                     maxLength="10"

                   />
                    {errors.cardnumber.length > 0 && 
                <span className='errormsg'>{errors.cardnumber}</span>}
                  <br/>
                  <label htmlFor="limit">Limit</label><br />
                  <input 
                     type="text" 
                     name="limit" 
                     id="limit" 
                     value={this.state.limit}
                     onChange={this.handleChange}
                   />
                    {errors.limit.length > 0 && 
                <span className='errormsg'>{errors.limit}</span>}
                  <br/>
                  <button type="submit" disabled={this.state.visiblebtn ? true : false}  >Add</button>
                { (this.state.success) ? <span className="errormsg">{this.state.success}</span> :"" }

              </form>
              <CardList data={this.state.data} />
            </div>
            
        )
    }
}
export default AddCard