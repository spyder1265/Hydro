import { User } from "@prisma/client";

const getCurrentUser = async () => {
  try {
    const token = await localStorage.getItem("token");
    if (token !== null) {
      const user = await fetch(`http://localhost:3001/users/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData: User = await user.json();
      return userData;
    }
  } catch (error) {
    console.log("Not authorized", error);
  }
};

export default getCurrentUser;
