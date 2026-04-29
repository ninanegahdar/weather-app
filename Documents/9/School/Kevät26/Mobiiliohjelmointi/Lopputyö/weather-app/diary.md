Oppimispäiväkirja

Day 1:
Loin uuden github repon ja loin projektin. Suunnittelin alkuun seuraavat näkymät: 1. Home - sen hetkisen lokaation sää, 2. Haku ja 3. Suosikit. Otin selvää Expo Locationista ja yritin ymmärtää miten se toimii.

Day2:
Hain OpenWeather:sta oman API Keyn säätä varten ja yritin saada sen toimimaan oikein kotinäkymässä, kun käyttäjä antaa luvan sijaintiin.

Day 3: Katsoin 'Kartat ja sijainti' luennon videon ja päätin hyödyntää sitä, ja kurssimateriaalia, ja lisätä etusivulle myös karttanäkymän. Olen tähän asti käyttänyt expon web näkymää sovelluksen testaamiseen, niin tässä kohtaa tuli ongelma sillä, react-native-maps kirjasto ei ilmeisesti suostu näyttämään karttaa webissä. Aluksi yritin ratkaista tän käyttämällä Platformia, mutta lopulta päätin jättää sen pois ja keskittyä pelkästään nimenomaan mobiilisovellukseen

Loin uuden sivun eli erillisen hakunäkymän: Search.tsx. Hakunäkymässä käyttäjä voi syöttää kaupungin nimen ja hakea sen sään saman OpenWeather API:n avulla.


Day 4:

Lisäsin “Clear” ja "Add to Favorites" funkiot ja napit hakunäkymään. Tutustuin AsyncStorageen ja päätin käyttää sitä Favorites näkymän toteuttamisessa. Suosikkikaupunkien tallennuksessa en ensin tajunnut, että myös aiemmin tallennettujen kaupunkien pitää säilyä listassa, ettei niiden päältä ylikirjoiteta tallennettaessa uutta.

Päädyin käyttämään push()-metodia (spreadin sijaan), sillä se tuntui helpommalta ymmärtää, kun tarkotuksena käsitellä tavallista taulukkoa Reactin staten sijaan.

Sovelluksessa on siis nyt toimiva hakunäkymä, jossa voi hakea säätietoja, tyhjentää haun sekä tallentaa suosikkikaupunkeja. Seuraavaksi tarkoituksena on luoda favorites - screen, jonne listataan tallennetut suosikkikaupungit.

