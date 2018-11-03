import {AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Optional, Output, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {Predio} from '../../models/predio';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterContentInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  latitude = -31.416798;
  longitude = -64.183674;
  predios: Predio[];
  @Input() direccion: string;
  @Input() geoposicion: boolean;
  @Input() set setIdPartido(name: Predio[]) {
    this.predios = name;
  }
  @Output() sendUbicacion = new EventEmitter();
  @Output() sendInfo = new EventEmitter();

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  icons = {
    library: {
      icon: this.iconBase + 'library_maps.png'
    }
  };

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Hay geoposicion');
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        let mapProp = {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        this.initMap(position.coords.latitude, position.coords.longitude);
        if(this.predios !== undefined) {
          this.setAll(this.predios);
        }
      });
    }
    else {
      console.log('No hay geoposicion');
      let mapProp = {
        center: new google.maps.LatLng(this.latitude, this.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      this.initMap(this.latitude, this.longitude);
      if(this.predios !== undefined){
        this.setAll(this.predios);
      }

    }

  }

  initMap(lat, lng) {
    let marker = this.newMarker(new google.maps.LatLng(lat, lng));
    this.setCenter(lat, lng);
    marker.setTitle('Estás acá ');
  }

  newMarker(position, predio: Predio = null): google.maps.Marker {
    let marker = new google.maps.Marker({
      position: position,
      map: this.map,
      infoPredio: predio
    });
    if (predio === null){
      marker.setIcon(this.icons.library.icon);
    }
    marker.addListener('click', () => {
      if (predio !== null) {
        this.infoMarker(marker, marker.infoPredio.nombrePredio + ' ' + marker.infoPredio.direccion);
        this.sendUbicacion.emit(marker.getPosition());
        this.sendInfo.emit(marker.infoPredio);
      } else {
        this.infoMarker(marker, 'Estás acá(' + marker.getPosition().toString() + ')');
        this.sendUbicacion.emit(marker.getPosition());
      }
    });
    this.map.panTo(position);
    return marker;
  }

  setCenter(lat, lng) {
    this.map.setCenter(new google.maps.LatLng(lat, lng));
  }

  infoMarker(marker: google.maps.Marker, mensaje: string) {
    let infoWindow = new google.maps.InfoWindow();
    infoWindow.setOptions({maxWidth: 200});
    infoWindow.setContent(mensaje);
    infoWindow.open(this.map, marker);
  }

  geocodeDireccion(direccion) {
    return this.geocodeAddress(direccion);
  }

  private geocodeAddress(direccion, resultsMap = this.map): any {
    const geocoder = new google.maps.Geocoder();
    let asd = this.newMarker(new google.maps.LatLng(this.latitude, this.longitude));
    geocoder.geocode({'address': direccion}, function (results, status) {
      if (status === 'OK') {
        asd.setMap(resultsMap);
        asd.setIcon(null);
        asd.setPosition(results[0].geometry.location);
        asd.setTitle(results[0].formatted_address);
        resultsMap.setCenter(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  setAll(predios) {
    if (!(predios instanceof Array)) {
      this.newMarker(new google.maps.LatLng(predios.ubicacionMaps.lat, predios.ubicacionMaps.lng), predios);
      this.setCenter(this.latitude, this.longitude);
    } else {
      for (let predio of predios) {
        this.newMarker(new google.maps.LatLng(predio.ubicacionMaps.lat, predio.ubicacionMaps.lng), predio);
        this.setCenter(this.latitude, this.longitude);
      }
    }
  }

  setUbicacion(predio) {
    let marker = new google.maps.Marker({
      position: predio.ubicacionMaps,
      map: this.map,
      infoPredio: predio
    });
    marker.addListener('click', () => {
        this.infoMarker(marker, marker.infoPredio.nombrePredio);
    });
    this.map.panTo(marker.getPosition());
    return marker;
  }
}
