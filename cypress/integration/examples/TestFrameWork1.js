import HomePage from '../pageObjects/HomePage'
import ProductPage from '../pageObjects/ProductPage'
import CheckoutPage from '../pageObjects/CheckoutPage'

describe('This test suite is for framework scenarios', function() {

    const homePage = new HomePage()
    const productPage = new ProductPage()
    const checkoutPage = new CheckoutPage()

    before(function() {
        cy.fixture('example').then(function(data) {
            this.data = data
        }) 

    })

    it('This is first test case', function() {
        Cypress.config('defaultCommandTimeout', 8000)
        cy.visit(Cypress.env('url') + '/angularpractice/')
        //Reading data from fixture file
        homePage.getName().type(this.data.name)
        homePage.getGender().select(this.data.gender)

        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        homePage.getName().should('have.attr', 'minlength', 2)
        homePage.getEntrepreneur().should('be.disabled')

        // cy.pause()

        homePage.getShopTab().click()
        this.data.productList.forEach(function(element) {
            //Using custom commands method
            cy.selectProduct(element)

        })

        productPage.getCheckout().click()
        var sum = 0

        cy.get('tr td:nth-child(4) strong').each(($el,index,$list) => {
            var priceText = $el.text()
            var res = priceText.split(" ")
            var price = res[1]
            cy.log(price)
            sum = Number(sum) + Number(price)    
        }).then(function() {
            cy.log(sum)
        })

        cy.get('h3 strong').then(function(total){
            var totalText = total.text()
            var res1 = totalText.split(" ")
            var totalPrice = res1[1]
            expect(Number(totalPrice)).to.equal(sum)
        })


        checkoutPage.getCheckoutBtn().click()
        checkoutPage.getCountry().type('India')
        checkoutPage.getCountryName().click()
        checkoutPage.getPurchaseBtn().click()
        checkoutPage.getAlert().then(function(alertText) {
            expect(alertText.text().includes('Success')).to.be.true
        })
    })

})