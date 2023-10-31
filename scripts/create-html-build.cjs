const fsSync = require('fs');
const fs = require('fs').promises;
const path = require('path');

const directoryPath = path.join(__dirname, "../" , "dist/")

let assets = []

const resumefile = async () => {
  const jsFile = assets.find((f) => f.includes(".js"))
  const cssFile = assets.find((f) => f.includes(".css"))
  let htmlData = await fs.readFile(path.join(directoryPath, "index.html"), "utf-8")
  let cssData = await fs.readFile(path.join(directoryPath, "assets", cssFile), "utf-8")
  let jsData =  await fs.readFile(path.join(directoryPath, "assets", jsFile), "utf-8")

  console.log(htmlData.length)
  console.log(cssData.length)
  console.log(jsData.length)

  let newHtml

  // remover o script mocks
  newHtml = htmlData.replace('<script src="mocks.js"></script>', '')

  // substituir o link css por uma tag style com o cssData
  newHtml = newHtml.replace(`<link rel="stylesheet" href="/assets/${cssFile}">`, `<style>${cssData}</style>`)

  // substituir o script js pelo jsData
  newHtml = newHtml.replace(`<script type="module" crossorigin src="/assets/${jsFile}"></script>`, ``)

  const beginSpot = newHtml.search("<style>") - 1;
  const initialHTML = newHtml.substring(0, beginSpot)
  const finalHtml = newHtml.substring(beginSpot);

  newHtml = initialHTML + `<script type="module">${jsData}</script>` + finalHtml

  await fs.writeFile(path.join(directoryPath, "index.html"), newHtml)
  console.log("Finished creating html file");
}

fsSync.readdir(path.join(directoryPath, "assets"), (err, files) => {
  if (err) {
    return console.log("Unable to scan assets directory, make sure you run `npm run build`.")
  }
  console.log("read files", files)
  assets = files
  resumefile()
})
