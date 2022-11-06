import React from "react";

// material-ui
import {
    Button,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// assets
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import axios from "axios";
import jwt_decode from "jwt-decode";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                        .max(255)
                        .required("Username is required"),
                    password: Yup.string()
                        .max(255)
                        .required("Password is required"),
                })}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                ) => {
                    axios
                        .post("https://localhost:7151/account/Login", values, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        .then(function (response) {
                            setStatus({ submit: "Successfully log in" });
                            setStatus({ success: true });
                            setSubmitting(false);
                            // console.log(response.data);
                            var decode_data = jwt_decode(response.data);
                            if (
                                decode_data[
                                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                                ] === "Admin"
                            ) {
                                console.log("login thanh cong");
                            }
                        })
                        .catch(function (error) {
                            setErrors({
                                submit: "Incorrect Username or Password.",
                            });
                            setStatus({ success: false });
                            setSubmitting(false);
                        });
                }}
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="username-login">
                                        Username
                                    </InputLabel>
                                    <OutlinedInput
                                        id="username-login"
                                        type="text"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        fullWidth
                                        error={Boolean(
                                            touched.username && errors.username
                                        )}
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-username-login"
                                        >
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(
                                            touched.password && errors.password
                                        )}
                                        id="-password-login"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOutlinedIcon />
                                                    ) : (
                                                        <VisibilityOffOutlinedIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText
                                            error
                                            id="standard-weight-helper-text-password-login"
                                        >
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
