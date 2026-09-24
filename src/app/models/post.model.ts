export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type CreatePost = Omit<Post, 'id'>;

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}