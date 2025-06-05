describe('проверяем доступность приложения', function() {

    this.beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.visit('http://localhost:4000');
    });

    it('Сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });

    it('Добавление ингридиентов из списка в конструктор', () => {

        //добавление булки
        cy.get('h3').contains('Булки').next('ul').children().first().contains('Добавить').click();
        cy.contains('Выберите булки').should('not.exist');

        //добавление начинки
        cy.get('h3').contains('Начинки').next('ul').children().first().contains('Добавить').click();
        cy.contains('Выберите булки').should('not.exist');
    })
}); 