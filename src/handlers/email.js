const route = import.meta.env.VITE_API_URL;
export const registerUser = async (email) => {
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
    return { status: 400, msg: `[registerUser]: ${error}` };
  }
};
export const getEntryInfo = async (code) => {
  try {
    const res = await fetch(`${route}/getEntryInfo?code=${code}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[getEntryInfo]: ${error}` };
  }
};
