## AngularJS configuration

<% if (configuration.api && configuration.thirdParty) { %>
If you're creating a new AngularJS app that you'll use with your <%= configuration.api %> API, you can [click here to download]() a seed project that is already configured to use Auth0. 
<% } else  { %>
If you're creating a new AngularJS app that you'll use with your <%= configuration.api %> API, you can [click here to download]() a seed project that is already configured to use Auth0. 

<% } %>
The only thing you need to do is to change the `authProvider` configuration to use your Auth0's account. Please [click here]() to learn how to do it.

Otherwise, Please follow the steps below to configure AngularJS to use it with Auth0 with your existing Angular app.

### 1. Adding the Auth0 scripts and setting the right viewport

````html
<!-- We use client cookies to save the user credentials -->
<script src="//code.angularjs.org/1.2.16/angular-cookies.min.js"></script>

<!-- Auth0 widget script and AngularJS module -->
<script src="//cdn.auth0.com/w2/auth0-widget-4.js"></script>
<script src="//cdn.auth0.com/w2/auth0-angular-0.4.js"> </script>

<!-- Setting the right viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
````

We're including Auth0's angular module and its dependencies to the `index.html`.

### 2. Add the module dependency and configure the service

First, you need to add the `auth0` module dependency to your angular app definition. Then, you need to configure it by calling the `init` method of the `authProvider`

````js
// app.js
angular.module('YOUR-APP-NAME', ['auth0'])
.config(function (authProvider) {
  authProvider.init({
    domain: '<%= account.namespace %>',
    clientID: '<%= account.clientId %>',
    callbackURL: '<%= account.callbackURL %>'
  });
});
````

### 4. Let's add routing (Optional)

In most cases, we'll have routing in our app. So let's add the `$routeProvider` configuration in the `config` method of our app.

````js
// app.js
.config(function (authProvider, $routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login.tpl.html',
    controller: 'LoginCtrl'
  });
  // Logged in route
  $routeProvider.when('/user-info', {
    templateUrl: 'userInfo.tpl.html',
    controller: 'UserInfoCtrl',
    requiresLogin: true
  });
});
````

We need to set the `requiresLogin` property to true for all routes that require the user to be logged in.

__Note__: If you are using ui-router, all you have to do is to create states instead of the routes above and set the `requiresLogin` attribute inside the `data` property of the state.

In order to handle the `requireLogin`, you must add the following code to the `run` of your app. In the following version of the SDK this will be handled for you.

````js
angular.module('YOUR-APP-NAME', ['auth0'])
.run(function($rootScope, auth, $location) {
  $rootScope.$on('$routeChangeStart', function(e, nextRoute, currentRoute) {
    if (nextRoute.$$route && nextRoute.$$route.requiresLogin) {
      if (!auth.isAuthenticated) {
        $location.path('/login');
      }
    }
  })
})
````

### 5. Let's implement the login

Now we're ready to implement the Login. We can inject the `auth` service in any controller and just call `signin` method to show the Login / SignUp popup. In this case, we'll add the call in the login method of the controller.

````js
// LoginCtrl.js
$scope.login = function() {
  auth.signin({
    popup: true
  });
}
````

````html
<!-- login.tpl.html -->
<!-- ... -->
<input type="submit" ng-click="login()" />
<!-- ... -->
````

If you want to check all the available arguments for the signin call, please [check here](TODO://)

![Signin popup](angular-signin.gif)

#### 6. Handling Login success and failure

The `signin` method returns a promise. That means that we can handle login success and failure the following way:

````js
// LoginCtrl.js
$scope.login = function() {
  auth.signin({
    popup: true
  })
  .then(function() {
    // Success callback
  }, function() {
    // Error callback
  });
}
````

#### 7. Adding a logout button

You can just call the `signout` method of Auth0 to remove all the cookies from the client that keep the user logged in:

````js
$scope.logout = function() {
  auth.signout();
}
````

````html
<input type="submit" ng-click="logout()" value="Log out" />
````

You can [click here](https://docs.auth0.com/user-profile) to find out all of the available properties from the user's profile. Please note that some of this depend on the social provider being used.

<% if (configuration.api && configuration.thirdParty) { %>
#### 8. Configuring secure calls to an API

As we're going to call an API we're going to make on <%= configuration.api %>, we need to make sure we send the token we receive on the login on every request. For that, we need to do 2 things:

##### 8.1 Add the dependency to the `authInterceptor` module

````js
// app.js
angular.module('YOUR-APP-NAME', ['auth0', 'authInterceptor'])
````

##### 8.2 Add the `$http` interceptor

The `$http` interceptor will send the token in the `Authorization` header if it's available. We need to add it in the `config` section of our application:


````js
// app.js
.config(function (authProvider, $routeProvider, $httpProvider) {
  // ...
  $httpProvider.interceptors.push('authInterceptor');
  // ...
});
````
<% } %>

#### 9. Showing user information

After the user has logged in, we can get the `profile` property from the `auth` service which has all the user information:

````html
<span>His name is {{auth.profile.nickname}}</span>
````

````js
// UserInfoCtrl.js
function UserInfoCtrl($scope, auth) {
  $scope.auth = auth;
}
````

#### Extra Extra

We've learnt how to configure AngularJS with Auth0's module and a popup for Signing in.

If you want to learn how to implement this with redirect, [you can read here](https://github.com/auth0/auth0-angular/blob/master/docs/widget.md)

If you want to implement your custom Signin and Signup form, [you can read here](https://github.com/auth0/auth0-angular/blob/master/docs/jssdk.md)