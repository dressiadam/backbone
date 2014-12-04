(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var OverlayModel = Backbone.Model.extend({

	url: '/get-dialog',

	defaults: {
		content: ''
	},

	initialize: function () {

	}

});

module.exports = OverlayModel;
},{}],2:[function(require,module,exports){
var OverlayView = require('../../view/OverlayView');
var OverlayModel = require('../../model/OverlayModel');
var Router = require('../../router/Router');

app = {};
app.events = _.extend({}, Backbone.Events);

(function() {
	app.OverlayModel = new OverlayModel();
	app.MainView = Backbone.View.extend({

		el: '.container',
		openOverlayBtnSel: '.open_overlay',

		events: {
			'click .open_overlay' : 'triggerOpenOverlay'
		},

		initialize: function () {
			this.OverlayView = new OverlayView({
				el: '.overlay_container',
				model: app.OverlayModel
			})
		},

		triggerOpenOverlay: function () {
			app.Router.navigate('#get-dialog', {trigger:true});
		}
	});


})();

$(document).ready(function() {
	var appView = new app.MainView();
	app.Router = new Router();

	Backbone.history.start();
});
},{"../../model/OverlayModel":1,"../../router/Router":3,"../../view/OverlayView":4}],3:[function(require,module,exports){
var Router = Backbone.Router.extend({

	routes: {
		'': 'defaultState',
		'get-dialog': 'getDialog'
	},

	initialize: function () {

	},

	getDialog: function () {
		app.events.trigger('open-overlay');
	},

	defaultState: function () {
		app.events.trigger('close-overlay');
	}

});

module.exports = Router;
},{}],4:[function(require,module,exports){
var OverlayView = Backbone.View.extend({

	el: '.overlay_container',
	contentSel: '.overlay_content',

	openOverlayBtnSel: '.open_overlay',
	closeOverlayBtnSel: '.close_overlay',
	openedCls: 'opened',

	events: {
		'click .close_overlay': 'closeOverlay'
	},

	initialize: function () {
		this.content = this.$el.find(this.contentSel);

		app.events.on('open-overlay', this.openOverlay, this);
		app.events.on('close-overlay', this.closeOverlay, this);
		this.listenTo(this.model, 'change', this.render);
	},

	overlayBtnClick: function (ev) {
		ev.preventDefault();
	},

	openOverlay: function () {
		this.$el.addClass(this.openedCls);
		this.model.fetch();
	},

	closeOverlay: function () {
		app.Router.navigate('', {trigger: true});
		this.$el.removeClass(this.openedCls);
		this.model.set('content','');
	},

	render: function() {
		this.content.html(this.model.attributes.content);
	}

});

module.exports = OverlayView;
},{}]},{},[2]);
