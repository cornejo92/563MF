angular.module('RESTConnection', [])
.constant('ENDPOINT_URL', 'https://myfitness-backend-cornejo92.c9users.io/api/')

.service('UserService', ['$http', 'ENDPOINT_URL', function ($http, ENDPOINT_URL) {
var service = this,
path = 'MFUsers/';

function getUrl() {
  return ENDPOINT_URL + path;
}

service.create = function (user) {
  return $http.post(getUrl(), user);
};

service.login = function(user) {
    user["ttl"] = 1209600000;
    return $http.post(getUrl()+"login",user);
};
service.logout = function(token) {
   return $http({
      url: getUrl()+"logout",
      method: "POST",
      headers: {
         'Authorization': token
      }
   });
};
service.getUserInfo = function(token){
    return $http({
       url: getUrl()+"",
       method: "GET",
       headers: {
           'Authorization': token
       }
    });
};
service.all = function(username, token) {
   return $http.get(getUrl()+"?filter[where][email]="+username,{
      params: { access_token: token }
   });
};
}])

.service('ServerQuestionService', ['$http', 'ENDPOINT_URL',
function ($http,  ENDPOINT_URL) {
  var service = this,
  path = 'Questions/';
  function getUrl() {
    return ENDPOINT_URL + path;
  }
  service.all = function (token) {
    return $http.get(getUrl(), {
        params: { access_token: token }
    });
  };
}])
.service('AddItemsService', ['$http', 'ENDPOINT_URL',
function ($http, ENDPOINT_URL) {
  var service = this,
  path = 'Meals/';
  function getUrl() {
    return ENDPOINT_URL + path;
  }
  service.create = function(answer, token) {
    return $http({
        url: getUrl(),
        method: "POST",
        data: JSON.stringify(answer),
        headers: {
            'Authorization': token
        }
     });
  };
  service.all = function(userID, token) {
   return $http.get(getUrl()+"?filter[where][userID]="+userID,{
      params: { access_token: token }
   });
};
}])
;