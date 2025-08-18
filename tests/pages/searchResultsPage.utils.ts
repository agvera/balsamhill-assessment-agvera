import { type Page, type Locator, expect } from '@playwright/test'

export class SearchResultsPage {
    readonly page: Page
    readonly searchResultContainer: Locator
    readonly productDetailContainer: Locator
    readonly productName: Locator
    readonly productPriceContainer: Locator
    readonly searchProductPrice: Locator

    constructor(page: Page) {
        this.page = page
        this.searchResultContainer = page.locator('div.search-result')
        this.productDetailContainer = page.locator('div[class*="productCard_detail-wrapper"]')
        this.productName = this.productDetailContainer.locator('a[class*="productCard_title"]')
        this.productPriceContainer = this.productDetailContainer.locator('div[class*="product-prices"]')
        this.searchProductPrice = this.productPriceContainer.locator('span[class*="productCard_prod-sale-price"]')
    }

    async selectFromSearchResult(index: number) {
        await this.searchResultContainer.nth(index).waitFor({ state: 'visible' })
        await this.searchResultContainer.nth(index).click()
    }

    async getProductName(index: number) {
        const productName = await this.productName.nth(index).innerText()
        return productName
    }

    async getProductPrice(index: number) {
        await expect(this.searchProductPrice.nth(index)).toHaveText(/\d+/, { timeout: 30000 })
        const rawSearchResultPrice = await this.searchProductPrice.nth(index).innerText()
        const filteredSearchResultPrice = rawSearchResultPrice.replace(/[^0-9.]/g, '')
        return Number(filteredSearchResultPrice)
    }

}
