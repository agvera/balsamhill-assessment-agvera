import { type Page, type Locator } from '@playwright/test'
import { Common } from './common.utils'

export class CartPage extends Common {
    // readonly page: Page
    readonly itemList: Locator
    readonly deleteIcon: Locator
    readonly totalAmount: Locator
    readonly removedItem: Locator

    constructor(page: Page) {
        // this.page = page
        super(page)
        this.itemList = page.locator('div[class*="cartProductDetailItem_product_details"] > div.flex-wrap')
        this.deleteIcon = page.locator('div[class*="cartProductDetailItem_product_details"] > div.flex-wrap button[class*="cartProductDetailItem_delete-btn"]')
        this.totalAmount = page.locator('span[class*="totalAmountCard_total-value"]')
        this.removedItem = page.locator('div[class*="cartProductDetailItem_removedproducts"]')
    }

    async getCartItemCount() {
        await this.itemList.waitFor({ state: 'visible', timeout: 30000 })
        const cartItemCount = await this.itemList.count()
        return Number(cartItemCount)
    }

    async getTotalAmount() {
        const rawTotalPrice = (await await this.totalAmount.innerText())
        const filteredTotalPrice = rawTotalPrice.replace(/[^0-9.]/g, '')
        return Number(filteredTotalPrice)
    }

    async removeItemsInThecart() {
        const deleteIcon =  this.deleteIcon
        await this.clickElementAndWaitForPageToLoad(deleteIcon)
    }
}