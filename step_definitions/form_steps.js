'use strict';
const path = require('path');
const ROOT_PATH = path.resolve('./');
const { Given, When, Then } = require(ROOT_PATH + '/node_modules/cucumber');

const pageObjects = require('../support/pageObjects');
const general = require('../support/general')
const form = require('../support/form');
const waitFor = require('../support/waitFor');

Then(/^I click the "([^"]*)" (?:input|select|textarea|checkbox)$/, function (main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            return waitFor(() => {
                return current_element.click();
            })
        }).should.notify(next);
});

Then(/I fill in the "([^"]*)" input with "([^"]*)"$/, function (main_element_name, value, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            current_element.sendKeys(value).then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});

Then(/I fill in the "([^"]*)" input with "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link|icon|element)$/, function (second_element_name, value, main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    pageObjects.waitForElementWithinElementAtIndexToLoad(main_index, main_element_selector, secondary_element_selector)
        .then(function (current_element) {
            current_element.sendKeys(value).then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});

Then(/I fill in the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" input with "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" (?:button|link|icon|element)$/, function (second_element_index, second_element_name, value, main_element_index, main_element_name, next) {
    const main_index = parseInt(main_element_index) - 1;
    const main_element_selector = pageObjects.elementFor(main_element_name);
    const secondary_element_selector = pageObjects.elementFor(second_element_name);
    const secondary_index = parseInt(second_element_index) - 1;
    pageObjects.waitForElementAtIndexWithinElementAtIndexToLoad(main_index, main_element_selector, secondary_index, secondary_element_selector)
        .then(function (current_element) {
            //current_element.clear();
            current_element.sendKeys(value).then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});

Then(/I select the "([^"]*)" as "([^"]*)"$/, function (main_element_name, value, next)  {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function(current_element) {
            current_element.all(by.cssContainingText('option', value)).click().then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});

Then(/^the "([^"]*)" input should equal the value "([^"]*)"$/, function (main_element_name, value, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function(current_element) {
            current_element.getAttribute('value').should.eventually.equal(value).and.notify(next);
        });
});

Then(/I clear the field "([^"]*)"$/, function (main_element_name, next) {
    const main_element_selector = pageObjects.elementFor(main_element_name);
    pageObjects.waitForElementToLoad(main_element_selector)
        .then(function (current_element) {
            current_element.clear().then(() => {
                next();
            }, (err) => {
                next(err);
            });
        });
});

