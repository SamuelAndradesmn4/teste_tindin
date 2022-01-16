import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { CreateClassController } from "../useCases/createClass/CreateClassController";
import { CreateCommentController } from "../useCases/createComment/CreateCommentController";
import { DeleteClassController } from "../useCases/deleteClass/DeleteClassController";
import { DeleteCommentController } from "../useCases/deleteComment/DeleteCommentController";
import { ListAllClassesController } from "../useCases/listAllClasses/ListAllClassesController";
import { ListAllCommentsController } from "../useCases/listAllComments/ListAllCommentsController";
import { ShowClassController } from "../useCases/showClass/ShowClassController";
import { UpdateClassController } from "../useCases/updateClass/UpdateClassController";

export const classesRoutes = Router()

classesRoutes.use(ensureAuthenticated)

classesRoutes.post('/comments', new CreateCommentController().handle)
classesRoutes.get('/comments', new ListAllCommentsController().handle)
classesRoutes.delete('/comments/:id', new DeleteCommentController().handle)

classesRoutes.post('/', new CreateClassController().handle)
classesRoutes.get('/', new ListAllClassesController().handle)
classesRoutes.get('/:id', new ShowClassController().handle)
classesRoutes.put('/:id', new UpdateClassController().handle)
classesRoutes.delete('/:id', new DeleteClassController().handle)