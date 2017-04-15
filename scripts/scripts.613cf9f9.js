"use strict";angular.module("moviesApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngStorage"]).config(["$routeProvider","$locationProvider",function(a,b){b.hashPrefix(""),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/mymovies",{templateUrl:"views/myMovies.html",controller:"MoviesCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("moviesApp").controller("MainCtrl",["$scope","$log","netflixSrv","$uibModal","$localStorage",function(a,b,c,d,e){function f(){a.actorToSearch=e.lastSearched||"Nicolas Cage",a.search()}var g=e.myMovies||[];a.search=function(){c.getByActor(a.actorToSearch).then(function(b){a.movies=b}),e.lastSearched=a.actorToSearch},f(),a.openModal=function(a){var b=g.some(function(b){return b.show_id===a.show_id}),c=d.open({templateUrl:"views/modalView.html",controller:"ModalCtrl",size:"lg",resolve:{movie:function(){return a},found:function(){return b}}});c.result.then(function(a){a.alreadySeen=!1,g.push(a),e.myMovies=g})}}]),angular.module("moviesApp").constant("apiKey","d66f9952").factory("netflixSrv",["$http","apiKey","$log",function(a,b,c){return{getByActor:function(b){return a.get("http://netflixroulette.net/api/api.php?actor="+b+"/").then(function(a){return a.data},function(a){c.log(a)})}}}]),angular.module("moviesApp").controller("ModalCtrl",["$scope","$uibModalInstance","movie","$log","found",function(a,b,c,d,e){a.movie=c,a.found=e,a.add=function(){b.close(c)},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("moviesApp").directive("ngEnter",function(){return function(a,b,c){b.bind("keypress",function(b){13===b.which&&(a.$apply(function(){a.$eval(c.ngEnter,{e:b})}),b.preventDefault())})}}),angular.module("moviesApp").directive("errSrc",function(){return{link:function(a,b,c){b.bind("error",function(){c.src!=c.errSrc&&c.$set("src",c.errSrc)})}}}),angular.module("moviesApp").controller("MoviesCtrl",["$scope","$localStorage","$log",function(a,b,c){a.myMovies=b.myMovies||[],a["delete"]=function(b){a.myMovies.forEach(function(c,d){c.show_id===b.show_id&&a.myMovies.splice(d,1)})},a.changeState=function(a){a.alreadySeen=!a.alreadySeen}}]),angular.module("moviesApp").run(["$templateCache",function(a){a.put("views/main.html",'<div id="search"> <div class="container"> <div class="row"> <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1"> <div class="input-group"> <input type="text" class="form-control" placeholder="Search" ng-model="actorToSearch" ng-enter="search()"> <div class="input-group-btn"> <button class="btn btn-default" type="submit" ng-click="search()"><i class="glyphicon glyphicon-search"></i></button> </div> </div> </div> </div> </div> </div> <div id="movies"> <div class="container"> <div class="row"> <div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="movie in movies"> <div class="card text-center"> <img class="card-img-top img-thumbnail" style="width: 200px; height: 300px" ng-src="{{movie.poster}}" alt="Card image cap" err-src="https://s-media-cache-ak0.pinimg.com/736x/f3/5a/d9/f35ad9427be01af5955e6a6ce803f5dc.jpg"> <div class="card"> <h4 class="card-title">{{movie.show_title}}</h4> <button type="button" class="btn" ng-click="openModal(movie)">See more</button> </div> </div> </div> </div> </div> </div>'),a.put("views/modalView.html",'<div class="modal-content"> <div class="modal-header"> <h3 class="modal-title text-center">{{movie.show_title}}</h3> <button class="btn close" type="button" ng-click="cancel()">x</button> </div> <div class="modal-body"> <div class="container-fluid"> <div class="row"> <div class="col-sm-6 col-md-4 text-center"> <img class="img-thumbnail" ng-src="{{movie.poster}}" err-src="http://www.nmu.edu/Webb/MiscUploads/SportsHallOfFame/183413001306175752.jpg"> </div> <div class="col-sm-6 col-md-8" style="margin-top: 10px"> <p><strong>Category: </strong>{{movie.category}}</p><br> <p><strong>Director: </strong>{{movie.director}}</p><br> <p><strong>Summary: </strong>{{movie.summary}}</p><br> <p><strong>Cast: </strong>{{movie.show_cast}}</p><br> <p><strong>Release year: </strong>{{movie.release_year}}</p><br> <p><strong> </strong><span class="rate" uib-rating ng-model="movie.rating" max="5" read-only="true"></span></p> <button ng-if="!found" class="btn btn-warning add" type="button" ng-click="add()">Add to My Movies</button> </div> </div> </div> </div> </div>'),a.put("views/myMovies.html",'<div id="myMovies"> <div class="container"> <div class="row"> <div class="col-xs-12 col-sm-4 col-md-3" ng-repeat="movie in myMovies"> <div class="card text-center"> <img class="card-img-top img-thumbnail" style="width: 200px; height: 300px" ng-src="{{movie.poster}}" alt="Card image cap" err-src="https://s-media-cache-ak0.pinimg.com/736x/f3/5a/d9/f35ad9427be01af5955e6a6ce803f5dc.jpg"> <div class="card"> <h4 class="card-title">{{movie.show_title}}</h4> <button type="button" class="btn btn-warning" ng-click="openModal(movie)">See more</button> <button type="button" class="btn btn-danger" ng-click="delete(movie)">Delete</button><br> <label for="{{movie.show_id}}" class="btn btn-success alreadySeen" ng-click="changeState(movie)">Already seen <input type="checkbox" id="{{movie.show_id}}" ng-model="movie.alreadySeen" class="badgebox"><span class="badge">&check;</span></label> </div> </div> </div> </div> </div> </div>'),a.put("views/navbar.html",'<nav class="navbar navbar-fixed-top navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li><a href="#/">Search</a></li> <li><a href="#/mymovies">My movies</a></li> </ul> </div> </div> </nav>')}]);
