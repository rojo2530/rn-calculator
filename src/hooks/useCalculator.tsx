import { useRef, useState } from "react";

enum Operators {
  sum, subtraction, multiply, divide
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');
  //we use ref for saving last operation, not need reload ui
  const lastOperation = useRef<Operators>();

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
  }

  const buildNumber = (textoNumero: string) => {
    if (number.includes('.') && textoNumero === '.') {
      return;
    }

    if (number.startsWith('0') || number.startsWith('-0')) {
      if (textoNumero === '.') {
        setNumber(number + textoNumero);
      } else if( textoNumero === '0' && number.includes('.')) {
        setNumber(number + textoNumero);
      } else if (textoNumero !== '0' && !number.includes('.')) {
        setNumber(textoNumero);
      } else if (textoNumero === '0' && !number.includes('.')) {
        setNumber(number);
      } else {
        setNumber(number + textoNumero);
      }
    } else {
      setNumber(number + textoNumero);
    }
  }

  const positiveNegative = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''))
    } else {
      setNumber('-' + number);
    }
  }

  const btnDelete = () => {
    if (number.length === 1) {
      setNumber('0');
    } else if (number.length === 2 && number.includes('-')) {
      setNumber('0');
    } else {
      setNumber(number.slice(0, -1)); 
    }
  }

  const changeNumberForPrevious = () => {
    if (number.endsWith('.')) {
      setPreviousNumber(number.slice(0,-1));
    } else {
      setPreviousNumber(number);
    }
    
    setNumber('0');
  }

  const btnDivide = () => {
    changeNumberForPrevious();
    lastOperation.current = Operators.divide;
  }

  const btnSum = () => {
    changeNumberForPrevious();
    lastOperation.current = Operators.sum;
  }

  const btnSubtraction = () => {
    changeNumberForPrevious();
    lastOperation.current = Operators.subtraction;
  }

  const btnMultiply = () => {
    changeNumberForPrevious();
    lastOperation.current = Operators.multiply;
  }

  const calculate = () => {
    const num1 = Number(number);
    const num2 = Number(previousNumber);

    if (number === '0' && previousNumber === '0' && lastOperation.current === Operators.divide) {
      setNumber('0');
      return;
    }

    switch (lastOperation.current) {
      case Operators.sum:
        setNumber(`${ num1 + num2 }`);
        break;
    
      case Operators.subtraction:
        setNumber(`${ num2 - num1 }`);
        break;
        
      case Operators.multiply:
        setNumber(`${ num1 * num2 }`);
        break;
      
      case Operators.divide:
        setNumber(`${ num2 / num1 }`);
        break;
    }

    setPreviousNumber('0');
  }

  return {
    previousNumber,
    number,
    clean,
    positiveNegative,
    btnDelete,
    btnDivide,
    btnSubtraction,
    btnSum,
    btnMultiply,
    buildNumber,
    calculate,
  }
}
