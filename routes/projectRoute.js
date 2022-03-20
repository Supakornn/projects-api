const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/proejctController");

router.route("/getProjects").get(getAllProjects);
router.route("/getProject/:id").get(getProject);
router.route("/createProject").post(createProject);
router.route("/updateProject").patch(updateProject);
router.route("/deleteProject").delete(deleteProject);

module.exports = router;
