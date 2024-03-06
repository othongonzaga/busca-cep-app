import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App(){
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);


  async function buscar(){
    if(cep == ''){
      alert('Digite um cep valido');
      setCep('');
      return; //
    }

    try{
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss(); //Garantir que o teclado sera fechado!

    }catch(error){
      console.log('ERROR: ' + error);
    }


  }

  function limpar(){
    setCep('');
    inputRef.current.focus();
    setCepUser(null);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', paddingTop:20,}}>
        <Text style={styles.text}>Digite o cep desejado</Text>
        <TextInput
        style={styles.input}
        placeholder="Ex: 79003241"
        value={cep}
        onChangeText={ (texto) => setCep(texto) }
        keyboardType="numeric"
        ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <TouchableOpacity 
        style={[styles.botao, { backgroundColor: '#1d75cd' }]}
        onPress={ buscar }
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.botao, { backgroundColor: '#cd3e1d' }]}
        onPress={ limpar }
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>


      { cepUser &&
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
          <Text style={styles.itemText}>DDD: {cepUser.ddd}</Text>          
        </View>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding: 25,
    backgroundColor: '#D3D3D3',
  },
  text:{
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input:{
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    width: '90%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-around',
    paddingBottom: 50
  },
  botao:{
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
   padding: 10,
   borderRadius: 15,
  },
  botaoText:{
    fontSize: 22,
    color:'#FFF'
  },
  resultado:{
    flex:0.8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  itemText:{
    fontSize: 21,
    textAlign: 'center'
  }
});