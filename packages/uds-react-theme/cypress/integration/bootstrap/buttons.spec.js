describe('bootstrap/buttons', () => {

  it('Does not do much!', function() {
    cy.visit('http://localhost:6006/?path=/story/bootstrap-buttons--with-text');
    cy.get('nav').contains('emoji').click()
  })

});
