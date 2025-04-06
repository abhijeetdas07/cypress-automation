

describe('Jwt session', function () {

    it('logged in through local storage', function () {

        cy.loginAPI().then(async function () {
            cy.visit('https://rahulshettyacademy.com/client/', {

                onBeforeLoad: function (window) {
                    window.localStorage.setItem('token', Cypress.env('token'))
                }
            })
        })
        let productName = ''
        cy.get('[style="text-transform: uppercase;"]').eq(1).then(function(product) {
            productName = product.text()
        })
        cy.get('.card-body button:last-of-type').eq(1).click()
        cy.get('[routerlink*="cart"]').click()
        cy.contains("Checkout").click()
        cy.get('[placeholder*="Country"]').type('India')
        cy.get('.list-group button').each(($el, index, $list) => {
            if($el.text() == " India"){
                cy.wrap($el).click()
            }
        })
        cy.get('.action__submit').click()
        cy.contains('button', "Click To Download Order Details in Excel").click()

        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_abhijeet.das.07.csv"
 
        cy.task('excelToJsonConverter', filePath).then(function(result) {
            cy.log(result.data[1].A)
            expect(productName).to.equal(result.data[1].B)
        })

        //To verify the text present in file 
        cy.readFile(filePath).then(function(text) {
            expect(text).to.includes(productName)
        })

        
    })
})