/*global window, jQuery*/

(function (win) {
    'use strict';

    var BASE_URL = 'http://localhost/hack010/';

    jQuery(function ($) {
        var state,
            positions,
            panorama,
            glass,
            app;

        state = new win.model.State({
            status: 'idle',
            interval: 2000
        });

        positions = new win.model.Positions([], {
            baseUrl: BASE_URL,
            state: state
        });

        panorama = new win.view.Panorama({
            model: state,
            el: $('#streetview')
        }).render();

        glass = new win.view.Glass({
            model: state,
            el: $('.glass')
        }).render();

        app = (function () {
            var index = -1,
                friend,
                weather;

            friend = new win.view.Friend({
                template: $('#friend-tpl')
            }).hide();

            weather = new win.view.Weather({
                template: $('#weather-tpl')
            }).hide();

            function move() {
                var position;

                if (index === -1) {
                    index = 0;
                } else {
                    index += 1;
                }

                position = positions.at(index);

                if (position) {
                    state.set({
                        position: position
                    });
                }
            }

            return {
                run: function () {
                    state.on('change:state', function () {
                        if (state.get('state') === 'idle') {
                            win.setTimeout(move, state.get('interval'));
                        }
                    });

                    state.set({
                        app: friend
                    });

                    win.setInterval(function () {
                        state.set({
                            notify: weather
                        });
                    }, 2000);

                    move();
                }
            };
        }());

        positions.fetch({
            success: function () {
                app.run();
            }
        });

    });
}(window));