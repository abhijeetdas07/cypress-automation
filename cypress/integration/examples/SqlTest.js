// describe('My First Test Suite', function () {
//     let data
//     beforeEach(function () {
//         cy.visit('https://example.cypress.io/commands/waiting')
//         cy.sqlServer('select * from persons').then(function (result) {
//             data = result
//         })
//     })

//     it('This sql server test case', function () {
//         cy.get('.wait-input1').type(data[0][2])
//         cy.wait(1000)
//         cy.get('.wait-input2').type(data[1][1])
//         cy.wait(1000)
//         cy.get('.wait-input3').type('Wait 1000ms after typing')
//         cy.wait(1000)
//     })

// })