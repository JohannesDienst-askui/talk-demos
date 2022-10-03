describe('practice page spec', () => {
  it('passes', () => {
    cy.visit('./XpathPracticePage.html')
    
    cy.xpath('(//input[@name=\'company\'])[1]').type('mycompany')

    cy.get('#userName').shadow().find('#kils').type('superuser')

    cy.get('#pass').type('test')
  })
})