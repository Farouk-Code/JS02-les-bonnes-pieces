import { ajouterListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";

// @ts-ignore
const reponse = await fetch("http://localhost:8081/pieces");
const pieces = await reponse.json();

ajoutListenerEnvoyerAvis();

const sectionFiches = document.querySelector(".fiches");

// Fonction qui genere toute la page

function genererPieces(pieces) {
  // Afficher les éléments
  for (let piece of pieces) {
    const pieceElement = document.createElement("article");
    // @ts-ignore
    sectionFiches.appendChild(pieceElement);
    const imageElement = document.createElement("img");
    imageElement.src = piece.image;
    pieceElement.appendChild(imageElement);
    const nomElement = document.createElement("h2");
    nomElement.innerText = piece.nom;
    pieceElement.appendChild(nomElement);
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix : ${piece.prix} (${
      piece.prix < 35 ? "€" : "€€€"
    })`;
    pieceElement.appendChild(prixElement);
    const categorieElement = document.createElement("p");
    categorieElement.innerText = piece.categorie ?? "(Aucune catégorie)";
    pieceElement.appendChild(categorieElement);
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText =
      piece.description ?? "(Pas de description pour le moment.)";
    pieceElement.appendChild(descriptionElement);
    const stockElement = document.createElement("p");
    stockElement.innerText = piece.disponibilite
      ? "En stock"
      : "Rupture de stock";
    pieceElement.appendChild(stockElement);
    const buttonCommentairesElement = document.createElement("button");
    buttonCommentairesElement.dataset.id = piece.id;
    buttonCommentairesElement.textContent = "Afficher les avis";
    pieceElement.appendChild(buttonCommentairesElement);
  }
  ajouterListenersAvis();
}

genererPieces(pieces);

// -------------- Bouton trier ----------------
const boutonTrier = document.querySelector(".btn-trier");
// @ts-ignore
boutonTrier.addEventListener("click", () => {
  const piecesOrdonnee = [...pieces];
  piecesOrdonnee.sort((a, b) => {
    return a.prix - b.prix;
  });
  // @ts-ignore
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnee);
});

// -------------- Bouton filtrer --------------
const boutonFiltrer = document.querySelector(".btn-filtrer");
// @ts-ignore
boutonFiltrer.addEventListener("click", () => {
  const piecesFiltrer = pieces.filter((piece) => {
    return piece.prix <= 35;
  });
  // @ts-ignore
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrer);
});

// -------------- Trie décroissant --------------
const boutonTriDecroissant = document.querySelector(".btn-tri-decroissant");
// @ts-ignore
boutonTriDecroissant.addEventListener("click", () => {
  const pieceDecroissant = [...pieces];
  pieceDecroissant.sort((a, b) => {
    return b.prix - a.prix;
  });
  // @ts-ignore
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(pieceDecroissant);
});

// -------------- Filtre sans description --------------
const boutonSansDescription = document.querySelector(
  ".btn-filtrer-sans-description"
);
// @ts-ignore
boutonSansDescription.addEventListener("click", () => {
  // @ts-ignore
  const pieceSansDescription = pieces.filter((piece) => {
    return piece.description;
  });
  // @ts-ignore
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(pieceSansDescription);
});

const nomsEtPrix = pieces.map((piece) => `${piece.nom} - ${piece.prix}`);
const abordables = [...nomsEtPrix];
for (let i = pieces.length - 1; i >= 0; i--) {
  if (pieces[i].prix > 35) {
    abordables.splice(i, 1);
  }
}

// Creation de la liste
const listeAbordables = document.createElement("ul");
for (let abordable of abordables) {
  const abordableElement = document.createElement("li");
  abordableElement.innerText = abordable;
  listeAbordables.appendChild(abordableElement);
}

// @ts-ignore
document.querySelector(".abordables").appendChild(listeAbordables);

const disponibles = [...nomsEtPrix];
for (let i = pieces.length - 1; i >= 0; i--) {
  if (!pieces[i].disponibilite) {
    disponibles.splice(i, 1);
  }
}

const listeDisponibles = document.createElement("ul");
for (let disponible of disponibles) {
  const disponibleElement = document.createElement("li");
  disponibleElement.innerText = disponible;
  listeDisponibles.appendChild(disponibleElement);
}

// @ts-ignore
document.querySelector(".disponible").appendChild(listeDisponibles);

const prixMax = document.querySelector("#prix-max");
prixMax?.addEventListener("input", () => {
  const pieceFiltres = pieces.filter((piece) => {
    // @ts-ignore
    return piece.prix <= prixMax.value;
  });
  // @ts-ignore
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(pieceFiltres);
});
