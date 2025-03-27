const express = require("express");
const qrcode = require("qrcode");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Opção para gerar download da imagem qrcode
app.post("/download", (req, res) => {
  const link = req.body.link;
  const fileName = "qrcode.png"; // Nome do arquivo para download

  qrcode.toFile(fileName, link, { errorCorrectionLevel: "H" }, (err) => {
    if (err) {
      res.send("Erro ao gerar o QR code.");
    } else {
      res.download(fileName, (err) => {
        // Deleta o arquivo após o download
        fs.unlinkSync(fileName);
      });
    }
  });
});


// Nova rota para uma página "sobre"
app.get('/sobre', (req, res) => {
  res.sendFile(__dirname + '/public/sobre.html');
});

// Nova rota para uma página "contato"
app.get('/contato', (req, res) => {
  res.sendFile(__dirname + '/public/contato.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// URL Git = https://github.com/Martins-Guilherme/Portfolio
// URL mensagem = https://www.instagram.com/p/DHPN_4HNHWh/?utm_source=ig_web_copy_link