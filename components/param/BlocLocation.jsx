import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { isBackGround } from '../../other/other';

const LIST_ITEM_HEIGHT = 100;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;

const BlocLocation = ({ dataFireBase, deleteData }) => {
	const { data } = dataFireBase;

	const translateX = useSharedValue(0);
	const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
	const marginVertical = useSharedValue(10);
	const opacity = useSharedValue(1);

	const panGesture = useAnimatedGestureHandler({
		onActive: (event) => {
			translateX.value = event.translationX;
		},
		onEnd: () => {
			const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
			if (shouldBeDismissed) {
				translateX.value = withTiming(-SCREEN_WIDTH);
				itemHeight.value = withTiming(0);
				marginVertical.value = withTiming(0);
				opacity.value = withTiming(0, undefined, (isFinished) => {
					if (isFinished) {
						runOnJS(deleteData(dataFireBase.id));
					}
				});
			} else {
				translateX.value = withTiming(0);
			}
		},
	});

	const rStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	const rIconContainerStyle = useAnimatedStyle(() => {
		const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
		return { opacity };
	});

	const rTaskContainerStyle = useAnimatedStyle(() => {
		return {
			height: itemHeight.value,
			marginVertical: marginVertical.value,
			opacity: opacity.value,
		};
	});

	return (
		<Animated.View style={[styles.container, rTaskContainerStyle]}>
			<Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
				<Ionicons name="ios-trash" size={LIST_ITEM_HEIGHT * 0.3} color="white" />
			</Animated.View>
			<PanGestureHandler onGestureEvent={panGesture}>
				<Animated.View style={rStyle}>
					<ImageBackground source={isBackGround(data?.current?.condition?.text)} resizeMode="cover" style={styles.img}>
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
									<Text style={{ color: 'white', fontSize: 20, fontWeight: '800' }}>{data.location.name}</Text>
									<Text style={styles.textSmall}>{moment().format('HH:mm')}</Text>
								</View>
								<View style={{}}>
									<Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>{Math.round(data.current.temp_c)}°</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text style={styles.textSmall}>{data.current.condition.text}</Text>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'flex-end',
									}}
								>
									<Text style={[styles.textSmall, { marginRight: 10 }]}>Max:{Math.round(data?.forecast.forecastday[0].day.maxtemp_c)}</Text>
									<Text style={styles.textSmall}>Min:{Math.round(data?.forecast.forecastday[0].day?.mintemp_c)}</Text>
								</View>
							</View>
						</View>
					</ImageBackground>
				</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	text: {
		color: 'white',
	},
	textSmall: {
		color: 'rgba(255,255,255, 0.9)',
		fontSize: 14,
		fontWeight: '700',
	},
	container: {
		borderColor: 'rgba(255,255,255, 0.4)',
		width: '100%',
		height: LIST_ITEM_HEIGHT,
		marginBottom: 20,
		borderRadius: 20,
	},
	img: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: 19,
	},

	iconContainer: {
		height: LIST_ITEM_HEIGHT,
		width: LIST_ITEM_HEIGHT,
		backgroundColor: 'red',
		position: 'absolute',
		right: '1%',
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default BlocLocation;
