import { Peli } from "./models";
import { PelisController } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

function analizoParamsParaAdd(res) {
  let resultadoParaAdd: Peli;

  if (res._[0] == "add") {
    resultadoParaAdd = {
      id: res.id,
      title: res.title,
      tags: res.tags,
    };
    return resultadoParaAdd;
  }
}

function analizoParamsParaGet(res) {
  if (res._[0] == "get") {
    return {
      id: res._[1],
    };
  } else if (res._[0] == "search") {
    if (res.title && res.tag) {
      return {
        title: res.title,
        tag: res.tag,
      };
    } else if (res.title) {
      return {
        title: res.title,
      };
    } else if (res.tag) {
      return {
        tag: res.tag,
      };
    }
  } else {
    return {};
  }
}

function main() {
  const controller = new PelisController();
  controller.promise.then(() => {
    const params = parseaParams(process.argv.slice(2));
    if (params._[0] == "add") {
      const objetoParams = analizoParamsParaAdd(params);
      controller.add(objetoParams);
    } else {
      const objetoParams = analizoParamsParaGet(params);
      controller.get(objetoParams);
    }
  });
}

main();
