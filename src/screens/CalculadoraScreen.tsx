import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';

enum Operadores {
  sumar, restar, multiplicar, dividir
}

export const CalculadoraScreen = () => {

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

  return (
    <View style={styles.calculadorContainer}>
      {
        numeroAnterior !== '0' &&
          <Text style={styles.resultadoPequeno}>{ numeroAnterior } </Text>
      }
      <Text 
        style={styles.resultado}
        adjustsFontSizeToFit
        numberOfLines={1}
      > 
        { numero }
      </Text>
      
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={ limpiar } />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={ positivoNegativo }/>
        <BotonCalc texto="del" color="#9B9B9B" accion={ btnDelete }/>
        <BotonCalc texto="/" color="#FF9427" accion={ btnDividir }/>
      </View>
      
      
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={ armarNumero }  />
        <BotonCalc texto="8" accion={ armarNumero } />
        <BotonCalc texto="9" accion={ armarNumero } />
        <BotonCalc texto="X" color="#FF9427" accion={ btnMultiplicar }/>
      </View>
      
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={ armarNumero }  />
        <BotonCalc texto="5"  accion={ armarNumero } />
        <BotonCalc texto="6"  accion={ armarNumero } />
        <BotonCalc texto="-" color="#FF9427" accion={ btnRestar } />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="1" accion={ armarNumero }  />
        <BotonCalc texto="2"  accion={ armarNumero } />
        <BotonCalc texto="3"  accion={ armarNumero } />
        <BotonCalc texto="+" color="#FF9427" accion={ btnSumar } />
      </View>
      
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={ armarNumero } />
        <BotonCalc texto="." accion={ armarNumero } />
        <BotonCalc texto="=" color="#FF9427" accion={ calcular }/>
      </View>
      
    </View>
  )
}

