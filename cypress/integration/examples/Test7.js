describe('Handling mouse hover', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    //Clicking on invisible elements
    cy.contains('Reload').click({force:true})

    //Performing actions on mouse hower elements
    cy.get('div.mouse-hover-content').invoke('show')

    cy.get('a[href="#top"]').click()
    cy.url().should('include','top')

    })
})