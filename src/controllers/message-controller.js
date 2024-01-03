const getMessage = (req, res) => {
  res.send(`Hello ${req.query.message}`)
}

export { getMessage }
