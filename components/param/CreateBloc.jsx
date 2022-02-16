import React, { useState } from 'react';
import { Alert, ImageBackground, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import PositionView from '../cityView/PositionView';
import { isBackGround } from '../../other/other';
import { collection, addDoc } from 'firebase/firestore/lite';
import dataFireBase from '../../config/fireBase';

export default function CreateBloc({ setCreateBloc, setSearchKeyword }) {
	const [modalVisible, setModalVisible] = useState(true);

	const { data } = useSelector((state) => state.todays);

	const remoove = () => {
		setModalVisible(false);
		setCreateBloc(false);
		setSearchKeyword('');
	};

	const sendToFirestore = async () => {
		await addDoc(collection(dataFireBase, 'test'), {
			data,
		});
	};

	const addBloc = () => {
		sendToFirestore();
		setModalVisible(false);
		setCreateBloc(false);
		setSearchKeyword('');
	};

	console.log(data);

	return (
		<SafeAreaView>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setModalVisible(modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<ImageBackground source={isBackGround(data?.current?.condition?.text)} style={styles.img}>
								<View>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											marginTop: 20,
											marginHorizontal: 30,
										}}
									>
										<TouchableOpacity onPress={remoove}>
											<Text style={{ color: 'white', fontSize: 20 }}>Annuler</Text>
										</TouchableOpacity>
										<TouchableOpacity onPress={addBloc}>
											<Text style={{ color: 'white', fontSize: 20 }}>Ajouter</Text>
										</TouchableOpacity>
									</View>
									<PositionView />
								</View>
							</ImageBackground>
						</View>
					</View>
				</Modal>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		borderWidth: 1,

		marginTop: 50,
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 20,
		width: '100%',
		height: '100%',
	},
	img: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: 19,
	},
});
