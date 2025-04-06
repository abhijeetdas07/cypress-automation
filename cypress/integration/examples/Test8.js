describe('Handling child window', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    //Opening child window in same parent tab
    cy.get('#opentab').then((el) => {
        var url = el.prop('href')

        cy.visit(url)

        //Handling different domain urls in same tab
        cy.origin(url, () => {
        cy.get('.navbar-nav a[href="about.html"]').click()
        cy.get('.section-title h2').should('contain','QAClick Academy')

    })

    })

    })
})