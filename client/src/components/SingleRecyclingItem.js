/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class SingleRecyclingItem extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        recyclingItem: {},
        isEditFormShowing: false,
        redirectToList: false
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        axios.get(`/api/users/${this.props.match.params.userId}/recyclingItems/${this.props.match.params.itemId}`)
            .then((res) => {
                this.setState({recyclingItem: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedRecyclingItem = {...this.state.recyclingItem}
        copiedRecyclingItem[event.target.name] = event.target.value
        this.setState({recyclingItem: copiedRecyclingItem})
    }


    handleEditSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/users/${this.props.match.params.userId}/recyclingItems/${this.props.match.params.itemId}`, this.state.recyclingItem)
        .then((res) => {
            this.setState({
                recyclingItem: res.data,
                isEditFormShowing: false
            })
        })
    }

    handleToggledEditForm = () => {
        this.setState((state) => {
            return {isEditFormShowing: !state.isEditFormShowing}
        })
    }

    handleDeleteItem = () => {
        axios.delete(`/api/users/${this.props.match.params.userId}/recyclingItems/${this.props.match.params.itemId}`)
        .then(() => {
            this.setState({redirectToList: true})
        })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        if(this.state.redirectToList) {
            return <Redirect to="/users/:userId/recyclingItems" />
        }
        return (
            this.state.isEditFormShowing
            ?
            <form onSubmit={this.handleEditSubmit}>
                <label htmlFor="item-name">Item Name</label>
                    <input 
                        type="text" 
                        id="item-name" 
                        name="name" 
                        onChange={this.handleInputChange} 
                        value={this.state.recyclingItem.name}
                    />
                <label htmlFor="item-type">Item Type</label>
                    <input 
                        type="text" 
                        id="item-type" 
                        name="type" 
                        onChange={this.handleInputChange} 
                        value={this.state.recyclingItem.type}
                    />
                <label htmlFor="item-points">Item Points</label>
                    <input 
                        type="text" 
                        id="item-points" 
                        name="points" 
                        onChange={this.handleInputChange} 
                        value={this.state.recyclingItem.points}
                    />
                <input type="submit" value="Update Item" />

            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                <a href="#">Back to Recycling List</a>
                <h1>Single Item</h1>
                {this.state.recyclingItem.name}
                <button onClick={this.handleToggledEditForm}>Update This Item</button>
                <button onClick={this.handleDeleteItem}>Delete This Item</button>
            </div>
        )
    }
}
