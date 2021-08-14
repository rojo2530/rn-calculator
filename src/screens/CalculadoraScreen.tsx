import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';

export const CalculadoraScreen = () => {

  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  }

  const armarNumero = (textoNumero: string) => {
    setNumero(numero + textoNumero);
  }

  return (
    <View style={styles.calculadorContainer}>
      <Text style={styles.resultadoPequeno}>{ numeroAnterior } </Text>
      <Text style={styles.resultado}>{ numero }</Text>
      
      <View style={styles.fila}>
        {/*Boton*/}
        
        <BotonCalc texto="C" color="#9B9B9B" accion={ limpiar } />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={ limpiar }/>
        <BotonCalc texto="del" color="#9B9B9B" accion={ limpiar }/>
        <BotonCalc texto="/" color="#FF9427" accion={ limpiar }/>
      </View>
      <View style={styles.fila}>
        {/*Boton*/}
        
        <BotonCalc texto="7" accion={ armarNumero }  />
        <BotonCalc texto="8" accion={ armarNumero } />
        <BotonCalc texto="9" accion={ armarNumero } />
        <BotonCalc texto="X" color="#FF9427" accion={ limpiar }/>
      </View>
      <View style={styles.fila}>
        {/*Boton*/}
        
        <BotonCalc texto="4" accion={ armarNumero }  />
        <BotonCalc texto="5"  accion={ armarNumero } />
        <BotonCalc texto="6"  accion={ armarNumero } />
        <BotonCalc texto="-" color="#FF9427" accion={ limpiar } />
      </View>
      <View style={styles.fila}>
        {/*Boton*/}
        
        <BotonCalc texto="0" ancho accion={ armarNumero } />
        <BotonCalc texto="." accion={ armarNumero } />
        <BotonCalc texto="=" color="#FF9427" accion={ limpiar }/>
      </View>
      
    </View>
  )
}
