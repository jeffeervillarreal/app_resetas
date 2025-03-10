import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { buscarRecetas } from './api';

function HomeScreen({ navigation, favoritos, setFavoritos }) {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargarRecetas = async () => {
      const recetas = await buscarRecetas(busqueda || 'pasta');
      setRecetas(recetas);
    };
    cargarRecetas();
  }, [busqueda]);

  const toggleFavorito = (receta) => {
    if (favoritos.some((fav) => fav.id === receta.id)) {
      setFavoritos(favoritos.filter((fav) => fav.id !== receta.id));
    } else {
      setFavoritos([...favoritos, receta]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca tu receta</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de una receta..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={recetas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recetaItem}>
            <TouchableOpacity onPress={() => navigation.navigate('DetallesReceta', { id: item.id })}>
              <Image source={{ uri: item.image }} style={styles.recetaImagen} />
            </TouchableOpacity>
            <View style={styles.recetaInfo}>
              <Text style={styles.recetaNombre}>{item.title}</Text>
              <TouchableOpacity onPress={() => toggleFavorito(item)}>
                <Text style={styles.favText}>{favoritos.some((fav) => fav.id === item.id) ? '💖' : '🤍'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  recetaItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    elevation: 3,
  },
  recetaImagen: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  recetaInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  recetaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  favButton: {
    padding: 10,
  },
  favText: {
    fontSize: 20,
  },
});

export default HomeScreen;
