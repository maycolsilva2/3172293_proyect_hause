// Logica para cargar el componente navbar

document.addEventListener("DOMContentLoaded", function(){

    const navbarElement = document.querySelector(".navbar-container")

    if (!navbarElement) return;
        
        fetch("/views/components/navbar.html")
        // La respuesta la convierte a texto plano 
            .then(response => response.text())

                // Inserta el contenido html del navbar en el conetnedor correspondiente 
            .then(data => {
                navbarElement.innerHTML = data;
            
            const currentPage = window.location.pathname.split("/").pop() || 
            "index.html"

            const navLinks = navbarElement.querySelectorAll(".navbar__link");

            navLinks.forEach(link => {
                    //Ver si el href del enlace incluye el nombre de la página actual 
                if (link.getAttribute("href")?.includes(currentPage)) {
                    link.classList.add("active");
                }
            });
        })
            .catch(error => console.error("Error cargando el navbar", error));
});
