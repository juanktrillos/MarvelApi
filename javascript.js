var conexion = new XMLHttpRequest();
var data;
function searchData() {
	var name = document.getElementById('text').value;
	if (name==""||name==null) {
		alert("Introduzca un Nombre");
	}else{
		conexion.open("GET","https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="+name+"&apikey=abfbecb7e8e77e55db2cdbb87e1c9cd1&hash=26358a949142831fa3c3d76fbb1ae4ff&ts=200",true);
		conexion.send();
		document.getElementById('clean').className = "cleanButton";
		document.getElementById('data').className = "searchButton hidden";
	}
}

function loadData() {
	var marvel;
	document.getElementById('mainImg').className = "marvelImg hidden";
	for (var i = 0; i < data.results.length; i++) {;
		marvel = data.results[i];
		create(marvel);
	}
}

conexion.onreadystatechange = function(){
	try{
		var string = conexion.responseText;
			data = JSON.parse(conexion.responseText);
			data = data.data;
			document.getElementById('contenido').innerHTML = "";
			if (data.results.length>0) {
				loadData();
			} else{
				alert("No se encontraron Datos \n Revise su conexión o Intente un nuevo Nombre");
				cleanData();
			}
	}catch (e){
		console.log("Error: ", e);
	}
}

function create(marvel) {	
	var marvelData = document.createElement("DIV");     
	var characterImg = document.createElement("DIV");     
	var img = document.createElement("IMG");     
	var characterContent = document.createElement("DIV");     
	var characterName = document.createElement("DIV");     
	var characterSummary = document.createElement("DIV");     

	marvelData.className = "marvelData";
	characterImg.className = "characterImg";
	characterContent.className = "characterContent";
	characterName.className = "characterName";
	characterSummary.className = "characterSummary";

	img.src = marvel.thumbnail.path+"."+marvel.thumbnail.extension;
	characterName.innerHTML = "<b>"+marvel.name+"</b>";
	characterSummary.innerHTML = "<p>"+marvel.description+"</p>";

	if (marvel.description=="") {
		characterSummary.innerHTML = "<p>No Description</p>";
	}
	if (marvel.thumbnail.path=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
		img.src = "notimg.png";
	}

	marvelData.appendChild(characterImg);               
	characterImg.appendChild(img);               
	marvelData.appendChild(characterContent);               
	characterContent.appendChild(characterName);               
	characterContent.appendChild(characterSummary);               

	document.getElementById('contenido').appendChild(marvelData);
}

function cleanData() {
	document.getElementById('clean').className = "cleanButton hidden";
	document.getElementById('data').className = "searchButton";
	document.getElementById('text').value = "";
	document.getElementById('contenido').innerHTML = "";
	document.getElementById('mainImg').className = "marvelImg show";
}