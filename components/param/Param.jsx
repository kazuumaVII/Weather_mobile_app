import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { fetchTodays } from '../../slices/dataTodaySlice';
import CreateBloc from './CreateBloc';
import SearchCity from './form/SearchCity';
import MyLocation from './MyLocation';
import SetBloc from './SetBloc';

const setBlocLocation = (result, error, touchOpacity, keyword, isCreateBloc, setCreateBloc, setSearchKeyword) => {
	const navigation = useNavigation();

	if (!result && !error) {
		return (
			<View
				style={{
					opacity: touchOpacity ? 0.4 : 1,
					marginTop: 0,
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate('Home')}>
					<MyLocation />
				</TouchableOpacity>
				{isCreateBloc && <CreateBloc setCreateBloc={setCreateBloc} setSearchKeyword={setSearchKeyword} />}
				<SetBloc />
			</View>
		);
	} else if (error) {
		return (
			<View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
				<EvilIcons name="search" size={70} color="rgba(255,255,255, 0.4)" />
				<Text style={{ color: 'white', fontWeight: '800', fontSize: 18, marginTop: 5 }}>Aucun résultat</Text>
				<Text style={{ color: 'rgba(255,255,255, 0.4)', fontSize: 15, marginTop: 3 }}>Aucun résultat pour « {keyword} » .</Text>
			</View>
		);
	}
};

export default function Param() {
	const dispatch = useDispatch();

	const [searchKeyword, setSearchKeyword] = React.useState('');
	const [searchResult, setSearchResult] = React.useState([]);
	const [isShowingResults, setIsShowingResults] = React.useState(false);
	const [isCreateBloc, setCreateBloc] = useState(false);
	const [touchOpacity, setTouchOpacity] = useState(false);
	const [isKeyWord, setIsKeyWord] = useState('');
	const [searchError, setSearchError] = useState(false);

	const scrollRef = useRef(null);

	const getItem = (item) => {
		dispatch(fetchTodays(item));
		setSearchKeyword(item);
		setIsShowingResults(false);
		setCreateBloc(true);
	};

	return (
		<SafeAreaView style={{ backgroundColor: 'black', borderWidth: 1, height: '100%' }}>
			<ScrollView ref={scrollRef} keyboardShouldPersistTaps={isKeyWord}>
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<View
						style={{
							height: 600,
							marginTop: 0,
							marginHorizontal: 15,
							borderWidth: 1,
						}}
					>
						<View style={{ height: '100%' }}>
							<View>
								<Ionicons name="ellipsis-horizontal-circle" size={30} color="white" style={{ alignSelf: 'flex-end' }} />
							</View>
							<View style={{ marginBottom: 15, overflow: 'hidden' }}>
								<Text
									style={{
										color: 'white',
										fontSize: 35,
										fontWeight: '700',
										marginTop: 30,
									}}
								>
									Météo
								</Text>
							</View>

							<SearchCity
								setSearchKeyword={setSearchKeyword}
								setSearchResult={setSearchResult}
								setIsShowingResults={setIsShowingResults}
								setTouchOpacity={setTouchOpacity}
								setSearchError={setSearchError}
								setIsKeyWord={setIsKeyWord}
								searchKeyword={searchKeyword}
							/>
							{isShowingResults &&
								searchResult.map((data, index) => (
									<View key={index}>
										<TouchableOpacity style={styles.resultItem} onPress={() => getItem(data.description)}>
											<Text style={{ color: 'rgba(255,255,255, 0.7 )' }}>{data.description}</Text>
										</TouchableOpacity>
									</View>
								))}

							{setBlocLocation(isShowingResults, searchError, touchOpacity, searchKeyword, isCreateBloc, setCreateBloc, setSearchKeyword)}
						</View>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	box: {
		width: 50,
		height: 50,
	},

	searchResultsContainer: {
		width: 340,
		height: 200,

		position: 'absolute',
		top: 115,
	},

	resultItem: {
		width: '100%',
		justifyContent: 'center',
		height: 40,
		paddingLeft: 15,
	},

	input: {
		width: '90%',
		height: '100%',
		paddingLeft: 5,
		color: 'white',
	},
	container: {
		flex: 1,
	},
	inner: {
		padding: 24,
		flex: 1,
		justifyContent: 'space-around',
	},
	header: {
		fontSize: 36,
		marginBottom: 48,
	},
});
