import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ApiRoute {
  name: string;
  method: string;
  path: string;
  url: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly routes: ApiRoute[] = [
    { name: 'Get Rainbowfish', method: 'GET', path: '/rainbowfish', url: '/api/rainbowfish' },
    { name: 'Get Chameleon', method: 'GET', path: '/chameleon', url: '/api/chameleon' },
  ];

  protected response = signal<string>('');
  protected loading = signal<boolean>(false);
  protected error = signal<string>('');

  private http = inject(HttpClient);

  protected callRoute(route: ApiRoute): void {
    this.loading.set(true);
    this.error.set('');
    this.response.set('');

    this.http.get(route.url).subscribe({
      next: (data) => {
        this.response.set(JSON.stringify(data, null, 2));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(`Error: ${err.status} ${err.statusText}\n${JSON.stringify(err.error, null, 2)}`);
        this.loading.set(false);
      }
    });
  }
}
