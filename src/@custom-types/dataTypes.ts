export type Card = {
  column: string;
  title: string;
  users?: string[];
  comments: any[] | [];
  labels: Array<{ body: string; color: string }> | [];
  attachments: Array<{ fileName: string }> | [];
  description?: string;
  _id: string;
};

export type Column = {
  board: string;
  title: string;
  cards: Card[];
  _id: string;
};

export type Board = {
  title: string;
  columns: Column[];
  admins: string[];
  users: User[];
  _id: string;
};

export type User = {
  name: string;
  email: string;
  picture: string;
  _id: string;
};
