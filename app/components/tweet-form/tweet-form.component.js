import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import style from './tweet-form.component.scss';

export default class TweetForm extends Component {
  state = {
    showOptions: false,
    userText: '',
  }

  handleUserTextChange = (event) => {
    const { value } = event.target;

    let showOptions = false;
    // if the last 'word' starts with an '@'
    if (_(value)
        .split(' ')
        .last()
        .startsWith('@')) {
      showOptions = true;
    }

    this.setState({
      showOptions,
      userText: value,
    });
  }

  selectOption = (optionIndex) => {
    let { userText } = this.state;
    const { username } = this.props.options[optionIndex];

    // replace the last word with the username from the selected option
    userText = _(userText)
                .split(' ')
                .dropRight()
                // add a space to the end to make it more usable
                .concat(`${username} `)
                .join(' ');

    this.setState({
      showOptions: false,
      userText,
    });

    // focus the text input again
    this.userTextRef.focus();
  }

  render() {
    let optionsToRender;

    if (this.state.showOptions) {
      optionsToRender = this.props.options.map((option, index) => (
        <button
          className={style.option}
          key={option.username}
          onClick={() => this.selectOption(index)}
        >
          <div className={style.avatarContainer}>
            <img
              alt=""
              className={style.avatar}
              src={option.avatar}
            />
          </div>
          <div className={style.username}>{option.username}</div>
          <div className={style.name}>{option.name}</div>
        </button>
      ));
    }

    return (
      <div>
        <div>
          <textarea
            className={style.textarea}
            onChange={this.handleUserTextChange}
            placeholder="What's happening?"
            ref={userTextRef => this.userTextRef = userTextRef}
            value={this.state.userText}
          />
        </div>
        <div className={style.options}>
          {optionsToRender}
        </div>
      </div>
    );
  }
}

TweetForm.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
