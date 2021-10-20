import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity, Text, View } from "react-native";
import axios from "axios";

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
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{
							uri:
								FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
							}}
						/>
						<TouchableOpacity 
							style={styles.button}
							onPress= {
								async () => {
									formData = new FormData();
									formData.append("fileData", {
										name: itemData.item,
										type: "image/jpg",
										uri: FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
									});
									let serverResponse;
									try {
										serverResponse = await axios({
											method:'post',
											url:"https://wildstagram.nausicaa.wilders.dev/upload",
											data: formData,
											headers: {
												"Content-Type": "multipart/form-data; ",
											},
										})
										if (serverResponse.status === 200) {
											alert("Uploaded");
										}
								
									} catch (err) {
										console.log(err);
										alert("Error");
									}
								}
							}
						>
						<Text  style={{color: "white"}}>Upload</Text>					
						</TouchableOpacity>
					</View>
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
	button: {
		alignItems: "center",
		backgroundColor: "grey",
		padding: 10
	},
	imageContainer: {
		margin: 10
	},
  });

export default ImagesScreen;