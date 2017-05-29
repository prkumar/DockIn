//To run use command npm run test-e2e

module.exports = {
    //'End to End Testing: LoginIn' : function (browser) {
    beforeEach : function(browser) {
        browser
            .url('http://emissary-2.herokuapp.com/login')
            .waitForElementVisible('body', 1000)
            .setValue('input[name=username]', 'cse112project@anchorbuddies.com')
            .setValue('input[name=password]', 'cse112')
            .pause(1000)
            .click('button[type=submit]')
            .pause(1000);
            
    },/*
    'End to End Testing: CheckIn' : function(browser) {
        browser
            .waitForElementVisible('body', 1000)
            .pause(1000)
            //.click("#dropdownId")
            //.click("#check-in")
            .useXpath()     
            .click("//div[contains(@class, 'dropdown')]")
            .pause(1000)
            .click("//a[text()='Check-In']")
            .pause(1000)
            .click("//div[contains(@id, 'tap-to-check')]")
            .useCss() 
            .setValue('input[name=first]', 'Anchor')
            .setValue('input[name=last]', 'Buddies')
            .setValue('input[name=phoneNumber]', '1234567890')
            .keys(['\uE006'])
            .pause(1000)
            .end();
    },
    'End to End Testing: Add Appointment' : function(browser) {
        browser
            .waitForElementVisible('body', 1000)
            .pause(1000)
            .useXpath()
            .click("//*[contains(text(), 'Appointments')]")
            .click("//div[contains(@class, 'add-button')]")
            .useCss()
            .pause(1000)
            .setValue('input[id=appt-first]', 'Thomas')
            .setValue('input[id=appt-last]', 'Powell')
            .setValue('input[id=appt-number]', '1234567890')
            .setValue('input[id=appt-provider]', 'CSE112Provider')
            .setValue('input[id=appt-date]', '05/16/17')
            .setValue('input[id=appt-time]', '5:00')
            .useXpath()
            .click("//*[contains(text(), 'Save')]")
            .pause(1000)
            .end();
    }*/
};