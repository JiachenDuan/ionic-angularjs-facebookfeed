angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('DiscoveryCtrl', function ($scope, Discovery,$http,$ionicLoading) {
        $scope.feeds = [];
            $scope.loadedFeeds = Discovery.all();
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function() {
            var numOffeeds=$scope.feeds.length;

                $scope.feeds.push($scope.loadedFeeds[numOffeeds]);

            if($scope.feeds.length == 100){
                $scope.noMoreItemsAvailable = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

        }
        $scope.showloading = function() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };
        $scope.hideloading = function(){
            $ionicLoading.hide();
        };
        $scope.doRefresh = function() {
         //  $scope.showloading()
            $http.get('/new-items')
                .success(function(newItems) {
                    $scope.feeds = newItems;
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                   // $scope.hideloading()
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
    })
    .controller('FriendsCtrl', function ($scope, Friends) {
        $scope.friends = Friends.all();
    })

    .controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
        $scope.friend = Friends.get($stateParams.friendId);
    })

    .controller('AccountCtrl', function ($scope) {
    });
