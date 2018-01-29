import {
  client
} from 'nightwatch-cucumber';
import {
  defineSupportCode
} from 'cucumber';
import {
  onPageWith
} from '../../../../distribution/index';

defineSupportCode(({
  Given,
  When,
  Then
}) => {

  Given('the user has loaded {string}', function (string) {
    return client.url(`https://${string}`)
  });

  When('the user searches for {string}', function (string, callback) {
    onPageWith('DuckDuckGo', (page) => {
      page.duckDuckGo.search(string);
    });
  });


  Then('the will see results like the following', function (dataTable, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

});