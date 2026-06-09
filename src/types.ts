export interface Inquiry {
  id: string;
  type: 'course' | 'lecture' | 'profile' | 'corporate';
  name: string;
  phone: string;
  email: string;
  details: string;
  createdAt: string;
}

export interface CardItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
}
