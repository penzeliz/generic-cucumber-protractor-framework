const pageObjects = require('../support/pageObjects');
const stored_data = require('../support/stored_data');
const browsers = require('../support/browsers');
const general = require('../support/general');
const helpers = require('../support/helpers');
const waitFor = require('../support/waitFor');

module.exports = function() {

    this.Given(/^I store the number of "([^"]*)" as "([^"]*)"$/, function (element_name, number_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementsToLoad(element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElements(element_selector).count().then(function (count) {
                            stored_data.setData(number_name, count);
                        })
                    })
            }).should.notify(next);
    });


    this.Then(/^I store the "([^"]*)" number as "([^"]*)"$/, function (element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function () {
                general.getElement(element_selector).getText()
                    .then(function (retrieved_text) {
                        stored_data.setData(name, retrieved_text);
                        next();
                    });

            })
    });

    this.Given(/^I store the number of "([^"]*)" within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"$/, function (secondary_element, main_element_index, main_element, number_name, next) {
        const current_secondary_element_selector = pageObjects.elementFor(secondary_element);
        const current_main_element_index = parseInt(main_element_index) - 1;
        const current_main_element_selector = pageObjects.elementFor(main_element);
        pageObjects.waitForElementAtIndexToLoad(current_main_element_index, current_main_element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementsWithInElementAtIndex(current_secondary_element_selector, current_main_element_index, current_main_element_selector).count().then(function (count) {
                            stored_data.setData(number_name, count);
                        })
                    })
            }).should.notify(next);
    });

    this.When(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" as "([^"]*)"$/, function (indexText, element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (ui_text) {
                            stored_data.setData(name, ui_text);
                        })
                    })
            }).should.notify(next);
    });

    this.When(/^I store the "([^"]*)" as "([^"]*)"$/, function (element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (ui_text) {
                            stored_data.setData(name, ui_text);
                        })
                    })
            }).should.notify(next);
    });

    this.When(/^I store the last "([^"]*)" as "([^"]*)"$/, function (element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementAtLastIndexToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (ui_text) {
                            stored_data.setData(name, ui_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Given(/^I store each "([^"]*)" "([^"]*)" element attribute as "([^"]*)" for the "([^"]*)"$/, function (element_name, element_type, name, number_of_elements, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const retrieved_stored_number = stored_data.getData(number_of_elements) -1;
        browser.driver.sleep(0).then(function () {
            for (var i = 0; i < retrieved_stored_number; ++i) {
                general.getElementAtIndexWithElementType(element_selector, i, element_type).getText()
                    .then(function (retrieved_text) {
                        stored_data.setDataArray(retrieved_text);
                    })
            }
        }).should.notify(next);
    });


    this.Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.When(/^I store the "([^"]*)" input value as "([^"]*)"$/, function (element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getAttribute('value').then(function (retrieved_text) {
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });


    this.Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"$/, function (indexText, element_name, element_type, element_attribute, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getAttribute(element_attribute).then(function (retrieved_text) {
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^I store the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute as "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute contains the stored text for "([^"]*)"$/, function (indexText, element_name, element_type, element_attribute, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getAttribute(element_attribute).then(function (retrieved_text) {
                            var retrieved_stored_value = stored_data.getData(name);
                            retrieved_stored_value.toString().should.include(retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" "([^"]*)" element attribute does not contain the stored text for "([^"]*)"$/, function (indexText, element_name, element_type, element_attribute, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getAttribute(element_attribute).then(function (retrieved_text) {
                            var retrieved_stored_value = stored_data.getData(name);
                            retrieved_stored_value.toString().should.not.include(retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute contains the stored text for "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            var retrieved_stored_value = stored_data.getData(name);
                            retrieved_stored_value.toString().should.include(retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute does not contain the stored text for "([^"]*)"$/, function (indexText, element_name, element_type, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElementAtIndexWithElementType(element_selector, index, element_type).getText().then(function (retrieved_text) {
                            var retrieved_stored_value = stored_data.getData(name);
                            retrieved_stored_value.toString().should.not.include(retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" "([^"]*)" element attribute within the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" does not contain the stored text for "([^"]*)"$/, function (main_element_index, main_element_name, element_type, secondary_element_index, secondary_element_name, name, next) {
        var current_main_element = pageObjects.elementFor(main_element_name);
        var current_secondary_element = pageObjects.elementFor(secondary_element_name);
        var current_main_element_index = parseInt(main_element_index) - 1;
        var current_secondary_element_index = parseInt(secondary_element_index) - 1;
        pageObjects.waitForElementAtIndexToLoad(current_main_element_index, current_main_element)
            .then(function () {
                return waitFor(() => {
                        return general.getElementIndexWithElementTypeWithinElementAtIndex(current_main_element, current_main_element_index, element_type, current_secondary_element, current_secondary_element_index).getText().then(function (retrieved_text) {
                            var retrieved_stored_value = stored_data.getData(name);
                            retrieved_stored_value.toString().should.not.include(retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^I store the "([^"]*)" "([^"]*)" "([^"]*)" element attribute text as "([^"]*)" within the "([^"]*)" "([^"]*)"$/, function (secondary_element_index, secondary_element_name, element_type, name, main_element_index, main_element_name, next) {
        var current_main_element = pageObjects.elementFor(main_element_name);
        var current_secondary_element = pageObjects.elementFor(secondary_element_name);
        var current_main_element_index = parseInt(main_element_index) - 1;
        var current_secondary_element_index = parseInt(secondary_element_index) - 1;
        pageObjects.waitForElementAtIndexToLoad(current_main_element_index, current_main_element)
            .then(function () {
                return waitFor(() => {
                        return general.getElementIndexWithElementTypeWithinElementAtIndex(current_main_element, current_main_element_index, element_type, current_secondary_element, current_secondary_element_index).getText().then(function (retrieved_text) {
                            stored_data.setData(name, retrieved_text);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^I see the "([^"]*)" and stored "([^"]*)" page title$/, function(expectedTitle, name, next) {
        const retrieved_stored_value = stored_data.getData(name);
        return browsers.myBrowser().driver.getTitle()
            .then(function(title) {
                return title.toLowerCase().should.contain(expectedTitle.toLowerCase() + retrieved_stored_value.toLowerCase());
            }).should.notify(next);
    });


    this.Then(/^the "([^"]*)" contains the stored "([^"]*)"$/, function (element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (retrieved_text) {
                            const retrieved_stored_value = stored_data.getData(name);
                            return retrieved_text.toString().should.include(retrieved_stored_value);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" contains the stored "([^"]*)"$/, function (indexText, element_name, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        pageObjects.waitForElementAtIndexToLoad(index, element_selector)
            .then(function (current_element) {
                return waitFor(() => {
                        return current_element.getText().then(function (retrieved_text) {
                            const retrieved_stored_value = stored_data.getData(name);
                            return retrieved_text.toString().should.include(retrieved_stored_value);
                        })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "([^"]*)" should be "([^"]*)" less than the stored number for "([^"]*)"$/, function (element_name, expected_number_difference, name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        pageObjects.waitForElementToLoad(element_selector)
            .then(function () {
                return waitFor(() => {
                        return general.getElement(element_selector).getText()
                            .then(function (retrieved_text) {
                                const retrieved_ui_number = helpers.retrieveAsNumber(retrieved_text);
                                const retrieved_stored_number = helpers.retrieveAsNumber(stored_data.getData(name))
                                const stored_number_with_difference = retrieved_stored_number - retrieved_ui_number;
                                return expected_number_difference.toString().should.include(stored_number_with_difference.toString());
                            })
                    })
            }).should.notify(next);
    });

    this.Then(/^the "(1st|2nd|3rd|[0-9]+th)" "([^"]*)" number should be "([^"]*)" less than the stored number for "([^"]*)"$/, function (indexText, element_name, number_difference, stored_name, next) {
        const element_selector = pageObjects.elementFor(element_name);
        const index = parseInt(indexText) - 1;
        const expected_number = helpers.retrieveAsNumber(stored_data.getData(stored_name));
        actual_number = expected_number - number_difference;
        pageObjects.waitForElementToLoad(element_selector)
            .then(function () {
                general.checkTextAtIndexIsPresent(element_selector, index).getText()
                    .then(function(ui_text) {
                        current_text = helpers.replaceLineBreaks(ui_text);
                        current_text.toString().should.contain(helpers.dollarFormatter.format(actual_number));
                    })
            }).should.notify(next);

    })

}
