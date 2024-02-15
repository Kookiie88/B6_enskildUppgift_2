/*Test checks that there are time and participant options in booking select*/

describe("Check that times and participants exist", () => {
    it("Check that times and participants exist", () => {
        //Visits liveserver url
        cy.visit("http://127.0.0.1:5500/ourChallenges.html");
        //Gets each booking button with class .bookingTest
        cy.get(".bookingBtn").each(($button) => {

            //Clicks on booking button
            cy.wrap($button).click();

            //Clicks on first button in booking modal and chooses date
            cy.get(".booking-container__button").click();

            /*Gets select elements .time and .participants and checks 
            if these have atleast one option child */
            cy.get(".time").children().should("have.length.greaterThan", 0);
            cy.get(".participants").children().should("have.length.greaterThan", 0);

            /*Checks that the classes .timeOption and .partOption exists in DOM*/
            cy.get(".timeOption").should("exist");
            cy.get(".partOption").should("exist");

            /*Selects the index 0 of .time and .participants select optionsarray 
            to check that there is at least one option in each select*/
            cy.get(".time").select([0]);
            cy.get(".participants").select([0]);

            /*Clicks the x-symbol in booking to close the booking end remove 
            option elements from dom*/
            cy.get(".x-symbol").click();

            //Checks if the classes .timeOption and .partOption exists in DOM
            cy.get(".timeOption").should("not.exist");
            cy.get(".partOption").should("not.exist");
        });
    });
});
