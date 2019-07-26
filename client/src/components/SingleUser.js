
import { Button, Form, Input } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

export default class SingleUser extends Component {

    state = {
        user: {},
        isEditFormShowing: false,
        redirectToHome: false
    }

    componentDidMount() {
        axios.get(`/api/users/${this.props.match.params.userId}`)
            .then((res) => {
                this.setState({user: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedUser = {...this.state.user}
        copiedUser[event.target.name] = event.target.value
        this.setState({user: copiedUser})
    }

    handleEditSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/users/${this.state.user._id}`, this.state.user)
        .then((res) => {
            this.setState({
                user: res.data,
                isEditFormShowing: false
            })
        })
    }

    handleToggledEditForm = () => {
        this.setState((state) => {
            return {isEditFormShowing: !state.isEditFormShowing}
        })
    }

    handleDeleteUser = () => {
        axios.delete(`/api/users/${this.state.user._id}`)
        .then(() => {
            this.setState({redirectToHome: true})
        })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            this.state.isEditFormShowing
            ?
            <form onSubmit={this.handleEditSubmit}>
                <div className="example-input">
                    <label htmlFor="user-name">Name</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="user-name" 
                            name="name" 
                            onChange={this.handleInputChange} 
                            value={this.state.user.name}
                        />
                </div>
                <div className="example-input">
                    <label htmlFor="user-userName">Username</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="user-userName" 
                            name="userName" 
                            onChange={this.handleInputChange} 
                            value={this.state.user.userName}
                        />
                </div>
                <div className="example-input">
                    <label htmlFor="user-password">Password</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="user-password" 
                            name="password" 
                            onChange={this.handleInputChange} 
                            value={this.state.user.password}
                        />
                </div>
                <div className="example-input">
                    <label htmlFor="user-city">City</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="user-city" 
                            name="city" 
                            onChange={this.handleInputChange} 
                            value={this.state.user.city}
                        />
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Update User
                </Button>
            </form>
            :
            <div>
                <Link  class="back-link" to={`/users/${this.props.match.params.userId}/recyclingItems`}>Back to Recyling List</Link>
                <h1>{this.state.user.name}</h1>
                <div class="user-detail-items">
                <p><span class="item-property">Username:</span> {this.state.user.userName}</p>
                <p><span class="item-property">Password:</span> {this.state.user.password}</p>
                <p><span class="item-property">City:</span> {this.state.user.city}</p>
                </div>
                <Button onClick={this.handleToggledEditForm}>Edit User</Button>
                <Button type = "danger" onClick={this.handleDeleteUser}>Delete User</Button>
            </div>
        )
    }
}
