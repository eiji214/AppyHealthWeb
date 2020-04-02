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
var lodash_1 = require("lodash");
var rxjs_1 = require("rxjs");
var ActivateSetupComponent = /** @class */ (function () {
    function ActivateSetupComponent(physicianService) {
        this.physicianService = physicianService;
        this.tiers = [];
        this.selectedTier = 1;
        this.healthSystemPrices = [];
        this.setSelectedTier = new core_1.EventEmitter();
        this.navigate = new core_1.EventEmitter();
    }
    Object.defineProperty(ActivateSetupComponent.prototype, "tier", {
        // physiciansSelection = new SelectionModel<Practitioner>(true, []);
        // midLevelssSelection = new SelectionModel<Practitioner>(true, []);
        set: function (selectedTier) {
            this.selectedTier = selectedTier;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivateSetupComponent.prototype, "hs", {
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
            if (this.tiers.length > 0) {
                this.healthSystemPrices.forEach(function (x) { return x.tier = _this.tiers[1]; });
            }
            var usedPractitionerIds = [];
            this.healthSystemPrices.forEach(function (h) {
                _this.healthSystem.physicians.forEach(function (p) {
                    if (p.healthSystems.filter(function (x) { return x.Id === h.healthSystem.Id; }).length > 0) {
                        var isFree = usedPractitionerIds.some(function (x) { return x === p.practitioner.Id; });
                        p.practitioner.staff = p.staff;
                        if (!isFree) {
                            h.physiciansSelection.select(p.practitioner);
                        }
                        h.physicians.push({
                            practitioner: p.practitioner,
                            isBeingActivated: true,
                            price: 50,
                            isFree: isFree
                        });
                        usedPractitionerIds.push(p.practitioner.Id);
                    }
                });
                _this.healthSystem.midLevels.forEach(function (p) {
                    if (p.healthSystems.filter(function (x) { return x.Id === h.healthSystem.Id; }).length > 0) {
                        p.practitioner.staff = p.staff;
                        var isMidLevelFree = usedPractitionerIds.some(function (x) { return x === p.practitioner.Id; });
                        if (!isMidLevelFree) {
                            h.midLevelssSelection.select(p.practitioner);
                        }
                        h.midLevels.push({
                            practitioner: p.practitioner,
                            isBeingActivated: true,
                            price: 25,
                            isFree: isMidLevelFree
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
    ActivateSetupComponent.prototype.getSubtotal = function (h) {
        if (!h.tier || !h.tier.TierPrice) {
            return 0;
        }
        var cost = h.tier.TierPrice;
        h.physicians.forEach(function (x) {
            if (x.isFree || !h.physiciansSelection.isSelected(x.practitioner)) {
                return;
            }
            cost += x.price;
        });
        h.midLevels.forEach(function (x) {
            if (x.isFree || !h.midLevelssSelection.isSelected(x.practitioner)) {
                return;
            }
            cost += x.price;
        });
        return cost;
    };
    ActivateSetupComponent.prototype.getTotal = function () {
        var _this = this;
        var cost = 0;
        this.healthSystemPrices.forEach(function (x) { return cost += _this.getSubtotal(x); });
        return cost;
    };
    ActivateSetupComponent.prototype.getDesc = function (val) {
        if (val !== null && val !== undefined) {
            // @ts-ignore //
            var tier = this.tiers.find(function (x) { return x.TierId == val; }).TierDesc;
            return this.tiers.filter(function (x) { return x.TierId == val; })[0].TierDesc;
        }
        return null;
    };
    ActivateSetupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.physicianService.getTiers()
            .subscribe(function (result) {
            var freeTier = {
                TierDesc: 'FREE',
                TierId: 0,
                TierPrice: 0
            };
            _this.tiers = __spreadArrays([freeTier], result);
            _this.healthSystemPrices.forEach(function (x) { return x.tier = _this.tiers[1]; });
        });
    };
    ActivateSetupComponent.prototype.back = function () {
        this.navigate.emit(false);
    };
    ActivateSetupComponent.prototype.finish = function () {
        var _this = this;
        if (this.selectedTier) {
            this.physicianService.putSubscribeTire(this.healthSystem.primary, this.selectedTier).subscribe(function (r) {
                // this.navigate.emit(true);
                var selectedMidLevels = lodash_1.flatten(_this.healthSystemPrices.map(function (h) {
                    return h.midLevelssSelection.selected.map(function (s) { return s.staff; });
                }));
                var selectedPhysiciansLevels = lodash_1.flatten(_this.healthSystemPrices.map(function (h) {
                    return h.physiciansSelection.selected.map(function (s) { return s.staff; });
                }));
                var updates = __spreadArrays(selectedMidLevels, selectedPhysiciansLevels).filter(function (s) { return !!s; }).map(function (p) {
                    return _this.physicianService.putUpdateMyAssociates({
                        CreateDate: p.CreateDate,
                        ConfirmedDate: p.ConfirmedDate,
                        ConfirmedByUserID: p.ConfirmedByUserID,
                        CustomerId: p.CustomerId,
                        Email: p.Email,
                        Id: p.Id,
                        IsImpersonating: p.IsImpersonating,
                        Name: p.Name,
                        PaymentId: p.PaymentId,
                        PhoneNumber: p.PhoneNumber,
                        PractitionerID: p.PractitionerID,
                        PreferredCommunicationMethod: p.PreferredCommunicationMethod,
                        RequiresPayment: true,
                        Role: p.Role
                    });
                });
                rxjs_1.forkJoin.apply(void 0, updates).subscribe(function (u) {
                    console.log(u.length);
                });
            });
        }
        else {
            // this.navigate.emit(true);
        }
    };
    ActivateSetupComponent.prototype.tierChanged = function (event, h) {
        var val = event.value;
        this.setSelectedTier.emit(val);
        h.tier = this.tiers.filter(function (x) { return x.TierId == val; })[0];
        this.finish();
    };
    ActivateSetupComponent.prototype.checkout = function () {
        this.navigate.emit(true);
    };
    ActivateSetupComponent.prototype.isAllPhysiciansSelected = function () {
        var numberSelected = this.healthSystemPrices.map(function (hs) {
            return hs.physiciansSelection.selected.length;
        }).reduce(function (x, y) { return x + y; }, 0);
        var totalNumber = this.healthSystemPrices.map(function (hs) {
            return hs.physicians.filter(function (pp) { return !pp.isFree; }).length;
        }).reduce(function (x, y) { return x + y; }, 0);
        return numberSelected === totalNumber;
    };
    ActivateSetupComponent.prototype.isAllMidLevelsSelected = function () {
        var numberSelected = this.healthSystemPrices.map(function (hs) {
            return hs.midLevelssSelection.selected.length;
        }).reduce(function (x, y) { return x + y; }, 0);
        var totalNumber = this.healthSystemPrices.map(function (hs) {
            return hs.midLevels.length;
        }).reduce(function (x, y) { return x + y; }, 0);
        return numberSelected === totalNumber;
    };
    ActivateSetupComponent.prototype.masterPhysicianToggle = function () {
        this.isAllPhysiciansSelected() ?
            this.healthSystemPrices.forEach(function (h) { return h.physiciansSelection.clear(); }) :
            this.healthSystemPrices.map(function (hs) {
                hs.physicians.forEach(function (row) { return hs.physiciansSelection.select(row.practitioner); });
            });
    };
    ActivateSetupComponent.prototype.masterMidLevelToggle = function () {
        this.isAllMidLevelsSelected() ?
            this.healthSystemPrices.forEach(function (h) { return h.midLevelssSelection.clear(); }) :
            this.healthSystemPrices.map(function (hs) {
                hs.midLevels.forEach(function (row) { return hs.midLevelssSelection.select(row.practitioner); });
            });
    };
    ActivateSetupComponent.prototype.togglePhysician = function (p) {
        this.healthSystemPrices.forEach(function (h) {
            if (h.physiciansSelection.isSelected(p)) {
                // @ts-ignore //
                h.physicians.find(function (ph) { return ph.practitioner.Id === p.Id; }).isFree = false;
            }
            h.physiciansSelection.toggle(p);
        });
    };
    ActivateSetupComponent.prototype.toggleMidLevel = function (p) {
        this.healthSystemPrices.forEach(function (h) {
            if (h.midLevelssSelection.isSelected(p)) {
                // @ts-ignore //
                h.midLevels.find(function (ph) { return ph.practitioner.Id === p.Id; }).isFree = false;
            }
            h.midLevelssSelection.toggle(p);
        });
    };
    __decorate([
        core_1.Input()
    ], ActivateSetupComponent.prototype, "tier", null);
    __decorate([
        core_1.Output()
    ], ActivateSetupComponent.prototype, "setSelectedTier", void 0);
    __decorate([
        core_1.Input()
    ], ActivateSetupComponent.prototype, "hs", null);
    __decorate([
        core_1.Output()
    ], ActivateSetupComponent.prototype, "navigate", void 0);
    ActivateSetupComponent = __decorate([
        core_1.Component({
            selector: 'activate',
            templateUrl: './activate.component.html',
            styleUrls: ['./setup.component.css']
        })
    ], ActivateSetupComponent);
    return ActivateSetupComponent;
}());
exports.ActivateSetupComponent = ActivateSetupComponent;
//# sourceMappingURL=activate.component.js.map