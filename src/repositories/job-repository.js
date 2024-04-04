import Job from "../models/job-model.js";
import CrudRepository from "./crud-repository.js";

class JobRepository extends CrudRepository {
  constructor() {
    super(Job);
  }
  async getAll(filter) {
    const jobs = await Job.find(filter);
    return jobs;
  }
}

export default JobRepository;
