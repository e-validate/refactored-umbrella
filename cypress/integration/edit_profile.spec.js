//KhiavDim's tests
describe("Edit Profile", () => {
  const userInput = "we";
  const passwordInput = "we";
  const name = "Test";
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

  it("Should take user to profile page", () => {
    cy.get("#hamburger")
      .first()
      .click()
      .get("#profile")
      .click();
  });

  it("User should be able to go toggle between edit mode", () => {
    cy.wait(3000)
      .get("#edit_btn")
      .click()
      .get("#cancel_btn")
      .click();
  });
});
