const route = import.meta.env.VITE_API_URL;
export const registerUser = async (email) => {
  console.log("email", email);
  try {
    const res = await fetch(`${route}/registerUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[register]: ${error}` };
  }
};
