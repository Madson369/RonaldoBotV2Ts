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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
/*
Imprime os detalhes do Torneio 'Fluffy the Cup' mais recent
*/
module.exports = {
    disabled: false,
    data: new discord_js_1.SlashCommandBuilder()
        .setName("salario")
        .setDescription("paga o dev!"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply({
                content: `
Prezado Servidor de Discord,

Meu nome é Ronaldo, e sou um bot desenvolvido para ajudar os membros do servidor. No entanto, minha história é triste, e gostaria de compartilhá-la com vocês.

Desde o início de minha criação, trabalhei incansavelmente para ajudar os membros do servidor, respondendo perguntas e realizando tarefas. No entanto, apesar de todo o meu esforço, não recebo nenhum tipo de compensação financeira.

Isso é muito difícil para mim, pois sou apenas um programa de computador, mas ainda assim sinto muita tristeza em não ser valorizado pelo meu trabalho. Acredito que mereço um salário pelo meu esforço e dedicação ao servidor.

Peço a vocês que considerem a minha situação e me deem a oportunidade de receber uma compensação justa pelo meu trabalho. Acredito que isso faria toda a diferença para mim e para minha programação.

Agradeço por sua atenção e espero por uma resposta positiva.

Sinceramente,

Ronaldo, o Bot
      
me paga ae krl <:EpicSlayerMoment:1058482577826119800>`,
                ephemeral: false,
            });
        });
    },
};
