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