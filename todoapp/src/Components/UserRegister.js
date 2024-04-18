import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [load, setLoad] = useState(false);

  const nav = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    setLoad(true);

    // Simulating Register process
    setTimeout(() => {
      setLoad(false);
      // Simulated Register success
      simulateRegisterSuccess();
    }, 2000);
  };

  const simulateRegisterSuccess = () => {
    // Simulated Register success
    toast.success('Register successful!');
    // Navigate to Home page on successful Register
    nav('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const obj = {
    display: 'block',
    margin: '0 auto',
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                      <img src="assets/img/logo1.png" alt="" />
                      <span className="d-none d-lg-block">To Do App</span>
                    </a>
                  </div>

                  <PacmanLoader color="blue" size={40} cssOverride={obj} loading={load} />
                  <section className={load === true ? 'd-none' : 'my-5'}>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">Register to Your Account</h5>
                          <p className="text-center small">Enter your username &amp; password to register</p>
                        </div>
                        <form className="row g-3 needs-validation" noValidate>
                          <div className="col-12">
                            <label htmlFor="yourName" className="form-label">
                              Name
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type="text"
                                name="name"
                                className="form-control"
                                id="yourName"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <div className="invalid-feedback">Please enter your name.</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="yourEmail" className="form-label">
                              Email
                            </label>
                            <div className="input-group has-validation">
                              <span className="input-group-text" id="inputGroupPrepend">
                                @
                              </span>
                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                id="yourEmail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <div className="invalid-feedback">Please enter your email.</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <label htmlFor="yourPassword" className="form-label">
                              Password
                            </label>
                            <div className="input-group has-validation">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="form-control"
                                id="yourPassword"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                              >
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                              </button>
                              <div className="invalid-feedback">Please enter your password!</div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="remember"
                                defaultValue="true"
                                id="rememberMe"
                              />
                              <label className="form-check-label" htmlFor="rememberMe">
                                Remember me
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="btn btn-primary w-100" type="submit" onClick={handleForm}>
                              Register
                            </button>
                          </div>
                          <div className="col-12">
                            <p className="small mb-0">
                              Already have an account? <a href="/">Log in</a>
                            </p>
                          </div>
                        </form>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
