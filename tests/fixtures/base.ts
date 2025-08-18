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
        // Wait for the page to finish initial network requests
        await page.waitForLoadState('networkidle')


        const cookieBanner = page.getByTestId('cookie-banner')
        if (await cookieBanner.isVisible()) {
            const closeBtn = cookieBanner.getByTestId('close-cookie-banner')
            await closeBtn.click()

            await expect(cookieBanner).toBeHidden({ timeout: 30000 })
        }

        const giftBanner = page.getByText('Our Gift To You! Limited Time')
        await giftBanner.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { })
        if (await giftBanner.isVisible()) {
            const closeBtn = giftBanner.getByRole('button', { name: 'No Thanks' })
            await closeBtn.click()
            await expect(giftBanner).toBeHidden({ timeout: 10000 })
        }

        const spinner = page.getByRole('img', { name: 'Loading' }).first()
        if (await spinner.isVisible()) {
            await expect(spinner).toBeHidden({ timeout: 60000 })
        }
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