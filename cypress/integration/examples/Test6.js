describe('Handling web table', function() {

it('This is first test case', function() {
    cy.visit(Cypress.env('url') + '/AutomationPractice/')

    //Traversing in certain column at web table
    cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {

        var course = $e1.text()
        if(course.includes('Python')) {

            //selecting next sibling locator
            cy.get('tr td:nth-child(2)').eq(index).next().then((price) => {
                var priceText = price.text()
                expect(priceText).to.equal('25')

            })
        }
    })

    })
})