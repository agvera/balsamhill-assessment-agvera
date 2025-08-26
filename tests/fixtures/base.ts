import { test as base, expect } from '@playwright/test'
import { Common } from '../pages/common.utils'
import { SearchResultsPage } from '../pages/searchResultsPage.utils'
import { ProductPage } from '../pages/productPage.utils'
import { CartPage } from '../pages/cartPage.utils'

type Pages = {
    common: Common
    searchResultPage: SearchResultsPage
    productPage: ProductPage
    cartPage: CartPage
}

export const test = base.extend<Pages>({
    page: async ({ page }, use) => {

        await page.goto('/')
        const cookieBanner = page.locator('#cookieBanner')
        const closeBtn = page.locator('#bannerCloseButton')
        try {
            await cookieBanner.waitFor({ state: 'visible', timeout: 2000 })
            await closeBtn.waitFor({ state: 'visible' })
            await closeBtn.click()
        } catch { }
        
        const giftBanner = page.getByText('Our Gift To You! Limited Time')
        await page.addLocatorHandler(giftBanner, async () => {
            const noThanksBtn = page.getByRole('button', { name: 'No Thanks' })
            try {
                await noThanksBtn.waitFor({ state: 'visible' })
                await noThanksBtn.click()
                console.log('Gift banner appeared... Clicked No Thanks!')
            } catch { }

        })

        await use(page)
    },
    common: async ({ page }, use) => {
        await use(new Common(page))
    },
    searchResultPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page))
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    }
})

export { expect } from '@playwright/test'