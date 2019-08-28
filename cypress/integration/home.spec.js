describe("Login form", () => {
    const userInput = "we";
    const passwordInput = "we";

    it("Should enter username", () => {
        cy.visit("login");
        cy.get("#login-input-one")
        .first()
        .type(userInput)
        .should("have.value", userInput);
    });

    it("Should enter password", () => {
        cy.get("#password")
        .type(passwordInput)
        .should("have.value", passwordInput);
    });

    it("Should log in user", () => {
        cy.get(".login_button")
        .should("exist")
        .click();
    });

    it('Loads end card on page load', () => {
        cy.get('.end_card')
        .should('exist')
    })

    it('Hamburger menu opens on click', () => {
        cy.get('#hamburger')
        .should('exist')
        .click()
    })

    it('Messaging link successfully works', () => {
        cy.get('#messaging')
        .should('exist')
        .click()
    })

    it('Swiped users images appear', () => {
        cy.get('.inbox-left')
        .should('exist')
    })

    
});