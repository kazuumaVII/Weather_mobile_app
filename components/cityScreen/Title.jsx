import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { KEY_WEATHER_ONE_CALL } from '../../other/KeyApi';

const Title = () => {
	const [city, setCity] = useState('');
	const { location } = useSelector((state) => state.location);
	const { data } = useSelector((state) => state.post);

	const { hourly } = useSelector((state) => state.hourly);
	const { isDataHourly } = useSelector((state) => state.hourly);

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
		<View style={styles.mainTitle}>
			{data ? (
				<>
					<Text
						style={{
							fontSize: 40,
							textAlign: 'center',
							color: 'white',
							fontWeight: '400',
						}}
					>
						{city}
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
							{!isDataHourly ? Math.round(data?.current.temp) : Math.round(hourly?.temp)}
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
						{!isDataHourly ? data?.current.weather[0].description : hourly.weather[0].description}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-around',
							width: 145,
							alignSelf: 'center',
						}}
					>
						<Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Max : {Math.round(data?.daily[0].temp.max)}°</Text>
						<Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Min : {Math.round(data?.daily[0].temp.min)}°</Text>
					</View>
				</>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	mainTitle: {
		marginTop: 70,
		color: 'white',
	},
});

export default Title;
