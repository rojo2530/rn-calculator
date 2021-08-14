import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'black'
  },
  resultado: {
    color: 'white',
    fontSize: 60,
    textAlign: 'right',
    paddingHorizontal: 20
  },
  resultadoPequeno: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 30,
    textAlign: 'right',
    paddingHorizontal: 20
  },
  calculadorContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'flex-end'
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
  },
  boton: {
    height: 80,
    width: 80,
    backgroundColor: '#9B9B9B',
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
    //flex: 1
  },
  botonTexto: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    padding: 10,
    fontWeight: '300'
  }    
});