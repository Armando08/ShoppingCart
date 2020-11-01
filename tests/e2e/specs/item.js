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
  it('add to cart and favorite', () => {
    cy.get('.add-to-cart')
      .first()
      .click()

    cy.get('.add-to-cart')
      .last()
      .dblclick()
    cy.get('.cart > .badge').should('contain', 3)
    cy.get('.cart').click()
    cy.get('input')
      .first()
      .should('have.value', '2')
    cy.get('.close-btn').click()
    cy.get('.add-to-favorite')
      .first()
      .click()
    cy.get('.add-to-favorite')
      .first()
      .click()
    cy.get('.add-to-favorite')
      .last()
      .click()
    cy.get('.favorites > .badge').should('contain', 1)
  })
})
