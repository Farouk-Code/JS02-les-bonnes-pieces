export function ajouterListenersAvis() {
  const buttonAvis = document.querySelectorAll(".fiches article button");
  for (let button of buttonAvis) {
    button.addEventListener("click", (event) => {
      //@ts-ignore
      const id = event.target.dataset.id;
      fetch(`http://localhost:8081/pieces/${id}/avis`);
    });
  }
}
