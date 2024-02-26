// Generic interface for API response
export interface ResponseType1<T> {
  status: number;
  data: T; // Use a specific type (T) for the data property
  // error: string | null | unknown; // Use a specific type (E) for the error property
}

export type login = {
  email: string;
  password: string;
};

export type register = {
  email: string;
  password: string;
  confirmPassword: string;
};

// Generic interface for API response
export interface ResponseType<T> {
  status: number;
  data: T | null; // Use a specific type (T) for the data property
  error: string | null | unknown; // Use a specific type (E) for the error property
}

export interface profileData {
  firstName: string;
  lastName: string;
  role: string;
  companyName: string;
  designation: string;
}
