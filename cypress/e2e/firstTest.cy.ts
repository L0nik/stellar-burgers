describe('проверяем доступность приложения', function() {

    const bunSelector = `[data-cy='ingredient:bun']`;
    const ingredientSelector = `[data-cy='ingredient:main']`;
    const ingredientNameSelector = `[data-cy='ingredientName']`;
    const modalSelector = `[data-cy='modal']`;
    const modalCloseButtonSelector = `[data-cy='modalCloseButton']`;

    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', '/api/auth/user', { fixture: 'userResponse.json' }).as('getUser');

        window.localStorage.setItem('refreshToken', 'testRefreshToken');
        cy.setCookie('accessToken', 'testAccessToken');

        cy.visit('/');

        cy.wait('@getIngredients');
        cy.wait('@getUser');
    });

    it('Сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('/'); 
    });

    it('Добавление ингридиентов из списка в конструктор', () => {

        cy.get(bunSelector).first().as('bun');
        cy.get('@bun').contains('Добавить').click();
        cy.contains('Выберите булки').should('not.exist');
        cy.get('@bun').within(() => {
            cy.get(ingredientNameSelector).as('bunName');
        });
        cy.get('@bunName')
            .then((element) => element.text())
            .then((ingredientName) => {
                cy.get('.constructor-element').first().contains(ingredientName).should('exist');    
            })

        cy.get(ingredientSelector).first().as('ingredient')
        cy.get('@ingredient').contains('Добавить').click();
        cy.contains('Выберите начинку').should('not.exist');
        cy.get('@ingredient').within(() => {
            cy.get(ingredientNameSelector).as('ingredientName');
        });
        cy.get('@ingredientName')
            .then((element) => element.text())
            .then((ingredientName) => {
                cy.get('.constructor-element').eq(1).contains(ingredientName).should('exist');    
            })
    });

    it('Тест открытия модального окна по клику на ингридиент', () => {
        cy.get(bunSelector).first().as('bun');
        cy.get('@bun').within(() => {
            cy.get(ingredientNameSelector).as('bunName');
        });
        cy.get('@bun').click();
        cy.get(modalSelector).as('modal');
        cy.get('@modal').should('exist').should('be.visible');
        cy.get('@bunName')
            .then((element) => element.text())
            .then((ingredientName) => {
                cy.get(`[data-cy='ingredientNameModal']`).contains(ingredientName).should('exist');    
            })
    });

    it('Тест закрытия модального окна по клику на крестик', () => {
        cy.get(bunSelector).first().click();
        cy.get(modalCloseButtonSelector).should('exist').should('be.visible').click();
        cy.get(modalSelector).should('not.exist');
    });

    it('Тест закрытия модального окна по клику на оверлей', () => {
        cy.get(bunSelector).first().click();
        cy.get(`[data-cy='modalOverlay']`).should('exist').click({force: true});
        cy.get(modalSelector).should('not.exist');
    });

    it('Тест создания заказа', () => {

        const orderData = require('../fixtures/orderResponse.json');

        //Собирается бургер
        cy.get(bunSelector).first().contains('Добавить').click();
        cy.get(ingredientSelector).first().contains('Добавить').click();

        //отправка заказа
        cy.intercept('POST', '/api/orders', { fixture: 'orderResponse.json' }).as('createOrder');
        cy.contains('Оформить заказ').click();
        cy.wait('@createOrder');

        //модальное окно заказа
        cy.get(modalSelector).should('exist').should('be.visible');
        cy.contains(orderData.order.number).should('exist').should('be.visible');

        //закрытие модального окна
        cy.get(modalCloseButtonSelector).click();
        cy.get(modalSelector).should('not.exist');

        //проверка, что конструктор пустой
        cy.contains('Выберите булки').should('exist').should('be.visible');
        cy.contains('Выберите начинку').should('exist').should('be.visible');

    });

}); 