Oppimispäiväkirja

Day 1:
Loin uuden github repon ja loin projektin. Suunnittelin alkuun seuraavat näkymät: 1. Home - sen hetkisen lokaation sää, 2. Haku ja 3. Suosikit. Otin selvää Expo Locationista ja yritin ymmärtää miten se toimii.

Day2:
Hain OpenWeather:sta oman API Keyn säätä varten ja yritin saada sen toimimaan oikein kotinäkymässä, kun käyttäjä antaa luvan sijaintiin.

Day 3: Katsoin 'Kartat ja sijainti' luennon videon ja päätin hyödyntää sitä, ja kurssimateriaalia, ja lisätä etusivulle myös karttanäkymän. Olen tähän asti käyttänyt expon web näkymää sovelluksen testaamiseen, niin tässä kohtaa tuli ongelma sillä, react-native-maps kirjasto ei ilmeisesti suostu näyttämään karttaa webissä. Aluksi yritin ratkaista tän käyttämällä Platformia, mutta lopulta päätin jättää sen pois ja keskittyä pelkästään nimenomaan mobiilisovellukseen

Loin uuden sivun eli erillisen hakunäkymän: Search.tsx. Hakunäkymässä käyttäjä voi syöttää kaupungin nimen ja hakea sen sään saman OpenWeather API:n avulla.