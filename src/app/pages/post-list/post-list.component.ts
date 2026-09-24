import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  template: `
    <div class="list-container">
      <h1>📚 Lista de Posts</h1>
      <p class="count">{{ service.posts().length }} posts cargados</p>

      @if (service.loading()) {
        <p class="loading">⏳ Cargando posts...</p>
      }

      @if (service.error(); as err) {
        <p class="error">❌ {{ err }}</p>
      }

      @for (post of service.posts(); track post.id) {
        <div class="card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <button (click)="eliminar(post.id)" class="btn-delete"> Eliminar</button>
        </div>
      } @empty {
        <p class="empty">No hay posts para mostrar.</p>
      }
    </div>
  `,
  styles: [`
    .list-container { max-width: 800px; margin: 40px auto; font-family: sans-serif; padding: 0 20px; }
    h1 { color: #283593; border-bottom: 2px solid #E8EAF6; padding-bottom: 10px; }
    .count { color: #78909C; font-size: 1.1rem; }
    .card { border: 1px solid #E0E0E0; border-radius: 12px; padding: 20px; margin-bottom: 15px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
    .card h3 { color: #1565C0; margin-top: 0; }
    .btn-delete { background: #FFEBEE; color: #C62828; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
  `]
})
export class PostListComponent implements OnInit {
  service = inject(PostService);

  ngOnInit(): void {
    this.service.getAll();
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este post?')) {
      this.service.delete(id).subscribe();
    }
  }
}