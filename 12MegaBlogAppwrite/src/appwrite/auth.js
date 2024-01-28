import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl) // Your API Endpoint
      .setProject(conf.appWriteProjectID); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //call another method to login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const user = this.account.createEmailSession(email, password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const currrentUser = await this.account.get();
      return currrentUser;
    } catch (error) {
      // throw error
      console.log("Appwrite service :: getCurrentUser::error", error);
    }
    return null;
  }

  async logout() {
    try {
    } catch (error) {
      console.log("Appwrite service :: logout::error", error);
    }
  }
}

const authservice = new AuthService();
export default authservice;
