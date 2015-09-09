var appControllers = angular.module('appControllers', ['appServices', 'appFilters']);
appControllers.controller('searchController', ['$scope', 'Soundcloud',
    function ($scope, Soundcloud) {
        $scope.default_artwork_url = "http://smmfox.com/wp-content/uploads/2014/07/sc.jpg";
        $scope.selectedResult = {};
        $scope.selectedResult.artwork_url = $scope.default_artwork_url;

        $scope.goToNextPage = function () {
            Soundcloud.get($scope.nextCollectionUri, {}, function (tracks) {
                $scope.results = tracks.collection;
            });
        }

        $scope.searchResultClicked = function (result) {
            $scope.selectedResult = result;
            if ($scope.selectedResult.artwork_url == null) {
                $scope.selectedResult.artwork_url = $scope.default_artwork_url;
            }
        };

        $scope.getTracks = function () {
            Soundcloud.get('https://api.soundcloud.com/tracks', {limit: 6, q: $scope.query, linked_partitioning: 1}, function (tracks) {
                $scope.results = tracks.collection;
                $scope.nextCollectionUri = tracks.next_href;
                $scope.addToRecentQueries($scope.query);
            });
        };
    }]);

appControllers.controller('trackStreamController', ['$scope', '$timeout', 'Soundcloud',
    function ($scope, $timeout, Soundcloud) {
        window.playingSound = null;

        $scope.stop = function () {
            Soundcloud.stop();
        }

        $scope.play = function () {
            Soundcloud.play($scope.selectedResult.id, function () {
                $scope.ResultCurrentlyPlaying = $scope.selectedResult;
            });
        };

        $scope.trackImgClicked = function () {
            $scope.play();
        };
    }]);

appControllers.controller('recentSearchesController', ['$scope',
    function ($scope) {
        $scope.recent_queries = [];
        $scope.addToRecentQueries = function (query) {
            if ($scope.recent_queries.indexOf(query) < 0) {
                if ($scope.recent_queries.length > 4) {
                    $scope.recent_queries.shift();
                }
                $scope.recent_queries.push(query);
            }
        };

        $scope.recentQueryClick = function (recentQuery) {
            $scope.query = recentQuery;
            $scope.getTracks();
        }
    }]);

