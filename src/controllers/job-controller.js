import { StatusCodes } from "http-status-codes";
import { JobService } from "../services/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const jobService = new JobService();
const createJobPost = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.userId;
    const job = await jobService.createJobPost(data);
    SuccessResponse.message = "Job Successfully Created";
    SuccessResponse.data = job;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getJobDetailsById = async (req, res) => {
  try {
    const job = await jobService.getJobDetailsById(req.params.jobId);
    SuccessResponse.message = "Successfully fetched the job.";
    SuccessResponse.data = job;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs(req.query);
    SuccessResponse.message = "Successfully fetched all the jobs.";
    SuccessResponse.data = jobs;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.status).json(ErrorResponse);
  }
};

const updateJobDetaileById = async (req, res) => {
  try {
    const updatedJob = await jobService.updateJobDetaileById(
      req.params.jobId,
      req.body
    );
    SuccessResponse.message = "Sucessfully updated the job.";
    SuccessResponse.data = updatedJob;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

const deleteJobById = async (req, res) => {
  try {
    const deletedJob = await jobService.deleteJobById(req.params.jobId);
    SuccessResponse.message = "Successfully deleted the job.";
    SuccessResponse.data = deletedJob;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
};

export default {
  createJobPost,
  getJobDetailsById,
  getAllJobs,
  updateJobDetaileById,
  deleteJobById,
};
