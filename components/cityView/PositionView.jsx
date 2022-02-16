import { View, Text, ImageBackground, PixelRatio } from 'react-native';
import React from 'react';
import TitleView from './TitleView';
import DayMenuView from './DayView';
import Info from './InfoView';

export default function PositionView() {
	return (
		<View
			style={{
				flexDirection: 'column',
				alignItems: 'center',
				paddingHorizontal: 15,
				width: '100%',
				height: '100%',
			}}
		>
			<TitleView />
			<DayMenuView />
			<Info />
		</View>
	);
}
