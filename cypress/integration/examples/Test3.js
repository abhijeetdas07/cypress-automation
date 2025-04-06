describe('This is third test suite', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    //Checkboxes
    //checking single checkbox
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
    //unchecking single checkbox
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
    //checking multiple checkboxes
    cy.get('input[type="checkbox"]').check(['option2','option3'])

    //static dropdown
    cy.get('#dropdown-class-example').select('option2').should('have.value','option2')

    //dynamic dropdown
    cy.get('#autocomplete').type('Ind')
    cy.get('.ui-menu-item div').each(($e1,index,$list) => {
        if($e1.text()==='India') {
            cy.wrap($e1).click()
        }

    })
    cy.get('#autocomplete').should('have.value','India')

    //visible invisible
    cy.get('#hide-textbox').click()
    cy.get('#displayed-text').should('not.be.visible')
    cy.get('#show-textbox').click()
    cy.get('#displayed-text').should('be.visible')

    //radio button
    cy.get('input[value="radio2"]').check().should('be.checked')

    })
})