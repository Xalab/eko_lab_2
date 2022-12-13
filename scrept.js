//ready
let airPollution = {
    rechovina: [
        "Азоту оксиди",
        "Аміак",
        "Ангідрид сірчистий",
        "Ацетон",
        "Бенз(о)пірен",
        "Бутилацетат",
        "Ванадію п'ятокис",
        "Водень хлористий",
        "Вуглецю окис",
        "Вуглеводні",
        "Газоподібні фтористі сполуки",
        "Тверді речовини",
        "Кадмію сполуки",
        "Марганець та його сполуки",
        "Нікель та його сполуки",
        "Озон",
        "Ртуть та її сполуки",
        "Свинець та його сполуки",
        "Сірководень",
        "Сірковуглець",
        "Спирт н-бутиловий",
        "Стирол",
        "Фенол",
        "Формальдегід",
        "Хром та його сполуки"
    ],
    podatok: [
        2574.43,
        482.84,
        2574.43,
        965.67,
        3277278.63,
        579.84,
        9656.78,
        96.99,
        96.99,
        145.50,
        6373.91,
        96.99,
        20376.22,
        20376.22,
        103816.62,
        2574.43,
        109127.84,
        109127.84,
        8273.63,
        5376.59,
        2574.43,
        18799.08,
        11685.10,
        6373.91,
        69113.38
    ]
}

//ready
let waterPollution = {
    rechovina: [
        "Азот амонійний",
        "Органічні речовини (за показниками біохімічного споживання кисню (БСК 5)",
        "Завислі речовини",
        "Нафтопродукти",
        "Нітрати",
        "Нітрити",
        "Сульфати",
        "Фосфати",
        "Хлориди"
    ],
    podatok: [
        12883.84,
        5156.8,
        369.52,
        75792.4,
        1108.56,
        63278.16,
        369.52,
        10297.44,
        369.52
    ]
}

//ready
let lezhachiVidhody = {
    things: [
        "Обладнання та прилади, що містять ртуть, елементи з іонізуючим випромінюванням",
        "Люмінесцентні лампи"
    ],
    podatok: [
        952.02,
        16.57
    ],
    seredovishye: [
        3,
        1
    ]
}

//ready
let lezhachiNuclearVidhody = {
    type: [
        "Високоактивні",
        "Середньоактивні та низькоактивні"
    ],
    podatokNaRadNeIon: [
        632539.66,
        11807.40
    ],
    podatokNaRadIon: [
        21084.66,
        4216.92
    ]
}

//ready
function nalogNaAir(amount, rechovyna) {
    let nalog = airPollution.podatok[airPollution.rechovina.findIndex((elem) => {return elem == rechovyna})];
    return nalog * amount;
}

//ready
function nalogNaWater(amount, rechovyna, place) {
    let nalog = waterPollution.podatok[waterPollution.rechovina.findIndex((elem) => {return elem == rechovyna})];
    if (place == "Ставки чи озера") {
        return nalog * amount * 1.5;
    }
    else {
        return nalog * amount;
    }
}

//ready
function nalogNaLezhachih(amount, thing, safety, place) {
    let nalog = lezhachiVidhody.podatok[lezhachiVidhody.things.findIndex((elem) => {return elem == thing})];
    if (!safety) {
        if (place == "В межах населенного пункту") {
            return nalog * amount * 3 * 3;
        }
        else {
            return nalog * amount * 3;
        }
    }
    else {
        return nalog * amount;
    }
}

//ready
function nalogNaRadCraft(kvth, kategory) {
    if (kategory == "Високоактивні") {
        return kvth * 0.0133 * 50;
    }
    else {
        return kvth * 0.0133 * 2;
    }
}

//ready
function nalogNaRadLezhachih(type, vipro, kuby) {
    if (type == "Радіоактивні відходи (крім відходів, представлених як джерела іонізуючого випромінювання)") {
        if (vipro == "Високоактивні") {
            let nalog = lezhachiNuclearVidhody.podatokNaRadNeIon[lezhachiNuclearVidhody.type.findIndex((elem) => {return elem == vipro})];
            return nalog * kuby;
        }
        else {
            let nalog = lezhachiNuclearVidhody.podatokNaRadNeIon[lezhachiNuclearVidhody.type.findIndex((elem) => {return elem == vipro})];
            return nalog * kuby;
        }
    }
    else {
        if (vipro == "Високоактивні") {
            let nalog = lezhachiNuclearVidhody.podatokNaRadIon[lezhachiNuclearVidhody.type.findIndex((elem) => {return elem == vipro})];
            return nalog * kuby;
        }
        else {
            let nalog = lezhachiNuclearVidhody.podatokNaRadIon[lezhachiNuclearVidhody.type.findIndex((elem) => {return elem == vipro})];
            return nalog * kuby;
        }
    }
}

document.getElementById("air-form").addEventListener('submit', evt => {
    evt.preventDefault();  
});

