import _ from 'lodash';
import React, { Component } from 'react';

import TweetForm from '../../components/tweet-form/tweet-form.component';

import { generateOptions } from '../../config/mocks/generators';

import style from './home.container.scss';

export default class Home extends Component {
  state = {
    options: [],
    tweet: '',
  }

  handleTextChange = (text) => {
    let { options } = this.state;

    // if the last 'word' starts with an '@', we need new options
    if (_(text)
        .split(' ')
        .last()
        .startsWith('@')) {
      options = generateOptions();
    } else {
      // else there should be no options. no options for you!
      options = [];
    }

    this.setState({
      options,
      tweet: text,
    });
  }

  handleSelectOption = (optionIndex) => {
    let { tweet } = this.state;
    const { username } = this.state.options[optionIndex];

    // replace the last word with the username from the selected option
    tweet = _(tweet)
            .split(' ')
            .dropRight()
            // add a space to the end to make it more usable
            .concat(`${username} `)
            .join(' ');

    this.setState({
      options: [],
      tweet,
    });
  }

  render() {
    return (
      <div className={style.main}>
        <TweetForm
          handleSelectOption={this.handleSelectOption}
          handleTextChange={this.handleTextChange}
          options={this.state.options}
          text={this.state.tweet}
        />
      </div>
    );
  }
}
