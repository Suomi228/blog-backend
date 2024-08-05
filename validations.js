import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min: 8}),
    body('avatarUrl', 'Предоставьте ссылку на аватар').optional().isURL(),
];
export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min: 8}),
];
export const articleCreateValidation = [
    body('title', 'Введите название статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Укажите массив тэгов').optional().isArray(),
    body('imageUrl', 'Предоставьте ссылку на картинку').optional().isURL(),
];