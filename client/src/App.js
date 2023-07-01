
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Preview, print } from 'react-html2pdf';
function App() {
  const [id, SetID] = useState("");
  const [NomDuContrat, SetNomDuContrat] = useState("");
  const [Nom, SetNom] = useState("");
  const [NomDuMecene, SetNomDuMecene] = useState("");
  const [DateDeDebut, SetDateDeDebut] = useState("");
  const [DateDeFin, SetDateDeFin] = useState("");
  const [idpdf, SetIDpdf] = useState("");
  const [NomDuContratpdf, SetNomDuContratpdf] = useState("");
  const [Nompdf, SetNompdf] = useState("");
  const [NomDuMecenepdf, SetNomDuMecenepdf] = useState("");
  const [DateDeDebutpdf, SetDateDeDebutpdf] = useState("");
  const [DateDeFinpdf, SetDateDeFinpdf] = useState("");
  const [contrats, SetContrats] = useState([]);
  const [update, SetUpdate] = useState(false);
  const url = "http://localhost:3001/api/contrats";

  // UseEffect pour récuperer la liste des contrat de la BDD quand on arrive sur la page 
  useEffect(() => {
    fetch(`${url}/`,
      {
        method: 'Get',
      }
    ).then(response => response.json())
      .then((contrats) => {
        SetContrats(contrats.data);
      }).catch((err) => {
        alert("Récupération des contrats echoués " + err);
      })
    const script = document.createElement('script');

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  // Reset le formulaire
  function ResetForm() {
    SetID("");
    SetNomDuContrat("");
    SetNom("");
    SetNomDuMecene("");
    SetDateDeDebut("");
    SetDateDeFin("");
  }

  // Valide le formulaire et Ajoute ou Update un contrat de la BDD
  function ValidForm(e) {
    e.preventDefault();
    if (NomDuContrat === "") {
      alert('Veuillez remplir le Nom du contrat');
    }
    else if (Nom === "") {
      alert('Veuillez remplir le Nom');
    }
    else if (NomDuMecene === "") {
      alert('Veuillez remplir le Nom du mecene');
    }
    else if (DateDeDebut === "") {
      alert('Veuillez remplir la date de debut');
    }
    else if (DateDeFin === "") {
      alert('Veuillez remplir la date de fin');
    }
    else if (DateDeDebut > DateDeFin) {
      alert('la date de fin est antérieur à la date de début');
    } else if (update) {
      updateData();
      ResetForm();
      SetUpdate(false);
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
      document.getElementById("annuler").style.display = "none";
    } else {
      AddContrat();
    }
  }

  // Ajoute un contrat à la BDD
  function AddContrat() {
    const data = { NomDuContrat, Nom, NomDuMecene, DateDeDebut, DateDeFin }
    fetch(`${url}/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    ).then(response => response.json())
      .then((contrat) => {
        alert('Contrat "' + contrat.data.NomDuContrat + '" créé !');
        ResetForm();
        fetch(`${url}/`, //pas sur du besoin
          {
            method: 'Get',
          }
        ).then(response => response.json())
          .then((contrats) => {
            SetContrats(contrats.data);
          }).catch((err) => {
            alert("Récupération des contrats echoués " + err);
          })
      }).catch((err) => {
        alert("Contrat Non créé. \n Error : " + err)
      })
  }

  // Update un contrat de la BDD
  function updateData() {
    const data = { NomDuContrat, Nom, NomDuMecene, DateDeDebut, DateDeFin }
    fetch(`${url}/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    ).then(response => response.json())
      .then((contrat) => {
        alert('Contrat "' + contrat.data.NomDuContrat + '" Modifieé !');
        ResetForm();
        fetch(`${url}/`, //pas sur du besoin
          {
            method: 'Get',
          }
        ).then(response => response.json())
          .then((contrats) => {
            SetContrats(contrats.data);
          }).catch((err) => {
            alert("Récupération des contrats echoués " + err);
          })
      }).catch((err) => {
        alert("Contrat Non Modifié. \n Error : " + err)
      })
  }

  // Ajoute les donné du contrat au formulaire pour les modifier
  function updateDataForm(contrat) {
    SetUpdate(true);
    SetID(contrat._id);
    SetNomDuContrat(contrat.NomDuContrat);
    SetNom(contrat.Nom);
    SetNomDuMecene(contrat.NomDuMecene);
    SetDateDeDebut(contrat.DateDeDebut.slice(0, 10));
    SetDateDeFin(contrat.DateDeFin.slice(0, 10));
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "inline-block";
    document.getElementById("annuler").style.display = "inline-block";
  }

  // Annule l'update, reset le formulaire 
  function AnnulerUpdate() {
    SetUpdate(false);
    ResetForm();
    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("update").style.display = "none";
    document.getElementById("annuler").style.display = "none";
  }

  // Supprime un contrat de la BDD
  function delData(contrat) {

    fetch(`${url}/${contrat._id}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    ).then(response => response.json())
      .then((contrat) => {
        alert('Contrat "' + contrat.data.NomDuContrat + '" Supprimé !');
        ResetForm();
        fetch(`${url}/`, //pas sur du besoin
          {
            method: 'Get',
          }
        ).then(response => response.json())
          .then((contrats) => {
            SetContrats(contrats.data);
          }).catch((err) => {
            alert("Récupération des contrats echoués " + err);
          })
      }).catch((err) => {
        alert("Contrat Non Supprimé. \n Error : " + err)
      })
  }

  // Affiche un contrat dans une modal et permet de le télécharger
  function AfficherContrat(contrat) {
    SetIDpdf(contrat._id);
    SetNomDuContratpdf(contrat.NomDuContrat);
    SetNompdf(contrat.Nom);
    SetNomDuMecenepdf(contrat.NomDuMecene);
    SetDateDeDebutpdf(contrat.DateDeDebut.slice(0, 10));
    SetDateDeFinpdf(contrat.DateDeFin.slice(0, 10));
    let dialog = document.getElementById('modal');
    dialog.showModal();
  }

  // Ferme une modale
  function Closemodal() {
    let dialog = document.getElementById('modal');
    dialog.close();
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5 text-center">Exercice SideApps</h2>
      <div className="mb-5">
        <form onSubmit={ValidForm}>
          <div className="row">
            <div className="form-group col-md-4 mb-3 ">
              <label for="namec">Nom du contrat</label>
              <input type="text" name="namec" className="form-control" id="namec" value={NomDuContrat} onChange={e => SetNomDuContrat(e.target.value)} placeholder="Nom du contrat" />
            </div>
            <div className="form-group col-md-4 mb-3 ">
              <label for="n">Nom</label>
              <input type="text" name="n" className="form-control" id="n" value={Nom} onChange={e => SetNom(e.target.value)} placeholder="Nom" />
            </div>
            <div className="form-group col-md-4 mb-3 ">
              <label for="ndm">Nom du mecène</label>
              <input type="text" name="ndm" className="form-control" id="ndm" value={NomDuMecene} onChange={e => SetNomDuMecene(e.target.value)} placeholder="Nom du mecène" />
            </div>
            <div className="form-group col-md-12 mb-3 ">
              <label for="datedd">Date de début</label>
              <input type="date" name="datedd" className="form-control" id="datedd" value={DateDeDebut.slice(0, 10)} onChange={e => SetDateDeDebut(e.target.value.slice(0, 10))} />
            </div>
            <div className="form-group col-md-12 mb-3 ">
              <label for="datedf">Date de fin</label>
              <input type="date" name="datedf" className="form-control" id="datedf" value={DateDeFin.slice(0, 10)} onChange={e => SetDateDeFin(e.target.value.slice(0, 10))} />
            </div>
            <div className="col-lg-12 mt-5 flex ">
              <button className="btn btn-outline-success mx-2" id="submit" >
                Ajouter un contrat
              </button>
              <button className="btn btn-warning mx-2" id="update">
                Modifier
              </button>
            </div>
          </div>
        </form>
        <button className="btn btn-danger my-2 mx-2" onClick={AnnulerUpdate} id="annuler">
          Annuler
        </button>
      </div>
      <hr />
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-bordered" id="tableCrud">
            <thead>
              <tr>
                <th>Nom du contrat</th>
                <th>Nom </th>
                <th>Nom du mecène</th>
                <th>Début</th>
                <th>Fin</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>{contrats.map(contrat => (
              <>
                <tr> {console.log(contrat.DateDeDebut)}
                  <td>{contrat.NomDuContrat}</td>
                  <td>{contrat.Nom}</td>
                  <td>{contrat.NomDuMecene}</td>
                  <td>{contrat.DateDeDebut.slice(0, 10)}</td>
                  <td>{contrat.DateDeFin.slice(0, 10)}</td>
                  <td>
                    <button onClick={() => { delData(contrat); }} class="btn btn-danger"> Supprimer </button>
                    <button onClick={() => { updateDataForm(contrat); }} class="btn btn-outline-warning m-1"> Modifier </button>
                    <button onClick={() => { AfficherContrat(contrat); }} class="btn btn-outline-success m-1"> Afficher </button>
                  </td>
                </tr>
              </>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="modal" className="relative" aria-labelledby="dialog_title" aria-describedby="dialog_description">
        <Preview id={'Contrat'}>
          <div className="" id="contratpd">
            <h2 className="mt-5 mb-5 text-left">{NomDuContratpdf} </h2>
            <div className="mt-3">Entre<br /><p class="text"> {Nompdf} </p></div>
            <div className="mt-3">Et<br /><p> {NomDuMecenepdf} </p></div>
            <div className="mt-3">du &nbsp;<span>{DateDeDebutpdf.slice(0, 10)} </span>&nbsp; au &nbsp;<span> {DateDeFinpdf.slice(0, 10)} </span> </div>
            <div className='mt-3'>Signature : <span class='boxsign'> </span> </div>
          </div>
        </Preview>
        <button onClick={() => print(`${NomDuContratpdf}_n°_${idpdf}`, 'Contrat')} class="btn btn-success"> Telecharger </button>
        <button onClick={Closemodal} class="btn btn-danger mx-3"> Fermer </button>
      </dialog>
    </div>
  );
}

export default App;
