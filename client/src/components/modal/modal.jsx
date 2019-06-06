import React from 'react';
import style from '../style/modal.css';

const Modal = ({modal, closeModal}) => {
    return (
        <div>
            <p> close it </p>
        </div>
    )
}


const msp = state => {
    return {
        modal: state.ui.modal
    };
};

const mdp = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default Modal
