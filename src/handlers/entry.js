const route = import.meta.env.VITE_API_URL;
export const submitEntry = async (formData) => {
  try {
    const res = await fetch(`${route}/submitEntry`, {
      method: "POST",
      body: formData,
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[submitEntry]: ${error}` };
  }
};

export const getEntries = async (campus) => {
  // const sessionID = checkCookie('session_id');
  // const campus = checkCookie('session_campus');

  // if(sessionID !== null && campus !== null) {
  //   try {
  //     const res = await fetch(`${route}/getEntries/?campus=${campus}`);
  //     return await res.json();
  //   } catch (error) {
  //     console.error(error);
  //     return { status: 400, msg: `[getEntries]: ${error}` };
  //   }
  // }
  try {
    const res = await fetch(`${route}/getEntries/?campus=${campus}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[getEntries]: ${error}` };
  }
};

const checkCookie = (cookieName) => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());

  for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
          return decodeURIComponent(value);
      }
  }

  return null;
};

export const editEntry = async (body) => {
  try {
    const res = await fetch(`${route}/editEntry`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[editEntry]: ${error}` };
  }
};

export const addWalkInEntry = async (body) => {
  try {
    const res = await fetch(`${route}/addWalkInEntry`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[addWalkInEntry]: ${error}` };
  }
};

export const getTotalEmails = async (body) => {
  try {
    const res = await fetch(`${route}/getTotalEmails`);
    return await res.json();
  } catch (error) {}
};
