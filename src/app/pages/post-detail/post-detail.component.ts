import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="detail-container">
      <a routerLink="/posts" class="back-btn">← Volver a la lista</a>
      
      @if (service.loading()) {
        <p class="loading">⏳ Cargando detalle...</p>
      }

      @if (service.selected(); as post) {
        <div class="card">
          <h1>{{ post.title }}</h1>
          <p class="meta">Autor: User {{ post.userId }}</p>
          <p class="body">{{ post.body }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .detail-container { max-width: 800px; margin: 40px auto; font-family: sans-serif; padding: 0 20px; }
    .back-btn { color: #1565C0; text-decoration: none; font-weight: bold; display: inline-block; margin-bottom: 20px; }
    .card { border: 1px solid #E0E0E0; border-radius: 12px; padding: 30px; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .card h1 { color: #283593; margin-top: 0; }
    .meta { color: #78909C; font-size: 1rem; margin-bottom: 20px; }
    .body { color: #37474F; line-height: 1.8; font-size: 1.1rem; }
    .loading { text-align: center; padding: 20px; color: #1565C0; }
  `]
})
export class PostDetailComponent implements OnInit {
  service = inject(PostService);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getById(id);
  }
}