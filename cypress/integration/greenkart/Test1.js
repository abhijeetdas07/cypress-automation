describe('This is first test suite', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/seleniumPractise/#/')
    cy.get('.search-keyword').type('ca')
    cy.wait(2000)
    //cypress get() acts like findElements of selenium
    cy.get('.product').should('have.length',5)
    cy.get('.product:visible').should('have.length',4)
    //aliasing to reuse locator
    cy.get('.products').as('productsLocator')
    //parent child chaining
    cy.get('@productsLocator').find('.product').should('have.length',4)
    cy.get('@productsLocator').find('.product').eq(1).contains('ADD TO CART').click().then(function() {
        console.log('log print on browser console')
    })
    //Iterating over the array of web elements using each
    cy.get('@productsLocator').find('.product').each(($e1,index,$list) => {
        var productName = $e1.find('h4.product-name').text()
        if(productName.includes('Cashews')) {
            cy.wrap($e1).find('button[type="button"]').click()
        }
    })
    //this is to print in logs
    cy.get('.brand.greenLogo').then(function(logoElement) {
        cy.log(logoElement.text())
    })

    cy.get('.brand.greenLogo').should('have.text','GREENKART')
    
    })
})