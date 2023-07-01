const Contrat = require("../model/Contrat");
 
exports.getAllContrats = async () => {
  return await Contrat.find();
};
 
exports.createContrat = async (contrat) => {
  return await Contrat.create(contrat);
};
exports.getContratById = async (id) => {
  return await Contrat.findById(id);
};
 
exports.updateContrat = async (id, contrat) => {
  return await Contrat.findByIdAndUpdate(id, contrat);
};
 
exports.deleteContrat = async (id) => {
  return await Contrat.findByIdAndDelete(id);
};