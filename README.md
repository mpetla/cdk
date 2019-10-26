Etapy:
1. JS do budowy prostej strony (statyczna strona lokalnie)
2. JS do budowy backendu (express lokalnie)
3. JS do budowy infrastruktury (cdk)
3.1 S3 bucket dla strony statycznej
3.2 lambda z kodem przeniesionym ze skryptu
4. Połączenie wszystkiego razem
4.1 apigateway w cdk
4.2 zmiana endpointu w kodzie strony

Opis:
1. Zbuduj stronę, index.html z app.js, który ma prostą funkcję (ok, mamy JS w przeglądarce, hmm coś działa z JS, dobry początek)
2. Zbuduj backend, express serwujący fooBar (wow, mamy backend w JS, idzie nam świetnie)
3. Zmień skrypt, użyj zapytania do express. (no super, wszystko razem działa)
4. Zbuduj cdk tworzący S3 i dodający index.html i app.js, serwujący stronę (ała! będzie fail)
5. Zbuduj cdk, dodaj lambdę, api gateway (wspomnij o alb zamiast api gateway)
6. Zmień srkypt, api na endpoint lambdy.


http://foobar.test.mp.s3-website-eu-west-1.amazonaws.com/

https://docs.aws.amazon.com/cdk/api/latest/versions.html
https://docs.aws.amazon.com/en_pv/cdk/latest/guide/home.html
