const e = require("express")

//ready
let airPollution = {
    rechovina: [
        "Азоту оксиди",
        "Аміак",
        "Ангідрид сірчистий",
        "Ацетон",
        "Бензопірпен",
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
    let nalog = airPollution.podatok[airPollution.rechovina.findIndex(rechovyna)];
    return nalog * amount;
}

//ready
function nalogNaVodu(amount, rechovyna, place) {
    let nalog = waterPollution.podatok[waterPollution.rechovina.findIndex(rechovyna)];
    if (place == "Ставки чи озера") {
        return nalog * amount * 1.5;
    }
    else {
        return nalog * amount;
    }
}

//ready
function nalogNaLezhachih(amount, thing, safety, place) {
    let nalog = lezhachiVidhody.podatok[lezhachiVidhody.things.findIndex(thing)];
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
function nalogNaRadLezhachih(type, kuby) {
    if (type == "Високоактивні") {
        let nalog = lezhachiNuclearVidhody.podatokNaRadNeIon[lezhachiNuclearVidhody.type.findIndex(type)];
        return nalog * kuby;
    }
    else {
        let nalog = lezhachiNuclearVidhody.podatokNaRadIon[lezhachiNuclearVidhody.type.findIndex(type)];
        return nalog * kuby;
    }
}