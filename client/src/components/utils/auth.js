import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();

    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  }

  handleError(error) {
    const err = error.message;
    console.error(err);
    if (err === "No user found") {
      alert("User does not exist");
    } else if (err === "Incorrect password") {
      alert("Invalid password");
    } else if (err.substring(0, 6) === "E11000") {
      alert("User already exists with that email or username");
    } else {
      alert("An error occurred");
    }
  }
}

export default new AuthService();
