import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RootNavigator from '../navigation/RootNavigator';
import { fetchPost } from '../slices/dataSlice';
import { setLocat } from '../slices/locationSlice';

export default function Home() {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				return;
			}

			let locat = await Location.getCurrentPositionAsync({});

			dispatch(fetchPost(locat.coords));
			dispatch(setLocat(locat.coords));

			if (locat) {
				setLoading(true);
			}
		})();
	}, []);

	return loading ? (
		<NavigationContainer>
			<RootNavigator />
		</NavigationContainer>
	) : null;
}
