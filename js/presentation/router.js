/*global zicht, presentation, Backbone*/

/**
 * @author Joppe Aarts <joppe@apestaartje.info>
 * @copyright Apestaartje <http://apestaartje.info>
 */

(function (z, $) {
    'use strict';

    /**
     * @namespace presentation.view
     */
    z.createNamespace('presentation');

    presentation.Router = Backbone.Router.extend({
        routes: {
            'splash': 'splash',
            'intro': 'intro',
            'event': 'event',
            'map': 'map',
            'compass': 'compass',
            'meter': 'meter',
            'history': 'history',
            'applause': 'applause'
        },

        initialize: function (options) {
            this.active = null;

            this.model = options.model;
            this.$container = options.$container;
            this.$parent = $(this.$container.parent());
        },

        splash: function () {
            this.setActive('splash', new presentation.view.Splash({
                template: $('#splash-tpl').html(),
                model: this.model
            }));
        },

        intro: function () {
            this.setActive('intro', new presentation.view.Splash({
                template: $('#intro-tpl').html(),
                model: this.model
            }));
        },

        event: function () {
            this.setActive('event', new presentation.view.Event({
                template: $('#event-tpl').html(),
                model: this.model
            }));
        },

        compass: function () {
            this.setActive('compass', new presentation.view.Compass({
                template: $('#compass-tpl').html(),
                model: this.model
            }));
        },

        meter: function () {
            this.setActive('meter', new presentation.view.Meter({
                template: $('#meter-tpl').html(),
                model: this.model
            }));
        },

        applause: function () {
            this.setActive('applause', new presentation.view.Applause({
                template: $('#applause-tpl').html(),
                model: this.model
            }));
        },

        history: function () {
            this.setActive('history', new presentation.view.History({
                template: $('#history-tpl').html(),
                model: this.model
            }));
        },

        map: function () {
            var map = new presentation.view.Map({
                template: $('#map-tpl').html(),
                model: this.model
            });

            this.setActive('map', map);

            map.initMap();
        },

        setActive: function (identifier, view) {
            var $new,
                old,
                offset;

            if (null !== this.active) {
                old = this.active;
            }

            this.model.set('slide', identifier);
            this.active = view;

            $new = this.active.render().$el;
            this.$container.append($new);

            offset = $new.position();
            this.$container.animate({
                top: -offset.top
            });
        }
    });
}(zicht, jQuery));