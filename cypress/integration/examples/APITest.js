describe('This is first test suite', function() {

    it('This is API testing through cypress', function() {
        cy.request('POST', 'https://rahulshettyacademy.com/Library/Addbook.php', {
            "name":"Learn Appium Automation with Java",
            "isbn":"bcdej",
            "aisle":"292652",
            "author":"John foer"
            }).then(function(response) {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('Msg', 'successfully added')
            })
    })
})