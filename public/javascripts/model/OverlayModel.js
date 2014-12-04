var OverlayModel = Backbone.Model.extend({

	url: '/get-dialog',

	defaults: {
		content: ''
	},

	initialize: function () {

	}

});

module.exports = OverlayModel;