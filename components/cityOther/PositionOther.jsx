import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { useSelector } from 'react-redux';
import { KEY_WEATHER_ONE_CALL } from '../../other/KeyApi';
import { isBackGround } from '../../other/other';
import DayMenu from './DayOther';
import HoursMenu from './HoursOther';
import InfoMenu from './InfoOther';
import Title from './TitleOther';

export default function PositionOther({ dataFireBase }) {
	const [dataBase, setDataBase] = useState([]);
	const [loading, setLoading] = useState(false);

	const { hourly } = useSelector((state) => state.hourly);
	const { isDataHourly } = useSelector((state) => state.hourly);

	const fetchDataCurrent = async () => {
		try {
			const { data } = await axios.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${dataFireBase.data.location.lat}&lon=${dataFireBase.data.location.lon}&exclude=minutely&lang=fr&units=metric&appid=${KEY_WEATHER_ONE_CALL}`,
			);
			setDataBase(data);
			setLoading(true);
		} catch (err) {
			console.error(err.response);
		}
	};

	useEffect(() => {
		fetchDataCurrent();
	}, []);

	return loading ? (
		<ImageBackground
			source={isBackGround(!isDataHourly ? dataBase?.current.weather[0].description : hourly.weather[0].description)}
			resizeMode="cover"
			style={{ width: '100%', height: '100%' }}
		>
			<View
				style={{
					flexDirection: 'column',
					alignItems: 'center',
					paddingHorizontal: 15,
					width: '100%',
					height: '100%',
				}}
			>
				<Title dataFireBase={dataFireBase} dataBase={dataBase} />
				<HoursMenu dataBase={dataBase} />
				<DayMenu dataBase={dataBase} />
				<InfoMenu dataBase={dataBase} />
			</View>
		</ImageBackground>
	) : null;
}
