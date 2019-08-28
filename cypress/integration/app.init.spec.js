describe('App initialization', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Loads login inputs on page load', () => {
        cy.get('.login_inputs')
        .should('exist')
    });

    it('Loads login button on page load', () => {
        cy.get('.login_button')
        .should('exist')
    });

    it('Loads register link on page load', () => {
        cy.get('.link_to_register')
        .should('exist')
    })

    it('Loads logo on page load', () => {
        cy.get('.rfu')
        .should('exist')
    })
})