angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('DiscoveryCtrl', function ($scope, Discovery, $http, $ionicLoading) {
        $scope.feeds = [];
        $scope.loadedFeeds = Discovery.all();
        $scope.noMoreItemsAvailable = false;

        $scope.loadMore = function (NumOfFeedToLoad) {
           //NumOfFeedToLoad decide how many feed load per loadMore called
           for(var i=0;i<NumOfFeedToLoad;i++){
               var numOffeeds = $scope.feeds.length;
               $scope.feeds.push($scope.loadedFeeds[numOffeeds]);
           }

            //Stop loadMore while no more data inside loadedFeeds
            if ($scope.feeds.length == $scope.loadedFeeds) {
                $scope.noMoreItemsAvailable = true;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

        }

        $scope.showloading = function (durationtime) {

            if (!durationtime) {

                $ionicLoading.show({
                    template: 'Loading...',
                    noBackdrop: true
                });
            } else {

                $ionicLoading.show({
                    template: 'Loading...',
                    noBackdrop: true,
                    duration: durationtime
                });
            }

        };
        $scope.hideloading = function () {
            $ionicLoading.hide();
        };
        $scope.doRefresh = function () {
            $scope.showloading()
            $http.get('/new-items')
                .success(function (newItems) {
                    $scope.feeds = newItems;
                })
                .finally(function () {
                    // Stop the ion-refresher from spinning
                    $scope.hideloading()
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
