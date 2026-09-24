import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { CreatePost } from '../../models/post.model';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="form-container">
      <h1>✨ Crear Nuevo Post</h1>
      <div class="card">
        <label>Título</label>
        <input [(ngModel)]="newPost.title" placeholder="Escribe el título..." />

        <label>Contenido</label>
        <textarea [(ngModel)]="newPost.body" rows="5" placeholder="Escribe el contenido..."></textarea>

        <label>ID de Usuario</label>
        <input type="number" [(ngModel)]="newPost.userId" placeholder="1" />

        <div class="actions">
          <button (click)="guardar()" class="btn-save">💾 Guardar</button>
          <a routerLink="/posts" class="btn-cancel">Cancelar</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 600px; margin: 40px auto; font-family: sans-serif; padding: 0 20px; }
    h1 { color: #283593; }
    .card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #E0E0E0; }
    label { display: block; color: #546E7A; font-weight: bold; margin-bottom: 5px; margin-top: 15px; }
    input, textarea { width: 100%; padding: 10px; border: 1px solid #CFD8DC; border-radius: 8px; font-size: 1rem; box-sizing: border-box; }
    input:focus, textarea:focus { outline: none; border-color: #1565C0; }
    .actions { margin-top: 25px; display: flex; gap: 10px; }
    .btn-save { background: #1565C0; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
    .btn-cancel { background: #ECEFF1; color: #546E7A; text-decoration: none; padding: 10px 20px; border-radius: 8px; display: inline-block; }
  `]
})
export class PostCreateComponent {
  service = inject(PostService);
  router = inject(Router);

  newPost: CreatePost = {
    title: '',
    body: '',
    userId: 1
  };

  guardar() {
    if (this.newPost.title && this.newPost.body) {
      this.service.create(this.newPost).subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (err) => console.error('Error al crear', err)
      });
    } else {
      alert('Por favor completa el título y el contenido.');
    }
  }
}