// @ts-ignore
const reponse = await fetch("pieces-autos.json");
// @ts-ignore
const pieces = await reponse.json();

const sectionFiches = document.querySelector(".fiches");

// Afficher les éléments
for (let piece of pieces) {
  const article = piece;
  const pieceElement = document.createElement("article");
  sectionFiches?.appendChild(pieceElement);
  const imageElement = document.createElement("img");
  imageElement.src = article.image;
  pieceElement?.appendChild(imageElement);
  const nomElement = document.createElement("h2");
  nomElement.innerText = article.nom;
  pieceElement?.appendChild(nomElement);
  const prixElement = document.createElement("p");
  prixElement.innerText = `Prix : ${article.prix} (${
    article.prix < 35 ? "€" : "€€€"
  })`;
  pieceElement?.appendChild(prixElement);
  const categorieElement = document.createElement("p");
  categorieElement.innerText = article.categorie ?? "(Aucune catégorie)";
  pieceElement?.appendChild(categorieElement);
  const descriptionElement = document.createElement("p");
  descriptionElement.innerText =
    article.description ?? "(Pas de description pour le moment.)";
  pieceElement?.appendChild(descriptionElement);
  const stockElement = document.createElement("p");
  stockElement.innerText = article.disponibilite
    ? "En stock"
    : "Rupture de stock";
  pieceElement?.appendChild(stockElement);
}

// Bouton trier
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier?.addEventListener("click", () => {
  const piecesOrdonnee = [...pieces];
  piecesOrdonnee.sort((a, b) => {
    return a.prix - b.prix;
  });
  console.log(piecesOrdonnee);
});

// Bouton filtrer
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer?.addEventListener("click", () => {
  const piecesFiltrer = pieces.filter((piece) => {
    return piece.prix <= 35;
  });
  console.log(piecesFiltrer);
});

// Trie décroissant
const boutonTriDecroissant = document.querySelector(".btn-tri-decroissant");
boutonTriDecroissant?.addEventListener("click", () => {
  const pieceDecroissant = [...pieces];
  pieceDecroissant.sort((a, b) => {
    return b.prix - a.prix;
  });
  console.log(pieceDecroissant);
});

// Filtre sans description
const boutonSansDescription = document.querySelector(
  ".btn-filtrer-sans-description"
);
boutonSansDescription?.addEventListener("click", () => {
  const pieceSansDescription = pieces.filter((piece) => {
    return piece.description;
  });
  console.log(pieceSansDescription);
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

document.querySelector(".abordables")?.appendChild(listeAbordables);

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

document.querySelector(".disponible")?.appendChild(listeDisponibles);
