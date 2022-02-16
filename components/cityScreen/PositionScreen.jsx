import React from 'react';
import { ImageBackground, View } from 'react-native';
import { useSelector } from 'react-redux';
import { isBackGround } from '../../other/other';
import DayMenu from './DayMenu';
import HoursMenu from './HoursMenu';
import InfoMenu from './InfoMenu';
import Title from './Title';

export default function PositionScreen({ data }) {
	const { hourly } = useSelector((state) => state.hourly);
	const { isDataHourly } = useSelector((state) => state.hourly);

	return (
		<ImageBackground
			source={isBackGround(!isDataHourly ? data?.current.weather[0].description : hourly.weather[0].description)}
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
				<Title />
				<HoursMenu />
				<DayMenu />
				<InfoMenu />
			</View>
		</ImageBackground>
	);
}
