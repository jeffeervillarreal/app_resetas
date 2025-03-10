import React, { useState } from "react";
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";

function MisRecetasScreen() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [misRecetas, setMisRecetas] = useState([]);

  const agregarReceta = () => {
    if (titulo.trim() && descripcion.trim()) {
      setMisRecetas([...misRecetas, { id: Date.now().toString(), title: titulo, descripcion, image: imagen }]);
      setTitulo("");
      setDescripcion("");
      setImagen(null);
    }
  };

  const seleccionarImagen = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets) {
        setImagen(response.assets[0].uri);
      }
    });
  };

  const eliminarReceta = (id) => {
    setMisRecetas(misRecetas.filter((receta) => receta.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir Nueva Receta</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta..."
        value={titulo}
        onChangeText={setTitulo}
      />
      
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción..."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />
      
      <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {imagen && <Image source={{ uri: imagen }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.addButton} onPress={agregarReceta}>
        <Text style={styles.addButtonText}>Agregar Receta</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Mis Recetas</Text>

      <FlatList
        data={misRecetas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recetaItem}>
            {item.image && <Image source={{ uri: item.image }} style={styles.recetaImagen} />}
            <View style={styles.recetaInfo}>
              <Text style={styles.recetaNombre}>{item.title}</Text>
              <Text style={styles.recetaDescripcion}>{item.descripcion}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => eliminarReceta(item.id)}>
              <Icon name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4d6d",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4d6d",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "#ff85a2",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  imageButton: {
    backgroundColor: "#d5d7dd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#ff4d6d",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  recetaItem: {
    flexDirection: "row",
    backgroundColor: "#ffe4e1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  recetaImagen: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  recetaInfo: {
    flex: 1,
    marginLeft: 10,
  },
  recetaNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff4d6d",
  },
  recetaDescripcion: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#ff4d6d",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
});

export default MisRecetasScreen;
