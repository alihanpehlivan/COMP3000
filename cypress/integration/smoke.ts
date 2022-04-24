describe('smoke', () => {
  it('Displays a welcome message', () => {
    cy.visit('http://localhost:3000');

    cy.contains('h3', 'Welcome to CriticEats🍴');
  });
});
