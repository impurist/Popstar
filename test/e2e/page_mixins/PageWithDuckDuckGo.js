import {
  client,
} from 'nightwatch-cucumber';

module.exports.duckDuckGo = {
  search: (searchTerm) => {
    const inputSelector = '#search_form_input_homepage';
    const searchButtonSelector = '#search_button_homepage';
    client.setValue(inputSelector, searchTerm);
    client.click(searchButtonSelector);
  },
  searchResults: () => '.result__body',
};
