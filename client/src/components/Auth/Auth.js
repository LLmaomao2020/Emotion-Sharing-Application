import React, { useState,useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container, } from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signin,signup} from '../../actions/auth';
import jwt_decode from "jwt-decode";


const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const navigate =useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch();
  
  
  const handleShowPassword = () =>
    setShowPassword((preShowPassword) => !preShowPassword);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,navigate))
        }
        else{
            dispatch(signin(formData,navigate))
        }
  };
  const handleChange = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value})
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

//   const googleSuccess=async (res)=>{
//       const result=res?.profileObj;
//       const token=res?.tokenId;
//       try{
//         dispatch({type:'AUTH',data:{result,token}})
//         navigate('/');
//       }
//       catch(error){

//       }
//   }
//   const googleFailure=(error)=>{
//       console.log(error)
//       console.log("Google signed in was unsuccessful. Try again later!")
//   }

  
  const googleResponse=(response)=>{
      const token=response.credential
      const result=jwt_decode(response.credential);
      console.log(result);
    //   console.log(user);
    //   console.log(user.name);
    //   const token=user.token;
    //   const result=user.result;
    //   console.log("token"+token);
      try{
        dispatch({type:'AUTH',data:{result,token}})
        navigate('/');
      }
      catch(error){
       console.log(error);
      }

  }

 
  useEffect(()=>{
      /* global google*/ 
      google.accounts.id.initialize({
          client_id:"860521400580-8ghvilg29at6c1bu1mnfocgch1c96c0o.apps.googleusercontent.com",
          callback:googleResponse,
          cookiepolicy: 'single_host_origin',
      });
      google.accounts.id.renderButton(
          document.getElementById('signin'),
          {theme:"outline",size:"large",class:"g-signin2"}
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Container component={"main"} maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input name="lastName" label="Last Name" handleChange={handleChange} autoFocus half /> </> )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
         <Grid container justifyContent="center">
         <div id="signin"  className={classes.googleButton}> </div>
         </Grid>
          
              
         
          
           
        
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
