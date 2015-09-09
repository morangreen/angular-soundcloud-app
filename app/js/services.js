'use strict';

var appServices = angular.module('appServices', []);

appServices.factory('Soundcloud', function ($http) {
    var stream = function (method, trackId, callback) {
        SC.stream("/tracks/" + trackId, function (sound) {
            switch (method) {
                case 'play':
                {
                    if (window.playingSound != null) {
                        window.playingSound.stop();
                    }
                    sound.play();
                    window.playingSound = sound;
                    break;
                }
            }
            callback();
        });
    };
    var request = function (method, path, params, callback) {
        params.client_id = "d652006c469530a4a7d6184b18e16c81";
        // params.oauth_token = sc.soundcloud.access_token;

        $http({
            method: method,
            url: path,
            params: params
        })
            .success(callback);
    };

    return {
        get: function (path, params, callback) {
            request('GET', path, params, callback);
        },

        put: function (path, params, callback) {
            request('PUT', path, params, callback);
        },

        post: function (path, params, callback) {
            request('POST', path, params, callback);
        },

        delete: function (path, params, callback) {
            request('DELETE', path, params, callback);
        },

        play: function (trackID, callback) {
             stream('play', trackID, callback);
        },

        stop: function () {
            window.playingSound.stop();
        }
    };
})

