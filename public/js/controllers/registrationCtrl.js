angular.module('app')
    .controller('registrationCtrl', function($scope, makeMenu){
        $scope.links = makeMenu.getMenu();
        $scope.login = '';
        $scope.password = '';
        $scope.email = '';
        $scope.visible = false;
        $scope.regNow = (login, password, email)=>{
            $scope.visible = true;
            $scope.login = login;
            $scope.password = password;
            $scope.email = email;
        }
        $scope.close = () =>{
            $scope.visible = false;
        }

    });