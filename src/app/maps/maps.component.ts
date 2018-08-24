import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {HttpClient} from '@angular/common/http';
import {ConfirmationService} from 'primeng/api';
import {PredioService} from '../../services/predioService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [ConfirmationService, PredioService]
})
export class MapsComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  @Input() posicion: any;


  options: any;
  overlays: any[];
  direccionCompleta: string;
  direccionLinda: string;

  infoWindow: any;

  constructor(private http: HttpClient,
              private confirmationService: ConfirmationService,
              private predioService: PredioService,
              private router: Router) {
  }

  ngOnInit() {
    this.overlays = [];
    this.findMe();
    // this.getGeoLocation();
    this.options = {
      center: {lat: -31.369994, lng: -64.284615}, // deberia cambiarse por la ubicacion definida x el navegador
      zoom: 12
    };
    this.infoWindow = new google.maps.InfoWindow();
  }

  setMap(event) {
    this.map = event.map;
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let p = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.getAddress(p);
        this.setUnicoOverlay(p, 16, 'Usted está aquí');
        console.log(p);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  handleOverlayClick(event) {
    const title = event.overlay.getTitle();
    this.infoWindow.setContent(title);
    this.infoWindow.open(event.map, event.overlay);
    event.map.setCenter(event.overlay.getPosition());
    let p = new google.maps.LatLng(event.overlay.getPosition().lat(), event.overlay.getPosition().lng());
    this.confirm1(p);
    console.log(event.overlay.getPosition().lat(), event.overlay.getPosition().lng());
  }

  getLocation(term: string): Promise<any> {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false')
      .toPromise()
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.resolve(error.json()));
  }

  getAddress(direccion): void {
    this.getLocation(direccion).then((response) => {
      this.setUnicoOverlay(response.results[0].geometry.location, 12, response.results[0].formatted_address);
    })
    .catch((error) => console.error(error));
  }

  // setUnicoOverlay(posicion = this.posicion, zoom = 16, desc = this.direccionLinda) {
  setUnicoOverlay(posicion, zoom, desc) {
    this.map.setCenter(posicion);
    this.map.setZoom(zoom);
    // this.overlays.push(new google.maps.Marker({position: posicion, title: desc}));
    this.overlays = [new google.maps.Marker({position: posicion, title: desc})];
  }

  confirm1(ubicacion) {
    this.confirmationService.confirm({
      message: 'Definir esta ubicación como dirección del predio?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('entrando...');
        // this.predioService.setUbicacion('5b5e5661b7e1c6236f5c733d', {"lat": ubicacion.lat(), "lng": ubicacion.lng()})
        this.predioService.setUbicacion('5b5e5661b7e1c6236f5c733d', ubicacion)
          .subscribe(resp => {
            console.log(resp);
            this.router.navigateByUrl('/predio/registro/3');
          });
      },
      reject: () => {
        alert('No aceptado');
      }
    });
  }
}
