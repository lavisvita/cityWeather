angular.module('app').service('makeMenu', function() {
    let menu = {
        home:'Главная',
        about: 'О сервисе',
        reg:'Регистрация'
    };

    this.getMenu = function() {
        return menu;
    };
});