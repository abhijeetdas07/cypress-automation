describe('This is fourth test suite', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')
    cy.get('#alertbtn').click()
    cy.get('#confirmbtn').click()

    //window alert
    cy.on('window:alert', (str) => {
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
    })

    //window confirm
    cy.on('window:confirm', (str) => {
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
    })

    })
})