[![Build Status](https://semaphoreci.com/api/v1/impofdoom/popstar/branches/master/badge.svg)](https://semaphoreci.com/impofdoom/popstar)

# Popstar
Page Object Pattern implementation in ES6 for automated UI testing using a Node based runner

# Usage

Create PopstarInit.js containing the following code:
```javascript
import { Popstar } from 'Popstar';
module.exports.popstar = Popstar('path_to/page_mixins');
```

Create a mixin file in the mixin path, for example: PageWithSearchForm:
```javascript
module.exports = {
  searchInput: 'input#search-term',
  searchButton: 'button#search-button'
}
```

nightwatch-cucumber example:
```javascript

import { client } from 'nightwatch-cucumber';
import { defineSupportCode } from 'cucumber';
import { popstar } from '../../support/PopstarInit';

defineSupportCode(({ When }) => {
  When(/^the user searches for "([^"]*)"$/, async (searchTerm) => {
    await popstar().onPageWith('Search', (page) => {
      client.clearValue(page.searchInput);
      return client.setValue(page.searchInput, searchTerm);
    });
  });
});
```
