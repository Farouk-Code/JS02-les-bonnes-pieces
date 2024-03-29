export function ajouterListenersAvis() {
  const buttonAvis = document.querySelectorAll(".fiches article button");
  for (let button of buttonAvis) {
    button.addEventListener("click", async function (event) {
      //@ts-ignore
      const id = event.target.dataset.id;
      const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`);
      const avis = await reponse.json();
      //@ts-ignore
      const pieceElement = event.target.parentElement;
      const nomAvisElement = document.createElement("p");
      const commentaireElement = document.createElement("p");

      for (let avi of avis) {
        nomAvisElement.innerText = `${avi.utilisateur} : `;
        commentaireElement.innerText = avi.commentaire;
        pieceElement.appendChild(nomAvisElement);
        pieceElement.appendChild(commentaireElement);
      }
    });
  }
}
