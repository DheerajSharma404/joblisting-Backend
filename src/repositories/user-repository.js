import User from "../models/user-model.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    const response = await User.findOne({ email: email });
    return response;
  }
}

export default UserRepository;
