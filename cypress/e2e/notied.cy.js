describe("Notied Test", () => {
  it("successfully loads", () => {
    cy.visit("/")
    cy.contains("Login").click()
  })
})
