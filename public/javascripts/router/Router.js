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