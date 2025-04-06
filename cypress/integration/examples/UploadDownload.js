describe('Upload Download Test', function() {

    it('Verify excel upload download ', function() {

        const replacePrice = 500
        const searchTextFruit = 'Kivi'
        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/download.xlsx"
        cy.visit("https://rahulshettyacademy.com/upload-download-test/")
        cy.get('#downloadButton').click()

        cy.task('writeExcelTest', {filepath: filePath, change:{rowChange:0, columnChange:2}, searchText: searchTextFruit, updateText: replacePrice})
        cy.get('#fileinput').selectFile(filePath)
        
        cy.contains(searchTextFruit).parent().parent().find('#cell-4-undefined').should('have.text', replacePrice)

    })
})  