export const aplicarmascaraCPF = (valor) => {
  valor = valor.replace(/\D/g, "");

  if (valor.length <= 11) {
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return valor;
};

export const aplicarmascaraCEP = (valor) => {
  valor = valor.replace(/\D/g, "");

  if (valor.length <= 8) {
    valor = valor.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2-$3");
  }
  return valor;
};

export const aplicarmascaraSEI = (valor) => {
  valor = valor.replace(/\D/g, "");
  if (valor.length <= 22) {
    valor = valor.replace(/(\d{10})(\d{6})(\d{4})(\d{2})/, "$1.$2/$3-$4");
  }
  return valor;
};
export const aplicarmascaraCNPJ = (valor) => {
  valor = valor.replace(/\D/g, "");
  if (valor.length <= 14) {
    valor = valor.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  return valor;
};

export const aplicarmascaraRG = (valor) => {
  valor = valor.replace(/\D/g, "");

  if (valor.length <= 8) {
    valor = valor.replace(/(\d{1,2})(\d{3})(\d{3})/, "$1.$2.$3");
  }
  return valor;
};

