import * as Yup from "yup";

/* ------------------------
   Helper to generate login
------------------------- */
export function generateUsernameAndPassword(
  firstName: string
): { username: string; password: string } {
  const username = firstName.toLowerCase() + "123";
  const random12DigitNumber = Math.floor(
    100000000000 + Math.random() * 900000000000
  );
  const password = firstName.toLowerCase() + "@" + random12DigitNumber;
  return { username, password };
}

/* ------------------------
   Types
------------------------- */
export interface IStudentPersonalInfo {
  organization_id: number;
  registration_number: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  aadhar_number: string;
  date_of_birth: string;     // ✅ use string for date
  admission_date: string;
  login_info: {
    username: string;
    password: string;
  };
}

export interface IStudentAddressInfo {
  street_address_1: string;
  street_address_2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface IStudentParentInfo {
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  relationship: string;
  login_info?: {
    username: string;
    password: string;
  };
}

export interface IParentsForm {
  parent_id?: string | number;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  email: string;
  relationship: string;
  phone_number: string;
  aadhaar_number?: string;
  status: string;
  login_info: {
    username: string;
    password: string;
  };
  student_mappings: {
    student_id: number;
    relationship_type: string;
    status: string;
  };
}

export interface IFeesInfo {
  fees_structure_id: number;
  created_by: number;
}

export interface ICreateStudent {
  first_name: string;
  last_name: string;
  email: string | undefined;
  date_of_birth: string;            // ✅ now string
  studentId: string | number;
  personal_info: IStudentPersonalInfo;
  address_info: IStudentAddressInfo;
  parent_info: IStudentParentInfo[];
  parentForm: IParentsForm;
  fees_info: IFeesInfo;
}

/* ------------------------
   Validation Schemas
------------------------- */
export const createStudentSchemas = [
  // Step 1: Personal Info
  Yup.object().shape({
    personal_info: Yup.object().shape({
      registration_number: Yup.string().required("Registration Number is required"),
      first_name: Yup.string().required("First Name is required"),
      middle_name: Yup.string().required("Middle Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Wrong email format").required("Email is required"),
      phone_number: Yup.string()
        .required("Phone is required")
        .matches(/^(?:\+91|91)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
      gender: Yup.string().required("Gender is required"),
      aadhar_number: Yup.string()
        .required("Aadhar is required")
        .matches(/^\d{12}$/, "Aadhar must be exactly 12 digits"),
      date_of_birth: Yup.string()
        .required("Date of Birth is required")
        .test("age", "Student must be at least 4 years old", (value) => {
          if (value) {
            const dob = new Date(value);
            const age = new Date().getFullYear() - dob.getFullYear();
            return age >= 4;
          }
          return false;
        }),
      admission_date: Yup.string().required("Admission Date is required"),
    }),
  }),

  // Step 2: Address Info
  Yup.object().shape({
    address_info: Yup.object().shape({
      street_address_1: Yup.string().required("Street address is required"),
      street_address_2: Yup.string().required("Street address 2 is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip_code: Yup.string().required("Zip is required"),
      country: Yup.string().required("Country is required"),
    }),
  }),

  // Step 3: Parent Info
  Yup.object().shape({
    parent_info: Yup.array()
      .of(
        Yup.object().shape({
          first_name: Yup.string().required("Parent first name is required"),
          last_name: Yup.string().required("Parent last name is required"),
          email: Yup.string().email("Invalid email").required("Parent email is required"),
          phone_number: Yup.string()
            .matches(/^(?:\+91|91)?[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
            .required("Parent phone is required"),
          relationship: Yup.string().required("Relationship is required"),
        })
      )
      .min(1, "At least one parent must be added"),
  }),

  // Step 4: Fees Info
  Yup.object().shape({
    fees_info: Yup.object().shape({
      fees_structure_id: Yup.number().required("Fees structure is required"),
    }),
  }),
];

/* ------------------------
   Initial Values
------------------------- */
export const initialParentInfo: IParentsForm = {
  first_name: "",
  middle_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  relationship: "",
  date_of_birth: "",
  gender: "",
  aadhaar_number: "",
  status: "active",
  login_info: {
    username: "",
    password: "",
  },
  student_mappings: {
    student_id: 1,
    relationship_type: "",
    status: "active",
  },
};

export const inits: ICreateStudent = {
  first_name: "",
  last_name: "",
  email: "",
  date_of_birth: "",
  studentId: "",
  personal_info: {
    organization_id: 1,
    registration_number: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    aadhar_number: "",
    date_of_birth: "",
    admission_date: "",
    login_info: { username: "", password: "" },
  },
  address_info: {
    street_address_1: "",
    street_address_2: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  },
  parent_info: [],
  parentForm: initialParentInfo,
  fees_info: {
    fees_structure_id: 0,
    created_by: 1,
  },
};
