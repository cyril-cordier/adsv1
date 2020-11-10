export default {
  // creer une user
  async createUser(context, payload) {
    const adData = {
      username: payload.username,
      phone: payload.phone,
      userId: payload.userId,
      email: payload.email,
    };

    const response = await fetch(
      `https://peche-app.firebaseio.com/users.json`,
      {
        method: "POST",
        body: JSON.stringify(adData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to send request."
      );
      throw error;
    }

    context.commit("createUser", adData);
  },
  async loadUsers(context) {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    const response = await fetch(`http://localhost:1337/users/me`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    context.commit("setUsers", responseData);
  },
};
