export const login = async (form) => {
  const { username, password, campus } = form;
  const isAuthenticated = await authenticate(username, password) ;
  const checkUser = isAuthenticated.status === 200 ? true : false;
  console.log(checkUser);
  if(checkUser) {
    // Example usage:
    const uuid = setCookieWithUUID('session_id', campus, 1); // Set a cookie named 'session_id' with UUID value, expires in 1 day
    console.log('Generated UUID and set as cookie:', uuid);
    return {
      status: 200,
      data: {
        campus
      }
    };
  } else {
    return {
      status: 401,
      data: {
        message: "Invalid credentials",
      },
    };
  }
};

// Function to authenticate user (replace this with your own authentication logic)
const authenticate = async (username, password) => {
  try {
    // Check if the current environment supports HTTPS
    if (!window.isSecureContext) {
      throw new Error('This environment does not support secure HTTPS connections.');
    }

    // Make the GET request
    const response =await fetch(`${import.meta.env.VITE_API_URL}/loginUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      // Optionally, set credentials: 'include' if you need to send cookies or authentication tokens
      // credentials: 'include',
    });
    
    const data = await response.json();
    console.log('Data:', data);
    return data;

  } catch (error) {
    // Handle any errors that occur during the request or parsing the response
    console.error('Error:', error.message);
  }
}
const generateUUID = () => {
  // Generate a random hexadecimal string of length 8
  const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
  };

  // Return a UUID string
  return (
      s4() + s4() + '-' +
      s4() + '-' +
      s4() + '-' +
      s4() + '-' +
      s4() + s4() + s4()
  );
};

const setCookieWithUUID = (name, campus, days) => {
  const uuid = generateUUID(); // Generate a UUID
  let expires = '';
  if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = 'expires=' + date.toUTCString();
  }
  document.cookie = `${name}=${uuid}; ${expires}; path=/admin`;
  document.cookie = `session_campus=${campus}; ${expires}; path=/admin`;
  return `${uuid} - Campus: ${campus}`; // Return the generated UUID
};