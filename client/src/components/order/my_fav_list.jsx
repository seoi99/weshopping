import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class MyFavList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myList: []
        }
    }

    render() {
        const myList = this.state.myList.map(el => {
            return (
                <div>
                    <p>el.name</p>
                </div>
            )
        })
        return (
            <div>
                {myList}
            </div>
        )
    }
}

const msp = (state, ownProps) => {
    return {
        path: !!ownProps,
    }
}

export default connect(msp, null)(MyFavList);
