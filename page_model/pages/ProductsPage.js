import { Selector, t } from 'testcafe'

class ProductsPage{
    constructor (){
        this.addToCartButton = Selector('.btn_primary.btn_inventory')
        this.itemName = Selector('.inventory_item_name')
        this.menuButton = Selector('.bm-burger-button')
        this.logoutButton = Selector('.menu-item').withExactText('Logout')
    }

    async addItemToCart(numberOfItems){
        let items = []
        for (let i = 0; i < numberOfItems; i++) {
            await t.click(this.addToCartButton.nth(i))
            let productName = await this.itemName.nth(i).innerText
            items.push(productName)         
         }
         return items
    }

    async logout(){
        await t
            .click(this.menuButton)
            .click(this.logoutButton)
    }
}

export default new ProductsPage
