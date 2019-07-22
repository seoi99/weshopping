import React from 'react';
import { openModal, closeModal } from '../../actions/modal_action';
import { connect } from 'react-redux';
import LoginForm from '../user/login_form';
import SignUp from '../user/signup_form';
import '../../style/modal.css';
import { loginUser, signup} from '../../actions/user_action';

const Modal = ({modal,openModal ,closeModal, loginUser, signup, otherForm}) => {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
    case 'login':
        component = <LoginForm loginUser={loginUser} closeModal={closeModal}/>;
        break;
    case 'Sign Up':
        component = <SignUp signup={signup} closeModal={closeModal}/>;
        break;
    default:
        return null;
    }
    const other = modal === "login" ? "Sign Up" : 'login'
    const context = modal === "login"? "Don't have an account?" : "Already have an account?"
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                <div onClick={closeModal} className="close-x">X</div>
                <p className="modal-header">WeShopping</p>
                <div className="modal-body">
                    <a href="/auth/google" className="google"><img src="https://i.stack.imgur.com/22WR2.png)" alt="google"></img>Continue with Google</a>
                    { component }
                    <p>
                        {context} <button onClick={() => otherForm(other)} className="modal-other-form">{other}</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

const msp = state => {
    console.log(state.session.user);
    return {
        modal: state.ui.modal,
        user: state.session.user.name
    };
};

const mdp = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        loginUser: (user) => dispatch(loginUser(user)),
        signup: (user) => dispatch(signup(user)),
        otherForm: (name) => dispatch(openModal(name)),
    };
};

export default connect(msp, mdp)(Modal);
