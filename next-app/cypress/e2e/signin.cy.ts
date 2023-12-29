const TEST_USER_EMAIL = "ikeda+pytest@npoterakoya.org";
const TEST_USER_PW = "PyTest1234";

// Test Structure
// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Test-Structure

describe("Sign In", () => {
  it("should sign in an existing user", () => {
    cy.visit("/signin");
    cy.get("input[name=email]").type(TEST_USER_EMAIL);
    cy.get("input[name=password]").type(TEST_USER_PW);
    cy.get("button[type=submit]").click();
  });
});
