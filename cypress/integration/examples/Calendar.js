describe('Handling calendar section', ()=> {

    it('Verify calendar date', ()=> {
        var month = '6'
        var date = '15'
        var year = '2027'
        var expectedList = [month, date, year]

        cy.visit(Cypress.env('url') + '/seleniumPractise/#/offers')
        cy.get('.react-date-picker__inputGroup').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.contains('button',year).click()
       
        cy.get('.react-calendar__tile').eq(Number(month)-1).click()
        cy.contains('button',date).click()

        //Assertion
        cy.get('.react-date-picker__inputGroup__input').each(($e1, index, $list) => {
            cy.wrap($e1).invoke('val').should('eq', expectedList[index])
        })

    })
})