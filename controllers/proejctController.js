const Project = require("../models/projectmodel");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const getAllProjects = async (req, res) => {
  const project = await Project.find({ dev: req.user.userId }).sort("createAt");
  res.status(StatusCodes.OK).json({ count: project.length, project });
};

const getProject = async (req, res) => {
  const {
    user: { userId },
    params: { projectId }
  } = req;
  const project = await Project.findOne({ _id: projectId, dev: userId });

  if (!project) {
    throw new NotFoundError(`No project with ${projectId}`);
  }
  res.status(StatusCodes.OK).json({ project });
};

const createProject = async (req, res) => {
  req.body.dev = req.user.userId;
  const project = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ project });
};

const updateProject = async (req, res) => {
  const {
    body: { name, repo, status, dev },
    user: { userId },
    params: { projectId }
  } = req;

  if (name === "" || repo === "" || status === "" || dev === "") {
    throw new BadRequestError("Cannot be empty");
  }
  const project = await Project.findByIdAndUpdate({ _id: projectId, dev: userId }, req.body, {
    new: true,
    runValidators: true
  });

  if (!project) {
    throw new BadRequestError(`No project with ${projectId}`);
  }
  res.status(StatusCodes.OK).json({ project });
};

const deleteProject = async (req, res) => {
  const {
    body: { name, repo, status, dev },
    user: { userId },
    params: { projectId }
  } = req;

  const project = await Project.findByIdAndRemove({ _id: projectId, dev: userId });

  if (!project) {
    throw new NotFoundError(`No project with ${projectId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
