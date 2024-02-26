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
  try {
    const res = await fetch(`${route}/getEntries/?campus=${campus}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 400, msg: `[getEntries]: ${error}` };
  }
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
