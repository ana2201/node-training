const getTest = (req, res) => {
  const id = Number(req.params.testID)

  res.send(`ID ---> ${id}`)
}

export { getTest }
