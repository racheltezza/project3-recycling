/* Step 1 import React, { Component } and axios
 *
 */
import { Descriptions, Badge } from 'antd';
import { List, Avatar } from 'antd';
import { Input } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Select } from 'antd';
const { Option } = Select;

const recyclablesData = [
  {
    title: 'Paper Products',
    avitar: 'https://png.pngtree.com/element_pic/16/11/21/311ab2bd19b1dce2bf11dc0128f91583.jpg',
    description: 'Newspaper, Envelopes, Junk Mail, Phone books, Brochures, Magazines',
  },
  {
    title: 'Cardboard Products',
    avitar: 'https://img.pngio.com/kraft-cardboard-box-cardboard-kraft-paper-management-png-image-and-clipart-box-png-260_261.png',
    description: 'Ream wrappers, File Folders, Poster Board, Frozen food boxes, Cardboard boxes, Milk cartons',
  },
  {
    title: 'Aluminum Products',
    avitar: 'https://banner2.kisspng.com/20180809/vxc/kisspng-tin-can-sublimation-aluminium-aluminum-can-lid-lata-5b6c5cf9cc7c56.3049454215338283458376.jpg',
    description: 'Milk jugs (no cartons), Water/Soda containers, Shampoo/Soap/Detergent bottles',
  },
  {
    title: 'Plastic Products',
    avitar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc6nVAuG7ZeBFVyaOq554LkdYeIcEUnnOpiVkvpsu9Urcahc77fQ',
    description: 'Aluminum beverage cans,  Food cans, Scrap metal',
   
  },
  {
    title: 'Glass Products',
    avitar: 'https://banner2.kisspng.com/20171216/20f/empty-glass-bottles-png-image-5a34eaf4b694f5.1943923715134174607479.jpg',
    description: 'Beverage containers, Glass food jars',
  },
];

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
                <Descriptions bordered>
                <Descriptions.Item label="Product">
                    <Link 
                        to="/"
                        key={item._id} 
                        to={`/users/${this.props.match.params.userId}/recyclingItems/${item._id}`}
                    >
                        {item.name}
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label="Type">{item.type}</Descriptions.Item>
                <Descriptions.Item label="Points">{item.points}</Descriptions.Item>
                </Descriptions>
            )
        })
        return (
            this.state.isNewFormShowing
            ?
            <form onSubmit={this.handleNewItemSubmit}>
                <div className="example-input">
                <label htmlFor="new-item-name">Item Name</label>
                    <Input 
                        size="large"
                        type="text" 
                        id="new-item-name" 
                        name="name" 
                        onChange={this.handleInputChange} 
                        value={this.state.newItem.name}
                    />
                </div>
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
                            <Option value ="paper">Paper</Option>
                            <Option value ="cardboard">Cardboard</Option>
                            <Option value ="aluminum">Aluminum</Option>
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

                <List
                    itemLayout="horizontal"
                    dataSource={recyclablesData}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avitar} />}
                            title={<a href="https://www.republicservices.com/recycling-guide">{item.title}</a>}
                            description={item.description}
                        />
                    </List.Item>
                    )}
                 />
            </div>
        )
    }
}
