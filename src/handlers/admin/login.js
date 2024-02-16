export const login = (form) => {
  const { username, password, campus } = form;
  if (username === "admin" && password === "admission2024") {
    return {
      status: 200,
      data: {
        campus: campus,
      },
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
