import React, { Component } from 'react';
import { connect } from 'react-redux';
import {logout, googlelogout} from '../../actions/user_action';
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
            <div>
                <h1>Hi {this.props.user}</h1>
                {logoutForm}
            </div>
        )
    }

    render() {
        return this.props.user ? this.greetingForm() :
            (
                <div>
                    <button onClick={() => this.props.openModal('login')}>Sign In</button>
                </div>
            )
    }
}

const msp = (state, ownProps) => {
    console.log(state.session.ui);
    return {
        user: state.session.user.email,
        google: state.session.user.googleid,
    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        googlelogout: () => dispatch(googlelogout()),
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),

    }
}

export default connect(msp,mdp)(SessionForm)
