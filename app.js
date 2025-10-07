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
app.post("/download", async (req, res) => {
  try {
    const link = req.body.link;
    if (!link) {
      return res.status(400).send("Campo 'link' é obrigatório.");
    }

    // Gera o QR code como buffer PNG
    const buffer = await qrcode.toBuffer(link, { errorCorrectionLevel: "H" });

    // Configura cabeçalhos para download do arquivo
    res.set({
      "Content-Type": "image/png",
      "Content-Disposition": 'attachment; filename="qrcode.png"',
      "Content-Length": buffer.length,
    });

    // Envia o buffer na resposta
    res.send(buffer);

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar o QR code.");
  }
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
