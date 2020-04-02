"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ReferralsSpecialistComponent = /** @class */ (function () {
    function ReferralsSpecialistComponent(referralService, route) {
        this.referralService = referralService;
        this.route = route;
    }
    ReferralsSpecialistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.referral$ = this.route.paramMap.pipe(operators_1.switchMap(function (params) {
            return _this.referralService.getSpecialistReferrals(+params.get('id'));
        }));
    };
    ReferralsSpecialistComponent = __decorate([
        core_1.Component({
            selector: 'app-referrals-specialist',
            templateUrl: './referrals-specialist.component.html',
            styleUrls: ['./referrals-specialist.component.scss']
        })
    ], ReferralsSpecialistComponent);
    return ReferralsSpecialistComponent;
}());
exports.ReferralsSpecialistComponent = ReferralsSpecialistComponent;
//# sourceMappingURL=referrals-specialist.component.js.map