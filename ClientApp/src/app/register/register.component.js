"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, route, userService) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.user = {};
        this.roles = [];
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getMe()
            .subscribe(function (u) { return _this.user = u; });
        this.userService.getRoles()
            .subscribe(function (result) {
            _this.roles = result.filter(function (x) { return x.Code === "Staff" || x.Code === "Medical Staff"; }).map(function (x) { return x.Name; });
            _this.roles.sort();
        });
    };
    RegisterComponent.prototype.save = function () {
        var _this = this;
        this.userService.saveUser(this.user)
            .subscribe(function (result) {
            var redirectUrl = _this.route.snapshot.queryParamMap.get("redirectUrl");
            if (redirectUrl) {
                _this.router.navigate([redirectUrl]);
            }
            else {
                _this.router.navigate(['/']);
            }
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map