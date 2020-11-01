
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

    cy.get(':nth-child(3) > button').click()
    cy.get(':nth-child(5) > button').click()
    cy.get(':nth-child(5) > button').click()
    cy.get(':nth-child(5) > button').click()
    cy.get(':nth-child(5) > button').click()
    cy.get(':nth-child(2) > button > span').click()
    cy.get('.pagination-browse > span')
      .should('contain', ' Page: 5 / 2467')
    cy.get('.pagination > :nth-child(1) > button').click()
    cy.get('.pagination-browse > span')
      .should('contain', 'Page: 1 / 2467')
    cy.get(':nth-child(8) > button').click()
    cy.get('.pagination-browse > span')
      .should('contain', 'Page: 2 / 2467')
    cy.get(':nth-child(9) > button').click()
    cy.get('.pagination-browse > span')
      .should('contain', 'Page: 2467 / 2467')
    cy.get('.pagination > :nth-child(1) > button').click()
    cy.get('select').select('12').should('have.value', '12')
    cy.get('.container')
      .find('.product-card')
      .should('have.length', 12)
  })
})

