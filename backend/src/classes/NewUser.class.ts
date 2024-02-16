export class NewUser {
  email: string;
  lastName: string;
  name: string;
  password: string;
  constructor(email: string, name: string, password: string, lastName: string) {
    this.email = email;
    this.lastName = lastName;
    this.name = name;
    this.password = password;
  }
}
