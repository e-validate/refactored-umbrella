describe("Logout", () => {
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

  it("Should log user out successfully", () => {
    cy.get("#hamburger")
      .first()
      .click()
      .get("#logout")
      .click();
  });
});
