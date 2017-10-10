import React from 'react';

import AutocompleteBox from '../../components/autocomplete-box/autocomplete-box.component';

import { generateOptions } from '../../config/mocks/generators';

import style from './home.container.scss';

export default function Home() {
  const options = generateOptions();
  return (
    <div className={style.main}>
      <AutocompleteBox
        options={options}
      />
    </div>
  );
}
