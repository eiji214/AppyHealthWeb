"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var healthSystemPrice_1 = require("../models/healthSystemPrice");
var CheckoutSetupComponent = /** @class */ (function () {
    function CheckoutSetupComponent(physicianService) {
        var _this = this;
        this.physicianService = physicianService;
        this.tiers = [];
        this.healthSystemPrices = [];
        this.accepted = false;
        this.currentYear = new Date().getFullYear();
        // @ts-ignore
        this.years = Array(20).fill().map(function (x, i) {
            return {
                label: i + _this.currentYear,
                value: i + _this.currentYear - 2000,
            };
        });
        this.months = [
            {
                value: '01',
                label: 'Jan',
            },
            {
                value: '02',
                label: 'Feb',
            },
            {
                value: '03',
                label: 'Mar',
            },
            {
                value: '04',
                label: 'Apr',
            },
            {
                value: '05',
                label: 'May',
            },
            {
                value: '06',
                label: 'Jun',
            },
            {
                value: '07',
                label: 'Jul',
            },
            {
                value: '08',
                label: 'Aug',
            },
            {
                value: '09',
                label: 'Sep',
            },
            {
                value: '10',
                label: 'Oct',
            },
            {
                value: '11',
                label: 'Nov',
            },
            {
                value: '12',
                label: 'Dec',
            },
        ];
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(CheckoutSetupComponent.prototype, "tier", {
        set: function (selectedTier) {
            this.selectedTier = selectedTier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CheckoutSetupComponent.prototype, "hs", {
        set: function (hs) {
            var _this = this;
            this.healthSystem = hs;
            var primary = new healthSystemPrice_1.HealthSystemPrice;
            primary.healthSystem = hs.primary;
            this.healthSystemPrices.push(primary);
            for (var i = 0; i < hs.children.length; i++) {
                var child = new healthSystemPrice_1.HealthSystemPrice;
                child.healthSystem = hs.children[0];
                this.healthSystemPrices.push(child);
            }
            console.log('checkout---', this.healthSystemPrices);
            if (this.tiers.length > 0) {
                this.healthSystemPrices.forEach(function (x) { return x.tier = _this.tiers[1]; });
            }
            console.log(this.healthSystemPrices);
            var usedPractitionerIds = [];
            this.healthSystemPrices.forEach(function (h) {
                _this.healthSystem.physicians.forEach(function (p) {
                    if (p.healthSystems.filter(function (x) { return x.Id === h.healthSystem.Id; }).length) {
                        h.physicians.push({
                            practitioner: p.practitioner,
                            isBeingActivated: true,
                            price: 50,
                            isFree: usedPractitionerIds.some(function (x) { return x === p.practitioner.Id; })
                        });
                        usedPractitionerIds.push(p.practitioner.Id);
                    }
                });
                _this.healthSystem.midLevels.forEach(function (p) {
                    if (p.healthSystems.filter(function (x) { return x.Id === h.healthSystem.Id; }).length) {
                        h.midLevels.push({
                            practitioner: p.practitioner,
                            isBeingActivated: true,
                            price: 25,
                            isFree: usedPractitionerIds.some(function (x) { return x === p.practitioner.Id; })
                        });
                        usedPractitionerIds.push(p.practitioner.Id);
                    }
                });
            });
            //for (let i = 0; i < hs.physicians.length; i++) {
            //  let isFound = false;
            //  for (var j = 0; j < hs.physicians[i].healthSystems.length; j++) {
            //    let item = this.healthSystemPrices.filter(x => x.healthSystem.Id === hs.physicians[i].healthSystems[j].Id);
            //    let p = new PractitionerPrice;
            //    p.practitioner = hs.physicians[i].practitioner;
            //    p.isBeingActivated = true;
            //    p.isFree = isFound;
            //    p.price = 0;
            //    if (!isFound) {
            //      p.price = 50;
            //      isFound = true;
            //    }
            //    item[0].physicians.push(p);
            //  }
            //}
            //for (let i = 0; i < hs.midLevels.length; i++) {
            //  let isFound = false;
            //  for (var j = 0; j < hs.midLevels[i].healthSystems.length; j++) {
            //    let item = this.healthSystemPrices.filter(x => x.healthSystem.Id === hs.midLevels[i].healthSystems[j].Id);
            //    let p = new PractitionerPrice;
            //    p.practitioner = hs.midLevels[i].practitioner;
            //    p.isBeingActivated = true;
            //    p.isFree = isFound;
            //    p.price = 0;
            //    if (!isFound) {
            //      p.price = 25;
            //      isFound = true;
            //    }
            //    item[0].midLevels.push(p);
            //  }
            //}
            //for (let i = 0; i < hs.staff.length; i++) {
            //  for (var j = 0; j < hs.staff[i].healthSystems.length; j++) {
            //    let item = this.healthSystemPrices.filter(x => x.healthSystem.Id === hs.staff[i].healthSystems[j].Id);
            //    let p = new PractitionerPrice;
            //    p.practitioner = hs.staff[i].practitioner;
            //    p.isBeingActivated = true;
            //    p.isFree = true;
            //    p.price = 0;
            //    item[0].staff.push(p);
            //  }
            //}
        },
        enumerable: true,
        configurable: true
    });
    CheckoutSetupComponent.prototype.getSubtotal = function (h) {
        var _this = this;
        h.tier = this.tiers.filter(function (x) { return x.TierId == _this.selectedTier; })[0];
        if (!h.tier) {
            return 0;
        }
        var cost = h.tier.TierPrice;
        h.physicians.forEach(function (x) {
            if (x.isFree || !x.isBeingActivated) {
                return;
            }
            cost += x.price;
        });
        h.midLevels.forEach(function (x) {
            if (x.isFree || !x.isBeingActivated) {
                return;
            }
            cost += x.price;
        });
        return cost;
    };
    CheckoutSetupComponent.prototype.getTotal = function () {
        var _this = this;
        var cost = 0;
        this.healthSystemPrices.forEach(function (x) { return cost += _this.getSubtotal(x); });
        return cost;
    };
    CheckoutSetupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.physicianService
            .getTiers()
            .subscribe(function (result) {
            var freeTier = {
                TierDesc: 'FREE',
                TierId: 0,
                TierPrice: 0
            };
            _this.tiers = __spreadArrays([freeTier], result);
            _this.healthSystemPrices.forEach(function (x) { return x.tier = _this.tiers[0]; });
        });
    };
    CheckoutSetupComponent.prototype.tierChanged = function (event, h) {
        var val = event.value;
        h.tier = this.tiers.filter(function (x) { return x.TierId == val; })[0];
        this.selectedTier = val;
    };
    CheckoutSetupComponent.prototype.isAllPhysiciansSelected = function () {
        var numberSelected = this.healthSystemPrices.map(function (hs) {
            return hs.physiciansSelection.selected.length;
        }).reduce(function (x, y) { return x + y; }, 0);
        var totalNumber = this.healthSystemPrices.map(function (hs) {
            return hs.physicians.filter(function (pp) { return !pp.isFree; }).length;
        }).reduce(function (x, y) { return x + y; }, 0);
        return numberSelected === totalNumber;
    };
    CheckoutSetupComponent.prototype.isAllMidLevelsSelected = function () {
        var numberSelected = this.healthSystemPrices.map(function (hs) {
            return hs.midLevelssSelection.selected.length;
        }).reduce(function (x, y) { return x + y; }, 0);
        var totalNumber = this.healthSystemPrices.map(function (hs) {
            return hs.midLevels.length;
        }).reduce(function (x, y) { return x + y; }, 0);
        return numberSelected === totalNumber;
    };
    CheckoutSetupComponent.prototype.back = function () {
        this.navigate.emit(false);
    };
    CheckoutSetupComponent.prototype.finish = function () {
        //this.navigate.emit(true);
    };
    CheckoutSetupComponent.prototype.updatePaymentInfo = function () {
        console.log('health---', this.healthSystem);
        var info = {
            HealthSystemId: this.healthSystem.primary.Id,
            CardNumber: this.cardNumber,
            CardExpirationMMYY: "" + this.cardMonth + this.cardYear,
            CardCode: this.cardCode,
            FirstName: this.firstName,
            LastName: this.lastName,
            Address: this.address,
            City: this.city,
            State: this.state,
            Zip: this.zip
        };
        this.physicianService.updatePaymentInformation(info)
            .subscribe(function (result) {
            console.log(result);
            alert('Successfully updated!');
        });
    };
    __decorate([
        core_1.Input()
    ], CheckoutSetupComponent.prototype, "tier", null);
    __decorate([
        core_1.Input()
    ], CheckoutSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], CheckoutSetupComponent.prototype, "navigate", void 0);
    CheckoutSetupComponent = __decorate([
        core_1.Component({
            selector: 'checkout',
            templateUrl: './checkout.component.html',
            styleUrls: ['./setup.component.css']
        })
    ], CheckoutSetupComponent);
    return CheckoutSetupComponent;
}());
exports.CheckoutSetupComponent = CheckoutSetupComponent;
//# sourceMappingURL=checkout.component.js.map