function test(){
	alert("asddddddsdf");
	console.log("asdf test "+asdf);
}


//osebe = ["Aleš","Barbara","Dejan","Denis","Janja","Kristjan","Maja","Martin"];

//alert(pralci);
function sum_koncni_stroski(){
	var sum = 0;
	for (i=0; i<osebe.length; i++){
		sum += parseFloat(document.getElementById("s"+(i+1)).innerHTML);
	}
	console.log("sum sum "+sum);
}

function izracunaj() {
	for (i=0; i<osebe.length; i++){
		var name = osebe[i];
		document.getElementById("l"+(i+1)).value = name;
		asdf[name] = new Array();
	}
	var stroski_crke = ["e","p","v","s","t","o"];
	var stroski = {};
	var sum = 0;
	for (i=0; i<stroski_crke.length; i++){
		var crka = stroski_crke[i];
		stroski[crka] = parseFloat(document.getElementById(crka).value);
		console.log("stroski crka " +stroski[crka]);
		sum += stroski[crka];
	}
	for (i=0; i<osebe.length; i++){
		var name = osebe[i];
	 	asdf[name][0] = parseFloat(document.getElementById("m"+(i+1)).value);
	 	asdf[name][1] = parseFloat(document.getElementById("o"+(i+1)).value);
	 	asdf[name][2] = document.getElementById("c"+(i+1)).checked;
	}
	odsotnosti = new Array();
	obiski = new Array();
	odsotnosti_sum = 0;
	obiski_sum = 0;
	pranje = new Array();
	pranje_sum = 0;
	for (i=0; i<osebe.length; i++){
		name = osebe[i];
		odsotnosti[i] = asdf[name][0];
		odsotnosti_sum += asdf[name][0];
		obiski[i] = asdf[name][1];
		obiski_sum += asdf[name][1];
		pranje[i] = asdf[name][2];
		pranje_sum += asdf[name][2];

	}
	console.log("stroski "+stroski);
	console.log("sum stroski "+sum)
	console.log("ods "+odsotnosti);
	console.log("ods_sum "+odsotnosti_sum);
	console.log("obi "+obiski);
	console.log("obi_sum "+obiski_sum);
	tmp1 = (sum + odsotnosti_sum*odsotnosti_vrednost - (obiski_sum*obisk_vrednost) -(pranje_sum*pranje_vrednost));
	tmp = (Math.ceil(tmp1*(100/osebe.length))/(100/osebe.length))/osebe.length;
	//tmp = Math.ceil(tmp * (100/osebe.length))/(100/osebe.length);
	console.log("tmp rounded for average "+tmp);
	var strosek_osebe = {};
	var vsota_stroskov = 0;
	console.log("pranje "+pranje);
	console.log("pranje vrednost"+pranje_vrednost);
	console.log("pranje vrednost multiplied"+pranje_vrednost*pranje[2]);
	for (i=0; i<osebe.length; i++){
		console.log(pranje[i]*pranje_vrednost+"je pranje za osebo"+i);
		strosek_osebe[osebe[i]] = tmp - odsotnosti[i]*odsotnosti_vrednost + obiski[i]*obisk_vrednost +pranje[i]*pranje_vrednost;
		document.getElementById("s"+(i+1)).textContent = (strosek_osebe[osebe[i]]);
		vsota_stroskov += strosek_osebe[osebe[i]];
	}
	console.log("vsota stroskov " + vsota_stroskov);
}