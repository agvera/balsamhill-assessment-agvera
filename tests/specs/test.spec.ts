import { CartPage } from '../pages/cartPage.utils'
import { ProductPage } from '../pages/productPage.utils'
import { test, expect } from './../fixtures/base'



test('Add and Remove Product from Cart', async ({ page, common, searchResultPage, productPage, cartPage }) => {

    const productKeyword = 'Christmas Tree'
    let resultPagePrice: number
    let stickyBarPrice: number
    let productPagePrice: number
    let finalUpdatedPrice: number

    // Go to https://www.balsamhill.com/
    await page.goto('/')
    // Search for 'Christmas Tree' using the search bar.
    await test.step(`Search for ${productKeyword}`, async () => {
        await common.searchProduct(productKeyword)
        await common.clickViewAllResults()
        await page.waitForURL('**/search?text=*', { waitUntil: 'commit' })
    })
    // Select the third result that appears on the results page.
    // Validate that the price displayed on the results page is the same on the product page
    await test.step('Select the third product result', async () => {
        resultPagePrice = await searchResultPage.getProductPrice(2)
        await searchResultPage.selectFromSearchResult(2)
    })

    await test.step('Verify product price consistency between search result, sticky bar and product page', async () => {
        stickyBarPrice = await productPage.getProductStickyBarPrice()
        productPagePrice = await productPage.getProductPagePrice()
        console.log(`Verify search result Price: ${resultPagePrice} is equal to sticky bar price: ${stickyBarPrice}`)
        console.log(`Verify search result Price: ${resultPagePrice} is equal to product page price: ${productPagePrice}`)
        await expect(resultPagePrice).toEqual(stickyBarPrice)
        await expect(resultPagePrice).toEqual(productPagePrice)
    })

    // On the product selection page, choose any available customization options.
    await test.step(`Customize ${productKeyword}`, async () => {
        await productPage.selectRandomHeight()
        await productPage.selectRandomShape()
        await productPage.selectRandomLight()
        await productPage.selectRandomSetup()
        finalUpdatedPrice = await productPage.getProductPagePrice()
    })
    // Click Add to Cart.
    await test.step('Add product to cart', async () => {
        await productPage.addProductTocart()
        const modalPrice = await productPage.getModalProductPrice()
        await expect(modalPrice).toEqual(finalUpdatedPrice)
    })
    // Click View Cart.
    // Validate that the Cart icon shows the number 1, indicating an item has been added.
    await test.step('View Cart and Verify Cart Count and Customized Price', async () => {
        await productPage.modalViewCartButton.click()
        await page.waitForURL('**/cart', { waitUntil: 'commit' })
        const cartItemCount = await cartPage.getCartItemCount()
        const cartBadgeCount = await common.getCartBadgeCount()
        const totalAmount = await cartPage.getTotalAmount()
        console.log(`Verify customized product price: ${finalUpdatedPrice} is equal to final total price: ${totalAmount}`)
        console.log(`Verify that there is ${cartItemCount} in the cart list and ${cartBadgeCount} displayed in cart badge icon`)
        await expect(cartItemCount).toEqual(cartBadgeCount)
        await expect(totalAmount).toEqual(finalUpdatedPrice)
    })
    // Click the trash can icon to remove the item from the cart.
    // Validate the removal confirmation dialog that states '<Item> has been removed'.
    await test.step('Remove the item from the cart', async () => {
        await cartPage.removeItemsInThecart()
        await expect(common.cartBadge).toBeHidden()
        await expect(cartPage.removedItem).toContainText('has been removed')
        const totalAmount = await cartPage.getTotalAmount()
        console.log(`Verify total price is: ${totalAmount}, actual price: ${totalAmount} after removing the item from cart`)
    })

})
