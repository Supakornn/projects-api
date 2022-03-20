const getAllProjects = async (req, res) => {
  res.send("getAll");
};

const getProject = async (req, res) => {
  res.send("getOne ");
};

const createProject = async (req, res) => {
  res.json(req.user);
};

const updateProject = async (req, res) => {
  res.send("update ");
};

const deleteProject = async (req, res) => {
  res.send("delete");
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
