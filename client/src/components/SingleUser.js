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
export default class SingleCreature extends Component {

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

    

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        return (
            <div>
                <h1>User</h1>
                <h1>Name: {this.state.user.name}</h1>
                <p>Username: {this.state.user.userName}</p>
                <p>Password: {this.state.user.password}</p>
                <p>City: {this.state.user.city}</p>
            </div>
        )
    }
}