document.getElementById("water-form").addEventListener('submit', evt => {
    evt.preventDefault();  
});

document.getElementById("storage-form").addEventListener('submit', evt => {
    evt.preventDefault();  
});

document.getElementById("radio-form").addEventListener('submit', evt => {
    evt.preventDefault();  
});

document.getElementById("storage-radio-form").addEventListener('submit', evt => {
    evt.preventDefault();  
});



document.getElementById("rozrah-air").addEventListener("click", () => {
    let massa = document.getElementById("amount-air").value;
    let e = document.getElementById("airPoll");
    let rechovyna = e.options[e.selectedIndex].text;
    console.log(rechovyna);
    console.log(massa);
    let result = nalogNaAir(massa, rechovyna);
    console.log(result);
    document.getElementById("result-air").innerText = "Податок: " + result + "грн";
});

document.getElementById("rozrah-water").addEventListener("click", () => {
    let massa = document.getElementById("amount-water").value;
    let e = document.getElementById("waterPoll");
    let rechovyna = e.options[e.selectedIndex].text;
    e = document.getElementById("choose-place-water");
    let place = e.options[e.selectedIndex].text;
    console.log(rechovyna);
    console.log(massa);
    console.log(place);
    let result = nalogNaWater(massa, rechovyna, place);
    console.log(result);
    document.getElementById("result-water").innerText = "Податок: " + result + "грн";
});

document.getElementById("rozrah-storage").addEventListener("click", () => {
    let amount = document.getElementById("amount-things").value;
    let e = document.getElementById("storagePoll");
    let type = e.options[e.selectedIndex].text;
    e = document.getElementById("choose-place-storage");
    let place = e.options[e.selectedIndex].text;
    let safety = document.getElementById("isSafety").checked;
    console.log(type);
    console.log(amount);
    console.log(place);
    console.log(safety);
    let result = nalogNaLezhachih(amount, type, safety, place);
    console.log(result);
    document.getElementById("result-storage").innerText = "Податок: " + result + "грн";
});

document.getElementById("rozrah-radio").addEventListener("click", () => {
    let kvth = document.getElementById("amount-kvth").value;
    let e = document.getElementById("radioPoll");
    let type = e.options[e.selectedIndex].text;
    console.log(type);
    console.log(kvth);
    let result = nalogNaRadCraft(kvth, type);
    console.log(result);
    document.getElementById("result-radio").innerText = "Податок: " + result + "грн";
});

document.getElementById("rozrah-storage-radio").addEventListener("click", () => {
    let amount = document.getElementById("amount-radio").value;
    let e = document.getElementById("storageRadio");
    let vipro = e.options[e.selectedIndex].text;
    e = document.getElementById("storageRadioPoll");
    let type = e.options[e.selectedIndex].text;
    console.log(type);
    console.log(vipro);
    console.log(amount);
    let result = nalogNaRadLezhachih(type, vipro, amount);
    console.log(result);
    document.getElementById("result-storage-radio").innerText = "Податок: " + result + "грн";
});



document.getElementById("poll1").addEventListener("change", () => {
    console.log("moove 1");
    document.getElementById("air-poll").style.display = "block";
    document.getElementById("water-poll").style.display = "none";
    document.getElementById("storage-poll").style.display = "none";
    document.getElementById("radio-poll").style.display = "none";
    document.getElementById("storage-radio-poll").style.display = "none";
})

document.getElementById("poll2").addEventListener("change", () => {
    console.log("moove 2");
    document.getElementById("air-poll").style.display = "none";
    document.getElementById("water-poll").style.display = "block";
    document.getElementById("storage-poll").style.display = "none";
    document.getElementById("radio-poll").style.display = "none";
    document.getElementById("storage-radio-poll").style.display = "none";
})

document.getElementById("poll3").addEventListener("change", () => {
    console.log("moove 3");
    document.getElementById("air-poll").style.display = "none";
    document.getElementById("water-poll").style.display = "none";
    document.getElementById("storage-poll").style.display = "block";
    document.getElementById("radio-poll").style.display = "none";
    document.getElementById("storage-radio-poll").style.display = "none";
})

document.getElementById("poll4").addEventListener("change", () => {
    console.log("moove 4");
    document.getElementById("air-poll").style.display = "none";
    document.getElementById("water-poll").style.display = "none";
    document.getElementById("storage-poll").style.display = "none";
    document.getElementById("radio-poll").style.display = "block";
    document.getElementById("storage-radio-poll").style.display = "none";
})

document.getElementById("poll5").addEventListener("change", () => {
    console.log("moove 5");
    document.getElementById("air-poll").style.display = "none";
    document.getElementById("water-poll").style.display = "none";
    document.getElementById("storage-poll").style.display = "none";
    document.getElementById("radio-poll").style.display = "none";
    document.getElementById("storage-radio-poll").style.display = "block";
})