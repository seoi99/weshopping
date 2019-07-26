import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {logout, googlelogout, sendGreeting} from '../../actions/user_action';
import { openModal, closeModal } from '../../actions/modal_action';
import '../../style/session_form.css'

class SessionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: '', toggle: false
        }
    }
    toggleName() {
        this.setState({toggle: !this.state.toggle})
    }
    greetingForm() {
        this.props.closeModal();
        const logoutForm = this.props.google ?
            <button onClick={() => this.props.googlelogout()}>Logout</button>
            : <button onClick={() => this.props.logout()}>Logout</button>
        return (
            <div className="dropdown">
                <span>Hi, {this.props.user}</span>
                <form className="drop-toggle">
                    <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
                    <div className="dropdown-content">
                        <Link to='/favorite'><div>Favorite</div></Link>
                        <button onClick={() => this.props.sendGreeting(this.props.email)}>Subscribe</button>
                        {logoutForm}
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return this.props.user ? this.greetingForm() :
            (
                <div className={`${this.props.comp}-button`}>
                    <button onClick={() => this.props.openModal('login')}>Sign In</button>
                </div>
            )
    }
}

const msp = (state, ownProps) => {
    return {
        user: state.session.user.name,
        email: state.session.user.email,
        google: state.session.user.googleid,
    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        sendGreeting: (email) => dispatch(sendGreeting(email)),
        googlelogout: () => dispatch(googlelogout()),
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),

    }
}

export default connect(msp,mdp)(SessionForm)
