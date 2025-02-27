import { Post } from "@/features/posts/types";

export const initialPosts: Post[] = [
  {
    id: "1",
    title: "First Post",
    imageUrl: "/images/placeholder.jpg", // Replace with actual image URL
    thumbnailUrl: "/images/placeholder-thumb.jpg", // Replace with actual thumbnail URL
    description: "This is the description for the first post.",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Second Post",
    imageUrl: "/images/placeholder2.jpg", // Replace with actual image URL
    thumbnailUrl: "/images/placeholder2-thumb.jpg", // Replace with actual thumbnail URL
    description: "This is the description for the second post.",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Third Post",
    imageUrl: "/images/placeholder3.jpg", // Replace with actual image URL
    thumbnailUrl: "/images/placeholder3-thumb.jpg", // Replace with actual thumbnail URL
    description: "This is the description for the third post.",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];