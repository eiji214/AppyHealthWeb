"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var healthSystemPractitioners_1 = require("../models/healthSystemPractitioners");
var ConfirmSetupComponent = /** @class */ (function () {
    function ConfirmSetupComponent() {
        this.healthSystemPractitioners = [];
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(ConfirmSetupComponent.prototype, "hs", {
        set: function (hs) {
            this.healthSystem = hs;
            var primary = new healthSystemPractitioners_1.HealthSystemPractitioners;
            primary.healthSystem = hs.primary;
            this.healthSystemPractitioners.push(primary);
            for (var i = 0; i < hs.children.length; i++) {
                var child = new healthSystemPractitioners_1.HealthSystemPractitioners;
                child.healthSystem = hs.children[0];
                this.healthSystemPractitioners.push(child);
            }
            var _loop_1 = function (i) {
                for (var j = 0; j < hs.physicians[i].healthSystems.length; j++) {
                    var item = this_1.healthSystemPractitioners.filter(function (x) { return x.healthSystem.Id === hs.physicians[i].healthSystems[j].Id; });
                    item[0].physicians.push(hs.physicians[i].practitioner);
                }
            };
            var this_1 = this;
            for (var i = 0; i < hs.physicians.length; i++) {
                _loop_1(i);
            }
            var _loop_2 = function (i) {
                for (var j = 0; j < hs.midLevels[i].healthSystems.length; j++) {
                    var item = this_2.healthSystemPractitioners.filter(function (x) { return x.healthSystem.Id === hs.midLevels[i].healthSystems[j].Id; });
                    item[0].midLevels.push(hs.midLevels[i].practitioner);
                }
            };
            var this_2 = this;
            for (var i = 0; i < hs.midLevels.length; i++) {
                _loop_2(i);
            }
            var _loop_3 = function (i) {
                for (var j = 0; j < hs.staff[i].healthSystems.length; j++) {
                    var item = this_3.healthSystemPractitioners.filter(function (x) { return x.healthSystem.Id === hs.staff[i].healthSystems[j].Id; });
                    item[0].staff.push(hs.staff[i].practitioner);
                }
            };
            var this_3 = this;
            for (var i = 0; i < hs.staff.length; i++) {
                _loop_3(i);
            }
        },
        enumerable: true,
        configurable: true
    });
    ConfirmSetupComponent.prototype.back = function () {
        this.navigate.emit(false);
    };
    ConfirmSetupComponent.prototype.finish = function () {
        this.navigate.emit(true);
    };
    __decorate([
        core_1.Input()
    ], ConfirmSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], ConfirmSetupComponent.prototype, "navigate", void 0);
    ConfirmSetupComponent = __decorate([
        core_1.Component({
            selector: 'confirm-setup',
            templateUrl: './confirm.component.html',
            styleUrls: ['./setup.component.css']
        })
    ], ConfirmSetupComponent);
    return ConfirmSetupComponent;
}());
exports.ConfirmSetupComponent = ConfirmSetupComponent;
//# sourceMappingURL=confirm.component.js.map