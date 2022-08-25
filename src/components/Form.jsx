import React, { Component } from 'react';
import axios from 'axios';

import './STYLES/FormStyles.css'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            NIC: '',
            Gender: '',
            nameValidationERROR: false,
            nicValidationERROR: false
        }
    }

    // Validate user name >> user nama must contain letters and space only
    validateUserName = () => {
        let validname = /^[A-Za-z\s]*$/;
        // /^[A-Za-z\s]*$/ will match any letter from a to z and spaces
        // If user name only contains letters and spaces
        // set nameValidationERROR as false >> I.e no validation errors
        if (validname.test(this.state.Name)) {
            this.setState({ nameValidationERROR: false })
        }
        else { this.setState({ nameValidationERROR: true }) }
    }

    // validate NIS >> NIC must contain numbers and letters only
    // for srilankan standerds NIC have 10 charactors and first 9 must numbers
    // And last charactor must numbetr or digit
    validateNIC = () => {

        // /^[0-9]*$/ will match any numbers 0 to 9
        let validnic_firstpart = /^[0-9]*$/;

        // /^[A-Za-z]*$/ will match any letter from a to z and numbers from 0 to 9
        let validnic_lastpart = /^[A-Za-z0-9]*$/;

        let firstCharactors = this.state.NIC.substring(0, 9); //First part of NIC
        let lastCharactor = this.state.NIC.substring(9, 10); //Second part of NIC

        // **if nis has numbers and letters AND ** if the last element is number or character
        // set nicValidationERROR as false >>> I.e no validation errors
        if (validnic_firstpart.test(firstCharactors) && validnic_lastpart.test(lastCharactor)) {
            this.setState({ nicValidationERROR: false })
        }
        else { this.setState({ nicValidationERROR: true }) }
    }

    // If field is ampty it returns true
    checkEmptyFields = () => {
        if (this.state.Name == '' || this.state.NIC == '' || this.state.Gender == '' || this.state.NIC.length != 10) {
            return true;
        }
        else { return false }
    }

    resetState = () => {
        this.setState({
            Name: '',
            NIC: '',
            Gender: '',
            nameValidationERROR: false,
            nicValidationERROR: false
        })
    }

    onChangehandler = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        }, () => {
            // validate the user name while he typing the name
            this.validateUserName();
            // validate the NIC while he typing the NIC
            this.validateNIC();
        });
    }

    submitHandler = (e) => {

        // Form cannot submit with empty fields
        if (this.checkEmptyFields()) {
            e.preventDefault();
            alert("Please fill in all fields");

        }
        // form cannot submit with errors >> name validation errors and NIC validation errors
        else if (this.state.nameValidationERROR || this.state.nicValidationERROR) {
            e.preventDefault();
            alert("Please correct the mistakes");
        }
        // form only dubmit with errorless and complete fields
        else {
            // store nessasary data on object
            const obj = {
                Name: this.state.Name,
                NIC: this.state.NIC,
                Gender: this.state.Gender,
            };

            // send object data to backend
            // back end API runs on localhost and 4000 port
            axios({
                method: 'post',
                url: 'http://localhost:4000/add',
                data: obj,
                })
                .then(function (response) {
                    //handle success
                    console.log(response);
                })
                .catch(function (error) {
                    //handle error
                    console.log(error);
                });

            // after successfull submition >> reset state
            this.resetState();

        }
    }

    render() {
        return (
            <div className='form-container'>
                <h4> Enter user details </h4>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label> Name : </label>
                        <input
                            className="form-control"
                            name='Name'
                            type="text"
                            onChange={this.onChangehandler}
                            placeholder="Please enter your name"
                        />
                    </div>
                    {/* if the name in incorrect format display error msg */}
                    <p className='Worning-name' style={{ color: "red", display: this.state.nameValidationERROR ? "block" : "none" }}> * The name must contain only letters </p>
                    <div className="form-group">
                        <label> NIC : </label>
                        <input
                            className="form-control"
                            name='NIC'
                            type="text"
                            maxLength={10}
                            onChange={this.onChangehandler}
                            placeholder="Please enter your NIC number"
                        />
                    </div>
                    {/* if the nic in incorrect format display error msg */}
                    <p className='Worning-name' style={{ color: "red", display: this.state.nicValidationERROR ? "block" : "none" }}> * Please enter the valid number on your National Identity Card. </p>
                    <div className="form-group">
                        <label> Gender : </label>
                        <select className="form-control gender-options" name='Gender' value={this.state.Gender} onChange={this.onChangehandler}>
                            <option value="">Please select your gender.. </option>
                            <option value="Male"> Male </option>
                            <option value="Female"> Female </option>
                            <option value="Non-binary"> Non-binary </option>
                            <option value="Transgender"> Transgender </option>
                            <option value="Intersex"> Intersex </option>
                            <option value="I prefer not to say"> I prefer not to say </option>
                        </select>
                    </div>
                    <div className="btns">
                        <input className='btn btn-outline-danger button' type="reset" value="Clear" onClick={this.resetState} />
                        <input className='btn btn-outline-success button' type="submit" value="Add" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;