"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var provider_1 = require("./../models/provider");
var healthSystem_1 = require("./../../models/healthSystem");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var StaffProfileComponent = /** @class */ (function () {
    function StaffProfileComponent(physicianService, route, router) {
        this.physicianService = physicianService;
        this.route = route;
        this.router = router;
        this.provider = new provider_1.Provider;
        this.healthSystem = new healthSystem_1.HealthSystem;
        this.doctors = [];
        this.practitioner$ = new rxjs_1.BehaviorSubject(null);
        this.practitionerCopy = null;
        this.practitionerId = 0;
        this.photoUrl = null; //not implemented
        this.isEditing = false;
        this.viewSwitch = 'physician';
        this.unsubscribeAll$ = new rxjs_1.Subject();
        this.uploadPhotoButton = false;
        this.markers = [];
        this.mapStyles = [{
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        'color': '#3b68d7'
                    }
                ]
            },
            {
                'featureType': 'administrative.locality',
                'elementType': 'all',
                'stylers': [
                    {
                        'hue': '#2c2e33'
                    },
                    {
                        'saturation': 7
                    },
                    {
                        'lightness': 19
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'administrative.locality',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#002685'
                    }
                ]
            },
            {
                'featureType': 'landscape',
                'elementType': 'all',
                'stylers': [
                    {
                        'hue': '#ffffff'
                    },
                    {
                        'saturation': -100
                    },
                    {
                        'lightness': 100
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'all',
                'stylers': [
                    {
                        'hue': '#ffffff'
                    },
                    {
                        'saturation': -100
                    },
                    {
                        'lightness': 100
                    },
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'poi',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#1c43a4'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'hue': '#bbc0c4'
                    },
                    {
                        'saturation': -93
                    },
                    {
                        'lightness': 31
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road',
                'elementType': 'labels',
                'stylers': [
                    {
                        'hue': '#bbc0c4'
                    },
                    {
                        'saturation': -93
                    },
                    {
                        'lightness': 31
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'road.highway.controlled_access',
                'elementType': 'labels.icon',
                'stylers': [
                    {
                        'visibility': 'off'
                    }
                ]
            },
            {
                'featureType': 'road.arterial',
                'elementType': 'labels',
                'stylers': [
                    {
                        'hue': '#bbc0c4'
                    },
                    {
                        'saturation': -93
                    },
                    {
                        'lightness': -2
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'road.local',
                'elementType': 'geometry',
                'stylers': [
                    {
                        'hue': '#e9ebed'
                    },
                    {
                        'saturation': -90
                    },
                    {
                        'lightness': -8
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'transit',
                'elementType': 'all',
                'stylers': [
                    {
                        'hue': '#e9ebed'
                    },
                    {
                        'saturation': 10
                    },
                    {
                        'lightness': 69
                    },
                    {
                        'visibility': 'on'
                    }
                ]
            },
            {
                'featureType': 'transit.station',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#abbce6'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'all',
                'stylers': [
                    {
                        'hue': '#e9ebed'
                    },
                    {
                        'saturation': -78
                    },
                    {
                        'lightness': 67
                    },
                    {
                        'visibility': 'simplified'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'geometry.fill',
                'stylers': [
                    {
                        'color': '#002685'
                    },
                    {
                        'lightness': '96'
                    }
                ]
            },
            {
                'featureType': 'water',
                'elementType': 'labels.text.fill',
                'stylers': [
                    {
                        'color': '#99a0b1'
                    }
                ]
            }];
    }
    StaffProfileComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeAll$.next(true);
        this.unsubscribeAll$.unsubscribe();
    };
    StaffProfileComponent.prototype.ngOnInit = function () {
        // tests
        // this.practitioner$ = this.physicianService.getPractitioner(6574); 
        // this.practitioner$ = this.physicianService.getPractitioner(3032366);
        var _this = this;
        this.route.queryParams.pipe(operators_1.takeUntil(this.unsubscribeAll$)).subscribe(function (params) {
            _this.practitionerId = params['id'];
            if (_this.practitionerId) {
                _this.physicianService.getPractitioner(_this.practitionerId).subscribe(function (p) {
                    _this.practitioner$.next(p);
                    _this.practitionerCopy = JSON.parse(JSON.stringify(p));
                    _this.addMarkers(p.PractitionerLocation);
                });
            }
        });
    };
    StaffProfileComponent.prototype.toggleEdit = function () {
        if (this.isEditing) {
            this.isEditing = false;
            this.practitioner$ = new rxjs_1.BehaviorSubject(JSON.parse(JSON.stringify(this.practitionerCopy)));
        }
        else {
            this.isEditing = true;
        }
    };
    StaffProfileComponent.prototype.saveChanges = function (doctor) {
        var _this = this;
        console.log(doctor);
        this.practitionerCopy = JSON.parse(JSON.stringify(doctor));
        this.isEditing = false;
        this.physicianService.updatePractitioner(doctor).subscribe(function (p) {
            _this.practitioner$.next(p);
            _this.practitionerCopy = JSON.parse(JSON.stringify(p));
        });
    };
    StaffProfileComponent.prototype.switchToPhysician = function () {
        this.viewSwitch = 'physician';
    };
    StaffProfileComponent.prototype.switchToPractice = function () {
        var _this = this;
        this.viewSwitch = 'practice';
        this.practitioner$.pipe(operators_1.take(1), operators_1.delay(500)).subscribe(function (p) {
            _this.addMarkers(p.PractitionerLocation);
        });
    };
    StaffProfileComponent.prototype.addMarkers = function (locations) {
        var _loop_1 = function (i) {
            var location_1 = locations[i].Location;
            var labelCounter = i + 1;
            if (location_1.Latitude != null) {
                this_1.markers.push({
                    draggable: false,
                    label: labelCounter.toString(),
                    lat: location_1.Latitude,
                    lng: location_1.Longitude
                });
                //this.addMarker({ lat: location.Latitude, lng: location.Longitude }, i);
            }
            else {
                var that_1 = this_1;
                new google.maps.Geocoder()
                    .geocode({ 'address': location_1.Address1 + ' ' + location_1.Address2 + ', ' + location_1.City + ', ' + location_1.State }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        location_1.Latitude = results[0].geometry.location.lat();
                        location_1.Longitude = results[0].geometry.location.lng();
                        that_1.markers.push({
                            draggable: false,
                            label: labelCounter.toString(),
                            lat: location_1.Latitude,
                            lng: location_1.Longitude
                        });
                        //self.practitionerService.saveLocation(location).subscribe(x => {
                        //  addMarker(results[0].geometry.location);
                        //});
                        //that.addMarker( {lat: location.Latitude, lng: location.Longitude}, labelCounter)
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < locations.length; i++) {
            _loop_1(i);
        }
    };
    StaffProfileComponent.prototype.uploadPhoto = function (provider) {
        var _this = this;
        var fi = this.photo.nativeElement;
        if (fi.files && fi.files[0]) {
            var fileToUpload = fi.files[0];
            this.physicianService.uploadPhoto(fileToUpload, provider.Id)
                .subscribe(function (res) {
                _this.photoUrl = res.Url;
                provider.photoUrl = res.Url;
                _this.saveChanges(provider);
            });
        }
    };
    __decorate([
        core_1.ViewChild('photo')
    ], StaffProfileComponent.prototype, "photo", void 0);
    StaffProfileComponent = __decorate([
        core_1.Component({
            selector: 'staff-profile',
            templateUrl: './staff-profile.component.html',
            styleUrls: ['./staff-profile.component.css']
        })
    ], StaffProfileComponent);
    return StaffProfileComponent;
}());
exports.StaffProfileComponent = StaffProfileComponent;
//# sourceMappingURL=staff-profile.component.js.map