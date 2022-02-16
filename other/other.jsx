import React from 'react';

export const isBackGround = (etat) => {
	if (etat === 'Couvert' || etat === 'couvert') {
		return require('../img/backGroundWeather/Couvert.jpeg');
	}
	if (etat === 'ciel dégagé' || etat === 'clair' || etat === 'Clair') {
		return require('../img/backGroundWeather/sky.jpeg');
	}

	if (etat === 'Ensoleillé') {
		return require('../img/backGroundWeather/sunTest.jpeg');
	}
	if (etat === 'Partiellement nuageux' || etat === 'partiellement nuageux') {
		return require('../img/backGroundWeather/PartielCloud.jpeg');
	}
	if (etat === 'Pluie éparse à proximité' || etat === 'Pluie légère') {
		return require('../img/backGroundWeather/rain1.jpeg');
	}
	if (etat === 'nuageux' || etat === 'Nuageux') {
		return require('../img/backGroundWeather/nuageux.jpeg');
	}
};
