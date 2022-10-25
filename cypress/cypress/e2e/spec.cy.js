describe('practice page spec', () => {
  it('types into textfield and shadow dom', () => {

    cy.visit('../XpathPracticePage.html')
    
    cy.get('input').closest('#inp_val').type('Really close')
  })
})


// XPath
// cy.xpath('(//input[@name=\'company\'])[1]').type('mycompany')

// CSS
// cy.get('#pass').type('mytotallySecretPa$$');

// Does not work because 'readonly' without focus
// cy.get('#userId').type('myUsername');

// Shadow DOM
// cy.get('#userName').shadow().find('#kils').type('superuser')

// Click Buttons
// cy.contains('Checkout here').click()

// Relational Selector
// cy.get('input').closest('#inp_val').type('Really close')


// cy.visit('https://selectorshub.com/xpath-practice-page/')