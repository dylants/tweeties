import _ from 'lodash';
import React, { Component } from 'react';

import TweetForm from '../../components/tweet-form/tweet-form.component';

import { generateOptions } from '../../config/mocks/generators';

import style from './home.container.scss';

export default class Home extends Component {
  state = {
    options: [],
    tweet: '',
    tweets: [],
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

  handleSubmit = () => {
    const { tweet, tweets } = this.state;

    // add the tweet to the list of tweets, and reset the form
    this.setState({
      options: [],
      tweet: '',
      tweets: tweets.concat(tweet),
    });
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

  render() {
    let tweetsToRender = this.state.tweets.map((tweet, index) => (
      <div className={style.tweet} key={index}>{tweet}</div> // eslint-disable-line
    ));

    if (tweetsToRender.length === 0) {
      tweetsToRender = (
        <div className={`${style.tweet} ${style.noTweets}`}>&lt; No Tweets &gt;</div>
      );
    }

    return (
      <div className={style.main}>
        <div className={style.tweetForm}>
          <div className={style.heading}>
            <div className={style.name}>Tweetier</div>
            <div className={style.tagline}>The Tweets of Champions</div>
          </div>
          <TweetForm
            handleSelectOption={this.handleSelectOption}
            handleSubmit={this.handleSubmit}
            handleTextChange={this.handleTextChange}
            options={this.state.options}
            text={this.state.tweet}
          />
        </div>
        <div className={style.tweets}>
          <div className={style.miniHeading}>Tweets</div>
          {tweetsToRender}
        </div>
      </div>
    );
  }
}
