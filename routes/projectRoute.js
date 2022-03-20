const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/proejctController");

router.route("/").get(getAllProjects);
router.route("/find/:projectId").get(getProject);
router.route("/create").post(createProject);
router.route("/update/:projectId").patch(updateProject);
router.route("/delete/:projectId").delete(deleteProject);

module.exports = router;
