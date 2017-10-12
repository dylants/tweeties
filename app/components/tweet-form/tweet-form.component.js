import { isNumber } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import style from './tweet-form.component.scss';

export default class TweetForm extends Component {
  state = {
    // initialize the highlighted option index to unselected (null)
    highlightedOptionIndex: null,
  }

  handleClickSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit();

    // they've cleared the text by submitting, so empty the text
    this.props.handleTextChange('');

    // reset the highlighted option index
    this.setState({
      highlightedOptionIndex: null,
    });
  }

  handleKeyPress = (event) => {
    // when the user hits enter, "submit the form"
    if (event.key === 'Enter') {
      // don't submit with an empty tweet
      if (!this.props.text) {
        event.preventDefault();
        return;
      }

      // if they've clicked enter while highlighting an option...
      if (isNumber(this.state.highlightedOptionIndex)) {
        // prevent the enter button action
        event.preventDefault();

        // select the option
        this.selectOption(this.state.highlightedOptionIndex);

        // reset the highlighted option index
        this.setState({
          highlightedOptionIndex: null,
        });

        // end here, don't submit the form
        return;
      }

      this.handleClickSubmit(event);
    } else if (event.key === 'Escape') {
      // if they press escape, it means they don't want any more options
      this.props.handleClearOptions();

      // reset the highlighted option index
      this.setState({
        highlightedOptionIndex: null,
      });
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      // if they're attempting to move within the options list, make sure it's avaiable first
      if (this.props.options.length === 0) {
        // no options, do nothing
        return;
      }

      // at this point there are options, so prevent the arrow action
      event.preventDefault();

      // for easy comparisons, let's make the length 0th based
      const zeroBasedLength = this.props.options.length - 1;

      // which direction did they press?
      if (event.key === 'ArrowDown') {
        // null case is easy, set it to 0
        if (this.state.highlightedOptionIndex === null) {
          this.setState({
            highlightedOptionIndex: 0,
          });
        } else if (this.state.highlightedOptionIndex < zeroBasedLength) {
          // increase it by 1
          this.setState({
            highlightedOptionIndex: this.state.highlightedOptionIndex + 1,
          });
        }
      } else if (event.key === 'ArrowUp') {
        // don't allow looping from the bottom up, so if it's null it stays null
        if (this.state.highlightedOptionIndex === null) {
          // do nothing...
        } else if (this.state.highlightedOptionIndex > 0) {
          // decrease it by 1
          this.setState({
            highlightedOptionIndex: this.state.highlightedOptionIndex - 1,
          });
        }
      }
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
      optionsToRender = this.props.options.map((option, index) => {
        let optionClasses = style.option;

        // if the user has used the keyboard to highlight this option, do so visually
        if (index === this.state.highlightedOptionIndex) {
          optionClasses = `${optionClasses} ${style.optionHighlighted}`;
        }

        return (
          <button
            className={optionClasses}
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
        );
      });
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
            onKeyDown={this.handleKeyPress}
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
  handleClearOptions: PropTypes.func.isRequired,
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
