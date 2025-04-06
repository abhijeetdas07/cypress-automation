
import HomePage from '../../support/pageObjects/HomePage'

describe('End to end ecommerce test', function () {

    before(function() {
        cy.fixture('example').then(function(data) {
            this.data = data
            this.homePage = new HomePage()
        })
    })

    it('Submit order', function () {
        const productName = this.data.productName
        this.homePage.goTo("https://rahulshettyacademy.com/loginpagePractise/#")
        const productPage = this.homePage.login(this.data.username, this.data.password)
        productPage.pageValidation()
        productPage.getCardCount().should('have.length', 4)
        productPage.selectProduct(productName)
        productPage.selectFirstProduct()
        const cartPage = productPage.goToCart()
        cartPage.sumOfProducts().then(function(sum) {
            expect(sum).to.be.lessThan(200000)
        })
        const confirmationPage = cartPage.checkOutItems()
        confirmationPage.submitFormDetails()
        confirmationPage.getAlertMessage().should('contain','Success!')
        


    })
})