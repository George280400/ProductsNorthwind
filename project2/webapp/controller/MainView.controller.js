sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/export/Spreadsheet"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function(Controller, Spreadsheet) {
		"use strict";

		return Controller.extend("project2.controller.MainView", {
			
			handleListItemPress: function(oEvent) {
				const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				const selectedProductId = oEvent.getSource().getBindingContext().getProperty("ProductID");
				oRouter.navTo("RouteProductDetail", {
					productId: selectedProductId
				});
			},

			
					onExportPress: function () {
						var oSmartList = this.getView().byId("smartProductList");
						var oList = oSmartList.getList(); // Obtener la lista interna
						
						if (!oList) {
							sap.m.MessageToast.show("No se encontró la lista de productos.");
							return;
						}
			
						var oBinding = oList.getBinding("items");
			
						if (!oBinding || oBinding.getLength() === 0) {
							sap.m.MessageToast.show("No hay datos para exportar.");
							return;
						}
			
						var aCols = [
							{ label: "Nombre Producto", property: "ProductName" },
							{ label: "Precio", property: "UnitPrice", type: "number" },
							{ label: "Categoría", property: "{Category/CategoryName}" }
						];
			
						var oSettings = {
							workbook: { columns: aCols },
							dataSource: oBinding.getContexts().map(oContext => oContext.getObject()),
							fileName: "Productos.xlsx"
						};
			
						new Spreadsheet(oSettings).build().then(() => {
							sap.m.MessageToast.show("Exportación completada.");
						});
					}
		});
	});

