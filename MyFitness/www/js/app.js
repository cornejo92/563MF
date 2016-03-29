// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'SSFAlerts', 'pascalprecht.translate', 'tmh.dynamicLocale', 'RESTConnection', 'chart.js', 'MFServicesModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
  
  .state('landing', {
    url: '/',
    templateUrl: 'templates/landing.html',
    controller: 'LandingCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:'LoginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller:'RegisterCtrl'
  })
  .state('lobby', {
    url: '/lobby',
    templateUrl: 'templates/lobby.html',
    controller: 'LobbyCtrl'
  })
  .state('dailyLog', {
    url: '/dailylog',
    templateUrl: 'templates/dailylog.html',
    controller: 'DailyLogCtrl'
  })
  .state('calculators', {
    url: '/calculators',
    templateUrl: 'templates/calculators.html',
    controller: 'CalculatorsCtrl'
  })
  .state('workouts', {
    url: '/workouts',
    templateUrl: 'templates/workouts.html',
    controller: 'WorkoutsCtrl'
  })
  .state('abs', {
    url: '/workouts/abs',
    templateUrl: 'templates/workouts-abs.html',
    controller: 'ExercisesCtrl'
  })
  .state('arms', {
    url: '/workouts/arms',
    templateUrl: 'templates/workouts-arms.html',
    controller: 'ExercisesCtrl'
  })
  .state('back', {
    url: '/workouts/back',
    templateUrl: 'templates/workouts-back.html',
    controller: 'ExercisesCtrl'
  })
  .state('chest', {
    url: '/workouts/chest',
    templateUrl: 'templates/workouts-chest.html',
    controller: 'ExercisesCtrl'
  })
  .state('legs', {
    url: '/workouts/legs',
    templateUrl: 'templates/workouts-legs.html',
    controller: 'ExercisesCtrl'
  })
  .state('shoulders', {
    url: '/workouts/shoulders',
    templateUrl: 'templates/workouts-shoulders.html',
    controller: 'ExercisesCtrl'
  })
  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'SettingsCtrl'
  })
  .state('add-meals', {
    url: '/add-meals',
    templateUrl: 'templates/add-meals.html',
    controller: 'AddItemsCtrl'
  })
  .state('add-cardio-exercises', {
    url: '/add-cardio-exercises',
    templateUrl: 'templates/add-cardio-exercises.html',
    controller: 'AddItemsCtrl'
  })
  .state('add-strength-exercises', {
    url: '/add-strength-exercises',
    templateUrl: 'templates/add-strength-exercises.html',
    controller: 'AddItemsCtrl'
  })
  .state('add-videos', {
    url: '/add-videos',
    templateUrl: 'templates/add-videos.html',
    controller: 'AddItemsCtrl'
  })
  .state('test', {
    abstract: true,
    url: '/test',
    template: '<ion-nav-view></ion-nav-view>'
  })
  .state('user-profile', {
    url: '/user-profile',
    templateUrl: 'templates/user-profile.html',
    controller: 'UserProfileCtrl'
  })
  .state('user-profile-settings', {
    url: '/user-profile-settings',
    templateUrl: 'templates/user-profile-settings.html',
    controller: 'UserProfileCtrl'
  })
  /*.state('test.detail', {
    url: '/question:testID',
    templateUrl: 'templates/question.html',
    controller: 'TestCtrl',
    resolve: {
      testInfo: function($stateParams, TKQuestionsService) {
        return TKQuestionsService.getQuestion($stateParams.testID);
      }
    }
  }) */
  ;
  
  
}])
.config(function($translateProvider) {
    $translateProvider
    //Load languages files from path
    .useStaticFilesLoader({
      prefix: 'languages/',
      suffix: '.json'
    })
    .registerAvailableLanguageKeys(['de','en', 'es', 'fr', 'hr', 'it', 'ja', 'zh'], {
      'de_*': 'de',
      'en_*': 'en',
      'es_*': 'es',
      'fr_*': 'fr',
      'hr_*': 'hr',
      'it_*': 'it',
      'ja_*': 'ja',
      'zh_*': 'zh'
    })
    .preferredLanguage('en')
    .determinePreferredLanguage();
})
.config(function(tmhDynamicLocaleProvider) {
tmhDynamicLocaleProvider.localeLocationPattern("lib/angular-locale/angular-locale_{{locale}}.js");
})
.run(["$rootScope", "$ionicLoading", function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  });
  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });
}])
.run(["$rootScope", "$ionicHistory", "$state", "$window", function($rootScope, $ionicHistory, $state, $window) {
  $rootScope.$on('request:auth', function() {
    $ionicHistory.nextViewOptions({
      historyRoot: true,
      disableBack: true
    });
    delete $window.localStorage['token'];
    delete $window.localStorage['userID'];
    $state.go('landing');
  });  
}])

;
