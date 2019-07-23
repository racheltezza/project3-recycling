/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Select } from 'antd';
const { Option } = Select;

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

    handleItemTypeChange = (value) => {
        const copiedNewItem = {...this.state.newItem}
        copiedNewItem.type = value
        this.setState({newItem: copiedNewItem})
    }

    handleItemPointsChange = (value) => {
        const copiedNewItem = {...this.state.newItem}
        copiedNewItem.points = value
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
                <Link 
                to="/"
                key={item._id} 
                to={`/users/${this.props.match.params.userId}/recyclingItems/${item._id}`}
            >
                {item.name}
            </Link>
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
                <div>
                    <label htmlFor="new-item-type">Item Type</label>
                        <Select 
                            style={{ width: 120 }}
                            defaultValue="paper"
                            name="type" 
                            id="new-item-type"
                            onChange={this.handleItemTypeChange} 
                            value={this.state.newItem.type}
                        >
                            <Option value ="type">Type</Option>
                            <Option value ="paper">Paper</Option>
                            <Option value ="cardboard">Cardboard</Option>
                            <Option value ="glass">Glass</Option>
                            <Option value ="plastic">Plastic</Option>
                        </Select>
                    </div>
                <div>
                    <label htmlFor="new-item-points">Item Points</label>
                        <Select  
                            style={{ width: 120 }}
                            defaultValue="points"
                            name="points" 
                            id="new-item-points"
                            onChange={this.handleItemPointsChange} 
                            value={this.state.newItem.points}
                        >
                            <Option value ="points">Points</Option>
                            <Option value ="1">1</Option>
                            <Option value ="2">2</Option>
                            <Option value ="3">3</Option>
                            <Option value ="4">4</Option>
                        </Select>
                    </div>
                <input type="submit" value="Add Item" />
            
            </form>
            :
            <div>
                <a href="/"> Back to All Users</a>
                <h1>Recycling Items</h1>
                {recyclingItemsList}
                <button onClick={this.handleToggledNewForm}>Add Item to List</button>
            </div>
        )
    }
}
