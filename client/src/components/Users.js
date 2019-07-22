/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class Users extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
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

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
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
    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        let usersList = this.state.users.map((user) => {
            return( 
            <Link 
                to="/"
                key={user._id} 
                to={`/users/${user._id}/recyclingItems`}
            >
                {user.name}
            </Link>
            )
        })
        return (
            this.state.isNewFormShowing
            ?
            <form onSubmit={this.handleNewUserSubmit}>
                <label htmlFor="new-user-name">User Name</label>
                <input 
                    type="text" 
                    id="new-user-name" 
                    name="name"
                    onChange={this.handleInputChange}
                    value={this.state.newUser.name}
                />
                <label htmlFor="new-user-username">Username</label>
                <input 
                    type="text" 
                    id="new-user-username"
                    name="userName"
                    onChange={this.handleInputChange}
                    value={this.state.newUser.userName}
                />
                <label htmlFor="new-user-password">Password</label>
                <input 
                    type="text" 
                    id="new-user-password" 
                    name="password" 
                    onChange={this.handleInputChange}
                    value={this.state.newUser.password}
                />
                <label htmlFor="new-user-city">City</label>
                <input 
                    type="text" 
                    id="new-user-city" 
                    name="city" 
                    onChange={this.handleInputChange}
                    value={this.state.newUser.city}
                />
                <input type="submit" value="Add User" />
            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>All Users</h1>
                {usersList}
                <button onClick={this.handleToggledNewForm}>Create New User</button>
            </div>
        )
    }
}
