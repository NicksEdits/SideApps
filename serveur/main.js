
// //afficher contrat avant de telecharger
// function AfficheContrat(i) {
//     let listContrat;
//     if (localStorage.getItem("listContrat") == null) {
//         listContrat = [];
//     } else {
//         listContrat = JSON.parse(localStorage.getItem("listContrat"));
//     }
//     let html = "";

//     html += '<dialog id="modal" aria-labelledby="dialog_title" aria-describedby="dialog_description"> ';
//     html += '<div class="container" id="contratpd">'
//     html += '<h2 class="mt-5 mb-5">' + listContrat[i].namec + '</h2>';
//     html += '<div class="mt-3">Entre<br/><p class="text">' + listContrat[i].name + '</p></div>';
//     html += '<div class="mt-3">Et<br/><p>"' + listContrat[i].nameMecene + '"</p></div>';
//     html += '<div class="mt-3">du &nbsp;<span>' + listContrat[i].dateDeDebut + '</span>&nbsp; au &nbsp;<span>' + listContrat[i].dateDeFin + '</span> </div>';
//     html += " <div class='mt-3'>Signature : <span class='boxsign'> </span> </div>";
//     html += "</div>";
//     html += '<button onclick="dlPdf(' + i + ')" class="btn btn-success"> Telecharger </button><button onclick="Closemodal()" class="btn btn-danger m-1"> Fermer </button> ';
//     html += '</dialog>';


//     document.querySelector("#contratpdf tbody").innerHTML = html;
//     let dialog = document.getElementById('modal');
//     dialog.showModal();

// }
// //fermeture de la modale
// function Closemodal() {
//     let dialog = document.getElementById('modal');
//     dialog.close();
// }
// //telechargement pdf
// function dlPdf(i) {
//     let listContrat;
//     if (localStorage.getItem("listContrat") == null) {
//         listContrat = [];
//     } else {
//         listContrat = JSON.parse(localStorage.getItem("listContrat"));
//     }
//     var opt = {
//         margin: 1,
//         filename: listContrat[i].namec + '_n°_' + listContrat[i].id + '.pdf',
//     };
//     let contrat = document.getElementById('contratpd');
//     html2pdf().set(opt).from(contrat).save();

// }



const ContratRouter = require("./routes/ContratRoutes");
const express = require("express");
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
//configure mongoose
mongoose.connect(
  "mongodb+srv://SideApp:YexMGwICYy397GCP@cluster0.bafzyif.mongodb.net/?retryWrites=true&w=majority",
);
//middleware
app.use(express.json()); 
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use("/api/contrats", ContratRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
 
module.exports = app;