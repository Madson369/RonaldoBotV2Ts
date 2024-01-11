"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const { Events } = require("discord.js");
module.exports = {
  name: Events.MessageCreate,
  execute(mensagem) {
    return __awaiter(this, void 0, void 0, function* () {
      {
        // const reactionEmoji = mensagem.guild.emojis.cache.find(
        //   (emoji) => emoji.name === "fluffy"
        // );
        //   if (mensagem.content.includes("trigger")) {
        //     mensagem.reply("teste!").then(/* ... */).catch(console.error);
        //     mensagem.react(reactionEmoji).then().catch(console.error);
        //     return;
        //   }
        if (mensagem.content.toLowerCase() === "chat") {
          const number = Math.random();
          if (number <= 0.05) {
            const opcoes = [
              "que foi",
              `"chat isso" "chat aquilo" how about you chat with some bitches huh? que tal em?            `,
              "capivara",
              "porfavor para o downplay",
              "pfvr pede pra dia me pagar to passando fome",
            ];
            const opcaoSelecionada =
              opcoes[Math.floor(Math.random() * opcoes.length)];
            mensagem
              .reply(opcaoSelecionada)
              .then(/* ... */)
              .catch(console.error);
            //   mensagem.react(reactionEmoji).then().catch(console.error);
            return;
          }
        }
        if (mensagem.content.toLowerCase() === "sabe") {
          const number = Math.random();
          if (number <= 0.1) {
            mensagem.reply("sei").then(/* ... */).catch(console.error);
            //   mensagem.react(reactionEmoji).then().catch(console.error);
            return;
          }
        }
        if (mensagem.content.includes("ky")) {
          if (Math.random() <= 0.04) {
            mensagem
              .reply("ky é muito based vdd")
              .then(/* ... */)
              .catch(console.error);
            //   mensagem.react(reactionEmoji).then().catch(console.error);
            return;
          }
        }
      }
    });
  },
};
