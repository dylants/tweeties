import PropTypes from 'prop-types';
import React from 'react';

import style from './autocomplete-box.component.scss';

export default function AutocompleteBox({ options }) {
  const optionsToRender = options.map(option => (
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

  return (
    <div>
      <div>
        <textarea
          className={style.textarea}
        />
      </div>
      <div className={style.options}>
        {optionsToRender}
      </div>
    </div>
  );
}

AutocompleteBox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
