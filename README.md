# Read me

### [vegan.thomasbilliet.com](https://vegan.thomasbilliet.com)

## Concept

Het doel was om een app te ontwikkelen die het makkelijker zou maken om veganistisch voedsel te vinden, delen en ontdekken uit supermarkten in de buurt. Ik heb eerst de backend uitgewerkt en dan voor Mobile Web Apps een web client ontwikkeld en voor Native Mobile Apps een Android native client. Omdat ik geen toegang heb op databanken van supermarktketens is het afhankelijk van crowd-sourcing.

De homepage heeft verschillende producten tabs zoals nieuw, populair, best beoordeeld, snack etc. Je kan ook naar een specifiek product zoeken met de zoekfunctie. Als je een product wilt bij houden kan je het toevoegen aan je favorieten. Deze kan je offline ook bekijken. Als een product veganistisch is dan kan je het markeren als incorrect. Als dit een aantal keer gebeurt wordt het product verwijderd. Je kan het ook beoordelen van 1 tot 5.

Om een product toe te voegen scant u de barcode in van het product. Op de Android app werkt dit redelijk goed, maar voor de web client kon ik geen betrouwbaar of gebruiksvriendelijk systeem ontwikkelen. De javascript libraries die bestonden om barcodes/QR-codes in te scannen gaven foute barcodes terug. Dus momenteel wordt dit manueel ingegeven. Vervolgens selecteer je de supermarkt van afkomst. Hier krijg je keuze uit supermarkten in jou buurt. Als het product al bestaat stopt het hier en word er een extra locatie toegevoegd aan het product.
Als het nog niet bestaat moet je een foto nemen. Deze foto wordt verzonden naar de backend. De backend optimaliseert deze en gebruikt Google Vision om mogelijke merken en labels te vinden. Populaire merken worden meestal gedetecteerd. Als je het merk, naam en een aantal labels hebt ingevuld is het klaar.

## Techinal info

Repositories

* [PWA](https://github.com/JodusNodus/vegpwa)
* [API](https://github.com/JodusNodus/vegapi)

De PWA is grotendeels gebouwd op Reactjs als ui library, [material-ui](https://material-ui.com) voor material-design componenten en [mobx](https://mobx.js.org) voor state management. Hij word gehost door Github Pages en voor het domein, security features en DDOS bescherming gebruikt het Cloudflare.

Voor security:

* HSTS
* HTTPS only
* CORS
* No sniff headers
* authenticatie met cookies

Ik heb [create-react-app](https://github.com/facebook/create-react-app) gebruikt om de initiële bootstrapping te doen. Ik weet uit ervaring met webpack dat de configuratie van deze utility zeer betrouwbaar zijn. Ik heb enkel wat extra babel features toegevoegd.

De backend API is gebouwd op het Google Cloud ecosysteem en is volledig automatisch horizontaal schaalbaar buiten de MySQL instantie. Belangrijkste componenten zijn MySQL, memcached, Google Nodejs App Engine, Google Vision, Google Storage, Google Maps. De Nodejs API is gebouwd met express, [knex](http://knexjs.org), [passport](http://www.passportjs.org), [sharp](https://github.com/lovell/sharp), etc.
