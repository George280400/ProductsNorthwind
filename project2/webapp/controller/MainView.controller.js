sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function(Controller) {
		"use strict";

		return Controller.extend("project2.controller.MainView", {
			handleListItemPress: function(oEvent) {
				const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				const selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
				oRouter.navTo("RouteProductDetail", {
					productId: selectedProductId
				});
			}
		});
	});

