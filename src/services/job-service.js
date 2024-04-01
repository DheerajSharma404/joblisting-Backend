import { StatusCodes } from "http-status-codes";
import { JobRepository } from "../repositories/index.js";

class JobService {
  constructor() {
    this.JobRepository = new JobRepository();
  }

  async createJobPost(data) {
    try {
      const job = await this.JobRepository.create(data);
      return job;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Something went wrorng while create job post.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getJobDetailsById(id) {
    try {
      const job = await this.JobRepository.get(id);
      return job;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Something went worng while getting the job.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getAllJobs(query) {
    try {
      const title = query.title || "";
      const skills = query.skills;
      let filter = {};

      if (title) {
        filter.jobTitle = new RegExp(title, "i");
      }

      if (skills) {
        const filteredSkills = skills.split(",");
        const caseInsensitiveFilteredSkills = filteredSkills.map(
          (skill) => new RegExp(skill, "i")
        );
        filter.skillsRequired = { $in: caseInsensitiveFilteredSkills };
      }

      const jobs = await this.JobRepository.getAll(filter);
      return jobs;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Something went wrong while getting all the jobs.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateJobDetaileById(id, data) {
    try {
      const updatedJob = await this.JobRepository.update(id, data);
      return updatedJob;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Something went wrong while updating the job.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async deleteJobById(id) {
    try {
      const deletedjob = await this.JobRepository.destroy(id);
      return deletedjob;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Something went wrong while deleting job.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export default JobService;
