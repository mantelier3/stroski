//osebe = ["Aleš","Barbara","Dejan","Denis","Janja","Kristjan","Maja","Martin"];

//alert(pralci);
function sum_koncni_stroski(){
    var sum = 0;
    for (i=0; i<osebe.length; i++){
        sum += $("#s"+(i+1)).innerHTML;
    }
    console.log("sum sum "+sum);
}


function izracunaj() {
    var vse_poloznice = ["elektrika","plin","vodovod","snaga","telekom","ostalo"];
    var stroski = {};
    var poloznice_sum = 0;
    var poloznice = [];
    var poletje = $("#poletje")[0].checked;
    var odsotnosti_vrednost = poletje ? 150 : 400;
    var obisk_vrednost = 80;
    var pranje_vrednost = 150;
    var osebe = []
    var sum = 0;
    var odsotnosti = new Array();
    var obiski = new Array();
    var pranje = new Array();
    var odsotnosti_sum = 0;
    var obiski_sum = 0;
    var pranje_sum = 0;
    var strosek_osebe = {};
    var vsota_stroskov = 0;
    var osebe = [];
    // prebere imena iz vnosnih polj in jih da v seznam
    for (i=1; i<9; i++){
        try {
            name = $("#l"+i)[0].value;
            if (name === "") {
                continue;
            }
            stroski[name] = new Array();
            osebe.push(name)
        }
        catch (e) { 
            if (e instanceof TypeError){
                alert("napaka tipa");
                break;
            }
            else {
                alert("napaka pri branju imen");
            }
        }
    }
    // prebere vrednosti poloznic in jih da v seznam ter shrani vsoto poloznic 
    // vrednosti iz Eur spremeni v cente za lazje racunanje
    for (i=0; i<vse_poloznice.length; i++){
        var poloznica = vse_poloznice[i];
        poloznice[poloznica] = parseFloat($("#"+poloznica)[0].value.replace(',', '.'))*100;
        poloznice_sum += poloznice[poloznica];
        console.log("Poloznica " + poloznica + " je " + poloznice[poloznica]);
    }
    /// prebere podatke o osebah in jih shrani v array
    for (i=0; i<osebe.length; i++){
        var name = osebe[i];
        stroski[name][0] = parseFloat($("#m"+(i+1))[0].value); // manjkanje
        stroski[name][1] = parseFloat($("#o"+(i+1))[0].value); // osaotnosti
        stroski[name][2] = $("#c"+(i+1))[0].checked; // pranje
        console.log(name + " ima: manjkanje " + stroski[name][0] + ", obiski " + 
                    stroski[name][1] + " in pranje " + stroski[name][2]*1)
    }

    for (i=0; i<osebe.length; i++){
        name = osebe[i];
        odsotnosti[i] = stroski[name][0];
        odsotnosti_sum += stroski[name][0];
        obiski[i] = stroski[name][1];
        obiski_sum += stroski[name][1];
        pranje[i] = stroski[name][2];
        pranje_sum += stroski[name][2];

    }
    console.log("Vsota poloznic je " + poloznice_sum)
    console.log("Odsotnosti so " + odsotnosti);
    console.log("Vsota odsotnosti je " + odsotnosti_sum);
    console.log("Obiski so " + obiski);
    console.log("Vsota obiskov je " + obiski_sum);
    tmp = (poloznice_sum + (odsotnosti_sum*odsotnosti_vrednost) - 
           (obiski_sum*obisk_vrednost) -(pranje_sum*pranje_vrednost));
    tmp_na_osebo = Math.ceil(tmp/osebe.length)
    //tmp = (Math.ceil(tmp1*(100/osebe.length))/(100/osebe.length))/osebe.length;
    //tmp = Math.ceil(tmp * (100/osebe.length))/(100/osebe.length);
    console.log("Tmp " + tmp);
    console.log("Tmp na osebo " + tmp_na_osebo);

    for (i=0; i<osebe.length; i++){
        name = osebe[i];
        strosek_osebe[osebe[i]] =   tmp_na_osebo - 
                                    stroski[name][0]*odsotnosti_vrednost +
                                    stroski[name][1]*obisk_vrednost + 
                                    stroski[name][2]*pranje_vrednost;
        //strosek_osebe[osebe[i]] = parseFloat(strosek_osebe[osebe[i]])
        //str_strosek = "0".repeat(Math.log10("1000") + strosek_osebe[osebe[i]])
        //$("#s"+(i+1)).textContent = str_strosek;
        vsota_stroskov += strosek_osebe[osebe[i]];
    }
    vrednosti_stroskov = Object.keys(strosek_osebe).map(function(key) {
        return strosek_osebe[key];
    });
    max_vrednost = Math.max.apply(Math, vrednosti_stroskov);
    log_max_vrednosti = Math.floor(Math.log10(max_vrednost) + 1)
    presledki_padding = " ".repeat(log_max_vrednosti)
    //str_strosek = "0".repeat(Math.log10("1000") + strosek_osebe[osebe[i]])
    for (i=0; i<vrednosti_stroskov.length; i++) {
        vrednosti_stroskov[i] /= 100; 
    }
    $(".s").each( function(index) { 
        $(this).html((presledki_padding + 
            vrednosti_stroskov[index])).slice(log_max_vrednosti - 
            Math.log10(strosek_osebe[osebe[index]])); 
    } )
    console.log("vsota stroskov " + vsota_stroskov);
    console.log(strosek_osebe)
}