class CheckoutPage {

    getCheckoutBtn() {
        return cy.contains('Checkout')
    }

    getCountry() {
        return cy.get('#country')
    }

    getCountryName() {
        return cy.get('.suggestions > ul > li > a')
    }

    getPurchaseBtn() {
        return cy.get('input[value="Purchase"]')
    }

    getAlert() {
        return cy.get('div.alert')
    }

}
export default CheckoutPage