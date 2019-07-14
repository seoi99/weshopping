import React, { Component } from 'react';
import Login from '../user/login_form'
import logo from '../../style/logo.png'
import '../../style/search_bar.css';
import { withRouter, Link } from 'react-router-dom';
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.value.length === 0) {
            this.props.fetchAll();
        } else {
            this.props.searchByProducts(this.state.value)
        }
        if (this.props.comp === "main") {
            return this.props.history.push('/products')
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        return(
          <nav className='search-bar-container row'>
            <div className="web-content col-sm-10">
            <Link to="/" className="logo"><img src={logo} alt="logo"/></Link>
            <form onSubmit={this.handleSubmit} className="search-form">
                <input type="search"
                    results="5" name="s" placeholder="Search..."

                    onChange= {this.handleChange}/>

                  <button className={`search-button`}><span><i class="fa fa-search"></i></span></button>
            </form>
            </div>
            <div className="user-content col-sm-2">
              <Login/>
            </div>
          </nav>
        )
    }
}

export default withRouter(SearchBar)
