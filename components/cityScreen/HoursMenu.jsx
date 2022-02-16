import Slider from '@react-native-community/slider';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setHourly, isHourly } from '../../slices/hourlySlice';

const timeCalcul = (nb) => {
	const myDate = new Date();
	myDate.setHours(myDate.getHours() + nb);

	let time = myDate.getHours();

	let finalTime;
	if (time < 10) {
		finalTime = '0' + myDate.getHours() + ':00';
	}
	if (time >= 10) {
		finalTime = myDate.getHours() + ':00';
	}

	return finalTime;
};

const sepBar = () => {
	return (
		<View
			style={{
				marginBottom: 20,

				width: '92%',
				flexDirection: 'row',
				justifyContent: 'space-around',
				position: 'absolute',
				top: 70,
				height: 10,
			}}
		>
			<View style={styles.vertiLine}></View>
			<View style={styles.vertiLineH}></View>
			<View style={styles.vertiLine}></View>
			<View style={styles.vertiLineH}></View>
			<View style={styles.vertiLine}></View>
			<View style={styles.vertiLineH}></View>
			<View style={styles.vertiLine}></View>
			<View style={styles.vertiLineH}></View>
			<View style={styles.vertiLine}></View>
			<View style={styles.vertiLineH}></View>
			<View style={styles.vertiLine}></View>
		</View>
	);
};

const HoursList = () => {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-around',

				width: '84%',
				marginTop: 5,
			}}
		>
			<Text style={styles.hoursNumber}>{timeCalcul(2)}</Text>
			<Text style={styles.hoursNumber}>{timeCalcul(7)}</Text>
			<Text style={styles.hoursNumber}>{timeCalcul(12)}</Text>
			<Text style={styles.hoursNumber}>{timeCalcul(17)}</Text>
			<Text style={styles.hoursNumber}>{timeCalcul(22)}</Text>
		</View>
	);
};

const setDataHours = (index, hourly) => {
	if (hourly) {
		return hourly[index];
	}
};

export default function HoursMenu() {
	const dispatch = useDispatch();
	const [range, setRange] = useState(0);
	const { data } = useSelector((state) => state.post);

	let time = range;

	useEffect(() => {
		if (time !== 0) {
			dispatch(isHourly(true));
		} else {
			dispatch(isHourly(false));
		}
		dispatch(setHourly(setDataHours(time, data?.hourly)));
	}, [time]);

	return (
		<View style={styles.mainHours}>
			<BlurView intensity={70} style={styles.blurDiv}>
				<Slider
					style={{ width: '92%', height: 50, marginTop: 30 }}
					minimumValue={0}
					maximumValue={20}
					minimumTrackTintColor="rgba(220,220,220, 0.3)"
					maximumTrackTintColor="rgba(220,220,220, 0.3)"
					thumbTintColor="#F6F2D4"
					value={0}
					onValueChange={(value) => setRange(value)}
					step={1}
					tapToSeek={true}
				/>
				{sepBar()}
				{HoursList()}
			</BlurView>
		</View>
	);
}

const styles = StyleSheet.create({
	mainHours: {
		height: 135,
		width: '100%',
		marginTop: 30,
	},
	blurDiv: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		flexDirection: 'column',
		borderRadius: 20,
		alignItems: 'center',
	},
	hoursNumber: {
		color: 'rgba(255,255,255, 0.7)',
		fontSize: 10,
		fontWeight: '400',
	},
	vertiLine: {
		backgroundColor: '#909090',
		height: '50%',
		width: 1,
	},
	vertiLineH: {
		backgroundColor: '#909090',
		height: '100%',
		width: 1,
	},
});
