import React, { Component } from 'react';
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

    componentDidMount() {
        if (this.props.id) {
            this.props.requestFavList(this.props.id);
        }
    }
    handleSubmit(e) {
        e.preventDefault()
        if (this.state.value.length === 0) {
            this.props.fetchAll();
        } else {
            this.props.searchByProducts(this.state.value)
        }
        return this.props.history.push(`/productlists/${this.state.value}`)
    }

    handleChange(e) {
        this.setState({value: e.target.value})
    }

    render() {
        const mainTheme = this.props.comp === 'main' ? (<h2>Shop at the Best Price at the Right Time</h2>) : <span></span>
        return(
            <nav>
                <div className={`web-content ${this.props.comp}-search-container`}>
                    <Link to="/" className={`${this.props.comp}-logo`}><img src={logo} alt="logo"/></Link>
                    {mainTheme}
                    <form onSubmit={this.handleSubmit} className={`search-form ${this.props.comp}-form`}>
                        <input type="search"
                            results="5" name="s" placeholder="Search..."

                            onChange= {this.handleChange}></input>
                        <button className={`search-button`}><span><i className="fa fa-search"></i></span></button>
                    </form>
                </div>
                <div className="user-content">
                </div>
            </nav>
        )
    }
}

export default withRouter(SearchBar)
