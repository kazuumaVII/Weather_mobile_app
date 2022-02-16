import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isBackGround } from '../../other/other';
import axios from 'axios';
import { KEY_WEATHER_ONE_CALL } from '../../other/KeyApi';

export default function MyLocation() {
	const { data } = useSelector((state) => state.post);
	const { location } = useSelector((state) => state.location);
	const [city, setCity] = useState('');

	const fetchNameCity = async () => {
		try {
			const { data } = await axios.post(
				`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&lang=fr&units=metric&appid=${KEY_WEATHER_ONE_CALL}`,
			);
			setCity(data.name);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchNameCity();
	}, [location]);

	return (
		<View style={{ width: '100%', height: 100, marginTop: 20 }}>
			<ImageBackground source={isBackGround(data?.current.weather[0].description)} resizeMode="cover" style={styles.img}>
				<View
					style={{
						padding: 10,
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '100%',
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<View>
							<Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>Ma position</Text>
							<Text style={styles.textSmall}>{city}</Text>
						</View>
						<View style={{}}>
							<Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>{Math.round(data.current.temp)}°</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Text style={styles.textSmall}>{data.current.weather[0].description}</Text>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'flex-end',
								width: 200,
							}}
						>
							<Text style={[styles.textSmall, { marginRight: 10 }]}>Max: {Math.round(data?.daily[0].temp.max)}°</Text>
							<Text style={styles.textSmall}>Min: {Math.round(data?.daily[0].temp.min)}°</Text>
						</View>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
	},
	textSmall: {
		color: 'rgba(255,255,255, 0.9)',
		fontSize: 14,
		fontWeight: '700',
	},
	img: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: 19,
	},
});
