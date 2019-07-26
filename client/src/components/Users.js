
import { Button, Form, Input, List, Typography } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Users extends Component {

    state = {
        users: [],
        isNewFormShowing: false,
        newUser: {
            name: "",
            userName: "",
            password: "",
            city: ""
        }
    }

    componentDidMount() {
        this.getAllUsers()
    }
    
    getAllUsers = () => {
        axios.get('/api/users')
            .then((res) => {
                this.setState({users: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedNewUser = {...this.state.newUser}
        copiedNewUser[event.target.name] = event.target.value
        this.setState({newUser: copiedNewUser})
    }

    handleNewUserSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users', this.state.newUser)
        .then(() => {
            this.setState({
                isNewFormShowing: false
            })
            this.getAllUsers()
        })
    }

    handleToggledNewForm = () => {
        this.setState((state) => {
            return {isNewFormShowing: !state.isNewFormShowing}
        })
    }

    render() {
        let usersList = this.state.users.map((user) => {
            return( 
                <ul>
                    <li>
            <Link 
                className="user-links"
                to="/"
                key={user._id} 
                to={`/users/${user._id}/recyclingItems`}
            >
                {user.name}
            </Link>

                    </li>
                </ul>
            )
        })
        return (
            this.state.isNewFormShowing
            ?
            <form onSubmit={this.handleNewUserSubmit}>
                <div className="example-input">
                    <label htmlFor="new-user-name">Name</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="new-user-name" 
                            name="name" 
                            onChange={this.handleInputChange} 
                        />
                </div>
                <div className="example-input">
                    <label htmlFor="new-user-userName">Username</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="new-user-userName" 
                            name="userName" 
                            onChange={this.handleInputChange} 
                        />
                </div>
                <div className="example-input">
                    <label htmlFor="new-user-password">Password</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="new-user-password" 
                            name="password" 
                            onChange={this.handleInputChange} 
                        />
                </div>
                <div className="example-input">
                    <label htmlFor="new-user-city">City</label>
                        <Input 
                            size="large"
                            type="text" 
                            id="new-user-city" 
                            name="city" 
                            onChange={this.handleInputChange} 
                        />
                </div>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Add User
                </Button>
            </form>
            :
            <div>
                <iframe src="https://giphy.com/embed/WsG6qMO8xvR2LT4DC4" width="180" height="162" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/HelloZack-upcycle-economie-circulaire-hellozack-WsG6qMO8xvR2LT4DC4">via GIPHY</a></p>
                <h1>ALL RECYCLERS</h1>
                <Button type="primary" onClick={this.handleToggledNewForm}>Create New User</Button>
                <div className="users-list">
                    <ul>
                        <li>
                {usersList}

                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
