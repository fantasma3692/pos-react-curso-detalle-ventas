
export function ConvertirCapitalize(input) {
    return (input.charAt(0).toUpperCase()+input.slice(1).toLowerCase());
  
  }
  export function ConvertirMinusculas(input){
    return input.toLowerCase()
  }
  export function FormatearNumeroDinero(numero){
    const numeroconvertido=numero.toLocaleString("es-PE",{style:"currency",currency:"PEN" })
    return numeroconvertido
  }