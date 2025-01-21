import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GoogleAuth({ isSignIn, role }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await axios.post("https://api.example.com/signin", {
        id_token: idToken,
        role,
      });
      console.log(response.data);

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("user", JSON.stringify(data.user));
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        console.log("Login successful");
        navigate(redirectPath);
      } else {
        throw new Error("Failed to login with Google");
      }
    } catch (error) {
      console.error("Error sending token to backend:", error);
      setErrors("Failed to login. Please try again.");
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const credential = credentialResponse.credential;
          if (credential) {
            try {
              const decoded = jwtDecode(credential);
              console.log(decoded);
              sendTokenToBackend(credential);
            } catch (error) {
              console.error("Error decoding token:", error);
              setErrors("Error processing login. Please try again.");
            }
          } else {
            console.error("No credential returned from Google");
            setErrors("No credential returned. Please try again.");
          }
        }}
        onError={() => {
          console.log("Login Failed");
          setErrors("Login failed. Please try again.");
        }}
        useOneTap
        type="standard"
        theme="filled_blue"
        size="large"
        text={isSignIn ? "signin_with" : "signup_with"}
        shape="rectangular"
        logo_alignment="left"
        width="300px"
      />
      {errors && <span className="error">{errors}</span>}
    </div>
  );
}

export default GoogleAuth;
