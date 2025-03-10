import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { obtenerDetallesReceta } from "./api";
import Icon from "react-native-vector-icons/FontAwesome";

function DetallesRecetaScreen({ route, navigation }) {
  const [receta, setReceta] = useState(null);
  const { id } = route.params;

  useEffect(() => {
    const cargarDetalles = async () => {
      const detalles = await obtenerDetallesReceta(id);
      setReceta(detalles);
    };
    cargarDetalles();
  }, [id]);

  if (!receta) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Botón de Volver */}
      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={{ uri: receta.image }} style={styles.detalleImagen} />
      <Text style={styles.detalleNombre}>{receta.title}</Text>
      <Text style={styles.detalleDescripcion}>{receta.summary.replace(/<[^>]+>/g, "")}</Text>
      
      <Text style={styles.detalleTitulo}>Ingredientes:</Text>
      {receta.extendedIngredients.map((ingrediente, index) => (
        <Text key={index} style={styles.detalleTexto}>- {ingrediente.original}</Text>
      ))}

      <Text style={styles.detalleTitulo}>Instrucciones:</Text>
      <Text style={styles.detalleTexto}>{receta.instructions || "No hay instrucciones disponibles."}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
    padding: 20,
  },
  botonVolver: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#ff85a2",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  detalleImagen: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  detalleNombre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4d6d",
    marginBottom: 10,
    textAlign: "center",
  },
  detalleDescripcion: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "justify",
  },
  detalleTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4d6d",
    marginBottom: 10,
  },
  detalleTexto: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
});

export default DetallesRecetaScreen;
