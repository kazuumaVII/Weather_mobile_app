import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const TitleView = () => {
	const { data } = useSelector((state) => state.todays);

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
							marginTop: 30,
						}}
					>
						{data?.location?.name}
					</Text>

					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text
							style={{
								fontSize: 90,
								textAlign: 'center',
								color: 'white',

								fontWeight: '200',
								marginLeft: 20,
							}}
						>
							{Math.round(data.current.temp_c)}
						</Text>
						<Text style={{ fontSize: 50, color: 'white', fontWeight: '300' }}>°</Text>
					</View>
					<Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>{data?.current?.condition?.text}</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-around',
							width: 155,
							alignSelf: 'center',
							marginTop: 10,
						}}
					>
						<Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
							Max : {Math.round(data?.forecast?.forecastday[0]?.day?.maxtemp_c)}°
						</Text>
						<Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
							Min : {Math.round(data?.forecast?.forecastday[0]?.day?.mintemp_c)}°
						</Text>
					</View>
				</>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	mainTitle: {
		marginTop: 50,
		color: 'white',
		marginBottom: 20,
	},
});

export default TitleView;
