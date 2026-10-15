---
name: common-ground-landschap
description: Maak een overzichtsplaat (landschapskaart) van de organisaties, samenwerkingsverbanden en standaarden rond Common Ground en het gemeentelijke ICT-landschap — zoals BZK, VNG, Logius, Dimpact, ICTU, Geonovum, Forum Standaardisatie, RvIG, Kadaster, G4 en marktpartijen. Gebruik deze skill wanneer iemand vraagt om een overzichtsplaat, landschap, infographic, stakeholderkaart of "wie doet wat" rond Common Ground, GEMMA, ZGW API's, Haal Centraal, FSC of het Federatief Datastelsel, of wanneer een bestaande plaat moet worden bijgewerkt.
---

# Common Ground landschap

Deze skill maakt een overzichtsplaat van wie wat doet rond Common Ground. De plaat ordent organisaties in lagen (van beleid naar markt), toont per organisatie de rol en belangrijkste producten, en koppelt alles aan het vijflagenmodel van Common Ground.

## Werkwijze

1. **Scope bepalen.** Vraag (als het niet duidelijk is) naar doelgroep en vorm: interactieve HTML-pagina (standaard), statische afbeelding (SVG/PNG) of slide. Vraag ook of er specifieke organisaties of thema's extra nadruk moeten krijgen.
2. **Actualiseren.** Lees `references/organisaties.md` als basis. Zoek daarna kort op het web naar wijzigingen in rollen, programma's of namen (bijv. VNG-programma's, Logius-standaarden, Dimpact-platform). Rollen verschuiven regelmatig; neem nooit klakkeloos de referentie over.
3. **Bouwen.** Gebruik `assets/template.html` als uitgangspunt voor een interactieve plaat. Behoud de structuur:
   - zes lagen: Beleid & regie · Standaarden & infrastructuur · Bronhouders · Gemeentelijke samenwerking · Kennis & innovatie · Markt;
   - per kaart: naam, korte omschrijving, chips met producten/standaarden en `data-t`-thema's voor het filter;
   - onderaan het vijflagenmodel (Interactie, Proces, Integratie, Services, Data) met per laag de belangrijkste bijdragers;
   - een datumstempel ("Stand: maand jaar") en een korte disclaimer dat het een conceptueel overzicht is, geen formele governancekaart.
4. **Controleren.** Loop na dat elke organisatie in de juiste laag staat, dat afkortingen kloppen (BZK, niet "BKZ") en dat bronnen in de toelichting staan.

## Inhoudelijke spelregels

- **GEMMA** is een referentiearchitectuur binnen de VNG, geen zelfstandige organisatie. Toon hem als product van de VNG.
- **GGM** = Gemeentelijk Gegevensmodel.
- **VNG Realisatie** is opgegaan in de VNG; noem het hooguit als "voormalig".
- **FSC** (Federatieve Service Connectiviteit) is de opvolger van NLX en wordt als standaard door Logius beheerd.
- **G4** = Amsterdam, Rotterdam, Den Haag, Utrecht. Zij trekken veel componenten (o.a. Signalen vanuit Amsterdam).
- Noem marktpartijen als voorbeelden, niet als uitputtende lijst, en zonder waardeoordeel.
- Schrijf in het Nederlands, kort en feitelijk.

## Bestanden

- `references/organisaties.md` — basislijst van organisaties, rollen, producten en thema's.
- `assets/template.html` — interactieve overzichtsplaat met themafilter, licht/donker-modus en responsieve layout.
