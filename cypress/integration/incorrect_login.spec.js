//Aaron's tests
describe("Incorrect Login form", () => {
  const userInput = "we";
  const passwordInput = "wee";
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

  it("Toastify should notify about incorrect username and password", () => {
    cy.get(".login_button")
      .should("exist")
      .click();
  });
});
