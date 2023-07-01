const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContratSchema = new Schema({
    NomDuContrat: String,
    Nom: String,
    NomDuMecene: String,
    DateDeDebut: Date,
    DateDeFin:Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Contrat", ContratSchema);