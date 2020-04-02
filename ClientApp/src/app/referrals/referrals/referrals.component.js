"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var ReferralsComponent = /** @class */ (function () {
    function ReferralsComponent(referralService, dialog, route) {
        this.referralService = referralService;
        this.dialog = dialog;
        this.route = route;
        this.unsubscribeAll$ = new rxjs_1.Subject();
        this.referrals$ = new rxjs_1.BehaviorSubject([]);
        this.statuses = ['Created', 'Patient Availability Set', 'Provider Availability Set', 'User Selected Appointment', 'Appointment Scheduled'];
        this.filters = [
            {
                label: 'All',
                value: ''
            },
            {
                label: 'Created',
                value: 'Created',
            },
            {
                label: 'Patient Availability Set',
                value: 'Patient Availability Set',
            },
            {
                label: 'Provider Availability Set',
                value: 'Provider Availability Set',
            },
            {
                label: 'User Selected Appointment',
                value: 'User Selected Appointment',
            },
            {
                label: 'Appointment Scheduled',
                value: 'Appointment Scheduled',
            },
        ];
        this.selectedFilter = '';
        this.title = 'Received Referrals';
        this.searchCtrl = new forms_1.FormControl();
        this.referrals = new Array();
    }
    ReferralsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.pipe(operators_1.takeUntil(this.unsubscribeAll$)).subscribe(function (params) {
            _this.referralPage = params['page'];
            _this.referrals$.next([]);
            switch (_this.referralPage) {
                case 'outgoing':
                    _this.referralService.getPracticeOutgoing().subscribe(function (r) {
                        _this.referrals = r;
                        _this.referrals$.next(r);
                    });
                    break;
                case 'recommendations':
                    _this.referralService.getPracticePatient().subscribe(function (r) {
                        _this.referrals = r;
                        _this.referrals$.next(r);
                    });
                    break;
                default:
                    _this.referralService.getPracticeIncoming().subscribe(function (r) {
                        _this.referrals = r;
                        _this.referrals$.next(r);
                    });
                    break;
            }
            if (_this.referralPage === 'received') {
            }
        });
        /*this.filteredReferrals = this.searchCtrl.valueChanges
          .pipe(
            startWith(null),
            map(value => this._filterReferrals(value))
          );*/
    };
    ReferralsComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAll$.next(true);
        this.unsubscribeAll$.unsubscribe();
    };
    ReferralsComponent.prototype._filterReferrals = function (value) {
        var filtered = JSON.parse(JSON.stringify(this.referrals));
        if (value) {
            filtered = this.referrals.filter(function (option) { return option.Status === value; });
        }
        this.referrals$.next(filtered);
    };
    ReferralsComponent = __decorate([
        core_1.Component({
            selector: 'app-referrals',
            templateUrl: './referrals.component.html',
            styleUrls: ['./referrals.component.scss']
        })
    ], ReferralsComponent);
    return ReferralsComponent;
}());
exports.ReferralsComponent = ReferralsComponent;
//# sourceMappingURL=referrals.component.js.map