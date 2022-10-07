describe('practice page spec', () => {
  it('types into textfield and shadow dom', () => {

    cy.visit('https://selectorshub.com/xpath-practice-page/')
   
    cy.xpath('(//input[@name=\'company\'])[1]').type('mycompany')

    cy.get('#userName').shadow().find('#kils').type('superuser')

  })
})




