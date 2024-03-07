const AuthUserByJWT = async (token: string) => {
  try {
    if (token !== null) {
      const user = await fetch(`http://localhost:3001/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (user.ok) {
        const userData = await user.json();
        return userData;
      } else {
        localStorage.removeItem("token");
        return null;
      }
    }
  } catch (error) {
    console.log("Error getting user by JWT", error);
  }
};

export default AuthUserByJWT;
