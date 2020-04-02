"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var healthSystemTier_1 = require("./healthSystemTier");
var collections_1 = require("@angular/cdk/collections");
var HealthSystemPrice = /** @class */ (function () {
    function HealthSystemPrice() {
        this.physicians = [];
        this.midLevels = [];
        this.staff = [];
        this.tier = new healthSystemTier_1.HealthSystemTier;
        this.physiciansSelection = new collections_1.SelectionModel(true, []);
        this.midLevelssSelection = new collections_1.SelectionModel(true, []);
    }
    return HealthSystemPrice;
}());
exports.HealthSystemPrice = HealthSystemPrice;
//# sourceMappingURL=healthSystemPrice.js.map