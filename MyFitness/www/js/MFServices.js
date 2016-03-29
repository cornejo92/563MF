angular.module('MFServicesModule', [])
.service('MFSaveService', [ 'SSFAlertsService', '$state', function(SSFAlertsService, $state){
    var service = this;
    var mealEntries = [];
    var sExerciseEntries = [];
    var cExerciseEntries = [];
    service.completeCurrentDay = function(){
        mealEntries = [];
        sExerciseEntries = [];
        cExerciseEntries = [];
        SSFAlertsService.showAlert("Success!", "Entries were uploaded.");
        $state.go('lobby');
    };
    service.saveMeal = function(name, calories, protein, fat, carbs, userID, dateAdded){
        var mealCategories = {
          "name": name,
          "calories": calories,
          "protein": protein,
          "fat": fat,
          "carbs": carbs,
          "userID": userID,
          "dateAdded": dateAdded
        };
        mealEntries.push(mealCategories);
    };
    service.saveCardioExercise = function(name, minutes, calories, userID, dateAdded){
        var exerciseCategories = {
          "name": name,
          "minutes": minutes,
          "calories": calories,
          "userID": userID,
          "dateAdded": dateAdded
        };
        cExerciseEntries.push(exerciseCategories);
    };
    service.saveStrengthExercise = function(name, bodypart, sets, reps, userID, dateAdded){
        var exerciseCategories = {
          "name": name,
          "bodypart": bodypart,
          "sets": sets,
          "reps": reps,
          "userID": userID,
          "dateAdded": dateAdded
        };
        sExerciseEntries.push(exerciseCategories);
    };
    service.getMealInfo = function(x){
      var info = 0;
      for (var i=0; i < mealEntries.length; i++){
       info += mealEntries[i][x];   
      }
      return info;
    };
    service.getStrengthExerciseInfo = function(x){
      var info = 0;
      for (var i=0; i < sExerciseEntries.length; i++){
       info += sExerciseEntries[i-1].x;   
      }
      return info;
    };
    service.getCardioExerciseInfo = function(x){
      var info = 0;
      for (var i=0; i < cExerciseEntries.length; i++){
       info += cExerciseEntries[i-1].x;   
      }
      return info;
    };
    service.getMeals = function(){
        return mealEntries;
    };
    service.getCardio = function(){
        return cExerciseEntries;
    };
    service.getStrength = function(){
        return sExerciseEntries;
    };
}])
.service('MFUserService', function(){
    var service = this;
    var userInfo = [];
    service.saveUser = function(){
        
    };
})
;