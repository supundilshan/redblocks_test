import React, { Component } from 'react';
import axios from 'axios';
import './STYLES/ViewInfoStyles.css';

class ViewInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { UserInfo: [] }

    }

    // get data from API using GET method
    // store data to UserInfo
    componentDidMount() {
        axios.get('http://localhost:4000/view')
            .then(response => {
                this.setState({ UserInfo: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='table-container'>
                <h4 align="center"> User Details</h4>
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
                {/* If there are no data display no data msg */}
                {/* No data means length of UserInfo is 0 */}
                <div className='form-empty-text' style={{ display: this.state.UserInfo.length == 0 ? "" : "none" }}>
                    <h3>No records have been entered yet</h3>
                </div>
            </div>
        );
    }
}

export default ViewInfo;