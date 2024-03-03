export interface SignupUserDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export interface LoginUserDetails {
  phoneNumber: string;
  password: string;
  role: string;
  staySignedIn: boolean;
}
