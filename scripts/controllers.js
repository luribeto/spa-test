'use strict';
angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
          
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            menuFactory.getDishes().query(
            function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
            });

             $scope.select = function(setTab) {
                $scope.tab = setTab;
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            $scope.channels = channels;

            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                } else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save({id:$scope.feedback.id}, $scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
 
            $scope.showDish = false;
            $scope.message="Loading ...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
                        
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            //$scope.currentDate = new Date().toISOString();
            $scope.mycomment = {author: "", rating:5, comment: "", date:""};

            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
                console.log($scope.mycomment);
            }
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

                $scope.showDish = false;
                $scope.showLeader = false;
                $scope.showPromo = false;
                $scope.message="Loading ...";

                $scope.dish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );

                $scope.promotion = menuFactory.getPromotion().get({id:0})
                 .$promise.then(
                     function(response){
                         $scope.promotion = response;
                         $scope.showPromo = true;
                     },
                     function(response) {
                         $scope.message = "Error: "+response.status + " " + response.statusText;
                     }
                 );

                 $scope.leader = corporateFactory.getLeaders().get({id:3})
                 .$promise.then(
                     function(response){
                         $scope.leader = response;
                         $scope.showLeader = true;
                     },
                     function(response) {
                         $scope.message = "Error: "+response.status + " " + response.statusText;
                     }
                 );

                /*$scope.promotion = menuFactory.getPromotion();
                $scope.leader = corporateFactory.getLeader(3);*/

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
                
              $scope.message="Loading ...";
              $scope.showLeaders = false;

              $scope.leaders = corporateFactory.getLeaders().query()
              .$promise.then(
                  function(response){
                      $scope.leaders = response;
                      $scope.showLeaders = true;
                  },
                  function(response) {
                      $scope.message = "Error: "+response.status + " " + response.statusText;
                  }
              );

        }]);

