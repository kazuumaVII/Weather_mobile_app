import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const DayAsString = (dayIndex) => {
	var weekdays = new Array(7);
	weekdays[0] = 'Lundi';
	weekdays[1] = 'Mardi';
	weekdays[2] = 'Mercredi';
	weekdays[3] = 'Jeudi';
	weekdays[4] = 'Vendredi';
	weekdays[5] = 'Samedi';
	weekdays[6] = 'Dimanche';

	return weekdays[dayIndex];
};

const choiceIcon = (temp) => {
	let image = '';
	let color = '';

	if (temp === '02d') {
		image = 'ios-partly-sunny-sharp';
		color = 'white';
	}
	if (temp === '03d' || temp === '04d') {
		image = 'ios-cloudy';
		color = 'white';
	}
	if (temp === '01d') {
		image = 'sunny';
		color = 'orange';
	}
	if (temp === '10d') {
		image = 'md-rainy-sharp';
		color = 'rgb(22,138,173)';
	}
	if (temp === '13d') {
		image = 'md-snow-sharp';
		color = 'white';
	}
	return <Ionicons name={image} size={20} color={color} style={{ marginTop: 10 }} />;
};

const DayBloc = (index, tempMax, tempMin, img) => {
	const GetDates = (startDate, daysToAdd) => {
		var aryDates = [];

		for (var i = -1; i <= daysToAdd; i++) {
			var currentDate = new Date();
			currentDate.setDate(startDate.getDate() + i);
			aryDates.push(DayAsString(currentDate.getDay()));
		}

		return aryDates;
	};

	var startDate = new Date();
	var aryDates = GetDates(startDate, 6);

	return (
		<View style={styles.mainDayBloc}>
			<Text style={{ color: 'white' }}>{aryDates[index]}</Text>
			{choiceIcon(img)}
			<Text style={{ color: 'white', marginBottom: 4, marginTop: 10 }}>{Math.round(tempMax)}°</Text>
			<Text style={{ color: 'white' }}>{Math.round(tempMin)}°</Text>
		</View>
	);
};

export default function DayMenu() {
	const [daysSelec, setDaysSelect] = useState('lalals');

	const { data } = useSelector((state) => state.post);

	return (
		<View style={styles.container}>
			<BlurView intensity={70} style={styles.blurDiv}>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizonta={true} scrollEnabled={true}>
					{data &&
						data.daily.map((data, index) => <View key={index}>{DayBloc(index, data.temp.max, data.temp.min, data.weather[0].icon)}</View>)}
				</ScrollView>
			</BlurView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		height: 120,
		width: '100%',
	},
	blurDiv: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 20,
	},
	mainDayBloc: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 10,
		marginTop: 0,
	},
});
