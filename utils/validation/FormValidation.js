import * as yup from "yup";

const validateLogin = yup.object({
    emailOrUsername: yup
      .string()
      .required("Email or Username is required.")
      .test('email-or-username', 'Invalid Email or Username', function(value) {
        const { path, createError } = this;
        const isEmail = yup.string().email().isValidSync(value);
        const isUsername = yup.string().min(3).isValidSync(value); // Adjust min length as needed
        
        if (isEmail || isUsername) {
          return true;
        }
  
        return createError({ path, message: 'Invalid Email or Username' });
      }),
    password: yup
      .string()
      .required("Password is required.")
      .min(5, "Password must be at least 5 characters"),
  });

const validateRegister = yup.object({
    username: yup
      .string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters.")
      .max(30, "Username cannot exceed 30 characters.")
      .matches(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and dashes."),
    email: yup.string().required("Email is required.").email("Please enter a valid email address."),
    password: yup
      .string()
      .required("Password is required.")
      .min(5, "Password must be at least 5 characters")
      .max(100, "Password cannot exceed 100 characters.")
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])(?=.*[\W_]).{5,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    bio: yup.string().required("Bio is required.").min(10, "Bio must be at least 10 characters."),
    gender: yup.string().required("Gender is required.").oneOf(["male", "female", "other"], "Please select a valid gender."),
    dob: yup.date().required("Date of birth is required.").max(new Date(), "Date of birth cannot be in the future."),
  });
  

export { validateLogin, validateRegister };
