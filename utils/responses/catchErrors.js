export const catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res).catch((err) => {
      console.error(err)
      next(err)
    })
  }
}
