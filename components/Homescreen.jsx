import { EvilIcons } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { Dimensions, PixelRatio, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import dataFireBase from '../config/fireBase';
import BottomTab from '../navigation/BottomTab';
import PositionOther from './cityOther/PositionOther';
import PositionScreen from './cityScreen/PositionScreen';

export default function HomeScreen() {
	const [sliderState, setSliderState] = useState({ currentPage: 0 });
	const { width, height } = Dimensions.get('window');

	const { data } = useSelector((state) => state.post);

	const [dataBase, setDataBase] = useState([]);

	const setSliderPage = (event) => {
		const { currentPage } = sliderState;
		const { x } = event.nativeEvent.contentOffset;
		const indexOfNextScreen = Math.floor(x / width);
		if (indexOfNextScreen !== currentPage) {
			setSliderState({
				...sliderState,
				currentPage: indexOfNextScreen,
			});
		}
	};

	const { currentPage: pageIndex } = sliderState;

	useEffect(() => {
		const fetchFireBase = async () => {
			const ref = collection(dataFireBase, 'test');

			await getDocs(ref).then((snapshot) => {
				let db = [];
				snapshot.docs.map((doc) => {
					db.push({ ...doc.data(), id: doc.id });
				});
				setDataBase(db);
			});
		};
		fetchFireBase();
	}, [dataBase, setDataBase]);

	return (
		<>
			<ScrollView
				style={{}}
				horizontal={true}
				scrollEventThrottle={16}
				pagingEnabled={true}
				showsHorizontalScrollIndicator={false}
				onScroll={(event) => {
					setSliderPage(event);
				}}
			>
				<View style={{ width, height }}>
					<PositionScreen data={data} />
				</View>

				{dataBase.map((data) => (
					<View key={data.id} style={{ width, height }}>
						<PositionOther dataFireBase={data} />
					</View>
				))}
			</ScrollView>
			<View style={styles.paginationWrapper}>
				{Array.from(Array(dataBase.length + 1).keys()).map((key, index) => (
					<View key={index}>
						{index == 0 ? (
							<EvilIcons name="sc-telegram" color={'white'} size={17} style={{ opacity: pageIndex === index ? 1 : 0.2 }} />
						) : (
							<View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
						)}
					</View>
				))}
			</View>
			<BottomTab />
		</>
	);
}

const styles = StyleSheet.create({
	imageStyle: {
		height: PixelRatio.getPixelSizeForLayoutSize(135),
		width: '100%',
	},
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 30,
	},
	header: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	paragraph: {
		fontSize: 17,
	},
	paginationWrapper: {
		position: 'absolute',
		bottom: 35,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		zIndex: 1,
	},
	paginationDots: {
		height: 7,
		width: 7,
		borderRadius: 10 / 2,
		backgroundColor: 'white',
		marginLeft: 10,
	},
});
