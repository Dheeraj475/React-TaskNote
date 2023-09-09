import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Authcomp = () => {
  // This is a state for showing the animation for singin and singup
  const [isSignIn, setIsSignIn] = useState(true);

  // Toasting the notification with the various task had done
  const notifyLogin = () => toast.success("Logged in successfully");
  const notifySignup = () => toast.success("Account created successfully");
  const notifyError = () => toast.error("Invalid credentials");
  const notifyErrorPassword = () => toast.error("Password do not match!");
 

  // Toggle between sign-in and sign-up modes
  const toggle = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };

  useEffect(() => {
    const container = document.getElementById('container');

    // Add 'sign-in' class after 200 milliseconds
    const timeoutId = setTimeout(() => {
      container.classList.add('sign-in');
    }, 200);

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  // Update the classList based on the state change
  useEffect(() => {
    const container = document.getElementById('container');
    if (isSignIn) {
      container.classList.remove('sign-up');
      container.classList.add('sign-in');
      setPassword("");
      setcPassword("");
    } else {
      container.classList.remove('sign-in');
      container.classList.add('sign-up');
      setlPassword("");
      setlemail("");
      setusername("");
      setemail("");
    }
  }, [isSignIn]);

  // Signup password, and this is all states has it
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  // Making the password visibility when the users clicks on eye icon
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglecPasswordVisibility = () => {
    setShowcPassword(!showcPassword);
  };

  // Setting the variable that is redirects to the specified pathname
  let navGate = useNavigate();

// Signup, creating the user name email and password through the api call request post
  const handlesubmit= async (e)=> {
    e.preventDefault();
 
    if (password === cpassword){
    const response = await fetch("http://localhost:5000/api/auth/createuser" , {
     method: "post",
     headers: {
       'Content-Type':'application/json',
     },
     body:JSON.stringify({name:username,email:email, password:password})
   });
   const json = await response.json()
  //  console.log(json)

   if (json.success){
     localStorage.setItem("token",json.authtoken)
     notifySignup();
     navGate("/");
     
    } else{
      // Alert invalid creditionals
      notifyError();
    }
  } else {
    notifyErrorPassword();
 }
}


    // Login password
    const[lemail,setlemail] = useState("")
    const [showlPassword, setShowlPassword] = useState(false);
    const [lpassword, setlPassword] = useState("");
  
    const togglelPasswordVisibility = () => {
      setShowlPassword(!showlPassword);
    };


    const handleLsubmit= async (e)=> {
     e.preventDefault();
  
     const response = await fetch("http://localhost:5000/api/auth/login" , {
      method: "post",
      headers: {
        'Content-Type':'application/json',
      },
      body:JSON.stringify({email:lemail, password:lpassword})
    });
    const json = await response.json()
    // console.log(json)

    if (json.success){
      // Save the authtoken and redirect
      localStorage.setItem("token",json.authtoken)
      notifyLogin();
      navGate("/");

    } else{
      // Alert invalid creditionals
      notifyError();
    }
  
  }

  return (
    <>
    <div id="container" className="containerAuth">
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
            <form onSubmit={handlesubmit}>
              <h2>Sign up</h2>
              <div className="input-group">
              <i className="fa-solid fa-user" style={{color:"#bb00ff"}}></i>
                <input type="text" name="username" value={username} minLength={3} placeholder="Username" onChange={(e) => setusername(e.target.value)} required/>
              </div>
              <div className="input-group">
              <i className="fa-solid fa-envelope" style={{color:"#bb00ff"}}></i>
                <input type="email" name="email" value={email} placeholder="Email" onChange={(e) => setemail(e.target.value)} required/>
              </div>
              <div className="input-group">
              <i className="fa-solid fa-key" style={{color:"#bb00ff"}}></i>
                <input type={showPassword ? "text" : "password"}name="Spassword" value={password} minLength={5} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>

                <span className="password-toggle" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <i className="fa-solid fa-eye" style={{color:"#bb00ff"}}></i>
                ) : (
                    <i className="fa-solid fa-eye-slash" style={{color:"#bb00ff"}}></i>
                )}
               </span>

              </div>
              <div className="input-group">
              <i className="fa-solid fa-key" style={{color:"#bb00ff"}}></i>
                <input type={showcPassword ? "text" : "password"}  minLength={5} value={cpassword} name="Scpassword" onChange={(e) => setcPassword(e.target.value)} placeholder="Confirm password" required/>

                <span className="password-toggle" onClick={togglecPasswordVisibility}>
                  {showcPassword ? (
                    <i className="fa-solid fa-eye" style={{color:"#bb00ff"}}></i>
                ) : (
                    <i className="fa-solid fa-eye-slash" style={{color:"#bb00ff"}}></i>
                )}
               </span>

              </div>
              <button> Sign up </button>
              <p>
                <span> Already have an account? </span>
                <b className="pointer" onClick={toggle}>Sign in here </b>
              </p>
            </form>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}

        
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            
            <div className="form sign-in">   
            <form onSubmit={handleLsubmit}>
              <h2>Login</h2>
              <div className="input-group">
              <i className="fa-solid fa-envelope" style={{color:"#bb00ff"}}></i>
                <input type="email" name="Lemail" value={lemail} placeholder="Email" onChange={(e) => setlemail(e.target.value)} required/>
              </div>
              <div className="input-group">
                <i className="fa-solid fa-key" style={{color:"#bb00ff"}}></i>
                <input type={showlPassword ? "text" : "password"} value={lpassword} name="Lpassword" placeholder="Password" minLength={5}  onChange={(e) => setlPassword(e.target.value)} required/>
                <span className="password-toggle" onClick={togglelPasswordVisibility}>
                  {showlPassword ? (
                    <i className="fa-solid fa-eye" style={{color:"#bb00ff"}}></i>
                ) : (
                    <i className="fa-solid fa-eye-slash" style={{color:"#bb00ff"}}></i>
                )}
               </span>

              </div>
              <button>Login</button>


              <p>
                <span> Don't have an account?</span>
                <b className="pointer" onClick={toggle}> Sign up here</b>
              </p>
            </form>
            </div>
          </div>
        

          <div className="form-wrapper">

          </div>
        </div>
        
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome to TodoNote</h2>
          </div>
          <div className="img sign-in">
          </div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up">

          </div>
          <div className="text sign-up">
            <h2>Join TodoNote</h2>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Authcomp;
