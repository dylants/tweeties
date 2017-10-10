import React from 'react';

import TweetForm from '../../components/tweet-form/tweet-form.component';

import { generateOptions } from '../../config/mocks/generators';

import style from './home.container.scss';

export default function Home() {
  const options = generateOptions();
  return (
    <div className={style.main}>
      <TweetForm
        options={options}
      />
    </div>
  );
}
