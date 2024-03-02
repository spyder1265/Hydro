const AuthUserByJWT = async () => {
  try {
    const token = await localStorage.getItem("token");
    if (token !== null) {
      const user = await fetch(`http://localhost:3001/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await user.json();
      return userData;
    }
  } catch (error) {
    console.log("Error getting user by JWT", error);
  }
};

export default AuthUserByJWT;
