import { Router } from "express";
import { classesRoutes } from "./modules/classes/routes/classes.routes";
import { usersRoutes } from "./modules/users/routes/users.routes";

export const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/classes', classesRoutes)