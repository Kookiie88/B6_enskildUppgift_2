describe("Tag button click", () => {
    it("Toggles the selected class on click for all buttons", () => {
        cy.visit("http://127.0.0.1:5500/ourChallenges.html");

        cy.get(".filter__tagButton").each(($button) => {
            cy.wrap($button).should("not.have.class", "filter__tagButton--selected");
            cy.wrap($button).click();
            cy.wrap($button).should("have.class", "filter__tagButton--selected");
            cy.wrap($button).click();
            cy.wrap($button).should("not.have.class", "filter__tagButton--selected");
        });
    });
});
