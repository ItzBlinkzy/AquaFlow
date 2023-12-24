import { Action } from "easy-peasy";

export interface FormData {
  name: string;
  age: string;
  workshopType: string;
  workshopDate: Date;
  bookingId?: string;
}
export type UserData = {
  name: string;
  bookingId: string;
  workshopType: string;
  workshopDate: Date;
  age: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface Package {
  name: string;
  description: string;
  price: string;
  features: string[];
}
export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
}
export interface StoreModel {
  user: UserInfo | null;
  profileModal: boolean;
  setUser: Action<StoreModel, UserInfo | null>;
  setProfileModal: Action<StoreModel, boolean>;
}

export interface ContactData {
  email: string;
  subject: string;
  message: string;
}
