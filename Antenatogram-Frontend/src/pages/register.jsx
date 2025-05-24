/* eslint-disable no-useless-escape */
import { useRef, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Joi from "joi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const REGISTER_URL = '/auth/signup';

const emailSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': `"email" should be a type of 'text'`,
            'string.empty': `"email" cannot be an empty field`,
            'string.email': `"email" must be a valid email`,
            'any.required': `"email" is a required field`
        }),
});
const passwordSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+{}|:;"'<>?,.\/\[\]\-\\]).{8,}$/)
        .messages({
            'string.base': `Password should be a type of 'text'`,
            'string.empty': `Password cannot be an empty field`,
            'string.min': `Password should have a minimum length of {#limit}`,
            'string.pattern.base': `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
            'any.required': `Password is a required field`
        })
});

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const { auth, setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdErr, setPwdErr] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setmatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const navigate = useNavigate();
    if(auth.loggedIn) navigate( auth.role == 'patient' ? '/user': '/patients');


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
        const result = emailSchema.validate({ email: email });
        if (result.error) {
            setValidEmail(false);
            setEmailErr(String(result.error).split(':')[1].trim());

        }
        else setValidEmail(true);
    }, [email]);

    useEffect(() => {
        setErrMsg("");
        const result = passwordSchema.validate({ password: pwd });
        if (result.error) {
            setValidPwd(false);
            setPwdErr(String(result.error).split(':')[1].trim());
        }
        else setValidPwd(true);
        const match = pwd == matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL, { "auth": { "role": auth.role }, email, password: pwd }, { withCredentials: true });
            if (response.status == 200) navigate('/login');
        } catch (error) {
            setErrMsg(error.response.data.error);
        }
    }
    return (
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <p ref={errRef} className={errMsg ? "text-red-500 mb-4" : "hidden"} aria-live="assertive">{errMsg}</p>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">Register</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Email:
                                    <FontAwesomeIcon icon={faCheck} className={validEmail && email ? "text-green-500 ml-2" : "hidden"} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hidden" : "text-red-500 ml-2"} />
                                </label>
                                <input
                                    type="email"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                <p id="emailnote" className={emailFocus && email && !validEmail ? "text-sm text-gray-600 mt-2" : "hidden"}>
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    {emailErr}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "text-green-500 ml-2" : "hidden"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hidden" : "text-red-500 ml-2"} />
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "text-sm text-gray-600 mt-2" : "hidden"}>
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    {pwdErr}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="confirm_pwd" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "text-green-500 ml-2" : "hidden"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hidden" : "text-red-500 ml-2"} />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setmatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "text-sm text-gray-600 mt-2" : "hidden"}>
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                                    Must match the first password input field.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={!validEmail || !validPwd || !validMatch}
                                    className={`w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${(!validEmail || !validPwd || !validMatch) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-600 text-black hover:bg-pink-300'}`}
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {`Already have an Account?`}<br />
                                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    <Link to={'/login'}>
                                        Login
                                    </Link>
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Register;


