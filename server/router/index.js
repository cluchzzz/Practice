import {Router} from "express";
import {body} from "express-validator";
import multer from "multer";
import * as path from "path";
import AuthMiddleware from "../middlewares/auth-middleware.js";
import RoleMiddleware from "../middlewares/role-middleware.js";
import UserController from '../controllers/user-controller.js'
import AuthController from "../controllers/auth-controller.js";
import WorkController from "../controllers/work-controller.js";
import FileController from "../controllers/file-controller.js";

const router = new Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


// Auth

router.post('/registration', body('email').isEmail(), body('username').matches(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i), body('password').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.post('/forgotPassword', AuthController.forgotPassword)
router.patch('/recovery/:link', body('password').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), AuthController.recoveryPassword)
router.get('/activate/:link', AuthController.activate)
router.get('/refresh', AuthController.refresh)

//admin settings

router.get('/users', AuthMiddleware, RoleMiddleware, UserController.getUsers)

//user settings

router.patch('/changeEmail', AuthMiddleware, body('email').isEmail(), UserController.changeEmail)
router.patch('/changeUsername', AuthMiddleware, body('username').matches(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i), UserController.changeUsername)
router.patch('/changePassword', AuthMiddleware, body('newPassword').matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), UserController.changePassword)
router.get('/user', AuthMiddleware, UserController.getUser)
router.patch('/user', AuthMiddleware, body('email').isEmail(), body('username').matches(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i), UserController.editUser)
router.delete('/user', AuthMiddleware, RoleMiddleware, UserController.deleteUser)

//works

router.post('/work', AuthMiddleware, WorkController.addWork)
router.get('/work', WorkController.getWork)
router.get('/works', AuthMiddleware, WorkController.getAllWorks)
router.patch('/work', AuthMiddleware, upload.single('file'), WorkController.editWork)
router.delete('/work', AuthMiddleware, RoleMiddleware, WorkController.deleteWork)

// download file

router.get('/file', FileController.Download)


export default router