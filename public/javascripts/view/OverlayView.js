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