class ConfirmationPage {

    submitFormDetails() {
      cy.submitFormDetails()
    }

    getAlertMessage() {
        return cy.get('.alert-success')
    }

}
export default ConfirmationPage