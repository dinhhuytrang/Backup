import axios from "./customizeAPI"; 

// Sign in 
export const signIn = async (username, password) => {
    try {
      const response = await axios.post('/users', {
        username,
        password,
      });
      return response; 
    } catch (error) {
      console.error('Login API Error:', error); 
      throw error; 
    }
  };