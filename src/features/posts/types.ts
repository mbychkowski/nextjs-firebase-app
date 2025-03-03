import type { Timestamp } from "firebase/firestore";


export interface Post {
  id: string; // Unique numeric identifier for the post
  title: string; // Title of the post
  imageUrl: string; // URL to the full-size image
  thumbnailUrl: string; // URL to the thumbnail image
  description: string; // Description or content of the post
  upvotes: number; // Number of upvotes
  downvotes: number; // Number of downvotes
  createdAt: Timestamp; // Date when the post was created
  updatedAt: Timestamp; // Date when the post was last updated
}
