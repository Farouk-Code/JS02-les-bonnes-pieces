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

export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");
  formulaireAvis?.addEventListener("submit", (event) => {
    event.preventDefault();
    const avis = {
      //@ts-ignore
      pieceId: Number(event.target.querySelector("[name=piece-id]").value),
      //@ts-ignore
      utilisateur: event.target.querySelector("[name=utilisateur]").value,
      //@ts-ignore
      commentaire: event.target.querySelector("[name=commentaire]").value,
    };

    const chargeUtile = JSON.stringify(avis);

    fetch("http://localhost:8081/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
  });
}
