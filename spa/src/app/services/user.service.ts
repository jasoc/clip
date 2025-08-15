import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';

interface RegisterModelPost {
  username: string;
  password: string;
  email: string;
  name: string;
  surname: string;
}

interface UserModel {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  avatar?: string | null; // base64
}

interface UserUpdateModel {
  email?: string;
  name?: string;
  surname?: string;
}

interface TokenModel {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService extends BackendService {
  public loggedOnUser: UserModel | null = null;
  public currentUserAvatarUrl: string | null = null;

  async RegisterUser(userInfo: RegisterModelPost): Promise<boolean> {
    const res = await this.post('/auth/register', userInfo);
    if (res.status === 201) {
      return await this.LoginUser(userInfo.username, userInfo.password);
    }
    return false;
  }

  userLogged(): boolean {
    return this.cookieService.get('token') !== '';
  }

  async LoginUser(username: string, password: string): Promise<boolean> {
    const res = await this.post<TokenModel>('/auth', {
      username: username,
      password: password,
    });
    if (res.status !== 200) {
      return false;
    }
    this.cookieService.set('token', res.body!.data.access_token);
    this.init();
    return true;
  }

  async init(): Promise<void> {
    this.loggedOnUser = await this.getMe();
    const avatar = await this.GetUserAvatar(this.loggedOnUser.id);
    this.currentUserAvatarUrl = avatar ? `data:image/*;base64,${avatar}` : null;
  }

  async getMe(): Promise<UserModel> {
    const res = await this.get<UserModel>('/users/me');
    return res.body!.data;
  }

  async GetUsers(skip: number = 0, limit: number = 100): Promise<UserModel[]> {
    const res = await this.get<UserModel[]>('/users/', {
      skip,
      limit,
    });
    return res.body!.data;
  }

  async GetUser(userId: string): Promise<UserModel> {
    const res = await this.get<UserModel>('/users/' + userId);
    return res.body!.data;
  }

  async UpdateUser(userId: string, userInfo: UserUpdateModel): Promise<UserModel> {
    const res = await this.put<UserModel>('/users/' + userId, userInfo);
    return res.body!.data;
  }

  async UploadAvatar(userId: string, file: File): Promise<UserModel> {
    const form = new FormData();
    form.append('file', file);
    const res = await this.put<UserModel>('/users/' + userId + '/avatar', form);
    return res.body!.data;
  }

  async GetUserAvatar(userId: string): Promise<string | null> {
    const res = await this.get<{ avatar: string }>('/users/' + userId + '/avatar');
    return res.body!.data?.avatar ?? null;
  }

  async DeleteUser(userId: string): Promise<void> {
    await this.delete('/users/' + userId);
  }
}
