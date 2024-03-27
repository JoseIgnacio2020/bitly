import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShortUrlService } from '../../services/short-url.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-short-url',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, SpinnerComponent],
  templateUrl: './short-url.component.html',
  styleUrl: './short-url.component.css'
})
export class ShortUrlComponent {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlService: ShortUrlService) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
  }

  procesarUrl() {

    if(this.nombreUrl === '') {
      this.error('Por favor ingrese una URL');
      return;
    }

    this.urlProcesada = false;
    this.loading = true;

    setTimeout(() => {
      this.obtenerUrlShort();
    }, 2000);
    
  }

  obtenerUrlShort() {
    this._shortUrlService.GetUrlShort(this.nombreUrl).subscribe(data => {
      this.loading = false;
      this.urlProcesada = true;
      this.urlShort = data.link;
    }, error => {
      this.loading = false;
      this.nombreUrl = '';
      console.log(error);
      if(error.error.description === 'The value provided is invalid.') {
        this.error('La URL ingresada es invalida')
      }
    });
  }

error(valor: string) {
    this.mostrarError = true;
    this.textError = valor;
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000);
  }

}
