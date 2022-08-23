import React, { Component } from 'react';

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
        // /^[A-Za-z\s]*$/ will match any letter from a to z while
        if (!validname.test(this.state.Name)){
            this.setState({nameValidationERROR: true})
        }
        else{this.setState({nameValidationERROR: false})}
    }

    onChangehandler = (e) =>{
        const {name,value} = e.target
        this.setState({
            [name]:value
        },()=>{
            // validate the user name
            this.validateUserName();

            if (this.state.NIC.length > 10){
                this.setState({ nicValidationERROR: true })
            }
            else{this.setState({ nicValidationERROR: false })}

            // console.log(this.state.NIC);
            console.log(this.state.NIC.length)
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
    
    render() {
        return (
            <div>  
                <form>
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
                        // value={this.state.NIC}
                        onChange={this.onChangehandler}
                        placeholder="Please enter your NIC number"
                        />
                    </div>
                    <p className='Worning-name' style={{color: this.state.nicValidationERROR? "red":"blue"}}> * Invalid NIC format, please check and enter correct NIC number</p>
                    <div className="form-group">
                        <label> Gender : </label>
                        <select className="form-control" name='Gender' onChange={this.onChangehandler}>
                            <option selected> Please select your gender </option>
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