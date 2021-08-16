import { useRef, useState } from "react";


enum Operadores {
  sumar, restar, multiplicar, dividir
}

export const useCalculator = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  //we use ref for saving last operation, not need reload ui
  const ultimaOperacion = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  }

  const armarNumero = (textoNumero: string) => {
    if (numero.includes('.') && textoNumero === '.') {
      return;
    }

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      if (textoNumero === '.') {
        setNumero(numero + textoNumero);
      } else if( textoNumero === '0' && numero.includes('.')) {
        setNumero(numero + textoNumero);
      } else if (textoNumero !== '0' && !numero.includes('.')) {
        setNumero(textoNumero);
      } else if (textoNumero === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + textoNumero);
      }
    } else {
      setNumero(numero + textoNumero);
    }
  }

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''))
    } else {
      setNumero('-' + numero);
    }
  }

  const btnDelete = () => {
    if (numero.length === 1) {
      setNumero('0');
    } else if (numero.length === 2 && numero.includes('-')) {
      setNumero('0');
    } else {
      setNumero(numero.slice(0, -1)); 
    }
  }

  const cambiarNumPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0,-1));
    } else {
      setNumeroAnterior(numero);
    }
    
    setNumero('0');
  }

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  }

  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  }

  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  }

  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  }

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    if (numero === '0' && numeroAnterior === '0' && ultimaOperacion.current === Operadores.dividir) {
      setNumero('0');
      return;
    }

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${ num1 + num2 }`);
        break;
    
      case Operadores.restar:
        setNumero(`${ num2 - num1 }`);
        break;
        
      case Operadores.multiplicar:
        setNumero(`${ num1 * num2 }`);
        break;
      
      case Operadores.dividir:
        setNumero(`${ num2 / num1 }`);
        break;
    }

    setNumeroAnterior('0');
  }

  return {
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnRestar,
    btnSumar,
    btnMultiplicar,
    armarNumero,
    calcular,
     
  }
}
