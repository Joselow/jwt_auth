import { error } from '../utils/responses'

export const manageErrors = (err, req, res, next) => {
  console.log('Error atrapado correctamente')
  const { statusCode = 500, message, errors = null } = err
  error(res, statusCode, message, errors)
}
