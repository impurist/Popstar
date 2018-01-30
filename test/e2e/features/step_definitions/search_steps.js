import {
  client
} from 'nightwatch-cucumber';

import {
  defineSupportCode
} from 'cucumber';

import {
  _
} from 'lodash';

import {
  onPageWith
} from '../../../../distribution/index';

defineSupportCode(({
  Given,
  When,
  Then
}) => {

  Given('the user has loaded {string}', async (string) => {
    await client.url(`https://${string}`)
  });

  When('the user searches for {string}', async (string) => {
    await onPageWith('DuckDuckGo', (page) => {
      return page.duckDuckGo.search(string);
    });
  });

  Then('the will see results like the following', async (dataTable) => {
    const content = _.first(dataTable.hashes()).Content;
    await onPageWith('DuckDuckGo', (page) => {
      return client.expect.element(page.duckDuckGo.searchResults()).text.to.contain(content);
    });
  });

});