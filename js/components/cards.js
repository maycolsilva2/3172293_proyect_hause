export async function loadCards(containerSelector, cardIds = []) {

    const container = document.querySelector(containerSelector);
    if(!container) return;

    try {
            // Hacemos dos fetch al mismo tiempo, uno para la plantilla de card y otro para los datos 
        const[templateRes, dataRes] = await Promise.all([
                fetch("/views/components/cards.html"),
                fetch("/data/cards.json")
        ])

        const template = await templateRes.text();
        const cards = await dataRes.json();

    //  Filtro por si se proporciona IDs
    const filterCards = cardIds.length ? cardIds.filter(card => cardIds.includes(card.id)) : cards; //Si no hay ID las muestra todas

   filterCards.forEach(card => {
    let html = template
        .replace("{{id}}", card.id)
        .replace("{{image}}", card.image)
        .replace("{{alt}}", card.alt)
        .replace("{{label}}", card.label);
// 
    container.innerHTML += html;   
});

    }catch(error){
        console.log("Error cargando as cards", error)
    }
}
