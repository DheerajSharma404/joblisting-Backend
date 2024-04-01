import Job from "../models/job-model.js";
import CrudRepository from "./crud-repository.js";

class JobRepository extends CrudRepository {
  constructor() {
    super(Job);
  }
  async getAll(filter) {
    console.log(filter);
    try {
      const jobs = await Job.find(filter);
      return jobs;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default JobRepository;
