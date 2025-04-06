/// <reference types="cypress-iframe"/>
require ('cypress-iframe')

describe('Handling iframe', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    cy.frameLoaded("#courses-iframe")

    cy.iframe().find('a[href="mentorship"]:visible').click()

    cy.iframe().find('h1[class*="pricing-title"]').should('have.length',2)
    
    })
})