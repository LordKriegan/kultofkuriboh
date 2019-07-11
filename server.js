const app = require("express")()
const PORT = process.env.PORT || 3001

app.listen(PORT, err => {
  if (err) {
    console.error(err)
  }
  console.log(`  >> server listening on port: ${PORT}`)
})
