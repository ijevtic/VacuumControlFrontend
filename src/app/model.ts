export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}

export class PostClass {
  constructor(public userId: number,
              public id: number,
              public title: string,
              public body: string) {
  }

  getTitle(){
    return this.title.toUpperCase();
  }
}

export interface Comment {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

export class User {
  constructor(public firstName: string,
              public lastName: string,
              public email: string,
              public username: string,
              public permissions: string[]) {
  }
}

export class EditUser {
  constructor(public firstName: string,
              public lastName: string,
              public password: string,
              public createP: boolean,
              public updateP: boolean,
              public readP: boolean,
              public deleteP: boolean,
              public email: string,
              public username: string) {
  }

}

export class AddUserRequest {
  constructor(public firstName: string,
    public lastName: string,
    public password: string,
    public permissions: string[],
    public email: string,
    public username: string) {
}
}

export interface EditUserRequest {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  username: string,
  permissions: string[]
}

export interface UsersResponse {
  users: User[]
}