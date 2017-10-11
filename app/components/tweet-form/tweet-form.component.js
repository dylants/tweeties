import PropTypes from 'prop-types';
import React, { Component } from 'react';

import style from './tweet-form.component.scss';

export default class TweetForm extends Component {
  handleClickSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit();

    // they've cleared the text by submitting, so send empty text
    this.props.handleTextChange('');
  }

  handleKeyPress = (event) => {
    // when the user hits enter, "submit the form"
    if (event.key === 'Enter') {
      // don't submit with an empty tweet
      if (!this.props.text) {
        event.preventDefault();
        return;
      }

      this.handleClickSubmit(event);
    }
  }

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

    let optionsBox;
    if (optionsToRender && optionsToRender.length) {
      optionsBox = (
        <div className={style.options}>
          {optionsToRender}
        </div>
      );
    }

    return (
      <div>
        <form className={style.form}>
          <textarea
            className={style.textarea}
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
            placeholder="What's happening?"
            ref={textRef => this.textRef = textRef}
            value={this.props.text}
          />
          <div className={style.buttonWrapper}>
            <button
              className={style.button}
              disabled={!this.props.text}
              onClick={this.handleClickSubmit}
              type="submit"
            >Tweet</button>
          </div>
        </form>
        {optionsBox}
      </div>
    );
  }
}

TweetForm.propTypes = {
  handleSelectOption: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  text: PropTypes.string.isRequired,
};
