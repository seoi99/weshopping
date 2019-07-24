import React, { Component } from 'react';
import { searchByBrand } from '../../actions/product_action';

class ButtonFilter extends Component {
  constructor(props) {
      super(props)
      this.state = {
        activeState: false,
      }
      this.handleButton = this.handleButton.bind(this);
  }
  handleButton() {
    this.setState({activeState: !this.state.activeState})
  }

  render() {
    return (
      <button className={this.props.activeState ? 'button-color': null} onClick={this.handleButton}>{this.props.name}</button>
    )
  }
}

export default ButtonFilter
