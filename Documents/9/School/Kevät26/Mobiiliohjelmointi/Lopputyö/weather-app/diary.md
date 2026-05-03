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

Day 5:
Loin Favorites-näkymän, missä AsyncStorageen perustuva pysyvä tallennus, jonka avulla voidaan tallentaa kaupunkeja suosikkeihin.

Day 6:
Tein Favorites-näkymän kaupungeista klikattavia, joiden painaminen avaa uuden näkymän. Toteutin tätä varten erillisen city.tsx-näkymän, jonka rakensin Home-näkymän koodia ja logiikkaa hyödyntäen. Kartan ja sijainnin paikantamisen lisäksi erona on, että sijaintitietojen sijaan käytetään parametrina kaupungin nimeä.

Aluksi ajattelin ohjaavani käyttäjän takaisin Home-tabiin niin, että oma sijainti muuttuisi klikattavaksi kaupungiksi, mutta päädyin sitten kokonaan erilliseen näkymään, sillä se tuntuu selkeämmältä ratkaisulta. Home on järkevämpi oman sijainnin säätä varten (kun sinne on laitettu myös paikantava kartta), ja sovelluksen rakenne tuntuu näin loogisemmalta.

Day 7:
Suosikkikaupunkia klikattaessa avautuu uusi näkymä (city.tsx screen) ja säätiedot näkyvät oikein, mutta takaisin painike näkyi käyttäjälle expo routerin headerin nimen mukaisesti <(tabs), niin yritin saada tämän korjattua. Sain lopulta nimen vaihdettua root layoutin stack.screenin avulla.

Tajusin myös, että Suosikkikaupunkien listalla oli sama kaupunki kahdesti, eli funktio ei tarkistanut onko tallennettava kaupunki jo valmiiksi listassa. Korjasin tämän ja lisäsin samalla virheviestin, jos kaupunki on jo tallennettuna listaan. Lisäksi lisäsin Stylesheetiin oman kohdan virheviesteille, ja tein niistä punaset, sillä valkoinen teksti ei näyttänyt tarpeeksi errorilta.

Lisäsin suosikeille alkeellisen clear funktion ja napin, joka tyhjentää listan klikatessa. Tajusin jälkeenpäin, että se ei kuitenkaan tyhjennä AsyncStoragea, niin jouduin muokkaamaan sitä tyhjentämään sekä staten että AsyncS.

8:

Sovelluksen logiikka toimi ja rakenne oli tässä vaiheessa aika lailla valmis, niin päätin keskittyä hetkeksi enemmän viimeistelyyn ja yksityiskohtiin.

Otin käyttöön React Native Paper -kirjaston ja päivitin sillä kaikki näkymät, jotta sovelluksen yleisilme näyttää hienommalta ja modernimmalta. Lopuksi päätin vielä lsäsätä card-komponenttiin (joka esittelee säätiedot) emojin, jotta se ei näyttäisi liian tylsältä.

Halusin myös tässä vaiheessa sovellukselle jonkinlaisen logon näkyviin, ja tajusin samalla, etten ollut miettinyt edes nimeä. Päätin siis nimetä sääsovelluksen "Rayn", ja laittaa tämän näkyviin headerin avulla.

Löysin custom fontin, josta pidin, mutta sen kanssa tuli vastaan ongelmia, sillä se ei aluksi vaihtunut sovelluksessa ollenkaan. En ilmeisesti ollut ladannut expo-font -kirjastoa oikein aikasemmin, niin tehtyäni sen uudelleen sain fontin näkyviin.

Itse headerin kanssa tuli myös ongelmia, sillä se leikkasi osan logosta pois näkyvistä. Ratkaisin tämän säätämällä korkeutta ja title-container asetuksia monia kertoja eri arvoilla, kunnes sain sen näkymään oikein. Kuulostaa yksinkertaselta, mutta tässä meni yllättävän kauan saada toimimaan.

Huomasin myös, että suosikkilistan kaupungit tallentuivat pienillä alkukirjaimilla (kuten olin ne näppäillyt), mikä ei näyttänyt mielestäni tarpeeksi "viralliselta". Päätin luoda ja lisätä capitalize funktion, jotta kaupungit näkyisivät isolla alkukirjaimella listassa. Samalla tajusin, että lisättäessä kaupungin suosikkeihin, koko sovellus pitää reloadaa, jos haluaa lisätyn kaupungin näkyvän listassa. Lisäsin tämän vuoksi useFocusEffect-jookin, jotta lista päivittyy automaattisesti näkymää klikatessa.
