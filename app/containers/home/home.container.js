import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { clearTwitterUsers, searchTwitterUsers } from '../../actions/twitter.actions';
import config from '../../config';

import TweetForm from '../../components/tweet-form/tweet-form.component';

import style from './home.container.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: '',
      tweets: [],
    };

    // timeout used to delay searching until user stops typing
    this.searchTwitterUsersTimeout = null;
  }

  handleSelectUser = (userIndex) => {
    let { tweet } = this.state;
    const { users } = this.props.twitterState;
    const { username } = users[userIndex];

    // replace the last word with the username from the selected user
    tweet = _(tweet)
            .split(' ')
            .dropRight()
            // add a space to the end to make it more usable
            .concat(`${username} `)
            .join(' ');

    // update the state to reflect the tweet change
    this.setState({
      tweet,
    });

    // clear the list of twitter users since the user selected one
    this.props.clearTwitterUsers();
  }

  handleSubmit = () => {
    const { tweet, tweets } = this.state;

    // add the tweet to the list of tweets, and reset the form
    this.setState({
      tweet: '',
      tweets: tweets.concat(tweet),
    });
  }

  handleTextChange = (text) => {
    // our twitter user search only deals with the last word at the moment...
    const lastWord = _(text).split(' ').last();

    // if the last 'word' starts with an '@', and it's more than just the '@' sign,
    // we need to search users
    if (lastWord.startsWith('@') && lastWord.length > 1) {
      // if we're already waiting to search, clear the last search
      if (this.searchTwitterUsersTimeout) {
        clearTimeout(this.searchTwitterUsersTimeout);
      }

      // wrap the search in a timeout to avoid too many searches while the user is typing
      // (essentially wait for them to pause)
      this.searchTwitterUsersTimeout = setTimeout(() => {
        // grab the word without the '@' sign
        const wordOnly = lastWord.slice(1);
        this.props.searchTwitterUsers(wordOnly);
      }, config.searchTwitterUsersDelay);
    } else {
      // else if there are users, we should clear them
      const { users } = this.props.twitterState;
      if (users && users.length) {
        this.props.clearTwitterUsers();
      }
    }

    this.setState({
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
            <div className={style.name}>Tweeties</div>
            <div className={style.tagline}>The Tweets of Champions</div>
          </div>
          <TweetForm
            handleSelectOption={this.handleSelectUser}
            handleSubmit={this.handleSubmit}
            handleTextChange={this.handleTextChange}
            options={this.props.twitterState.users}
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

Home.propTypes = {
  clearTwitterUsers: PropTypes.func.isRequired,
  searchTwitterUsers: PropTypes.func.isRequired,
  twitterState: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    users: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    twitterState: state.twitterState,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearTwitterUsers,
    searchTwitterUsers,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
