class HomePage {

    getName() {
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getGender() {
        return cy.get('select.form-control')
    }

    getTwoWayDataBinding() {
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getEntrepreneur() {
        return cy.get('input[value="option3"]')
    }

    getShopTab() {
        return cy.get('a[href="/angularpractice/shop"]')
    }
}
export default HomePage