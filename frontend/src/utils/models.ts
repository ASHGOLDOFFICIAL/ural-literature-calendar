export interface EventModel {
  id: number;
  date: string;
  description: string;
}

export interface ArticleModel {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  date: string;
}

export interface ProfileModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  is_staff: boolean;
  avatar: string;
}
