import { Selector, t } from 'testcafe'

class ShoppingCartPage{
    constructor (){
        this.checkoutButton = Selector('.checkout_button')
    }

    async checkout(){
        await t
        .click(this.checkoutButton)
    }
}

export default new ShoppingCartPage
