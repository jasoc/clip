export interface RegisterModelPost {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}

export interface UserModel {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  avatar?: string | null; // base64
}

export interface UserUpdateModel {
  email?: string;
  name?: string;
  surname?: string;
}

export interface TokenModel {
  access_token: string;
  token_type: string;
}
