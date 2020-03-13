# Sec Adv team yellow

messaging app to learn about encryption and hashing

## make server run

```bash 
#in anaconda at working directory (the one with index.html)
python -m http.server
```
dit maakt van de huidige directory een python server die kan bezocht worden op http://localhost:8000.

## make php api run

make sure you have symfony and composer installed


```bash
cd ./api/HybridEncryptionApi
composer install
symfony serve
```

this should launch an api at http://127.0.0.1:8000/ soon the frontend will do calls to this server
