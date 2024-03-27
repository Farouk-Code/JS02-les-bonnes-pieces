// @ts-ignore
const reponse = await fetch("pieces-autos.json");
// @ts-ignore
const pieces = await reponse.json();

const sectionFiches = document.querySelector(".fiches");

for (let piece of pieces) {
  const article = piece;
  const imageElement = document.createElement("img");
  imageElement.src = article.image;
  sectionFiches?.appendChild(imageElement);
  const nomElement = document.createElement("h2");
  nomElement.innerText = article.nom;
  sectionFiches?.appendChild(nomElement);
  const prixElement = document.createElement("p");
  prixElement.innerText = `Prix : ${article.prix} (${
    article.prix < 35 ? "€" : "€€€"
  })`;
  sectionFiches?.appendChild(prixElement);
  const categorieElement = document.createElement("p");
  categorieElement.innerText = article.categorie ?? "(Aucune catégorie)";
  sectionFiches?.appendChild(categorieElement);
  const descriptionElement = document.createElement("p");
  descriptionElement.innerText =
    article.description ?? "(Pas de description pour le moment.)";
  sectionFiches?.appendChild(descriptionElement);
  const stockElement = document.createElement("p");
  stockElement.innerText = article.disponibilite
    ? "En stock"
    : "Rupture de stock";
  sectionFiches?.appendChild(stockElement);
}
