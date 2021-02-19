setTimeout(function(){ 			
 	var scrollingElement = (document.scrollingElement || document.body);
	scrollingElement.scrollTop = scrollingElement.scrollHeight;
}, 300);


   
//Fecha de envio de los mensajes
var today = new Date(); 
//Fondo
document.body.style.backgroundColor = '#1B1B1C';
document.body.style.marginBottom = '70px'; 
document.body.style.marginTop = '50px';
document.body.style.overflow = "auto";

//Imagen del grupo
let objImagen = document.createElement('img');
	objImagen.setAttribute('src','grupuo.jpg');
	objImagen.style.height = '60px';
	objImagen.style.width = '60px';
	objImagen.style.top = '-10px';
	objImagen.style.left = '5px';
	objImagen.style.borderRadius = '30px';
	objImagen.style.position = 'relative';

//nombre del grupo
let texto = document.createElement('h2');
	texto.append('Web ubeje 2021');
	texto.style.fontFamily = 'Arial';
	texto.style.color = 'white';
	texto.style.position = 'fixed'; 
	texto.style.left = '80px';
	texto.style.top = '1px';

//Integrantes
let inte = document.createElement('p');
	inte.append('Andrea, Bryann, Daniela ...');
	inte.style.fontFamily = 'Arial';
	inte.style.color = '#434341';
	inte.style.position = 'fixed'; 
	inte.style.left = '80px';
	inte.style.top = '33px';


//Encabezado
let header = document.createElement('header');
	header.style.height = '60px';
	header.style.position = 'fixed';
	header.style.top = '0px';
	header.style.right = '0px';
	header.style.paddingTop = '15px';
	header.style.width = '100%';
	header.style.color = '#C8C9CA';
	header.style.background = '#29292A';
	header.style.top = '0px';
	header.appendChild(objImagen);
	header.appendChild(texto);
	header.appendChild(inte);
	document.body.appendChild(header);


//para el emoji
let emoji = document.createElement('img');
	emoji.setAttribute('src','emoji.png');
	emoji.style.height = '25px';
	emoji.style.width = '25px';
	emoji.style.top = '10px';
	emoji.style.position = 'relative';
	emoji.style.marginRight = '10px';

//para el clip
let clip = document.createElement('img');
	clip.setAttribute('src','clip.png');
	clip.style.height = '25px';
	clip.style.width = '25px';
	clip.style.top = '10px';
	clip.style.position = 'relative';
	clip.style.marginRight = '10px';

//boton para enviar mensaje
let buttonImg = document.createElement('img');
	buttonImg.setAttribute('src','send.png');
	buttonImg.style.height = '25px';
	buttonImg.style.width = '25px';
let button = document.createElement('button');
	button.style.position = 'relative';
	button.style.left = '15px';
	button.style.top = '10px';
    button.append(buttonImg);


//Input del mensaje
const box = document.createElement('footer')
	const input = document.createElement('input')

	box.style.backgroundColor = '#29292A';
	box.style.width = '100%';
	box.appendChild(emoji);
	box.appendChild(clip);
	input.style.width = '85%';
	input.style.background = '#484C52';
	input.placeholder = 'Escribe un mensaje aquí';
	input.style.fontFamily = 'Helvetica';
	input.style.fontWeight = 'bold';
	input.style.color = '#C8C9CA';
	input.style.borderRadius = '20px';
	input.style.height = '50px';
	input.style.top = '10px';
	//Se limita a 140 caracteres
	input.maxLength = 140;
	box.appendChild(input);
	box.appendChild(button)
	document.body.appendChild(box);

	//Para que este al final de la pagina
	box.style.position = 'fixed';
	box.style.bottom = '0px';
	box.style.height = '70px';

button.addEventListener('click', () => {
          fetch('http://ubeje.xyz:3000/messages', { //sube contenido
		method: 'POST',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  sender: "Laura",
                  message: input.value,
				  date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
           		})
    		})
        input.value = ''; //Regresamos a blanco la cajita
}) 

 //Mandar el mensaje con la tecla enter
input.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		fetch('http://ubeje.xyz:3000/messages', { 
		method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sender: "Laura",
				message: input.value,
				date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
			})
		})
	input.value = ''; //El input se queda vacio
	}  	
}) 

//Colores para los nombres:
//const colores = ["#DCF12A", '#22C1CA', '#9D18B8', '#0EC53C', '#DD61D2', '#79D875', '#6C643D' ];


//Ver los mensajes
const listaDeMensajes = document.createElement('ul')
document.body.append(listaDeMensajes)


fetch('http://ubeje.xyz:3000/messages').then((r) => { //obtiene informacion
  return r.json()
}).then((j) => {
  j.forEach((mensaje) => {
    const unMensaje = document.createElement('p')
    const h1 = document.createElement('h4')
    //nombre del remitente
   	h1.style.color = '#01DFD7';
   	h1.style.fontFamily = 'Helvetica';
   	//mensaje
    let h2 = document.createElement('p')
    h2.style.fontFamily = 'Verdana';
    h2.style.color = 'white';

    //Visualizar las imagenes
    const imagee = document.createElement('img')
    imagee.src = mensaje.message;
    imagee.onload = function(){
    	unMensaje.append(imagee);
    }

    /*El mensaje aparezca en diferente lugar
    if (mensaje.sender == 'Laura'){
    	h1.aling = 'right';
    	unMensaje.style.right = '10px';
    }else{
    	h2.aling = 'left';
    	unMensaje.style.left = '10px'
    }*/
  
  	const message_date = document.createElement('div')
	message_date.style.fontFamily = 'Trebuchet MS'
	message_date.style.color = '#55575C'
	message_date.style.display = 'inline-block'
	message_date.style.marginLeft = '10px'
	message_date.style.fontSize = '10px'

	

	//Refrescar el chat
	function refreshChat (){
		if (refreshChat.checked){
			refreshChat = setInterval(function(){getAllChats('http://ubeje.xyz:3000/messages');}, 10000);
		} else{
			clearInterval(refreshChat);
		}
	}
 
 

h1.append(mensaje.sender)
    h2.append(mensaje.message)

unMensaje.append(h1)
    unMensaje.append(h2)
    listaDeMensajes.append(unMensaje);

    })
})

