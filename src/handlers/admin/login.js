export const login = (form) => {
  const { username, password, campus } = form;
  if (username === "admin" && password === "admin_admission") {
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
