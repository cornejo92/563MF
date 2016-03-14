angular.module('SSFAlerts', [])
.service('SSFAlertsService', ['$ionicPopup', '$q', '$translate', function ($ionicPopup, $q, $translate) {
    var service = this;
    service.showAlert = function(title, body) {
        $translate([title, body])
        .then(function(response){
          if(navigator.notification == undefined) {
                //Ionic style approach
            var alertPopup = $ionicPopup.alert({
            title: response[title],
            template: response[body]
            });
                alertPopup.then();
            } else {
                    //Native style
                navigator.notification.alert(response[body], null, response[title]);
            }  
        });
    };
    service.showConfirm = function(title, body) {
        $translate([title, body])
        .then(function(response) {
            var defer = $q.defer();
            var confirmCallback = function(buttonIndex) {
                 if(buttonIndex===1) {
                     defer.resolve(true);
                 } else {
                     defer.resolve(false);
                 }
            };
            if (navigator.notification == undefined) {
                //Ionic style approach
                var alertPopup = $ionicPopup.confirm({
                title: response[title],
                template: response[body]
                });
                    alertPopup.then();
                } else {
                        //Native style
                    navigator.notification.confirm(response[body], confirmCallback, response[title]);
                }
            return defer.promise;
        });
    };
    
}]);