import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, EMPTY } from 'rxjs';
import { Post, CreatePost, Comment } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Estado reactivo
  private _posts = signal<Post[]>([]);
  private _selected = signal<Post | null>(null);
  private _loading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Lectura pública
  readonly posts = this._posts.asReadonly();
  readonly selected = this._selected.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  getAll(): void {
    this._loading.set(true);
    this.http.get<Post[]>(this.apiUrl).pipe(
      tap(posts => {
        this._posts.set(posts);
        this._loading.set(false);
      }),
      catchError(err => {
        this._error.set('Error al cargar posts');
        this._loading.set(false);
        return EMPTY;
      })
    ).subscribe();
  }

  getById(id: number): void {
    this._loading.set(true);
    this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
      tap(post => {
        this._selected.set(post);
        this._loading.set(false);
      }),
      catchError(err => {
        this._error.set('Error al cargar el post');
        this._loading.set(false);
        return EMPTY;
      })
    ).subscribe();
  }

  create(data: CreatePost): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, data).pipe(
      tap(newPost => {
        this._posts.update(list => [{ ...newPost, id: list.length + 1 }, ...list]);
      })
    );
  }

  update(id: number, data: CreatePost): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, data).pipe(
      tap(updatedPost => {
        this._posts.update(list => list.map(p => p.id === id ? updatedPost : p));
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._posts.update(list => list.filter(p => p.id !== id));
      })
    );
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }
}