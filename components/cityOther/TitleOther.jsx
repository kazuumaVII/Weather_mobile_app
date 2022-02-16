import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const TitleOther = ({ dataFireBase, dataBase }) => {
	const { hourly } = useSelector((state) => state.hourly);
	const { isDataHourly } = useSelector((state) => state.hourly);

	return (
		<View style={styles.mainTitle}>
			<Text
				style={{
					fontSize: 40,
					textAlign: 'center',
					color: 'white',
					fontWeight: '400',
				}}
			>
				{dataFireBase?.data.location.name}
			</Text>

			<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
				<Text
					style={{
						fontSize: 90,
						textAlign: 'center',
						color: 'white',

						fontWeight: '200',
					}}
				>
					{!isDataHourly ? Math.round(dataBase?.current.temp) : Math.round(hourly?.temp)}
				</Text>
				<Text
					style={{
						fontSize: 70,

						color: 'white',
						fontWeight: '200',
					}}
				>
					°
				</Text>
			</View>

			<Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>
				{!isDataHourly ? dataBase?.current.weather[0].description : hourly.weather[0].description}
			</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-around',
					width: 145,
					alignSelf: 'center',
				}}
			>
				<Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Max : {Math.round(dataBase?.daily[0].temp.max)}°</Text>
				<Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Min : {Math.round(dataBase?.daily[0].temp.min)}°</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainTitle: {
		marginTop: 70,
		color: 'white',
	},
});

export default TitleOther;
