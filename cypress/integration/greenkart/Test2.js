describe('This is second test suite', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/')
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    //aliasing to reuse locator
    cy.get('.products').as('productsLocator')
    //Iterating over the array of web elements using each
    cy.get('@productsLocator').find('.product').each(($e1,index,$list) => {
        var productName = $e1.find('h4.product-name').text()
        if(productName.includes('Cashews')) {
            cy.wrap($e1).find('button[type="button"]').click()
        }
    })
    cy.get('.cart-icon').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    cy.contains('Place Order').click()
    
    })
})