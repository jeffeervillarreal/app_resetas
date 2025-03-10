import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

function FavoritosScreen({ navigation, favoritos, setFavoritos }) {
  const toggleFavorito = (receta) => {
    setFavoritos(favoritos.filter((fav) => fav.id !== receta.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetas Favoritas</Text>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recetaItem}>
            <TouchableOpacity onPress={() => navigation.navigate('DetallesReceta', { id: item.id })}>
              <Image source={{ uri: item.image }} style={styles.recetaImagen} />
            </TouchableOpacity>
            <View style={styles.recetaInfo}>
              <Text style={styles.recetaNombre}>{item.title}</Text>
              <TouchableOpacity onPress={() => toggleFavorito(item)}>
                <Text style={styles.favText}>❌</Text>
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
    backgroundColor: "#fff0f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4d6d",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ff85a2",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  recetaItem: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  recetaImagen: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  recetaInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  recetaNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff4d6d",
  },
  favText: {
    fontSize: 20,
  },
});

export default FavoritosScreen;
