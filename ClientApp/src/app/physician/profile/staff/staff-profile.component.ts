import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Staff } from './../models/staff';
import { Provider } from "./../models/provider";
import { HealthSystem } from "./../../models/healthSystem";
import { HealthSystemPractitioner } from "./../models/healthSystemPractitioner";
import { PhysicianService } from "../../physician.service";
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Practitioner, PractitionerLocation } from '../models/practitioner';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { takeUntil, take, delay } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MapTypeStyle } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { google } from '@agm/core/services/google-maps-types';
/// <reference types="@types/googlemaps" />

declare const google: any;


@Component({
  selector: 'staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.css']
})
export class StaffProfileComponent implements OnInit, OnDestroy {

  provider: Provider = new Provider;
  healthSystem: HealthSystem = new HealthSystem;
  doctors: HealthSystemPractitioner[] = [];
  practitioner$: BehaviorSubject<Practitioner> = new BehaviorSubject(null);
  practitionerCopy: Practitioner = null;
  practitionerId = 0;
  photoUrl: string = null; //not implemented
  isEditing = false;
  viewSwitch: 'physician' | 'practice' = 'physician';
  unsubscribeAll$: Subject<boolean> = new Subject<boolean>();
  uploadPhotoButton = false;
  files: any[];

  @ViewChild('photo') photo;

  markers: marker[] = [];
  mapStyles: MapTypeStyle[] = [<MapTypeStyle>{
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        'color': '#3b68d7'
      }
    ]
  },
  <MapTypeStyle>{
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
  <MapTypeStyle>{
    'featureType': 'administrative.locality',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#002685'
      }
    ]
  },
  <MapTypeStyle>{
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
  <MapTypeStyle>{
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
  <MapTypeStyle>{
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#1c43a4'
      }
    ]
  },
  <MapTypeStyle>{
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
  <MapTypeStyle>{
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
  <MapTypeStyle>{
    'featureType': 'road.highway.controlled_access',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  <MapTypeStyle>{
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
  <MapTypeStyle>{
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
  <MapTypeStyle>{
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
  <MapTypeStyle>{
    'featureType': 'transit.station',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#abbce6'
      }
    ]
  },
  <MapTypeStyle>{
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
  <MapTypeStyle>{
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
  <MapTypeStyle>{
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#99a0b1'
      }
    ]
  }]

  constructor(
    private physicianService: PhysicianService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next(true);
    this.unsubscribeAll$.unsubscribe();
  }
  ngOnInit() {

    // tests
    // this.practitioner$ = this.physicianService.getPractitioner(6574); 
    // this.practitioner$ = this.physicianService.getPractitioner(3032366);

    this.route.queryParams.pipe(takeUntil(this.unsubscribeAll$)).subscribe((params: Params) => {
      this.practitionerId = params['id'];
      if (this.practitionerId) {
        this.physicianService.getPractitioner(this.practitionerId).subscribe(p => {
          this.practitioner$.next(p);
          this.practitionerCopy = JSON.parse(JSON.stringify(p));
          this.addMarkers(p.PractitionerLocation);
        });

      }
    });

  }

  toggleEdit() {
    if (this.isEditing) {
      this.isEditing = false;
      this.practitioner$ = new BehaviorSubject(JSON.parse(JSON.stringify(this.practitionerCopy)));
    } else {
      this.isEditing = true;
    }
  }

  saveChanges(doctor: Practitioner) {
    console.log(doctor);
    this.practitionerCopy = JSON.parse(JSON.stringify(doctor));
    this.isEditing = false
    this.physicianService.updatePractitioner(doctor).subscribe((p) => {
      this.practitioner$.next(p);
      this.practitionerCopy = JSON.parse(JSON.stringify(p));
    });
  }

  switchToPhysician() {
    this.viewSwitch = 'physician';
  }

  switchToPractice() {
    this.viewSwitch = 'practice';
    this.practitioner$.pipe(take(1), delay(500)).subscribe(p => {
      this.addMarkers(p.PractitionerLocation);
    });

  }

  addMarkers(locations: PractitionerLocation[]) {

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i].Location;
      let labelCounter = i + 1;


      if (location.Latitude != null) {

        this.markers.push(<marker>{
          draggable: false,
          label: labelCounter.toString(),
          lat: location.Latitude,
          lng: location.Longitude

        })
        //this.addMarker({ lat: location.Latitude, lng: location.Longitude }, i);
      } else {
        const that = this;
        new google.maps.Geocoder()
          .geocode({ 'address': location.Address1 + ' ' + location.Address2 + ', ' + location.City + ', ' + location.State },
            function (results, status) {
              if (status === google.maps.GeocoderStatus.OK) {
                location.Latitude = results[0].geometry.location.lat();
                location.Longitude = results[0].geometry.location.lng();
                that.markers.push(<marker>{
                  draggable: false,
                  label: labelCounter.toString(),
                  lat: location.Latitude,
                  lng: location.Longitude

                })
                //self.practitionerService.saveLocation(location).subscribe(x => {
                //  addMarker(results[0].geometry.location);
                //});
                //that.addMarker( {lat: location.Latitude, lng: location.Longitude}, labelCounter)
              }
            });
      }
    }
  }
  uploadPhoto(provider) {
    const fi = this.photo.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.physicianService.uploadPhoto(fileToUpload, provider.Id)
        .subscribe((res: any) => {
          this.photoUrl = res.Url;
          provider.photoUrl = res.Url;
          this.saveChanges(provider);
        });
    }
  }

}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
