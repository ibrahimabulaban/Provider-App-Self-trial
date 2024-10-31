import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Form, Alert, Button, InputGroup, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthCarousel from '../AuthenticationInner/AuthCarousel';
import logoDark from "../../assets/images/logo-dark.png";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { apiError, registerUser, resetRegisterFlag } from '../../slices/register/thunk';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../App';


const Register = () => {
    document.title = "Register";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passwordShow, setPasswordShow] = useState<any>(false);
    const [timer, setTimer] = useState<number>(0);
    const [loader, setLoader] = useState<boolean>(false);
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const signUp = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log("Email before sign up:", email); // Log email
    console.log("Password before sign up:", password); // Log password
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
         console.log(userCredential)
        }).catch((error) =>{
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);
            console.log("not working");
        })
     }

    const validation: any = useFormik({
        enableReinitialize: true,

        initialValues: {
            email: '',
            username: '',
            password: '',
            phone: '',
            CommercialRegister: null
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Email"),
            username: Yup.string().required("Please Enter Warehouse Name"),
            password: Yup.string().required("Please Enter Password")
                .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character"),
            phone: Yup.string().required("Please Enter Phone Number")
                .matches(/^[0-9]+$/, "Phone number must only contain numbers")
                .min(10, "Phone number must be at least 10 digits"),
                CommercialRegister: Yup.mixed().required("Please upload the Commercial Register")
        }),
        onSubmit: (values: any) => {
            dispatch(registerUser(values));
            setLoader(true);
        }
    });

    const selectAccount = createSelector(
        (state: any) => state.Account,
        (account: any) => ({
            success: account.success,
            error: account.error,
        })
    );

    const { error, success } = useSelector(selectAccount);

    useEffect(() => {
        dispatch(apiError());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => navigate("/login"), 3000);
            setTimer(3);
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag());
        }, 3000);

        setLoader(false);
    }, [dispatch, success, error, navigate]);

    useEffect(() => {
        if (timer) {
            setInterval(() => setTimer(timer - 1), 1000);
        }
    }, [timer]);

    return (
        <React.Fragment>
            <div className="account-pages">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={11}>
                            <div className="auth-full-page-content d-flex min-vh-100 py-sm-5 py-4">
                                <div className="w-100">
                                    <div className="d-flex flex-column h-100 py-0 py-xl-4">
                                        {/* to add a logo in top of the registration form
                                        <div className="text-center mb-5">
                                            <Link to="/">
                                                <span className="logo-lg">
                                                    <img src={logoDark} alt="" height="21" />
                                                </span>
                                            </Link>
                                        </div>*/}

                                        <Card className="my-auto overflow-hidden">
                                            <Row className="g-0">
                                                <Col lg={6}>
                                                    <div className="p-lg-5 p-4">
                                                        <div className="text-center">
                                                            <h5 className="mb-0">Create New Account</h5>
                                                           
                                                        </div>

                                                        <div className="mt-4">
                                                            {success && <Alert variant="success">Redirecting to Login Page in {timer} Seconds</Alert>}
                                                            <Form
                                                                className="needs-validation"
                                                                action="#"
                                                                onSubmit={signUp}
                                                                /*{(e) => {
                                                                    e.preventDefault();
                                                                    validation.handleSubmit();
                                                                    return false;
                                                                }}*/
                                                            >
                                                                {/* Email */}
                                                                <Form.Group className="mb-3" controlId="useremail">
                                                                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control
                                                                        type="email"
                                                                        name='email'
                                                                        className="form-control bg-light border-light"
                                                                        placeholder="Enter email address"
                                                                        onChange={(e) => {
                                                                            validation.handleChange(e);
                                                                            setEmail(e.target.value.trim()); // Ensure no extra spaces
                                                                        }}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.email || ""}
                                                                        isInvalid={validation.touched.email && !!validation.errors.email}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                                                                </Form.Group>

                                                                {/* Username */}
                                                                <Form.Group className="mb-3" controlId="username">
                                                                    <Form.Label>Warehouse Name <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="username"
                                                                        className="form-control bg-light border-light"
                                                                        placeholder="Enter Warehouse Name"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.username || ""}
                                                                        isInvalid={validation.touched.username && !!validation.errors.username}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.username}</Form.Control.Feedback>
                                                                </Form.Group>

                                                                {/* Phone */}
                                                                <Form.Group className="mb-3" controlId="phone">
                                                                    <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="phone"
                                                                        className="form-control bg-light border-light"
                                                                        placeholder="Enter phone number"
                                                                        onChange={validation.handleChange}
                                                                        onBlur={validation.handleBlur}
                                                                        value={validation.values.phone || ""}
                                                                        isInvalid={validation.touched.phone && !!validation.errors.phone}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.phone}</Form.Control.Feedback>
                                                                </Form.Group>

                                                                {/* Password */}
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label htmlFor="password-input">Password <span className="text-danger">*</span></Form.Label>
                                                                    <InputGroup className="position-relative auth-pass-inputgroup">
                                                                        <Form.Control onPaste={(e) => e.preventDefault()} placeholder="Enter password" id="password-input" type={!passwordShow ? "password" : "text"}
                                                                            name="password"
                                                                            onChange={(e) => {
                                                                                validation.handleChange(e);
                                                                                setPassword(e.target.value.trim()); // Ensure no extra spaces
                                                                            }}
                                                                            onBlur={validation.handleBlur}
                                                                            value={password}
                                                                            isInvalid={validation.touched.password && !!validation.errors.password}
                                                                        />
                                                                        <Button variant="link" className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></Button>
                                                                        <Form.Control.Feedback type="invalid">{validation.errors.password}</Form.Control.Feedback>
                                                                    </InputGroup>
                                                                </Form.Group>

                                                                {/* Legal Document Upload */}
                                                                <Form.Group className="mb-3">
                                                                    <Form.Label>Commercial Register <span className="text-danger">*</span></Form.Label>
                                                                    <Form.Control
                                                                        type="file"
                                                                        name="CommercialRegister"
                                                                        accept="application/pdf" // Restricts to PDF files only
                                                                        onChange={(e) => {
                                                                            const file = (e.currentTarget as HTMLInputElement).files?.[0];
                                                                            validation.setFieldValue("CommercialRegister", file);
                                                                        }}
                                                                        onBlur={validation.handleBlur}
                                                                        isInvalid={validation.touched.CommercialRegister && !!validation.errors.CommercialRegister}
                                                                    />
                                                                    {validation.touched.CommercialRegister && validation.errors.CommercialRegister ? (
                                                                        <Form.Control.Feedback type="invalid">{validation.errors.CommercialRegister}</Form.Control.Feedback>
                                                                    ) : null}
                                                                </Form.Group>


                                                                <div className="mt-2">
                                                                    <Button className="btn btn-primary w-100" type="submit">
                                                                        {loader && <Spinner size="sm" animation="border" />}{"  "} Sign Up
                                                                    </Button>
                                                                </div>
                                                                <div className="mt-4 text-center">
                                                                    <p className="mb-0">Already Have an Account ? <Link to="/login" className="fw-medium text-primary text-decoration-underline"> Signin </Link> </p>
                                                                </div>
                                                            </Form>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <AuthCarousel />
                                            </Row>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Register;