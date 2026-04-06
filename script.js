//   Nom: Chtioui
//   Prénom: Mohamed Amine
//   Groupe: G1
//   Module: Technologies Web

(function () {
  const aujourdhui = new Date();

  const jours = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const moisNoms = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const nomJour = jours[aujourdhui.getDay()];
  const nomMois = moisNoms[aujourdhui.getMonth()];
  const annee = aujourdhui.getFullYear();

  document.getElementById("span-jour").textContent =
    nomJour + " " + aujourdhui.getDate();
  document.getElementById("span-mois").textContent = nomMois;
  document.getElementById("span-annee").textContent = annee;
})();

function validerFormulaire() {
  let valide = true;

  const nom = document.getElementById("nom").value.trim();
  const errNom = document.getElementById("err-nom");
  if (nom === "") {
    errNom.style.display = "inline";
    valide = false;
  } else {
    errNom.style.display = "none";
  }

  const email = document.getElementById("email");
  const errEmail = document.getElementById("err-email");
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value)) {
    errEmail.style.display = "inline";
    valide = false;
  } else {
    errEmail.style.display = "none";
  }

  const ageVal = parseInt(document.getElementById("age").value);
  const errAge = document.getElementById("err-age");
  if (isNaN(ageVal) || ageVal < 15 || ageVal > 60) {
    errAge.style.display = "inline";
    valide = false;
  } else {
    errAge.style.display = "none";
  }

  return valide;
}

document
  .getElementById("monFormulaire")
  .addEventListener("submit", function (event) {
    if (!validerFormulaire()) {
      event.preventDefault();
    } else {
      localStorage.setItem(
        "form_nom",
        document.getElementById("nom").value.trim(),
      );
      localStorage.setItem(
        "form_email",
        document.getElementById("email").value.trim(),
      );
    }
  });

window.addEventListener("load", function () {
  const nomSauvegarde = localStorage.getItem("form_nom");
  const emailSauvegarde = localStorage.getItem("form_email");

  if (nomSauvegarde || emailSauvegarde) {
    if (nomSauvegarde) document.getElementById("nom").value = nomSauvegarde;
    if (emailSauvegarde)
      document.getElementById("email").value = emailSauvegarde;

    var msg = document.getElementById("msg-restauration");
    msg.style.display = "block";
    setTimeout(function () {
      msg.style.display = "none";
    }, 5000);
  }
});

document.getElementById("age").addEventListener("input", function (event) {
  const ageVal = parseInt(event.target.value);
  const spanAnnee = document.getElementById("annee-naissance");
  if (isNaN(ageVal) || event.target.value === "") {
    spanAnnee.textContent = "";
  } else {
    const anneeActuelle = new Date().getFullYear();
    const anneeNaissance = anneeActuelle - ageVal;
    spanAnnee.textContent =
      "-> Vous etes né(e) vers l'année " + anneeNaissance + ".";
  }
});

function chargementPays() {
  fetch("https://restcountries.com/v3.1/all?fields=name")
    .then(function (response) {
      return response.json();
    })
    .then(function (pays) {
      pays.sort(function (a, b) {
        return a.name.common.localeCompare(b.name.common);
      });
      var select = document.getElementById("lieu_naissance");
      select.innerHTML = '<option value="">-- Choisir un pays --</option>';
      pays.forEach(function (p) {
        var option = document.createElement("option");
        option.value = p.name.common;
        option.textContent = p.name.common;
        select.appendChild(option);
      });
    })
    .catch(function (erreur) {
      console.error("Erreur API :", erreur);
    });
}

window.addEventListener("DOMContentLoaded", function () {
  chargementPays();
});
