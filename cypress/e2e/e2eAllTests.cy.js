describe("Look for specific element when using filtering", () => {
  it("Check if only on-site challenges exists when choosing only on-site in filtering", () => {
    //visit the frontpage
    cy.visit("https://kookiie88.github.io/B6_enskildUppgift_2");

    //check that the url is correct
    cy.url().should("eq", "https://kookiie88.github.io/B6_enskildUppgift_2/");

    //Navigate to ourChallenges with online challenges filter active
    cy.get(".btnCont__onlineBtn").first().click();
    cy.wait(1000);

    //check that the url is correct
    cy.url().should(
      "eq",
      "https://kookiie88.github.io/B6_enskildUppgift_2/ourChallenges.html?onsite=false"
    );

    //Open the filter box
    cy.get(".filter__filterBoxOpenButton").click();
    cy.wait(1000);

    //Uncheck box for online
    cy.get(".filter__onlineCheckbox").click();

    //Check box for on-site
    cy.get(".filter__onSiteCheckbox").click();

    //House icons should exist on cards (Only exist inside challenge cards)
    cy.wait(1000);
    cy.get(".sidescroll__title").should("contain", "on-site");

    //Testing if only icons with the class fa-house are visible
    cy.get(".sidescroll__icon.fa-house").should("be.visible");
    cy.get(".sidescroll__icon.fa-laptop").should("not.be.visible");
  });
});

//Testing error message
describe("Testing that, no challengs is displayed if both checkboxes are unchecked", () => {
  it("Tests so that correct error message shows up when no challenges are found", () => {
    cy.visit("https://kookiie88.github.io/B6_enskildUppgift_2");

    //check that the url is correct
    cy.url().should("eq", "https://kookiie88.github.io/B6_enskildUppgift_2/");

    //Navigate to ourChallenges with online challenges filter active
    cy.get(".btnCont__onlineBtn").first().click();
    cy.wait(1000);
    cy.url().should(
      "eq",
      "https://kookiie88.github.io/B6_enskildUppgift_2/ourChallenges.html?onsite=false"
    );

    //Open the filter box
    cy.get(".filter__filterBoxOpenButton").click();
    cy.wait(1000);

    //Uncheck box for online so both checkboxes are unchecked
    cy.get(".filter__onlineCheckbox").click();
    cy.wait(1000);

    //Check that zeroChallenges class is visible and contains the correct text
    cy.get(".zeroChallenges").should("be.visible");
    cy.get(".zeroChallenges").should("contain", "No matching challenges");
  });
});
