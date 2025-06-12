describe('проверяем доступность приложения', function() {

    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', '/api/auth/user', { fixture: 'userResponse.json' }).as('getUser');

        window.localStorage.setItem('refreshToken', 'testRefreshToken');
        cy.setCookie('accessToken', 'testAccessToken');

        cy.visit('http://localhost:4000');

        cy.wait('@getIngredients');
        cy.wait('@getUser');
    });

    it('Сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000'); 
    });

    it('Добавление ингридиентов из списка в конструктор', () => {

        cy.get(`[data-cy='ingredient:bun']`).first().contains('Добавить').click();
        cy.contains('Выберите булки').should('not.exist');

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

    it('Тест создания заказа', () => {

        const orderData = require('../fixtures/orderResponse.json');

        //Собирается бургер
        cy.get(`[data-cy='ingredient:bun']`).first().contains('Добавить').click();
        cy.get(`[data-cy='ingredient:main']`).first().contains('Добавить').click();

        //отправка заказа
        cy.intercept('POST', '/api/orders', { fixture: 'orderResponse.json' }).as('createOrder');
        cy.contains('Оформить заказ').click();
        cy.wait('@createOrder');

        //модальное окно заказа
        cy.get('[data-cy="modal"]').should('exist').should('be.visible');
        cy.contains(orderData.order.number).should('exist').should('be.visible');

        //закрытие модального окна
        cy.get('[data-cy="modalCloseButton"]').click();
        cy.get('[data-cy="modal"]').should('not.exist');

        //проверка, что конструктор пустой
        cy.contains('Выберите булки').should('exist').should('be.visible');
        cy.contains('Выберите начинку').should('exist').should('be.visible');

    });

}); 