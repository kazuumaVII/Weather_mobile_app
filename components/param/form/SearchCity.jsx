import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity, Button, Keyboard } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import { KEY_FIND_CITY } from '../../../other/KeyApi';

export default function SearchCity(props) {
	const [isCancel, setCancel] = useState(false);

	const setDataSearch = async (text) => {
		try {
			const response = await axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${KEY_FIND_CITY}&input=${text}`);
			text === '' ? props.setIsShowingResults(false) : props.setIsShowingResults(true);
			text !== '' ? props.setIsKeyWord('always') : props.setIsKeyWord('never');

			props.setSearchResult(response.data.predictions);

			response.data.status === 'ZERO_RESULTS' ? props.setSearchError(true) : props.setSearchError(false);
		} catch (err) {
			console.log(err);
		}
	};

	const debounceDropDown = useCallback(
		debounce((nextValue) => setDataSearch(nextValue), 450),
		[],
	);

	const onInputChangeHandler = (text) => {
		props.setSearchKeyword(text);

		debounceDropDown(text);
	};

	const remooveInput = () => {
		setCancel(false);
		props.setTouchOpacity(false);
		props.setSearchKeyword(null);
		props.setSearchResult([]);
		props.setIsKeyWord('never');
		props.setIsShowingResults(false);
		props.setSearchError(false);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ backgroundColor: 'red', height: 5000 }}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-start',
				}}
			>
				<View
					style={{
						width: isCancel ? '80%' : '100%',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						alignItems: 'center',
						backgroundColor: 'rgba(68,68,68, 0.2)',
						height: 34,
						borderRadius: 15,
						marginBottom: 10,
						zIndex: 1,
					}}
				>
					<Ionicons name="search" size={17} color="rgba(255,255,255, 0.4)" style={{ marginLeft: 5 }} />
					<TextInput
						style={styles.input}
						placeholder="Rechercher une ville"
						placeholderTextColor={'rgba(255,255,255, 0.4)'}
						keyboardType="default"
						onChangeText={onInputChangeHandler}
						value={props.searchKeyword}
						onFocus={() => {
							props.setTouchOpacity(true);
							setCancel(true);
						}}
						onBlur={() => {
							props.setTouchOpacity(false);
							setCancel(false);
						}}
					/>
				</View>

				{isCancel && (
					<TouchableOpacity
						activeOpacity={0.1}
						onPress={remooveInput}
						style={{
							justifyContent: 'center',

							height: 38,
							marginTop: -12,
							marginLeft: 10,
						}}
					>
						<Text
							style={{
								color: 'white',
								textAlign: 'center',
								fontSize: 21,
								fontWeight: '500',
							}}
						>
							Annuler
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	input: {
		width: '90%',
		height: '100%',
		paddingLeft: 7,
		color: 'white',
		fontSize: 16,
	},
});
