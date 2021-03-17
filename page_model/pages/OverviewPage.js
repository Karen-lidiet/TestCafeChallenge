import { Selector, t } from 'testcafe'

class OverviewPage{
    constructor (){
        this.finishButton = Selector('.cart_button')
        this.itemInCart = Selector('div.inventory_item_name')
    }

    async getItemsInOverview(){
        let addedItems = []
        const numOfItem = await this.itemInCart.count
        for (let i = 0; i < numOfItem; i++) {  
            let nameItem = await this.itemInCart.nth(i).innerText
            addedItems.push(nameItem);            
         }
         return addedItems
    }

    async finishPurchase(){
        await t.click(this.finishButton)
    } 
}

export default new OverviewPage
