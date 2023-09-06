"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
function getMove(personagem, ataque) {
    return __awaiter(this, void 0, void 0, function* () {
        let arr = [
            "Bridget",
            "Happy_Chaos",
            "I-No",
            "Goldlewis_Dickinson",
            "Giovanna",
            "Zato-1",
            "May",
            "Ramlethal_Valentine",
            "Potemkin",
            "Ky_Kiske",
            "Sol_Badguy",
            "Axl_Low",
            "Faust",
            "Chipp_Zanuff",
            "Millia_Rage",
            "Leo_Whitefang",
            "Anji_Mito",
            "Nagoriyuki",
            "Jack-O",
            "Baiken",
            "Sin_Kiske",
            "Testament",
            "Bedman",
            "Asuka_R",
            "Johnny"
        ];
        let Name = arr.find((nome) => {
            return nome
                .replace("-", "")
                .replace("_", "")
                .toLowerCase()
                .match(personagem
                .toLowerCase()
                .replace("-", "")
                .replace("_", "")
                .replace(" ", ""));
        });
        if (!Name) {
            return "Personagem não encontrado";
        }
        if (Name === "Ky_Kiske" && ataque.toLowerCase() === "rtl") {
            ataque = "Ride the Lightning";
        }
        const handleData = (info, sectionId, type) => {
            const $ = cheerio_1.default.load(info);
            const section = $(sectionId);
            const regex = /href="\S+?[Hh]itbox.*?png"/g;
            const noHitboxRegex = /href="\S+?.*?png"/g;
            let arrayUrl = [];
            const rowsnaldos = section.find("table tbody");
            const rows = section.find("table tbody tr");
            rowsnaldos.each((i, rowsnaldo) => {
                const cells = $(rowsnaldo).find("tr");
                cells.each((i, cell) => {
                    var _a, _b, _c, _d;
                    const urlSource = $(cell).attr("data-details");
                    if (urlSource === null || urlSource === void 0 ? void 0 : urlSource.match(regex)) {
                        arrayUrl.push((_b = (_a = urlSource === null || urlSource === void 0 ? void 0 : urlSource.match(regex)) === null || _a === void 0 ? void 0 : _a.at(-1)) !== null && _b !== void 0 ? _b : '');
                        return;
                    }
                    if (urlSource === null || urlSource === void 0 ? void 0 : urlSource.match(noHitboxRegex)) {
                        arrayUrl.push((_d = (_c = urlSource === null || urlSource === void 0 ? void 0 : urlSource.match(noHitboxRegex)) === null || _c === void 0 ? void 0 : _c.at(-1)) !== null && _d !== void 0 ? _d : '');
                        return;
                    }
                    arrayUrl.push("");
                });
            });
            const data = [];
            rows.each((i, row) => {
                const cells = $(row).find("td");
                const rowData = [];
                cells.each((i, cell) => {
                    rowData.push($(cell).text());
                });
                data.push(rowData);
            });
            if (type === "normal") {
                const moveArray = data.map((move, index) => {
                    var _a, _b;
                    return {
                        input: move[1],
                        damage: move[2],
                        guard: move[3],
                        startup: move[4],
                        active: move[5],
                        recovery: move[6],
                        onBlock: move[7],
                        onHit: move[8],
                        atkLevel: move[9],
                        counterType: move[10],
                        invul: (_a = move[11]) !== null && _a !== void 0 ? _a : "",
                        proration: move[12],
                        riscGain: move[13],
                        riscLoss: move[14],
                        character: (_b = Name === null || Name === void 0 ? void 0 : Name.replace("_", " ")) !== null && _b !== void 0 ? _b : '',
                        url: arrayUrl[index].replace('href="', "").replace('"', ""),
                    };
                });
                return moveArray;
            }
            const moveArray = data.map((move, index) => {
                var _a, _b;
                return {
                    input: move[1],
                    name: move[2],
                    damage: move[3],
                    guard: move[4],
                    startup: move[5],
                    active: move[6],
                    recovery: move[7],
                    onBlock: move[8],
                    onHit: move[9],
                    atkLevel: move[10],
                    counterType: move[11],
                    invul: (_a = move[12]) !== null && _a !== void 0 ? _a : "",
                    proration: move[13],
                    riscGain: move[14],
                    riscLoss: move[15],
                    character: (_b = Name === null || Name === void 0 ? void 0 : Name.replace("_", " ")) !== null && _b !== void 0 ? _b : '',
                    url: arrayUrl[index].replace('href="', "").replace('"', ""),
                };
            });
            return moveArray;
        };
        let moves;
        const getImage = (url) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('url: ', url);
            if (!url)
                return '';
            const response = yield axios_1.default.get(`https://dustloop.com/${url}`);
            const $ = cheerio_1.default.load(response.data);
            const imageDiv = $(".fullImageLink");
            const image = imageDiv.find("img");
            url = (_a = image.attr("src")) !== null && _a !== void 0 ? _a : '';
            let newUrl = url.split("?")[0];
            return newUrl;
        });
        const getData = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://dustloop.com/wiki/index.php?title=GGST/${Name}/Frame_Data`);
            let normals = handleData(response.data, "#section-collapsible-3", "normal");
            let specials = handleData(response.data, "#section-collapsible-4");
            let overdrives = handleData(response.data, "#section-collapsible-5");
            moves = [...normals, ...specials, ...overdrives];
            //Filters the move list by lowercase search of ataque variable (Twice?)
            const moveArray = moves.filter((move) => {
                var _a;
                return (((_a = move.name) === null || _a === void 0 ? void 0 : _a.replace(/\./g, "").toLowerCase().includes(ataque.replace(/\./g, "").toLowerCase())) ||
                    move.input.replace(/\./g, "").toLowerCase() ===
                        ataque.replace(/\./g, "").toLowerCase());
            });
            const teste = yield Promise.all(moveArray.map((move) => __awaiter(this, void 0, void 0, function* () {
                console.log('move: ', move);
                let image = yield getImage(move.url);
                return Object.assign(Object.assign({}, move), { url: image });
            })));
            return teste;
        });
        return getData();
    });
}
exports.default = getMove;
