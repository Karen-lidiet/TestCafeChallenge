import { Selector, t } from 'testcafe'

class CheckoutPage{
    constructor (){
        this.firstNameField = Selector('input[data-test="firstName"]')
        this.lastNameField = Selector('input[data-test="lastName"]')
        this.zipField = Selector('input[data-test="postalCode"]')
        this.continueButton = Selector('.cart_button')
        this.errorMessage = Selector('h3[data-test="error"]')
    }

    async fillInfoAndContinue(name, lastname, zip){
        await t
        .typeText(this.firstNameField, name)
        .typeText(this.lastNameField, lastname)
        if (zip) await t.typeText(this.zipField, zip)
        await t.click(this.continueButton)
    }
}

export default new CheckoutPage
