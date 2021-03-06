var myApp = angular.module('myApp',[]);

var User={
  name:"Tarik Djurdjevic",
  username:"tarik.djurdjevic",
  image:"avatar.png"
};

myApp.controller('UserController', ['$scope',function($scope) {
  /*$http.get('/users').then(function(response){
    $scope.user=response.data[0];
  });*/
  $scope.user=User;
}]);

myApp.controller('TweetController', ['$scope','$http',function($scope,$http) {
  var userId="5ab14023a976e18bce0b912a";//hard coded because we don't have authentication
  
  var Refresh=function(){
    $scope.countTweets=0;
    $http({
    url: '/tweets', 
    method: "GET",
    params: {id: userId}
    }).then(function(response){
      $scope.tweets=response.data;
      for (index = 0; index < response.data.length; ++index) {
        $scope.tweets[index].timeAgo=timeago().format(response.data[index].createdOn);
      }
      if(response.data!==undefined)
        $scope.countTweets=response.data.length;
    });
    
    $scope.tweet={value:''};
  };
  Refresh();//initial get
  $scope.addTweet=function(){
      $scope.tweet.createdBy="5ab14023a976e18bce0b912a";//hard coded because we don't have authentication
      $scope.tweet.createdOn=Date.now();
      $http.post('/tweets',$scope.tweet);
      //clear the input field and update tweets
      Refresh();
    };
  $scope.removeTweet=function(id){
    $http.delete('/tweets/'+id).then(function(response){
      Refresh();
    });
  };
}]);