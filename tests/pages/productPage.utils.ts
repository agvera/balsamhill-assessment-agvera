import { type Page, type Locator, expect } from '@playwright/test'
import { Common } from './common.utils'

export class ProductPage extends Common {
    // readonly page: Page
    readonly pageHeading: Locator
    readonly productPageCurrentPrice: Locator
    readonly productStickyBarPrice: Locator
    readonly selectedHeightValue: Locator
    readonly heightOptionsGroup: Locator
    readonly heightOption: Locator
    readonly activeHeightOption: Locator
    readonly notifyMeButton: Locator
    readonly selectedShapeValue: Locator
    readonly shapeOptionsGroup: Locator
    readonly shapeOption: Locator
    readonly activeShapeOption: Locator
    readonly selectedLightsValue: Locator
    readonly lightOptionsGroup: Locator
    readonly lightOption: Locator
    readonly activeLightOption: Locator
    readonly selectedSetupValue: Locator
    readonly setupOptionsGroup: Locator
    readonly setupOption: Locator
    readonly activeSetupOption: Locator
    readonly addToCartButton: Locator
    readonly addToCartModal: Locator
    readonly addToCartModalItemsList: Locator
    readonly modalViewCartButton: Locator
    readonly modalProductHeight: Locator
    readonly modalProductShape: Locator
    readonly modalProductLights: Locator
    readonly modalProductSetup: Locator
    readonly modalProductPrice: Locator


    constructor(page: Page) {
        super(page)
        // this.page = page
        this.pageHeading = page.locator('div.product-name-div > h1')
        this.productStickyBarPrice = page.locator('span[class*="productDetailStickyBar_product-sticky-bar-price"]')
        this.productPageCurrentPrice = page.locator('span[class*="productPrice_new-price"]')

        this.selectedHeightValue = page.getByTestId('pdf-Height-display-value')
        this.heightOptionsGroup = page.getByRole('radiogroup', { name: 'Height' })
        this.heightOption = this.heightOptionsGroup.locator('div[class*="product-filter-box"]')
        this.activeHeightOption = this.heightOptionsGroup.locator('div[class*="product-filter-box"][data-status="active"]')

        this.selectedShapeValue = page.getByTestId('pdf-Shape-display-value')
        this.shapeOptionsGroup = page.getByRole('radiogroup', { name: 'Shape' })
        this.shapeOption = this.shapeOptionsGroup.locator('div[class*="product-filter-box"]')
        this.activeShapeOption = this.shapeOptionsGroup.locator('div[class*="product-filter-box"][data-status="active"]')

        this.selectedLightsValue = page.getByTestId('pdf-Lights-display-value')
        this.lightOptionsGroup = page.getByRole('radiogroup', { name: 'Lights' })
        this.lightOption = this.lightOptionsGroup.locator('div[class*="product-filter-box"]')
        this.activeLightOption = this.lightOptionsGroup.locator('div[class*="product-filter-box"][data-status="active"]')

        this.selectedSetupValue = page.locator('div[data-testId="pdf-Setup-display-value"]')
        this.setupOptionsGroup = page.getByRole('radiogroup', { name: 'Setup' })
        this.setupOption = this.setupOptionsGroup.locator('div[role="radio"]')
        this.activeSetupOption = this.setupOptionsGroup.locator('div[role="radio"] > span[data-state="active"]')

        this.addToCartButton = page.getByTestId('produt-detail-container').getByTestId('pdc-btn-addtocart')
        this.notifyMeButton = page.getByRole('button', { name: 'Notify Me' })

        this.addToCartModal = page.locator('div.add-to-cart-modal.show')
        this.addToCartModalItemsList = this.addToCartModal.locator('div[class*="productAddToCartModal_cart-items-list"]')
        this.modalProductHeight = this.addToCartModal.locator('div[class*="productAddToCartModal_meta-item"]', { hasText: 'Height :' }).locator('span').nth(1)
        this.modalProductShape = this.addToCartModal.locator('div[class*="productAddToCartModal_meta-item"]', { hasText: 'Shape :' }).locator('span').nth(1)
        this.modalProductLights = this.addToCartModal.locator('div[class*="productAddToCartModal_meta-item"]', { hasText: 'Lights :' }).locator('span').nth(1)
        this.modalProductSetup = this.addToCartModal.locator('div[class*="productAddToCartModal_meta-item"]', { hasText: 'Setup :' }).locator('span').nth(1)
        this.modalProductPrice = this.addToCartModal.locator('div[class*="productAddToCartModal_meta-item"]', { hasText: 'Price:' }).locator('span').nth(1)
        this.modalViewCartButton = this.addToCartModal.getByTestId('pdc-add-to-cart-modal-btn-viewcart')
    }

