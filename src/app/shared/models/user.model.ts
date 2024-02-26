export class UserModel {
  constructor(
    public email: string,
    public passvord: string,
    public name: string,
    public id?: number,
  ) {

  }
}
