Oppimispäiväkirja

Olen tehnyt kirjaukset sessioiden mukaan.

1:
Loin uuden GitHub repon ja expo projektin. Suunnittelin sovellukselle alkuun seuraavat näkymät:
1. Home - sen hetkisen lokaation sää
2. Haku
3. Suosikit
 Otin selvää Expo Locationista ja yritin ymmärtää miten se toimii.

2:
Hain OpenWeatherista oman API Keyn säätä varten ja yritin saada sen toimimaan oikein kotinäkymässä. Aluksi yritin hakea säätiedot liian aikasin niin kutsu palautti tyhjää dataa. Lopulta sain ratkaistua, kun sain oikean rakenteen koodille: pyydä käyttäjältä lupa sijaintiin, hae koordinaatit ja sitten sääkysely.

3:
Katsoin 'Kartat ja sijainti' luennon videota uudelleen ja päätin hyödyntää sitä ja kurssimateriaalia, ja lisätä sovelluksen etusivulle myös karttanäkymän.

Olin tähän asti käyttänyt expon web-näkymää sovelluksen testaamiseen. Tässä kohtaa ilmeni ongelma, sillä react-native-mapsin kirjasto ei ilmeisesti ole yhteensopiva Expo web-ympäristön kanssa. Aluksi yritin ratkaista ongelman käyttämällä Platformia (jotta kartta näkyisi webissä ja mobiilissa), mutta lopulta päätin jättää sen pois. Päätin yksinkertaisesti keskittyä pelkästään mobiilisovellukseen.

Lisäksi loin sovellukseen erillisen hakunäkymän: Search.tsx. Hakunäkymässä käyttäjä voi hakea syöttämänsä kaupungin säätiedot saman OpenWeather API:n avulla.

4:
Lisäsin “Clear” ja "Add to Favorites" funkiot ja napit hakunäkymään. Tutustuin AsyncStorageen ja päätin käyttää sitä Favorites-näkymän toteuttamisessa. Suosikkikaupunkien tallennuksessa en ensin tajunnut, että myös aiemmin tallennettujen kaupunkien pitää säilyä listassa, ettei niiden päältä ylikirjoiteta tallennettaessa uutta.

Päädyin käyttämään push()-metodia (spreadin sijaan), sillä se tuntui helpommalta ymmärtää, kun tarkotuksena käsitellä tavallista taulukkoa Reactin staten sijaan.

Hakunäkymässä on nyt mahdollista hakea säätietoja, tyhjentää haun, sekä tallentaa suosikkikaupunkeja. Seuraavaksi tarkoituksena on luoda favorites-näkymä, jonne listataan tallennetut suosikkikaupungit.

5:
Loin Favorites-näkymän, missä käytössä AsyncStorageen perustuva tallennus, jonka avulla voidaan tallentaa kaupunkeja suosikkeihin.

6:
Tein Favorites-näkymän kaupungeista klikattavia, jotta niiden painaminen avaa uuden näkymän, josta löytyy säätiedot. Toteutin tätä varten city.tsx, jonka rakensin Home-näkymän koodia ja logiikkaa hyödyntäen. Kartan ja sijainnin paikantamisen poisjättämisen lisäksi erona on, että sijaintitietojen sijaan käytetään parametrina kaupungin nimeä.

Olin aluksi suunnittellut ohjaavani käyttäjän takaisin Home-tabiin niin, että oma sijainti muuttuisi klikattavaksi kaupungiksi. Päädyin kuitenkin lopulta kokonaan erilliseen näkymään, sillä se tuntuu selkeämmältä ratkaisulta. Home on mielestäni järkevämpi oman (sen hetkisen) sijainnin säätä varten.

7:
Suosikkikaupunkia klikattaessa avautuu uusi näkymä (city.tsx) ja säätiedot näkyvät oikein, mutta takaisin painike näkyi käyttäjälle expo routerin headerin nimen mukaisesti <(tabs), joten yritin saada tämän korjattua. Sain lopulta nimen vaihdettua root layoutin stack.screenin avulla.

Tajusin myös, että Suosikkikaupunkien listalla oli sama kaupunki kahdesti, eli funktio ei tarkistanut onko tallennettava kaupunki jo valmiiksi listassa. Korjasin tämän ja lisäsin samalla virheviestin, jos kaupunki on jo tallennettuna. Lisäksi lisäsin Stylesheetiin oman tyylin virheviesteille, ja vaihdoin niistä punaiset. Standardi valkoinen teksti ei näyttänyt tarpeeksi errorilta.

