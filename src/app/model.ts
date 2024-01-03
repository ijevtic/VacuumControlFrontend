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

export class Vacuum {
  constructor(public name: string,
              public status: string,
              public dateCreated: number) {
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
              public readVP: boolean,
              public addVP: boolean,
              public removeVP: boolean,
              public startVP: boolean,
              public stopVP: boolean,
              public dischargeVP: boolean,
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

export interface ErrorResponse {
  message: string
  dateCreated: number,
  vacuumName: string
}

export interface UsersResponse {
  users: User[]
}

export interface VacuumResponse {
  vacuums: Vacuum[]
}

export interface ErrorsResponse {
  errors: ErrorResponse[]
}

export interface SearchRequest {
  name?: string;
  status?: string[];
  dateFrom?: number;
  dateTo?: number;
}

export interface AddVacuumRequest {
  name: string
}

export interface ScheduleRequest {
  vacuumName: string,
  time: number,
}