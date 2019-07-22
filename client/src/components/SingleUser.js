/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import {Redirect, Link} from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class SingleUser extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        user: {},
        isEditFormShowing: false,
        redirectToHome: false
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
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

    

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            this.state.isEditFormShowing
            ?
            <form onSubmit={this.handleEditSubmit}>
                <label htmlFor="user-name">User Name</label>
                <input 
                    type="text" 
                    id="user-name" 
                    name="name" 
                    onChange={this.handleInputChange}
                    value={this.state.user.name}
                />
                <label htmlFor="user-userName">User Username</label>
                <input
                    type="text"
                    id="user-userName"
                    name="userName"
                    onChange={this.handleInputChange}
                    value={this.state.user.userName}
                />
                <label htmlFor="user-password">User Password</label>
                <input
                    type="text"
                    id="user-password"
                    name="password"
                    onChange={this.handleInputChange}
                    value={this.state.user.password}
                />
                <label htmlFor="user-city">User City</label>
                <input
                    type="text"
                    id="user-city"
                    name="city"
                    onChange={this.handleInputChange}
                    value={this.state.user.city}
                />
                <input
                    type="submit"
                    value="Update User" 
                />
            </form>
            :
            <div>
                <h1>User</h1>
                <h1>Name: {this.state.user.name}</h1>
                <p>Username: {this.state.user.userName}</p>
                <p>Password: {this.state.user.password}</p>
                <p>City: {this.state.user.city}</p>
                <button onClick={this.handleToggledEditForm}>Edit User</button>
                <button onClick={this.handleDeleteUser}>Delete User</button>
            </div>
        )
    }
}
