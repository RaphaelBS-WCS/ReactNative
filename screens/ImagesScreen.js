import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList } from "react-native";

function ImagesScreen() {
	const [imagesURI, setImagesURI] = useState([]);
	useEffect(() => {
		(async () => {
		  const images = await FileSystem.readDirectoryAsync(
			FileSystem.cacheDirectory + "ImageManipulator"
		  );
		  setImagesURI(images)
		})();
	  }, []);
	return imagesURI.length > 0 ? (
		<FlatList
			data={imagesURI}
			keyExtractor={(imageURI) => imageURI}
			renderItem={(itemData) => {
				console.log("item", itemData);
				return (
				<Image
					style={styles.image}
					source={{
					uri:
						FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
					}}
				/>
				);
			}}
		/>
	) : null;
}

const styles = StyleSheet.create({
	image: {
	  resizeMode: "cover",
	  height: 500,
	},
  });

export default ImagesScreen;