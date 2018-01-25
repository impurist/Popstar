[![Build Status](https://semaphoreci.com/api/v1/impofdoom/popstar/branches/master/badge.svg)](https://semaphoreci.com/impofdoom/popstar)

# Popstar
Page Object Pattern implementation in ES6 for automated UI testing using a Node based runner.
The code and simple examples are extracted from a current project I am testing using Cucumber.js and Nightwatch.
I found the nightwatch page object implementation somewhat limited and decided to re-write some old code using ES6 that used a similar dynamic mixin pattern. 

# Usage

Create a mixin file in your-project/test/e2e/page_mixins. 
Example: PageWithSearchForm:
```javascript
import { client } from 'nightwatch-cucumber';

module.exports.searchForm = {
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
import { onPageWith } from 'popstar';

defineSupportCode(({ When }) => {
  When(/^the user searches for "([^"]*)"$/, async (searchTerm) => {
    await onPageWith('SearchForm', (page) => {
      page.search(searchTerm);
    });
  });
});
```
# Todo
* Write more tests and improve the api.
* Add e2e tests.

