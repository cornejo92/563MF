angular.module('starter.controllers', [])

.controller('LandingCtrl', ['$scope', '$rootScope', '$ionicPlatform', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate', '$ionicPopover',
function($scope, $rootScope, $ionicPlatform, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicPopover){
    $ionicNavBarDelegate.showBackButton(false);
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function($event) {
        $scope.popover.show($event);
        $scope.addIcon = "ion-ios-close";
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    $scope.$on('popover.hidden', function() {
      // Execute action
      $scope.addIcon = "ion-ios-plus-outline";
   });
    $scope.addIcon = "ion-ios-plus-outline";
}])
.controller('LoginCtrl',['$scope', '$state', 'UserService', '$ionicHistory', '$window', 'SSFAlertsService', '$timeout', '$ionicTabsDelegate', '$ionicNavBarDelegate',
function($scope, $state, UserService, $ionicHistory, $window, SSFAlertsService, $timeout, $ionicTabsDelegate, $ionicNavBarDelegate) {
    $scope.user = {};
    $scope.title = "Login";
    $ionicNavBarDelegate.showBackButton(true);
    var rememberMeValue;
    if($window.localStorage["rememberMe"] === undefined || $window.localStorage["rememberMe"] == "true") {
        rememberMeValue = true;
    } else {
        rememberMeValue = false;
    }
       
    $scope.checkbox = {
        rememberMe : rememberMeValue
    };
    if($window.localStorage["username"]!== undefined && rememberMeValue === true) {
        $scope.user.email = $window.localStorage["username"];
    }
    $scope.loginSubmitForm = function(form) {
        if(form.$valid) {   
            UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    //Should return a token
                    console.log(response);
                    $window.localStorage["userID"] = response.data.userId;
                    $window.localStorage["token"] = response.data.id;
                    $ionicHistory.nextViewOptions({
                      historyRoot: true,
                      disableBack: true
                    });
                    $state.go('lobby');
                    $window.localStorage["rememberMe"] = $scope.checkbox.rememberMe;
                    if($scope.checkbox.rememberMe) {
                        $window.localStorage["username"] = $scope.user.email;
                    } else {
                        delete $window.localStorage["username"];
                        $scope.user.email = "";
                    }
                    $scope.user.password = "";
                    form.$setPristine();
                } else if(response.status === 401) {
                    SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.LOGIN_401");
                } else if(response.data === null) {
                //If the data is null, it means there is no internet connection.
                    SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.NULL");
                } else {
                    SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.GENERAL");
                }
                
            });
        }
    };
}])
.controller('RegisterCtrl',['$scope', '$state', 'UserService', '$ionicHistory', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate',
function($scope, $state, UserService, $ionicHistory, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate) {
    $scope.user = {};
    $scope.repeatPassword = {};
    $ionicNavBarDelegate.showBackButton(true);
    $scope.signupForm = function(form) {
        if(form.$valid) {   
            if($scope.user.password !== $scope.repeatPassword.password) {
                SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.PASSWORDS");
            } else {
                UserService.create($scope.user)
                .then(function(response) {
                    if (response.status === 200) {
                        $scope.loginAfterRegister();
                        form.$setPristine(); 
                    } else if(response.status === 422) {
                        SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.422");
                    } else if(response.data === 401){
                        SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.SIGN_UP_401");
                    } else if(response.data === null) {
                        //If the data is null, it means there is no internet connection.
                        SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.NULL");
                    } else {
                        SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.GENERAL");
                    }
                    
                });
            }
        }
    };
    //Required to get the access token
    $scope.loginAfterRegister = function () {
        UserService.login($scope.user)
        .then(function(response) {
            if (response.status === 200) {
                //Should return a token
                $window.localStorage["userID"] = response.data.userId;
                $window.localStorage['token'] = response.data.id;
                $ionicHistory.nextViewOptions({
                   historyRoot: true,
                   disableBack: true
                });
                $state.go('lobby');
            } else {
                // invalid response
                $state.go('landing');
            } resetFields();
        }, function(response) {
            // something went wrong
            console.log(response);
            $state.go('landing');
            resetFields();
        });
    
    };
    function resetFields() {
        $scope.user.email = "";
        $scope.user.firstName = "";
        $scope.user.lastName = "";
        $scope.user.organization = "";
        $scope.user.password = "";
        $scope.repeatPassword.password = "";
    }
}])
.controller('LobbyCtrl', ['$scope', '$state', '$ionicHistory', 'UserService', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate', '$translate', '$ionicPopover', 'MFSaveService',
function($scope, $state, $ionicHistory, UserService, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate, $translate, $ionicPopover, MFSaveService) {
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(false);
    $scope.proteinPercentage = Math.floor(100 * MFSaveService.getMealInfo("protein") / (MFSaveService.getMealInfo("carbs") + MFSaveService.getMealInfo("protein") + MFSaveService.getMealInfo("fat")));
    $scope.carbsPercentage = Math.floor(100 * MFSaveService.getMealInfo("carbs") / (MFSaveService.getMealInfo("carbs") + MFSaveService.getMealInfo("protein") + MFSaveService.getMealInfo("fat")));
    $scope.fatPercentage = Math.floor(100 * MFSaveService.getMealInfo("fat") / (MFSaveService.getMealInfo("carbs") + MFSaveService.getMealInfo("protein") + MFSaveService.getMealInfo("fat")));
}])
.controller('DailyLogCtrl', ['$scope', '$state', '$ionicHistory', 'UserService', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate', 'AddItemsService', '$translate', 'tmhDynamicLocale',
function($scope, $state, $ionicHistory, UserService, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate, AddItemsService, $translate, tmhDynamicLocale) {
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(false);
    
    $scope.meals = [];
    $scope.updateList = performRequest();
    performRequest();
    if ( typeof navigator.globalization !== "undefined" ) {
                navigator.globalization.getPreferredLanguage(function(language) {
                    tmhDynamicLocale.set((language.value).split("-")[0]);
                }, null);
            }
    function performRequest() {
        AddItemsService.all($window.localStorage['userID'], $window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                $scope.meals = response.data;
            } else if (response.status !== 401) {
                // invalid
                confirmPrompt();
            }
        }, function(response) {
            // something went wrong
            console.log(response);
            confirmPrompt();
        });
    }
    
    function confirmPrompt() {
        SSFAlertsService.showConfirm("ERRORS.ERROR", "ERRORS.TESTS")
        .then(function(response) {
            if (response == true) {
                 //User answered OK
                 performRequest();
            }
        });
    }
    
}])
.controller('CalculatorsCtrl', ['$scope', '$state', '$ionicHistory', 'UserService', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate', 'tmhDynamicLocale',
function($scope, $state, $ionicHistory, UserService, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate, tmhDynamicLocale) {
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(false);
    $scope.calculateBMR = function (age, weight, height, sex){
	    var BMRM = 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
	    var BMRF = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
	
        if (sex == true) {
            console.log($scope.userInfo);
    		return BMRM;
    	} else {
    		return BMRF;
    	}
    };
    $scope.calculateBMI = function (weight, height){
    	var BMI = (weight / (height * height)) * 703;
    	console.log($scope.userInfo);
    	return BMI;
    };
    $scope.userInfo = [];
    var age;
    var weight;
    var height;
    var sex;
    $scope.printUserInfo = function(){ return console.log($scope.userInfo); };
    $scope.userBMR =  function () { return $scope.calculateBMR(age, weight, height, sex).toFixed(0);};
    $scope.userBMI = function () { return $scope.calculateBMI(weight, height).toFixed(1);};
    $scope.updateList = function(){ return performRequest();};
    performRequest();
    if ( typeof navigator.globalization !== "undefined" ) {
                navigator.globalization.getPreferredLanguage(function(language) {
                    tmhDynamicLocale.set((language.value).split("-")[0]);
                }, null);
            }
    function performRequest() {
        UserService.all($window.localStorage['username'], $window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                $scope.userInfo = response.data;
                age = $scope.userInfo[0]["age"];
                weight = $scope.userInfo[0]["weight"];
                height = $scope.userInfo[0]["height"];
                sex = $scope.userInfo[0]["sex"];
            } else if (response.status !== 401) {
                // invalid
                confirmPrompt();
            }
        }, function(response) {
            // something went wrong
            console.log(response);
            confirmPrompt();
        });
    }
    
    function confirmPrompt() {
        SSFAlertsService.showConfirm("ERRORS.ERROR", "ERRORS.TESTS")
        .then(function(response) {
            if (response == true) {
                 //User answered OK
                 performRequest();
            }
        });
    }
}])
.controller('WorkoutsCtrl', ['$scope', '$state', '$ionicHistory', 'UserService', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate',
function($scope, $state, $ionicHistory, UserService, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate) {
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(false);
}])
.controller('ExercisesCtrl', ['$scope', '$ionicTabsDelegate', '$ionicNavBarDelegate', function($scope, $ionicTabsDelegate, $ionicNavBarDelegate){
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(true);
}])
.controller('SettingsCtrl', ['$scope', '$state', '$ionicHistory', 'UserService', '$window', 'SSFAlertsService', '$ionicTabsDelegate', '$ionicNavBarDelegate', '$ionicPopover',
function($scope, $state, $ionicHistory, UserService, $window, SSFAlertsService, $ionicTabsDelegate, $ionicNavBarDelegate, $ionicPopover){
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(true);
    $scope.seeHistoryPopover1d = function($event){
        $scope.popover1d.show($event);
    };
    $scope.seeHistoryPopover2d = function($event){
        $scope.popover2d.show($event);
    };
    $scope.seeHistoryPopover3d = function($event){
        $scope.popover3d.show($event);
    };
    $scope.seeHistoryPopover4d = function($event){
        $scope.popover4d.show($event);
    };
    $scope.hideHistoryPopover = function() {
        $scope.popover1d.hide();
        $scope.popover2d.hide();
        $scope.popover3d.hide();
        $scope.popover4d.hide();
    };
    $ionicPopover.fromTemplateUrl('templates/dicerollerpopover1d.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover1d = popover;
    });
    $ionicPopover.fromTemplateUrl('templates/dicerollerpopover2d.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover2d = popover;
    });
    $ionicPopover.fromTemplateUrl('templates/dicerollerpopover3d.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover3d = popover;
    });
    $ionicPopover.fromTemplateUrl('templates/dicerollerpopover4d.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover4d = popover;
    });
    $scope.logout = function() {
         UserService.logout($window.localStorage.token)
         .then(function(response) {
            //The successful code for logout is 204
            if(response.status === 204) {
                delete $window.localStorage['token'];
                delete $window.localStorage['userID'];
                $ionicHistory.nextViewOptions({
                  historyRoot: true,
                  disableBack: true
                });
                $state.go('landing');
            } else {
                 SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.LOG_OUT");
            }
        }, function(response) {
            SSFAlertsService.showAlert("ERRORS.ERROR", "ERRORS.LOG_OUT");
        });
    };
    $scope.testConsoleLog = function(){
        SSFAlertsService.showAlert("ERRORS.WARNING", "ERRORS.COMPLETE_ENTRY");
    };
    $scope.arrayResults = { "1":[], 
    						"2":[], 
    						"3":[], 
    						"4":[]
    					  };

