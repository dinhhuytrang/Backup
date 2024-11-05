import axios from "./customizeAPI"; 

// Sign in 
export const signIn = async (username, password) => {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      });
      return response; 
    } catch (error) {
      console.error('Login API Error:', error); 
      throw error; 
    }
  };
// sign up
  export const signUp = async (username, password, email, confirmpassword) => {
    try {
        const response = await axios.post('/auth/register', {
            username,
            password,
            email,
            confirmpassword, 
        });
        return response.data; 
    } catch (error) {
        console.error('SignUp API Error:', error.response ? error.response.data : error.message);
        throw error; 
    }
};

// fogot pw
  export const forgotPassword = async (email) => {
    try {
        const response = await axios.post('/auth/forgotpw', {
            email,
        });
        return response; 
    } catch (error) {
        console.error('Forgot Password API Error:', error.response? error.response.data : error.message);
        throw error;
    }
};
// verify code 
 // changpw

 export const changePassword = async (resetCode, newPassword, confirmPassword) => {
  try {
    const response = await axios.post('/auth/changepw', {
      resetCode,
      newPassword,
      confirmPassword,
    });
    return response; 
  } catch (error) {
    console.error('Change Password API Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


 