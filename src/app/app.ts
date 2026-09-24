import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <a routerLink="/posts" class="logo"> PostManager</a>
        <div class="nav-links">
          <a routerLink="/posts">Lista</a>
          <a routerLink="/posts/new" class="btn-new">+ Nuevo Post</a>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar { background: #1565C0; padding: 15px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .nav-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
    .logo { color: white; text-decoration: none; font-size: 1.5rem; font-weight: bold; }
    .nav-links { display: flex; gap: 20px; align-items: center; }
    .nav-links a { color: white; text-decoration: none; font-weight: 500; }
    .nav-links a:hover { opacity: 0.8; }
    .btn-new { background: white; color: #1565C0 !important; padding: 8px 16px; border-radius: 8px; font-weight: bold; }
    .btn-new:hover { background: #E3F2FD; }
    .main-content { min-height: calc(100vh - 70px); background: #F5F7FA; }
  `]
})
export class App {
  title = 'post-manager';
}