// used to display history. set text box, or text area, or ionic type of area for history.
// displayHistory takes in a parameter of the number dice that you want to display.
    $scope.displayHistory = function(dice){
    	var last10Rolls = [];
    	for (var i = 0; i < 9; i++) {
    		last10Rolls.unshift($scope.arrayResults[dice][i]);
    	}
    	return last10Rolls;
    };
    // used to display the current roll. dice is the number of dice rolled.
    // cannot be used as "2d" only "2". parameter cannot be used as "4d" only "4"
    $scope.currentResults;
    $scope.displayCurrentResults = function(max, min, dice){
    	var displayRollResults = [];
    	for (var i =0; i < dice; i++) {
    		displayRollResults.push($scope.rollDice(max, min));
    	}
    	$scope.pushResults(max, min, dice);
    	$scope.currentResults = displayRollResults;
    	return displayRollResults;
    };
    // pushResults() & rollDice() are called in separate functions.
    $scope.pushResults = function(max, min, dice){
    	var results = [];
    	for (var i = 0; i < dice; i++) {
    	    var currentRollDice = $scope.rollDice(max, min);
    		results.push(currentRollDice);
    	}
    	$scope.arrayResults[dice].unshift(results);
    };
    $scope.rollDice = function(max, min){
    	var roll = (Math.floor(Math.random()*(max) + 1));
    	if (roll < min) {
    		return parseInt(min);
    	} else {
    		return roll;
    	}
    };
}])
.controller('GraphController', [ '$scope', 'MFSaveService', function($scope, MFSaveService){
    var ctx = document.getElementById("myChart").getContext("2d");
    ctx.canvas.width = 100;
    ctx.canvas.height = 100;
    var proteinPercent = Math.floor(MFSaveService.getMealInfo("protein")); 
    var carbsPercent = Math.floor(MFSaveService.getMealInfo("carbs")); 
    var fatPercent = Math.floor(MFSaveService.getMealInfo("fat"));
    var myPieChart = new Chart(ctx).Pie([
        {
        value: proteinPercent,
        color: "#00cc00",
        highlight: "#00ff00",
        label: "Protein"
        },
        {
        value: carbsPercent,
        color:"#0066ff",
        highlight: "#3385ff",
        label: "Carbs"
        },
        {
        value: fatPercent,
        color: "#ffff00",
        highlight: "#ffff66",
        label: "Fat"
        }
    ], {
        responsive: true,
        maintainAspectRatio: false
    });
}])
.controller('AddItemsCtrl', ['$scope', 'MFSaveService', '$ionicTabsDelegate', '$ionicNavBarDelegate', '$window', 'AddItemsService', '$state', 'SSFAlertsService', '$translate', 'tmhDynamicLocale', '$q', '$ionicPopup',
function($scope, MFSaveService, $ionicTabsDelegate, $ionicNavBarDelegate, $window, AddItemsService, $state, SSFAlertsService, $translate, tmhDynamicLocale, $q, $ionicPopup){
    $ionicTabsDelegate.showBar(true);
    $ionicNavBarDelegate.showBackButton(true);
    var defaultMealForm = {
              name : "",
              calories : "",
              protein: "",
              fat: "",
              carbs: "",
              submit: "Submit"
          };
    var defaultCardioForm = {
              name : "",
              minutes : "",
              calories: "",
              submit: "Submit"
          };
    var defaultStrengthForm = {
              name : "",
              bodypart : "",
              sets: "",
              reps: "",
              submit: "Submit"
          };
    $scope.defaultMealForm = angular.copy(defaultMealForm);
    $scope.defaultCardioForm = angular.copy(defaultCardioForm);
    $scope.defaultStrengthForm = angular.copy(defaultStrengthForm);
    $scope.submitCardioForm = function(){
      //$setPristine();
      var date = new Date();
      var dateAdded = date.toUTCString();
      var userID = $window.localStorage['userID'];
      
      MFSaveService.saveCardioExercise($scope.defaultCardioForm.name, $scope.defaultCardioForm.minutes, $scope.defaultCardioForm.calories, userID, dateAdded);
      $scope.cardioForm.$setPristine(true);
      $scope.defaultCardioForm = angular.copy(defaultCardioForm);
    };
    $scope.submitStrengthForm = function(){
      //$setPristine(); 
      var date = new Date();
      var dateAdded = date.toUTCString();
      var userID = $window.localStorage['userID'];
      MFSaveService.saveStrengthExercise($scope.defaultStrengthForm.name, $scope.defaultStrengthForm.bodypart, $scope.defaultStrengthForm.sets, $scope.defaultStrengthForm.reps, userID, dateAdded);
      $scope.strengthForm.$setPristine(true);
      $scope.defaultStrengthForm = angular.copy(defaultStrengthForm);
    };
    $scope.submitMealForm = function(){
      //$setPristine();
      var date = new Date();
      var dateAdded = date.toUTCString();
      var userID = $window.localStorage['userID'];
      MFSaveService.saveMeal($scope.defaultMealForm.name, $scope.defaultMealForm.calories, $scope.defaultMealForm.protein, $scope.defaultMealForm.fat, $scope.defaultMealForm.carbs, userID, dateAdded);
      $scope.mealForm.$setPristine(true);
      $scope.defaultMealForm = angular.copy(defaultMealForm);
    };
    $scope.completeCurrentDay = function(){
        // trying to implement a POST to the backend.
        var mealsDict = angular.copy(MFSaveService.getMeals());
        var cardioDict = angular.copy(MFSaveService.getCardio());
        var strengthDict = angular.copy(MFSaveService.getStrength());
        $scope.uploadAllItems = function(nameOfDict){
          AddItemsService.create(nameOfDict, $window.localStorage['token'])
            .then(function(response) {
                 if(response.status === 200) {
                     // Valid Response, Entries are uploaded to our DB.
                 } else if(response.status !== 401) {
                    // invalid response
                    confirmPrompt();
                 }
            });
        };
        var confirmPopup = $ionicPopup.confirm({
         title: "Warning!",
         template: "Are you sure you want to complete your entries for today?"
      });
        confirmPopup.then(function(response) {
            if (response == true) {
                 //User answered OK
                $scope.uploadAllItems(mealsDict);
                $scope.uploadAllItems(cardioDict);
                $scope.uploadAllItems(strengthDict);
                performRequest();
                MFSaveService.completeCurrentDay();
            } else {
                //User answered Cancel
                $state.go('dailyLog');
            }
        });
    };
    function confirmPrompt() {
        SSFAlertsService.showConfirm("ERRORS.ERROR", "Unable to complete your entries for the day. Do you want to try again?")
        .then(function(response) {
            if (response == true) {
                 //User answered OK
                 $scope.completeCurrentDay();
            } else {
                //User answered Cancel
                $state.go('lobby');
            }
        })}
    $scope.updateList = performRequest();
    if ( typeof navigator.globalization !== "undefined" ) {
                navigator.globalization.getPreferredLanguage(function(language) {
                    tmhDynamicLocale.set((language.value).split("-")[0]);
                }, null);
            }
    function performRequest() {
        AddItemsService.all($window.localStorage['userID'], $window.localStorage['token'])
        .then(function(response) {
            if (response.status === 200) {
                $scope.meals = response.data;
            } else if (response.status !== 401) {
                // invalid
                confirmPrompt();
            }
        }, function(response) {
            // something went wrong
            console.log(response);
            confirmPrompt2();
        });
    }
    function confirmPrompt2() {
        SSFAlertsService.showConfirm("ERRORS.ERROR", "ERRORS.TESTS")
        .then(function(response) {
            if (response == true) {
                 //User answered OK
                 performRequest();
            }
        });
    }
}])
;