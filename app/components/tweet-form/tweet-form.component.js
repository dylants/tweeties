import PropTypes from 'prop-types';
import React, { Component } from 'react';

import style from './tweet-form.component.scss';

export default class TweetForm extends Component {
  handleTextChange = (event) => {
    const { value } = event.target;

    this.props.handleTextChange(value);
  }

  selectOption = (optionIndex) => {
    this.props.handleSelectOption(optionIndex);

    // focus the text input again
    this.textRef.focus();
  }

  render() {
    let optionsToRender;

    if (this.props.options) {
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
            onChange={this.handleTextChange}
            placeholder="What's happening?"
            ref={textRef => this.textRef = textRef}
            value={this.props.text}
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
  handleSelectOption: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  text: PropTypes.string.isRequired,
};
