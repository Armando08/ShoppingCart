// https://docs.cypress.io/api/introduction/api.html

describe('Cart', () => {
  it('Cart Actions', () => {
    cy.visit('http://localhost:8080')
    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://api.musement.com/api/v3/activities?limit=${6}&offset=${1}`', // that have a URL that matches '/users/*'
      response: [],
    })
    cy.contains('Add to cart').click()
    cy.get('.cart').click()
    cy.get('.quantity-buttons')
      .last()
      .click()
    cy.get('input').should('have.value', '2')
    cy.get('.quantity-buttons')
      .first()
      .click()
    cy.get('input.quantity-input').type('00')
    cy.get('.total-cart').should('contain', '4900')
    cy.get('.remove-item').click()
    cy.get('.total-cart').should('contain', '0')
    cy.get('.close-btn').click()
  })
})
