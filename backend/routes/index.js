var express = require('express'); // notByMe
var router = express.Router(); // notByMe
const { signUp, login, createProject, saveProject, getProjects, getProject, deleteProject, editProject,sendMessage} = require('../controllers/userController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/signUp", signUp);
router.post("/login", login);
router.post("/createProject",createProject);
router.post("/saveProject", saveProject); 
router.post("/getProjects", getProjects); 
router.post("/getProject", getProject); 
router.post("/deleteProject", deleteProject); 
router.post("/editProject", editProject); 
router.post("/getUserName", editProject); 
router.post("/sendMessage",sendMessage )
module.exports = router;
