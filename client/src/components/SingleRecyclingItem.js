
import { Button, Input, Select } from 'antd';
import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
const { Option } = Select;

export default class SingleRecyclingItem extends Component {

    state = {
        recyclingItem: {},
        isEditFormShowing: false,
        redirectToList: false
    }

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

    handleItemTypeChange = (value) => {
        const copiedRecyclingItem = {...this.state.recyclingItem}
        copiedRecyclingItem.type = value
        this.setState({recyclingItem: copiedRecyclingItem})
    }

    handleItemPointsChange = (value) => {
        const copiedRecyclingItem = {...this.state.recyclingItem}
        copiedRecyclingItem.points = value
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

    render() {
        if(this.state.redirectToList) {
            return <Redirect to={`/users/${this.props.match.params.userId}/recyclingItems`} />
        }
        return (
            this.state.isEditFormShowing
            ?
            <form onSubmit={this.handleEditSubmit}>
                <div className="example-input">
                    <label htmlFor="item-name">Item Name</label>
                    <Input 
                        size="large"
                        type="text" 
                        id="item-name" 
                        name="name" 
                        onChange={this.handleInputChange} 
                        value={this.state.recyclingItem.name}
                    />
                </div>
                <div>
                    <label htmlFor="item-type">Item Type</label>
                        <Select
                            style={{ width: 120 }}
                            name="type" 
                            id="item-type"
                            onChange={this.handleItemTypeChange} 
                            value={this.state.recyclingItem.type}
                        >
                            <Option value="paper">Paper</Option>
                            <Option value="cardboard">Cardboard</Option>
                            <Option value ="aluminum">Aluminum</Option>
                            <Option value="glass">Glass</Option>
                            <Option value="plastic">Plastic</Option>
                        </Select>
                </div>
                <div>
                    <label htmlFor="item-points">Item Points</label>
                        <Select 
                            style={{ width: 120 }}
                            name="points" 
                            id="item-points"
                            onChange={this.handleItemPointsChange} 
                            value={this.state.recyclingItem.points}
                        >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        </Select>
                    </div>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Update Item
                </Button>

            </form>
            :
            <div>
                <a class="back-link" href={`/users/${this.props.match.params.userId}/recyclingItems`}>Back to Recycling List</a>
                <ul>
                    <li>
                        <h1>{this.state.recyclingItem.name}</h1>
                    </li>
                    <li>
                        <span class="item-property">Type:</span> {this.state.recyclingItem.type}
                    </li>
                    <li>
                    <span class="item-property">Points:</span> {this.state.recyclingItem.points}
                    </li>
                </ul>
                <Button onClick={this.handleToggledEditForm}>Update This Item</Button>
                <Button type = "danger" onClick={this.handleDeleteItem}>Delete This Item</Button>
            </div>
        )
    }
}
