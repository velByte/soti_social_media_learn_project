import { useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import { settings } from "../../settings.js";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /[a-z]+/,
      "Password must contain minimum of 1 lower case letter [a-z]."
    )
    .matches(
      /[A-Z]+/,
      "Password must contain minimum of 1 upper case letter [A-Z]."
    )
    .matches(
      /[0-9]+/,
      "Password must contain minimum of 1 numeric character [0-9]."
    )
    .matches(
      /[!@#$%^&*\.]+/,
      "Password must contain minimum of minimum of 1 special character [!@#$%^&*]."
    ),
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("No password provided."),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  // We are at the station where we need to determine if the user
  // will register or log in and display accordingly
  // relevant fields
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // // values = {
    // //   email: "test@mail.me",
    // //   password: "Test1234!", --> ! clear text
    // //   firstName: "Test",
    // //   lastName: "Test",
    // //   location: "Test",
    // //   occupation: "Test",
    // // }
    // // this allows us to send form info with image
    // const formData = new FormData();
    // for (let value in values) {
    //   formData.append(value, values[value]);
    // }
    // formData.append("picturePath", values.picture.name);

    // const savedUserRespone = await fetch(
    //   "http://localhost:3001/auth/register",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );
    // const savedUser = await savedUserRespone.json();
    // onSubmitProps.resetForm();

    // if (savedUser) {
    //   setPageType("login");
    // }
    console.log("No new user registration is allowed at this time.");
    console.log("For testing purposes, please use the following credentials:");
    console.log("Email: test@soti.test");
    console.log("Password: passPASS123.");
  };

  const login = async (values, onSubmitProps) => {
    const loggedInUserRespone = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedInUser = await loggedInUserRespone.json();
    onSubmitProps.resetForm();
    if (loggedInUser.user) {
      dispatch(
        setLogin({
          user: loggedInUser.user,
          token: loggedInUser.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repate(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  padding="1rem"
                >
                  {/* TODO: Add extra Delete Icon and the Logic to delete selected icon */}
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <FlexBetween gap="0.25rem">
                        <FlexBetween
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <FlexBetween>
                              <FlexBetween>
                                <Typography>{values.picture.name}</Typography>
                              </FlexBetween>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </FlexBetween>
                        <DeleteOutlined />
                      </FlexBetween>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* TODO: Implement an authentication failure message */}

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                padding: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
