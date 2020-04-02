"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SetupComponent = /** @class */ (function () {
    function SetupComponent() {
        this.step = 1;
        this.selectedTier = 1;
    }
    SetupComponent.prototype.setSelectedTier = function (tier) {
        this.selectedTier = tier;
    };
    SetupComponent.prototype.setHealthSystem = function (hs) {
        this.healthSystem = hs;
        this.step++;
    };
    SetupComponent.prototype.navigate = function (b, selectedTier) {
        if (selectedTier === void 0) { selectedTier = null; }
        if (b) {
            this.step++;
        }
        else {
            this.step--;
        }
    };
    SetupComponent = __decorate([
        core_1.Component({
            selector: 'setup',
            templateUrl: './setup.component.html',
            styleUrls: ['./setup.component.css']
        })
    ], SetupComponent);
    return SetupComponent;
}());
exports.SetupComponent = SetupComponent;
//# sourceMappingURL=setup.component.js.map