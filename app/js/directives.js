'use strict';

var appDirectives = angular.module('appDirectives', ['appControllers']);

appDirectives.directive("trackSearch", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/track-search.html",
        scope: false,
        controller: 'searchController'
    };
});

appDirectives.directive("trackStream", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/track-stream.html",
        scope: false,
        controller: 'trackStreamController',
        compile: function (element, attrs) {
        }
    };
});

appDirectives.directive("recentSearches", function () {
    return {
        restrict: 'E',
        templateUrl: "partials/recent-searches.html",
        scope: false,
        controller: 'recentSearchesController',
        compile: function (element, attrs) {
        }
    };
});

appDirectives.directive('fadeIn', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, attrs) {

        }
    }
})
