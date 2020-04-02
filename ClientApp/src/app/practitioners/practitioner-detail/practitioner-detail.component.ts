import { PractitionersService } from './../practitioners.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';


import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Practitioner, PractitionerLocation } from '../../core/model/practitioner';
import { PatientNewComponent } from '../../patients/patient-new/patient-new.component';
import { Location } from '../../core/model/location';
import { InsurancePlan } from '../../core/model/insurancePlan';
import { PractitionerInsurancePlan } from '../../core/model/practitionerInsurancePlan';
import { UserService } from '../../core/services/user.service';

declare const google: any;

@Component({
  selector: 'app-practitioner-detail',
  templateUrl: './practitioner-detail.component.html',
  styleUrls: ['./practitioner-detail.component.scss',
  '../../styles.scss']
})
export class PractitionerDetailComponent implements OnInit {
  constructor(private practitionerService: PractitionersService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }

  practitioner$: Observable<Practitioner>;

  insurance: InsurancePlan[];
  insurancePlanSelected: InsurancePlan;
  practitionerInsurance: PractitionerInsurancePlan;
  selected: string;
  selectedMenu: string;
  photoUrl: string;
  isEditing = false;
  confirmation = false;
  tuesdayChecked = false;
  availableHours = ['00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00',
    '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15',
    '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30',
    '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00',
    '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15',
    '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30',
    '22:45', '23:00', '23:15', '23:30', '23:45'];
  @ViewChild('photo') photo;

  googleMap: any;
  @ViewChild('mapref') set content(mapref: ElementRef) {
    if (!mapref) {
      return;
    }
    this.initMap(mapref);
  }

