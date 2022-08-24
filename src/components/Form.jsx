import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state={
            Name:'',
            NIC:'',
            Gender:'',
            nameValidationERROR: false,
            nicValidationERROR: false
        }    
    }

    validateUserName =()=>{
        let validname = /^[A-Za-z\s]*$/; 
        // /^[A-Za-z\s]*$/ will match any letter from a to z
        if (!validname.test(this.state.Name)){
            this.setState({nameValidationERROR: true})
        }
        else{this.setState({nameValidationERROR: false})}
    }

    validateNIC = () =>{
        let validnic = /^[A-Za-z0-9]*$/; 
        // /^[A-Za-z0-9]*$/ will match any letter from a to z and numbers 0 to 9
        if (!validnic.test(this.state.NIC)){
            this.setState({ nicValidationERROR: true })
        }
        else{this.setState({ nicValidationERROR: false })}
    }

    onChangehandler = (e) =>{
        const {name,value} = e.target
        this.setState({
            [name]:value
        },()=>{
            // validate the user name and NIC
            this.validateUserName();
            this.validateNIC();
        });
    }

    resetState = () =>{
        this.setState({
            Name:'',
            NIC:'',
            Gender:'',
            nameValidationERROR: false,
            nicValidationERROR: false
        })
    }

    checkEmptyFields = () =>{
        if(this.state.Name =='' || this.state.NIC=='' || this.state.Gender=='' || this.state.NIC.length!=10){
            return true;
            // alert("please fill all fields");
        }
        else{return false}
    }

    submitHandler = (e) =>{
        e.preventDefault();
        // let isEmpty = checkEmptyFields();
        if (this.checkEmptyFields()){
            alert("please fill all fields");
        }
        else{
            // if all the validations are passed we store data to db
            const obj = {
                Name : this.state.Name,
                NIC : this.state.NIC,
                Gender : this.state.Gender,
            };
    
            // console.log(obj);
            // send data to backend
            axios.post('http://localhost:4000/student/add', obj).then(res=>console.log(res.data));
            
            // after successfull adding we reset state 
            this.setState({
                Name:'',
                NIC:'',
                Gender:'',
                nameValidationERROR: false,
                nicValidationERROR: false
            })
        }

        this.checkEmptyFields();


    }
    
    render() {
        return (
            <div>  
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label> Name : </label>
                        <input
                        className="form-control"
                        name='Name'
                        type="text"
                        // value={this.state.Name}
                        onChange={this.onChangehandler}
                        placeholder="Please enter your name"
                        />
                    </div>
                    <p className='Worning-name' style={{color:"red",display: this.state.nameValidationERROR? "block":"none"}}> * The name must contain only letters </p>
                    <div className="form-group">
                        <label> NIC : </label>
                        <input
                        className="form-control"
                        name='NIC'
                        type="text"
                        maxLength={10}
                        // value={this.state.NIC}
                        onChange={this.onChangehandler}
                        placeholder="Please enter your NIC number"
                        />
                    </div>
                    <p className='Worning-name' style={{color:"red", display: this.state.nicValidationERROR? "block":"none"}}> * Invalid NIC format, please check and enter correct NIC number</p>
                    <div className="form-group">
                        <label> Gender : </label>
                        <select className="form-control" name='Gender' value={this.state.Gender}  onChange={this.onChangehandler}>
                            <option> Please select your gender </option>
                            <option value="Male"> Male </option>
                            <option value="Female"> Female </option>
                            <option value="Non-binary"> Non-binary </option>
                            <option value="Transgender"> Transgender </option>
                            <option value="Intersex"> Intersex </option>
                            <option value="I prefer not to say"> I prefer not to say </option>
                        </select>
                    </div>
                    <input type="reset" value="Clear" onClick={this.resetState}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
        );
    }
}

export default Form;