    async getProductPageName() {
        const productPageName = await this.pageHeading.innerText()
        return productPageName
    }

    async getProductStickyBarPrice() {
        await expect(this.productStickyBarPrice).toHaveText(/\d+/, { timeout: 30000 })
        const rawStickyBarPrice = (await this.productStickyBarPrice.textContent())!
        const filteredStickyBarPrice = rawStickyBarPrice.replace(/[^0-9.]/g, '')
        return Number(filteredStickyBarPrice)
    }

    async getProductPagePrice() {
        await expect(this.productPageCurrentPrice).toHaveText(/\d+/, { timeout: 30000 })
        const rawCurrentPrice = (await this.productPageCurrentPrice.innerText())
        const filteredCurrentPrice = rawCurrentPrice.replace(/[^0-9.]/g, '')
        return Number(filteredCurrentPrice)
    }

    async getModalProductPrice() {
        await expect(this.modalProductPrice).toHaveText(/\d+/, { timeout: 30000 })
        const rawCurrentPrice = (await this.modalProductPrice.innerText())
        const filteredCurrentPrice = rawCurrentPrice.replace(/[^0-9.]/g, '')
        return Number(filteredCurrentPrice)
    }

    async getAvailableHeightOptionsCount() {
        const countHeightOptions = await this.heightOption.count()
        return Number(countHeightOptions)
    }

    async getAvailableShapeOptionsCount() {
        const countShapeOptions = await this.shapeOption.count()
        return Number(countShapeOptions)
    }

    async getAvailableLightOptionsCount() {
        const countLightOptions = await this.lightOption.count()
        return Number(countLightOptions)
    }

    async getAvailableSetupOptionsCount() {
        const countSetupOptions = await this.setupOption.count()
        return Number(countSetupOptions)
    }

    async addProductTocart() {
        // await this.addToCartButton.click()
        await this.clickElementAndWaitForPageToLoad(this.addToCartButton)
        await expect(this.addToCartModal).toBeVisible()
    }

    async selectRandomHeight() {
        const heightOptionsCount = await this.getAvailableHeightOptionsCount()
        let available = false
        while (!available) {
            const randomHeightIndex = Math.floor(Math.random() * heightOptionsCount)
            await this.heightOption.nth(randomHeightIndex).waitFor({ state: 'visible' })
            await this.heightOption.nth(randomHeightIndex).click()
            if (await this.notifyMeButton.count() == 0) {
                available = true
            } else {
                console.log(`Selecting available height option`)
            }
        }

        return await this.selectedHeightValue.innerText()
    }

    async selectRandomShape() {
        const shapeOptionsCount = await this.getAvailableShapeOptionsCount()
        if (shapeOptionsCount > 0) {
            let available = false
            while (!available) {
                const randomShapeIndex = Math.floor(Math.random() * shapeOptionsCount)
                await this.shapeOption.nth(randomShapeIndex).waitFor({ state: 'visible' })
                await this.shapeOption.nth(randomShapeIndex).click()
                if (await this.notifyMeButton.count() == 0) {
                    available = true
                } else {
                    console.log(`Selecting available shape option`)
                }
            }
        }
        return await this.selectedShapeValue.innerText()
    }

    async selectRandomLight() {
        const lightOptionsCount = await this.getAvailableLightOptionsCount()
        if (lightOptionsCount > 0) {
            let available = false
            while (!available) {
                const randomLightIndex = Math.floor(Math.random() * lightOptionsCount)
                await this.lightOption.nth(randomLightIndex).waitFor({ state: 'visible' })
                await this.lightOption.nth(randomLightIndex).click()
                if (await this.notifyMeButton.count() == 0) {
                    available = true
                } else {
                    console.log(`Selecting available shape option`)
                }
            }
        }
        return await this.selectedLightsValue.innerText()
    }

    async selectRandomSetup() {
        const setupOptionsCount = await this.getAvailableSetupOptionsCount()
        if (setupOptionsCount > 0) {
            let available = false
            while (!available) {
                const randomSetupIndex = Math.floor(Math.random() * setupOptionsCount)
                await this.setupOption.nth(randomSetupIndex).waitFor({ state: 'visible' })
                await this.setupOption.nth(randomSetupIndex).click()
                if (await this.notifyMeButton.count() == 0) {
                    available = true
                } else {
                    console.log(`Selecting available setup option`)
                }
            }
            return await this.selectedSetupValue.innerText()
        }

    }


}