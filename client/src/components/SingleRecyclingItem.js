/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'

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
                this.setState({message: res.data})
            })
    }

    handleInputChange = (event) => {
        const copiedRecyclingItem = {...this.state.recyclingItem}
        copiedRecyclingItem[event.target.name] = event.target.value
        this.setState({recyclingItem: copiedRecyclingItem})
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        return (
            this.state.isEditFormShowing
            ?
            <form>

            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>Single Item</h1>
            </div>
        )
    }
}