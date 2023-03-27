export function setAlerta(mensaje, error) {

  const divFormulario = document.querySelector(".divFormulario");
  const existeErrores = document.querySelector(".from-red-400");

  if (!existeErrores) {
    
    const div = document.createElement("div");
    div.textContent = mensaje;
    div.style.display = "block";

    if (error) {
      div.classList.add(
        "mt-5",
        "from-red-400",
        "to-red-600",
        "from-red-400",
        "to-red-600",
        "bg-gradient-to-r",
        "text-center",
        "p-3",
        "rounded-xl",
        "uppercase",
        "text-white",
        "text-sm",
        "mb-10",
        "hidden"
      );
    } else {
      div.classList.add(
        "mt-5",
        "from-indigo-400",
        "to-indigo-600",
        "from-indigo-400",
        "to-indigo-600",
        "bg-gradient-to-r",
        "text-center",
        "p-3",
        "rounded-xl",
        "uppercase",
        "text-white",
        "text-sm",
        "mb-10",
        "hidden"
      );
    }

    divFormulario.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}
