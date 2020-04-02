"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PhysicianLayoutComponent = /** @class */ (function () {
    function PhysicianLayoutComponent(physicianService) {
        this.physicianService = physicianService;
        this.hasAccess = false;
    }
    PhysicianLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.physicianService.getMe()
            .subscribe(function (result) {
            _this.hasAccess = _this.hasAccess || result.Role.toLowerCase() == "callcenter";
        });
        this.physicianService.getMyHealthSystems()
            .subscribe(function (result) {
            _this.hasAccess = _this.hasAccess || (result && !!result.length);
        });
    };
    PhysicianLayoutComponent = __decorate([
        core_1.Component({
            selector: 'physician-layout',
            templateUrl: './physician-layout.component.html',
            styleUrls: ['./physician-layout.css']
        })
    ], PhysicianLayoutComponent);
    return PhysicianLayoutComponent;
}());
exports.PhysicianLayoutComponent = PhysicianLayoutComponent;
//# sourceMappingURL=physician-layout.component.js.map