Lisäsin suosikeille myös alkeellisen clear funktion ja napin, joka tyhjentää listan klikatessa. Tajusin jälkeenpäin, että se ei kuitenkaan tyhjennä AsyncStoragea, niin jouduin muokkaamaan sitä tyhjentämään sekä staten että AsyncStoragen.

8:
Sovelluksen logiikka toimi ja rakenne oli tässä vaiheessa aika lailla valmis, niin päätin keskittyä viimeistelyyn ja yksityiskohtiin.

Otin käyttöön React Native Paper -kirjaston ja päivitin sillä kaikki näkymät, jotta sovelluksen yleisilme näyttäisi hienommalta ja modernimmalta. Lopuksi päätin vielä lsäsätä card-komponenttiin (joka esittelee säätiedot) emojin, sillä se oli mielestäni hieman tylsännäköinen.

Halusin myös sovellukselle jonkinlaisen logon näkyviin, ja tajusin samalla, etten ollut miettinyt sille edes nimeä. Päätin siis nimetä sääsovelluksen "Rayn", ja tuoda tämän näkyviin headerin avulla.

Löysin custom fontin, josta pidin, mutta sen kanssa tuli vastaan ongelmia, sillä se ei aluksi vaihtunut sovelluksessa ollenkaan. En ilmeisesti ollut ladannut expo-font -kirjastoa oikein aikasemmin, niin asennettuani sen uudelleen, sain fontin näkyviin.

Itse headerin kanssa tuli myös ongelmia, osa logosta leikkautui jatkuvasti pois näkyvistä. Ratkaisin ongelman säätämällä korkeutta ja title-container asetuksia monia kertoja eri arvoilla, kunnes sain sen näkymään oikein. Kuulostaa yksinkertaselta, mutta tässä meni yllättävän kauan säädellä niin, että sain toimimaan.

Huomasin myös, että suosikkilistan kaupungit tallentuivat pienillä alkukirjaimilla, samassa muodossa kuin olin ne näppäillyt, mikä ei näyttänyt mielestäni tarpeeksi "viralliselta". Päätin luoda ja lisätä capitalize-funktion, jotta kaupungit näkyisivät isolla alkukirjaimella listassa.

 Samalla tajusin, että lisättäessä kaupungin suosikkeihin, e ei ilmestynyt listaan heti, vaan koko sovellus piti ensin reloadaa. Lisäsin tämän vuoksi useFocusEffect-hookin, jotta lista päivittyisi automaattisesti aina näkymää klikatessa.

9:
Tajusin, että tallennetuilla suosikeilla ei ollut poisto-ominaisuutta, vaan ainoastaan clear, joka tyhjentää koko listan. Sain idean Youtube videosta (https://www.youtube.com/watch?v=BRitzE50Dy0) toteuttaa iOS tyylinen "swipe to delete"-ominaisuus.
Aluksi käytin vanhentunutta (deprecated) import mallia, mikä aiheutti ongelmia. Kun viimein sain itse funktion toimimaan, oikealla importilla, niin sovellus kaatui heti. Selvitin, että tää johtui siitä, että rootista puuttui "GestureHandlerRootView". Lisäsin sen sovelluksen Root Layoutiin, minkä jälkeen sain kaiken toimimaan.

Halusin myös parantaa sovelluksen yhtenäisyyttä värien ja teeman suhteen. 9:
Tajusin, että suosikeilla ei ollut poisto-ominaisuutta, ainoastaan "clear", joka tyhjentää koko listan. Sain idean Youtube videosta (https://www.youtube.com/watch?v=BRitzE50Dy0) toteuttaa iOS tyylinen "swipe to delete". Aluksi käytin vanhentunutta (deprecated) import mallia, mikä aiheutti ongelmia. Kun viimein sain itse funktion toimimaan, oikealla importilla, niin sovellus kaatui heti ja selvisi, että rootista puuttui "GestureHandlerRootView". Lisäsin sen root layoutiin, minkä jälkeen sain kaiken toimimaan.

Halusin sovellukseen yhtenäisyyttä värien ja teeman suhteen. Muokkasin värejä, kuten delete-toiminnon taustaa ja hakunäkymän search-painikketta, jotta ne sopivat paremmin sovelluksen logon pinkkiin teemaan.