import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать минимум 8 символов').isLength({min: 8}),
    body('avatarUrl', 'Предоставьте ссылку на аватар').optional().isURL(),
];