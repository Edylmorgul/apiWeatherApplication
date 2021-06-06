let ville;
let input = document.querySelector("#changerVille");
let error = document.querySelector("small");
let btnChangerVille = document.querySelector("#changer");
let formulaire = document.querySelector("#formulaire");
document.querySelector("#ville").textContent = ville;

function recevoirTemperature(ville){
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=yourApiKey&units=metric';

    let requete = new XMLHttpRequest();
    requete.open("GET", url);
    requete.responseType = "json";
    requete.send();

    requete.addEventListener('load', () => {
        if(requete.readyState === XMLHttpRequest.DONE){
            if(requete.status === 200){
                let reponse = requete.response;
                let temperature = reponse.main.temp;
                let nomVille = reponse.name; // Juste pour avoir la ville choisie au bon format
                document.querySelector("#temperature_label").textContent = temperature;
                document.querySelector("#ville").textContent = nomVille;
            }

            // Si erreur API
            else{
                alert("Une erreur est survenue !");
            }
        }
    });
}

input.addEventListener('keyup', () =>{
    if(!isNaN(input.value)){
        error.style.display = "inline"; 
    }

    else{
        error.style.display = "none";              
    }
});

formulaire.addEventListener('submit', (e) => {
    e.preventDefault();

    if(!isNaN(input.value) || input.value == ""){
        input.style.borderColor = "red";
    }

    else{
        input.style.borderColor = "silver";
        ville = input.value;
        input.value = "";  
        recevoirTemperature(ville);        
    }
});

// Afficher une temperature de base au premier chargement de la page
window.addEventListener('load', () => {
    recevoirTemperature("Paris");
});
