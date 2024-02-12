const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const elementSchema = new mongoose.Schema({
  shells: [Number],
  ionization_energies: [Number],
  name: String,
  appearance: String,
  atomic_mass: Number,
  boil: Number,
  category: String,
  color: String,
  density: Number,
  discovered_by: String,
  melt: Number,
  molar_heat: Number,
  named_by: String,
  number: Number,
  period: Number,
  phase: String,
  source: String,
  spectral_img: String,
  summary: String,
  symbol: String,
  xpos: Number,
  ypos: Number,
  electron_configuration: String,
  electron_affinity: Number,
  electronegativity_pauling: Number,
  group: Number,
  bohr_model_image: String,
  bohr_model_3d: String,
  wxpos: Number,
  wypos: Number,
  electron_configuration_semantic: String,
  cpk_hex: String,
  image: {
    title: String,
    url: String,
    attribution: String,
  },
  block: String,
});

const Element = mongoose.model("Element", elementSchema);

app.get("/element", async (req, res) => {
  try {
    const elements = await Element.find(
      {},
      "-_id number symbol name atomic_mass category block density"
    );
    res.json(elements);
  } catch (error) {
    console.error("Error fetching elements:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/element/:number", async (req, res, next) => {
  const { number } = req.params;

  try {
    const element = await Element.findOne({ number: parseInt(number) });

    if (!element) {
      return res.status(404).json({ message: "Element not found" });
    }

    res.json(element);
  } catch (error) {
    res.status(500).json({ message: "Error fetching element" });
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});

// Possibly apply service workers
// Allows for offline functionalities and caching of resources
