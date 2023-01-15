let datos,contador=0 ;
   
function reproducir(){
    let audio= document.querySelector('.audio');
    if(contador==0){
        audio.play();
        contador=1;
    }else{
        audio.pause();
        contador=0;
    }
    
    
}
const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            
            pokeImage("https://33.media.tumblr.com/e5dd18464487c3fead9a143f3c4920a2/tumblr_mqxeae5svG1qhz1nio1_500.gif")
            alert('Pokemon no encontrado, revice si el nombre esta bien escrito')
        }
        else {
            return res.json();
            
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            datos = data;
            let pokeImg = data.sprites.front_default;
            let datosatrivutos= data.stats;
            console.log(datosatrivutos);
            pokeImage(pokeImg);
            graficamos(data);
            identificar(data);
            estadistica(data);
            console.log('asas'+data.id);

        }
    }
    );
}


console.log(`https://pokeapi.co/api/v2/pokemon`);
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}
 
let graficamos = (datos)=>{
    
    let vector= [];
      datos.stats.forEach((e)=>{
       vector.push(e.base_stat);
      })
    let linea = document.querySelectorAll('.linea');
    linea.forEach((e,i)=> e.style.height=((0.01*vector[i])*64) + 'px')
    
}
let identificar=(datos)=>{
  let identifico= document.querySelector('.identificador');
  let identifico2= document.querySelector('.identificador2');
  identifico.innerHTML='';
  if(datos.id>100){
    identifico.innerText=datos.id;
  }else{
    identifico.innerText= datos.id>9 ? `0${datos.id}` : `00${datos.id}`
  }
  identifico2.innerHTML=datos.name;

}

let estadistica= (datos)=>{
    let type = document.querySelector('.type');
    type.innerHTML= datos.types[0].type.name;
    let abilidades= document.querySelectorAll('.ability');
    abilidades[0].innerHTML=datos.abilities[0].ability.name;
    abilidades[1].innerHTML=datos.abilities[1].ability.name;
    let peso= document.querySelector('.peso');
    let altura= document.querySelector('.altura');

    peso.innerHTML=(datos.weight*0.1).toFixed(1) + 'Kg';
    altura.innerHTML=(datos.height*0.1).toFixed(1) + 'm';
}
 
  
