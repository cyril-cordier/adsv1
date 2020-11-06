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
    const response = await fetch(`https://peche-app.firebaseio.com/users.json`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }
    const users = [];

    console.log(responseData);

    for (const key in responseData) {
      const user = {
        id: key,
        username: responseData[key].username,
        phone: responseData[key].phone,
        userId: responseData[key].userId,
        email: responseData[key].email,
      };
      users.push(user);
    }

    context.commit("setUsers", users);
  },
};
