import React, { Component } from 'react';
import axios from 'axios';
import './STYLES/ViewInfoStyles.css';

class ViewInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { UserInfo: [] }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/view')
            .then(response => {
                // console.log(response.data)
                this.setState({ UserInfo: response.data });
                // console.log("in get")
                // console.log(this.state.student);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='table-container'>
                <h4 align="center"> User Details</h4>
                {/* {this.state.student} */}
                <table className='table table-striped' style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th> NIC No</th>
                            <th> Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.UserInfo.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.Name}</td>
                                        <td>{data.NIC}</td>
                                        <td>{data.Gender}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ViewInfo;