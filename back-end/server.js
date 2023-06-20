import express from "express";
import dotenv from "dotenv";
import { User } from './model/index.js';
import cookieParser from "cookie-parser";


dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.BE_PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(ReactAppDistPath.pathname));

app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});


app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüfe, ob Benutzer mit der E-Mail bereits existiert
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "E-Mail wird bereits verwendet" })
    }

    // neues Benutzerobjekt erstellen
    const newUser = new User({ email });

    // Passwort des Benutzers setzen
    newUser.setPassword(password);

    // Speichere den neuen Benutzer in der Datenbank
    await newUser.save();

    return res.status(201).json({ message: "Benutzer erfolgreich erstellt" });
  } catch (error) {
    return res.status(500).json({ error: "Serverfehler beim Erstellen des Benutzers" });
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // Überprüfe, ob ein Benutzer mit der gegebenen E-Mail existiert
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Ungültige E-Mail oder Passwort" });
    }

    // Überprüfe das Passwort des Benutzers
    const isPasswordValid = user.verifyPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Ungültige E-Mail oder Passwort" });
    }
    const token = user.generateAuthToken({ email });
    res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 30 });
    return res.status(200).json({ message: "Anmeldung erfolgreich", data: { token } })

  } catch (error) {
    return res.status(500).json({ error: "Login fehlgeschlagen" });
  }
})


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrahiere den Token aus dem Authorization Header

  if (!token) {
    return res.sendStatus(401); // Token nicht vorhanden
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token ungültig oder abgelaufen
    }

    req.user = user; // Speichere den Benutzer aus dem Token im Request-Objekt
    next(); // Rufe die nächste Middleware oder den Controller auf
  });
};



// GET /secure-Route mit authenticateToken-Middleware
app.get("/api/secure", authenticateToken, (req, res) => {
  try {
    // Benutzer ist valide, sende entsprechende Antwort
    res.json({ authenticated: true });

  } catch (error) {
    return res.status(404).json({ error: "Benutzer nicht valide" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});