  ngOnInit() {
    this.practitioner$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.practitionerService.getPractitioner(params.get('id'))),
    );
    this.selectMenu('Practice Information');
    this.practitionerService.getInsuranceList().subscribe(x => this.insurance = x);
  }

  select(link) {
    this.selected = link;
  }

  selectMenu(link) {
    this.selectedMenu = link;
  }

  saveChanges(doctor: Practitioner, practice?: PractitionerLocation) {
    this.practitionerService.updatePractitioner(doctor).subscribe((p) => {
      console.log(p);
      this.isEditing = false;
      if (practice) {
        practice.IsEditing = false;
      }
    });
  }

  toggleEdit(doctor: Practitioner) {
    if (this.isEditing) {
      this.isEditing = false;
      this.practitioner$ = this.practitionerService.getPractitioner(doctor.Id);
    } else {
      this.isEditing = true;
    }
  }

  togglePracticeEdit(practice: PractitionerLocation) {
    if (practice.IsEditing) {
      practice.IsEditing = false;
      practice.IsExpanded = false;
      this.practitioner$ = this.practitionerService.getPractitioner(practice.PractitionerId);
    } else {
      if (!practice.Availability) {
        practice.Availability = {};
      }
      practice.IsEditing = true;
      practice.IsExpanded = true;
    }
  }

  save(doctor: Practitioner, practice?: PractitionerLocation): void {
    this.practitionerService.savePractitioner(doctor.Id, doctor).subscribe((d) => {
      if (practice) { practice.IsEditing = false; }
    });
  }

  expand(practice: PractitionerLocation) {
    practice.IsExpanded = !(practice.IsExpanded || false);
  }

  createLocation(doctor: Practitioner) {
    this.practitionerService.createLocation(doctor).subscribe((d) => {
      d.Availability = {};
      doctor.PractitionerLocation.push(d);
      d.IsEditing = true;
      d.IsExpanded = true;
    });
  }

  confirmDelete(practice: PractitionerLocation) {
    practice.ShouldDelete = true;
  }

  deleteLocation(doctor: Practitioner, location: Location) {
    return this.practitionerService.deleteLocation(location.Id).subscribe(d => {
      doctor.PractitionerLocation.splice(doctor.PractitionerLocation.findIndex(x => x.LocationId === location.Id), 1),
        this.selectedMenu = 'Practice Information';
    });
  }

  openNewPatientDialog(specialistId: number): void {
    const dialogRef = this.dialog.open(PatientNewComponent, {
      width: '40vw',
      data: { specialistId: specialistId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  uploadPhoto(provider) {
    const fi = this.photo.nativeElement;
    if (fi.files && fi.files[0]) {
      const fileToUpload = fi.files[0];
      this.practitionerService.uploadPhoto(fileToUpload, provider.Id)
        .subscribe((res: any) => {
          this.photoUrl = res.Url;
          provider.photoUrl = res.Url;
          this.saveChanges(provider);
        });
    }
  }

  delete(doctor: Practitioner): void {
    this.practitionerService.deletePractitioner(doctor.Id).subscribe((d) => {
      this.router.navigate(['/practitioners']);
    });
  }

  saveProviderInsuranceOption(pract: Practitioner, insurancePlan: InsurancePlan) {
    this.practitionerInsurance = {
      InsuranceId: insurancePlan.Id,
      PractitionerId: pract.Id
    };
    pract.PractitionerInsurancePlan.push(this.practitionerInsurance);
    this.practitionerService.updatePractitionerInsurance(pract).subscribe(x => this.toggleEdit(pract));
  }

  toggleFavorite(doctor: Practitioner) {
    if (doctor.IsFavorite === false || doctor.IsFavorite == null) {
      doctor.IsFavorite = true;
    } else if (doctor.IsFavorite === true) {
      doctor.IsFavorite = false;
    }
    return this.practitionerService.favoritePractitioner(doctor).subscribe(x => console.log(x));
  }

  impersonatePractitioner(doctor: Practitioner) {
    this.userService.impersonatePractitioner(doctor.Id).subscribe(x => {
      console.log(x);
      window.location.reload(false);
    },
      error => {
        alert(error.error);
      }
    );
  }

  initMap(mapref: ElementRef) {
    const mapProp = {
      center: new google.maps.LatLng(32.7460, -96.9978),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const styles = new google.maps.StyledMapType([
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': [
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
      }
    ]);

    this.googleMap = new google.maps.Map(mapref.nativeElement, mapProp);
    this.googleMap.mapTypes.set('styled_map', styles);
    this.googleMap.setMapTypeId('styled_map');

    // I know, I know, I'm getting this data twice, but I'm tired
    this.practitionerService.getPractitioner(this.route.snapshot.params['id']).subscribe(x => {
      this.addMarkers(this.googleMap, x.PractitionerLocation);
    });
  }

  fitBounds(map, boundsLocations: any[]) {
    const bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < boundsLocations.length; i++) {
      bounds.extend(boundsLocations[i]);
    }
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
  }

  addMarkers(map, locations: PractitionerLocation[]) {
    if (!map) {
      return;
    }

    const fitBounds = this.fitBounds;
    const self = this;

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i].Location;
      const boundsLocations = [];
      let labelCounter = 0;

      const addMarker = (googleLocation) => {
        labelCounter++;
        const marker = new google.maps.Marker({
          position: googleLocation,
          label: labelCounter.toString()
        });

        marker.setMap(map);
        boundsLocations.push(googleLocation);
        fitBounds(map, boundsLocations);
      };

      if (location.Latitude != null) {
        addMarker({ lat: location.Latitude, lng: location.Longitude });
      } else {
        new google.maps.Geocoder()
          .geocode({ 'address': location.Address1 + ' ' + location.Address2 + ', ' + location.City + ', ' + location.State },
            function (results, status) {
              if (status === 'OK') {
                location.Latitude = results[0].geometry.location.lat();
                location.Longitude = results[0].geometry.location.lng();
                self.practitionerService.saveLocation(location).subscribe(x => {
                  addMarker(results[0].geometry.location);
                });
              }
            });
      }
    }
  }
}
