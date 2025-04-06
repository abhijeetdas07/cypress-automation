import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"
import HomePage from "../../../../support/pageObjects/HomePage"

const homePage = new HomePage()

Given('User visit Ecommerce page', () => {
    homePage.goTo(Cypress.env('url') + '/loginpagePractise/#')
})

When('User login to application', function() {
    this.productPage = homePage.login(this.data.username, this.data.password)
    this.productPage.pageValidation()
    this.productPage.getCardCount().should('have.length', 4)
})

When('User login to application with username and password', function(dataTable) {
    this.productPage = homePage.login(dataTable.rawTable[1][0], dataTable.rawTable[1][1])
    this.productPage.pageValidation()
    this.productPage.getCardCount().should('have.length', 4)
})

When('User add items to cart and checkout', function() {
    this.productPage.selectProduct(this.data.productName)
    this.productPage.selectFirstProduct()
    this.cartPage = this.productPage.goToCart()
})

When('Validate total price limit', function () {
    this.cartPage.sumOfProducts().then(function (sum) {
        expect(sum).to.be.lessThan(200000)
    })
})

Then('User select the country, submit the order and Verify Thank you message', function () {
    const confirmationPage = this.cartPage.checkOutItems()
    confirmationPage.submitFormDetails()
    confirmationPage.getAlertMessage().should('contain', 'Success!')
})