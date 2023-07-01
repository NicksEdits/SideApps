const ContratService = require("../service/ContratService");

exports.getAllContrats = async (req, res) => {
  try {
    const contrat = await ContratService.getAllContrats();
    res.json({ data: contrat, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContrat = async (req, res) => {
  try {
    const contrat = await ContratService.createContrat(req.body);
    res.json({ data: contrat, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContratById = async (req, res) => {
  try {
    const contrat = await ContratService.getContratById(req.params.id);
    res.json({ data: contrat, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContrat = async (req, res) => {
  try {
    const contrat = await ContratService.updateContrat(req.params.id, req.body);
    res.json({ data: contrat, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContrat = async (req, res) => {
  try {
    const contrat = await ContratService.deleteContrat(req.params.id);
    res.json({ data: contrat, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
