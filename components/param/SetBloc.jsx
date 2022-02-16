import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import dataFireBase from '../../config/fireBase';
import BlocLocation from './BlocLocation';

export default function SetBloc() {
	const [data, setData] = useState([]);

	const deleteData = async (id) => {
		const ref = doc(dataFireBase, 'test', id);
		await deleteDoc(ref);
	};

	useEffect(() => {
		const fetchFireBase = async () => {
			const ref = collection(dataFireBase, 'test');

			await getDocs(ref).then((snapshot) => {
				let db = [];
				snapshot.docs.map((doc) => {
					db.push({ ...doc.data(), id: doc.id });
				});
				setData(db);
			});
		};
		fetchFireBase();
	}, [data, setData]);

	return (
		<View style={{ marginTop: 20 }}>
			<ScrollView>
				{data.map((data) => (
					<View key={data.id}>
						<BlocLocation dataFireBase={data} deleteData={deleteData} />
					</View>
				))}
			</ScrollView>
		</View>
	);
}
