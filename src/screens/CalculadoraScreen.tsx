import React from 'react'
import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/appTheme';
import { useCalculator } from '../hooks/useCalculator';

export const CalculadoraScreen = () => {

  const { 
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
    calculate
  } = useCalculator();
  
  return (
    <View style={styles.calculadorContainer}>
      {
        previousNumber !== '0' &&
          <Text style={styles.resultadoPequeno}>{ previousNumber } </Text>
      }
      <Text 
        style={styles.resultado}
        adjustsFontSizeToFit
        numberOfLines={1}
      > 
        { number }
      </Text>
      
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={ clean } />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={ positiveNegative }/>
        <BotonCalc texto="del" color="#9B9B9B" accion={ btnDelete }/>
        <BotonCalc texto="/" color="#FF9427" accion={ btnDivide }/>
      </View>
      
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={ buildNumber }  />
        <BotonCalc texto="8" accion={ buildNumber } />
        <BotonCalc texto="9" accion={ buildNumber } />
        <BotonCalc texto="X" color="#FF9427" accion={ btnMultiply }/>
      </View>
      
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={ buildNumber }  />
        <BotonCalc texto="5"  accion={ buildNumber } />
        <BotonCalc texto="6"  accion={ buildNumber } />
        <BotonCalc texto="-" color="#FF9427" accion={ btnSubtraction } />
      </View>

      <View style={styles.fila}>
        <BotonCalc texto="1" accion={ buildNumber }  />
        <BotonCalc texto="2"  accion={ buildNumber } />
        <BotonCalc texto="3"  accion={ buildNumber } />
        <BotonCalc texto="+" color="#FF9427" accion={ btnSum } />
      </View>
      
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={ buildNumber } />
        <BotonCalc texto="." accion={ buildNumber } />
        <BotonCalc texto="=" color="#FF9427" accion={ calculate }/>
      </View>
      
    </View>
  )
}

