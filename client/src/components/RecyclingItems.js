/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class RecyclingItems extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        recyclingItems: [],
        isNewFormShowing: false,
        newItem: {
            name: "",
            type: "",
            points: 0
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
        this.getAllItems()
    }
    
    getAllItems = () => {
        axios.get(`/api/users/${this.props.match.params.userId}/recyclingItems`)
            .then((res) => {
                this.setState({recyclingItems: res.data})
            })

    }

    handleInputChange = (event) => {
        const copiedNewItem = {...this.state.newItem}
        copiedNewItem[event.target.name] = event.target.value
        this.setState({newItem: copiedNewItem})
    }


    handleNewItemSubmit = (event) => {
        event.preventDefault()
        axios.post(`/api/users/${this.props.match.params.userId}/recyclingItems`, this.state.newItem)
        .then(() => {
            this.setState({
                isNewFormShowing: false
            })
            this.getAllItems()
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
        let recyclingItemsList = this.state.recyclingItems.map((item) => {
            return( 
                <ul>
                    <li>{item.name}</li>
                    <li>{item.type}</li>
                    <li>{item.points}</li>
                </ul>
            )
        })
        return (
            this.state.isNewFormShowing
            ?
            <form onSubmit={this.handleNewItemSubmit}>
                <label htmlFor="new-item-name">Item Name</label>
                    <input 
                        type="text" 
                        id="new-item-name" 
                        name="name" 
                        onChange={this.handleInputChange} 
                        value={this.state.newItem.name}
                    />
                <label htmlFor="new-item-type">Item Type</label>
                    <input 
                        type="text" 
                        id="new-item-type" 
                        name="type" 
                        onChange={this.handleInputChange} 
                        value={this.state.newItem.type}
                    />
                <label htmlFor="new-item-points">Item Points</label>
                    <input 
                        type="text" 
                        id="new-item-points" 
                        name="points" 
                        onChange={this.handleInputChange} 
                        value={this.state.newItem.points}
                    />
                <input type="submit" value="Add Item" />
            
            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                {/* <h1>{this.state.recyclingItems}</h1> */}
                <p>Recycling Items</p>
                {recyclingItemsList}
                <button onClick={this.handleToggledNewForm}>Add Item to List</button>
            </div>
        )
    }
}