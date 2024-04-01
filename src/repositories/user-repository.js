import User from "../models/user-model.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(data) {
    try {
      const response = await User.findOne({ email: data });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserRepository;
