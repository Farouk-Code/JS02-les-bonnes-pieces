// @ts-ignore
const reponse = await fetch("pieces-autos.json");
// @ts-ignore
const pieces = await reponse.json();

const sectionFiches = document.querySelector(".fiches");

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
