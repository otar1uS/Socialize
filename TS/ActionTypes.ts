export interface ClerkUser {
  id: string;
  username?: string;
  firstName: string;
  lastName: string;
  posts: string[];
  following: string[];
  followers: string[];

  profileImageUrl?: string;
}
