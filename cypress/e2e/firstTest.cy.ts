describe('проверяем доступность приложения', function() {

    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.visit('http://localhost:4000');
    });

    it('Сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });

    it('Добавление ингридиентов из списка в конструктор', () => {

        //добавление булки
        cy.get(`[data-cy='ingredient:bun']`).first().contains('Добавить').click();
        cy.contains('Выберите булки').should('not.exist');

        //добавление начинки
        cy.get(`[data-cy='ingredient:main']`).first().contains('Добавить').click();
        cy.contains('Выберите начинку').should('not.exist');
    });

    it('Тест открытия модального окна по клику на ингридиент', () => {
        cy.get(`[data-cy='ingredient:bun']`).first().click();
        cy.get(`[data-cy='modal']`).should('exist').should('be.visible');
    });

    it('Тест закрытия модального окна по клику на крестик', () => {
        cy.get(`[data-cy='ingredient:bun']`).first().click();
        cy.get(`[data-cy='modalCloseButton']`).should('exist').should('be.visible').click();
        cy.get(`[data-cy='modal']`).should('not.exist');
    });

    it('Тест закрытия модального окна по клику на оверлей', () => {
        cy.get(`[data-cy='ingredient:bun']`).first().click();
        cy.get(`[data-cy='modalOverlay']`).should('exist').click({force: true});
        cy.get(`[data-cy='modal']`).should('not.exist');
    });

}); 