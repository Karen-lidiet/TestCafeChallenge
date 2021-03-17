import { Selector, t } from 'testcafe'

class HeadersPage{
    constructor (){
        this.productLabel = Selector('.product_label')
        this.cartNumber = Selector('a.shopping_cart_link span')
        this.shoppingCartButton = Selector('svg[data-icon="shopping-cart"]')
        this.subheaderLabel = Selector('.subheader')
    }

    async navigateToShoppingCart(){
        await t
        .click(this.shoppingCartButton)
    }
}

export default new HeadersPage
