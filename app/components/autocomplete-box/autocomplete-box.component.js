import PropTypes from 'prop-types';
import React, { Component } from 'react';

import style from './autocomplete-box.component.scss';

export default class AutocompleteBox extends Component {
  state = {
    userText: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    let optionsToRender;

    if (this.state.userText) {
      optionsToRender = this.props.options.map(option => (
        <div className={style.option} key={option.username}>
          <div className={style.avatarContainer}>
            <img
              className={style.avatar}
              src={option.avatar}
              alt=""
            />
          </div>
          <div className={style.username}>{option.username}</div>
          <div className={style.name}>{option.name}</div>
        </div>
      ));
    }

    return (
      <div>
        <div>
          <textarea
            className={style.textarea}
            name="userText"
            placeholder="What's happening?"
            value={this.state.userText}
            onChange={this.handleChange}
          />
        </div>
        <div className={style.options}>
          {optionsToRender}
        </div>
      </div>
    );
  }
}

AutocompleteBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
