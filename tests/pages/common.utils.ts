import { type Page, type Locator, expect } from '@playwright/test'

export class Common {
    readonly page: Page
    readonly loader: Locator
    readonly autoSuggestContainer: Locator
    readonly searchField: Locator
    readonly searchResults: Locator
    readonly viewAllResultsLink: Locator
    readonly cartBadge: Locator

    constructor(page: Page) {
        this.page = page
        this.loader = page.getByRole('img', { name: 'Loading' }).first()
        this.cartBadge = page.locator('span[class*="headerIcons_custom-badge"]')
        this.autoSuggestContainer = page.locator('#auto-suggest-wrapper')
        this.searchField = page.getByRole('searchbox', { name: 'Search' })
        this.searchResults = page.locator('div[data-cnstrc-item-section="Products"]')
        this.viewAllResultsLink = page.getByRole('link', { name: 'View all results' })

    }

    async searchProduct(keyword: string) {
        await this.searchField.fill(keyword)
        await this.autoSuggestContainer.waitFor({ state: 'visible', timeout: 10000 })
    }

    async clickViewAllResults() {
        await this.viewAllResultsLink.click()
    }

    async selectFromSearchResult(index: number) {
        await this.searchResults.nth(index).click()
    }

    async getCartBadgeCount() {
        const cartBadgeCount = await this.cartBadge.innerText()
        return Number(cartBadgeCount)
    }

    async clickElementAndWaitForPageToLoad(locator: Locator) {
        await locator.click()
        const spinner = this.page.getByRole('img', { name: 'Loading' }).nth(1)
        try {
            await spinner.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { })
            await spinner.waitFor({ state: 'hidden', timeout: 60000 })
        } catch { }
    }

}