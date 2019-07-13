import React, { Component } from 'react';
import Login from '../user/login_form'
import logo from '../../style/logo.png'
import '../../style/search_bar.css';
import { withRouter, Link } from 'react-router-dom';
import '../../style/main.css'
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
          <nav className='row search-bar-container'>
            <div className="col-sm-8 logo-search">
            <div><Link to='/'><img src={logo} alt="logo" className='logo'/></Link></div>
            <form onSubmit={this.handleSubmit}>
                <input type="search"
                    results="5" name="s" placeholder="Search..."
                    className={`col-sm-6 input`}
                    onChange= {this.handleChange}/>

                  <button className={`search-button`}><span><i class="fa fa-search"></i></span></button>
            </form>
            </div>
            <Login className='col-sm-2 '/>
          </nav>
        )
    }
}

export default withRouter(SearchBar)
