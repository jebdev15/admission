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
