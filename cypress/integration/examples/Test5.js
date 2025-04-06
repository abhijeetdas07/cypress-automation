describe('Handling child tab', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    //Opening child tab in same parent tab
    cy.get('#opentab').invoke('removeAttr','target').click()

    //Handling different domain urls in same tab
    cy.origin('https://www.qaclickacademy.com/', () => {
        cy.get('.navbar-nav a[href="about.html"]').click()
        cy.get('.section-title h2').should('contain','QAClick Academy')

    })

    })
})