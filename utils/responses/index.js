export const success = (res, status, data) => {
  res.status(status).json({
    success: true,
    data
  })
}

export const error = (res, status, message, errors) => {
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal Server Error' : message,
    ...(errors && { errors })
  })
}
