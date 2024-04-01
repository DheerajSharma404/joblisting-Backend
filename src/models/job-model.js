import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLogoUrl: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
    information: {
      type: String,
    },
    jobStatus: {
      type: String,
      required: true,
    },
    
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    jobLocationType: {
      type: String,
      required: true,
    },
    jobDuration: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    educationRequirement: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
