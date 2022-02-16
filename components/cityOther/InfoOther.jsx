import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

export default function InfoOther({ dataBase }) {
	const { hourly } = useSelector((state) => state.hourly);
	const { isDataHourly } = useSelector((state) => state.hourly);

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 30 }}>
			<BlurView intensity={70} style={styles.container}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<MaterialCommunityIcons name="weather-windy" size={20} color={'rgba(255, 255, 255, 0.5)'} />
					<Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', marginLeft: 4 }}>VENT</Text>
				</View>
				<View style={{ alignSelf: 'center', marginTop: 7 }}>
					<Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: '500' }}>
						{!isDataHourly ? Math.round(dataBase?.current.wind_speed) : Math.round(hourly.wind_speed)}
					</Text>
					<Text style={{ fontSize: 17, color: 'white' }}>km/h</Text>
				</View>
			</BlurView>
			<BlurView intensity={70} style={styles.container}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Feather name="sunset" size={20} color={'rgba(255, 255, 255, 0.5)'} />
					<Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', marginLeft: 8 }}>HUMIDITÉ</Text>
				</View>
				<View style={{ alignSelf: 'center', marginTop: 16 }}>
					<Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: '500' }}>
						{Math.round(dataBase.current.humidity)}%
					</Text>
				</View>
			</BlurView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		width: 160,
		height: 130,
		overflow: 'hidden',
		padding: 15,
		marginTop: -10,
	},
});
