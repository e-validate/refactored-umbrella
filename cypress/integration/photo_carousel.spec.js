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

  it("Should take user to profile page", () => {
    cy.get("#hamburger")
      .first()
      .click()
      .get("#profile")
      .click();
  });

  it("User should be able to swipe through photo carousel", () => {
    cy.wait(3000)
      .get("#dotForRadio-2")
      .click()
      .get("#dotForRadio-3")
      .click()
      .get("#dotForRadio-4")
      .click()
      .get("#dotForRadio-1")
      .click();
  });
});
