[![Build Status](https://semaphoreci.com/api/v1/impofdoom/popstar/branches/master/badge.svg)](https://semaphoreci.com/impofdoom/popstar)

# Popstar
Page Object Pattern implementation in ES6 for automated UI testing using a Node based runner.
The code and simple examples are extracted from a current project I am testing using Cucumber.js and Nightwatch.
I found the nightwatch page object implementation somewhat limited and decided to re-write some old code using ES6 that used a similar dynamic mixin pattern. 

# Usage

Create PopstarInit.js containing the following code:
```javascript
import { Popstar } from 'Popstar';
module.exports.popstar = Popstar('path_to/page_mixins');
```

Create a mixin file in the mixin path, for example: PageWithSearchForm:
```javascript
import { client } from 'nightwatch-cucumber';

module.exports = {
  search: (searchTerm) => {
    const inputSelector = 'input#search-term';
    const searchButtonSelector = 'button#search-button'
    client.clearValue(selector);
    client.setValue(selector, searchTerm);
    client.click(searchButtonSelector);
  },
  
}
```

nightwatch-cucumber example:
```gherkin
 When the user searches for "Page Object Pattern"
```

```javascript

import { client } from 'nightwatch-cucumber';
import { defineSupportCode } from 'cucumber';
import { popstar } from 'path_to/PopstarInit';

defineSupportCode(({ When }) => {
  When(/^the user searches for "([^"]*)"$/, async (searchTerm) => {
    await popstar.onPageWith('SearchForm', (page) => {
      page.search(searchTerm);
    });
  });
});
```
# Todo
Write more tests and improve the api.


