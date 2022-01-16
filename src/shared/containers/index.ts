import { container } from 'tsyringe'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/users/repositories/UsersRepository'

import '../../modules/users/providers'
import { IClassesRepository } from '../../modules/classes/repositories/IClassesRepository'
import { ClassesRepository } from '../../modules/classes/repositories/ClassesRepository'
import { ICommentsRepository } from '../../modules/classes/repositories/ICommentsRepository'
import { CommentsRepository } from '../../modules/classes/repositories/CommentsRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IClassesRepository>('ClassesRepository', ClassesRepository)
container.registerSingleton<ICommentsRepository>('CommentsRepository', CommentsRepository)