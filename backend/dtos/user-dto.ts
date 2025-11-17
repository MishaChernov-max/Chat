export class UserDto {
  _id: string;
  email: string;
  firstName: string;
  surName: string;
  isActivated: boolean;
  avatar?: string;
  constructor(model: any) {
    this._id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated;
    this.firstName = model.firstName;
    this.surName = model.surName;
    this.avatar = model.avatar;
  }
}
