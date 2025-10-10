export class UserDto {
  email: string;
  _id: string;
  isActivated: boolean;
  constructor(model: any) {
    this.email = model.email;
    this._id = model._id;
    this.isActivated = model.isActivated;
  }
}
