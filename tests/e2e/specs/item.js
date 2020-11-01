// https://docs.cypress.io/api/introduction/api.html

describe('Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8080')
    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://api.musement.com/api/v3/activities?limit=${6}&offset=${1}`', // that have a URL that matches '/users/*'
      response: [],
    })
  })
  it('add to cart and favorite',() => {
    cy.contains('Add to cart').click()
    cy.get('.add-to-favorite')
      .first()
      .click()
    cy.get('.add-to-favorite')
      .first()
      .click()
    cy.get('.add-to-favorite')
      .last()
      .click()
    
  })
})
