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

export interface Budget {
  amount: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  endDate: string;
  id: string;
  reminders: boolean;
  startDate: string;
  totalExpense: string;
  userId: number;
}
