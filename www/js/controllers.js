angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('DiscoveryCtrl', function ($scope, Discovery,$http) {
        $scope.feeds = Discovery.all();
        $scope.doRefresh = function() {
            $http.get('/new-items')
                .success(function(newItems) {
                    $scope.feeds = newItems;
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
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
