const express = require ("express")
const app = new express()
const fetch = require ("node-fetch")

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))

const renderMenu = (currentPage) => {
  const selectedStyle = "color: pink;"
 
  return `
    <ul>
      <li><a href="/" style="${currentPage === "home" ? selectedStyle : ""}">Home</a></li>
      <li><a href="/stati" style="${currentPage === "stati" ? selectedStyle : ""}">Stati</a></li>
    </ul>
  `
}
 
const renderHtml = (currentPage, body) => {
  return ` 
  <!DOCTYPE html>
  <html>
    <head>
      <title>Ciao</title>
    </head>
    <body>
      ${renderMenu(currentPage)}
      ${body}
    </body>
  </html>
`
}
 
app.get("/", (req, res) => {
  res.send(renderHtml("home", "<h1>Vi trovate nella home della pagina web</h1>"))
})
 
const stati = [
  { 
    nome: "Italia",
    continente: "Europa"
  },
  { 
    nome: "USA",
    continente: "America"
  },
  { 
    nome: "Giappone",
    continente: "Asia"
  }
]
 
app.get("/stati", (req, res) => {
  res.send(renderHtml("stati", `
  <h1>Qui trovate un elenco di Stati</h1>
  <ul>
    ${stati.map((e => {
      return `
      <li>
        <div>
          <p>${e.nome}</p>
          <p>${e.continente}</p>
        </div>
      </li>
      `
    })).join(" ")}
  </ul>
  `))
})

app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})

app.listen(3000, () => console.log("server listening on port 3000"))
