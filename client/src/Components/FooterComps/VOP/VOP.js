import React, { useEffect } from "react";

import VopSectionI from "./VopSectionI/VopSectionI";

const VOP = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="vop">
      {/* Section I */}
      <VopSectionI />

      {/* ÚVOD */}
      <div className="vop-main">
        {/* Wave */}
        <div className="wave">
          <div className="wave-down">
            <img src="/img/wave-down-gray.svg" alt="wave" />
          </div>
        </div>
        <div className="container-lg px-0 py-5 space">
          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">I. Úvodné ustanovenia</h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                                Obchodná spoločnosť IVEX GROUP s. r. o., so sídlom Moyzesova 933/8, 811 05 Bratislava – mestská časť Staré mesto, Slovenská republika, IČO 52 526 151, zapísaná v Obchodnom registri Okresného súdu Bratislava I, oddiel Sro, vložka číslo 139388/B (ďalej len ,,IVEX GROUP“) je prevádzkovateľom digitálnej platformy – online knižnice IVEX LIBRARY (ďalej len ,,Online knižnica“).
                            </li> */}
              <li className="text-normal text-small text-medium">
                Obchodná spoločnosť XXXXXXX, so sídlom XXXXXXXX, IČO XXXXXXXX,
                zapísaná v Obchodnom registri Okresného súdu Bratislava I,
                oddiel Sro, vložka číslo 139388/B (ďalej len ,,XXXXXXXXX“) je
                prevádzkovateľom digitálnej platformy – online knižnice XXXXX
                (ďalej len ,,Online knižnica“).
              </li>
              <li className="text-normal text-small text-medium">
                Online knižnica je digitálna platforma zameraná na zdieľanie
                autorských diel publikovaných autormi alebo vydavateľstvami v
                elektronickej podobe (ďalej len ,,Dielo“ alebo ,,Diela“), ktorá
                umožňuje registrovaným osobám využívať nasledovné služby Online
                knižnice:
                <ol type="a">
                  <li className="text-normal text-small text-medium">
                    prezeranie a čítanie jednotlivých Diel,
                  </li>
                  <li className="text-normal text-small text-medium">
                    zvýrazňovanie častí jednotlivých Diel podľa vlastného
                    uváženia registrovanej osoby,
                  </li>
                  <li className="text-normal text-small text-medium">
                    kopírovať jednotlivé časti Diel, a to v celkovom rozsahu
                    maximálne 500 (päťsto) znakov počas príslušného
                    Predplatného,
                  </li>
                  <li className="text-normal text-small text-medium">
                    vytvoriť si zoznam obľúbených Diel, (ďalej len ,,Služby
                    online knižnice“).
                  </li>
                </ol>
              </li>
              {/* <li className="text-normal text-small text-medium">
                                Tieto Všeobecné obchodné podmienky upravujú vzájomné práva a povinnosti spoločnosti IVEX GROUP ako prevádzkovateľa Online knižnice a registrovaných osôb, ktoré vznikajú pri uzavretí zmluvy o sprístupnení Služieb online knižnice (ďalej len ,,Zmluva“).
                            </li> */}
              <li className="text-normal text-small text-medium">
                Tieto Všeobecné obchodné podmienky upravujú vzájomné práva a
                povinnosti spoločnosti XXXXXXXXX ako prevádzkovateľa Online
                knižnice a registrovaných osôb, ktoré vznikajú pri uzavretí
                zmluvy o sprístupnení Služieb online knižnice (ďalej len
                ,,Zmluva“).
              </li>
              <li className="text-normal text-small text-medium">
                Registrovanou osobou je osoba, ktorá je registrovaná v Online
                knižnici a ktorá má na základe Zmluvy prístup k Službám online
                knižnice (ďalej len ,,Užívateľ“). Užívateľ uzatvára Zmluvu mimo
                svojej podnikateľskej činnosti.
              </li>
              <li className="text-normal text-small text-medium">
                Vykonaním registrácie Užívateľ súhlasí s týmito Všeobecnými
                obchodnými podmienkami. Vykonaním registrácie Užívateľ
                potvrdzuje, že je osobou staršou ako 18 (osemnásť) rokov.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              II. Zmluva o sprístupnení Služieb online knižnice
            </h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                Každý Užívateľ je pred sprístupnením Služieb online knižnice
                povinný sa registrovať na webovej stránke www.ivexlibrary.sk. Po
                vykonaní registrácie bude Užívateľovi zaslaný potvrdzovací
                e-mail, a to na e-mailovú adresu, ktorú uviedol pri registrácii.
                Po kliknutí na odkaz, ktorý je obsahom potvrdzovacieho e-mailu,
                bude Užívateľ presmerovaný do platobnej brány Global Payments,
                kde vyplní údaje o platobnej karte. Vyplnením údajov o platobnej
                karte a odoslaním formulára spoločnosti IVEX GROUP bude proces
                registrácie ukončený a Užívateľovi bude založený osobitný účet
                (ďalej len ,,Užívateľský účet“). Okamihom ukončenia procesu
                registrácie je uzatvorená Zmluva medzi spoločnosťou IVEX GROUP a
                Užívateľom, na základe ktorej je spoločnosť IVEX GROUP povinná
                sprístupniť Služby online knižnice Užívateľovi.
              </li> */}
              {/* <li className="text-normal text-small text-medium">
                Každý Užívateľ je pred sprístupnením Služieb online knižnice
                povinný sa registrovať na webovej stránke www.ivexlibrary.sk. Po
                vykonaní registrácie bude Užívateľovi zaslaný potvrdzovací
                e-mail, a to na e-mailovú adresu, ktorú uviedol pri registrácii.
                Po kliknutí na odkaz, ktorý je obsahom potvrdzovacieho e-mailu,
                bude Užívateľ presmerovaný do platobnej brány Global Payments,
                kde vyplní údaje o platobnej karte. Vyplnením údajov o platobnej
                karte a odoslaním formulára spoločnosti XXXXXXXX bude proces
                registrácie ukončený a Užívateľovi bude založený osobitný účet
                (ďalej len ,,Užívateľský účet“). Okamihom ukončenia procesu
                registrácie je uzatvorená Zmluva medzi spoločnosťou XXXXXXXXXX a
                Užívateľom, na základe ktorej je spoločnosť XXXXXXXX povinná
                sprístupniť Služby online knižnice Užívateľovi.
              </li> */}
              <li className="text-normal text-small text-medium">
                Každý Užívateľ je pred sprístupnením Služieb online knižnice
                povinný sa registrovať na webovej stránke www.XXXXX.sk. Po
                vykonaní registrácie bude Užívateľovi zaslaný potvrdzovací
                e-mail, a to na e-mailovú adresu, ktorú uviedol pri registrácii.
                Po kliknutí na odkaz, ktorý je obsahom potvrdzovacieho e-mailu,
                bude Užívateľ presmerovaný do platobnej brány Global Payments,
                kde vyplní údaje o platobnej karte. Vyplnením údajov o platobnej
                karte a odoslaním formulára spoločnosti XXXXXXXX bude proces
                registrácie ukončený a Užívateľovi bude založený osobitný účet
                (ďalej len ,,Užívateľský účet“). Okamihom ukončenia procesu
                registrácie je uzatvorená Zmluva medzi spoločnosťou XXXXXXXXXX a
                Užívateľom, na základe ktorej je spoločnosť XXXXXXXX povinná
                sprístupniť Služby online knižnice Užívateľovi.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Užívateľ sa zaväzuje uchovávať svoje prístupové údaje k
                Užívateľskému účtu. Spoločnosť IVEX GROUP nezodpovedá za
                akúkoľvek škodu spôsobenú Užívateľovi neoprávneným užívaním
                Užívateľského účtu treťou osobou. Užívateľ berie na vedomie, že
                zodpovedá za každé užívanie Služby prostredníctvom svojho
                Užívateľského účtu, vrátane akéhokoľvek neoprávneného zásahu do
                Užívateľského účtu treťou osobou.
              </li> */}
              <li className="text-normal text-small text-medium">
                Užívateľ sa zaväzuje uchovávať svoje prístupové údaje k
                Užívateľskému účtu. Spoločnosť XXXXXXXXX nezodpovedá za
                akúkoľvek škodu spôsobenú Užívateľovi neoprávneným užívaním
                Užívateľského účtu treťou osobou. Užívateľ berie na vedomie, že
                zodpovedá za každé užívanie Služby prostredníctvom svojho
                Užívateľského účtu, vrátane akéhokoľvek neoprávneného zásahu do
                Užívateľského účtu treťou osobou.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              III. Dodacie podmienky
            </h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                Dňom uzatvorenia Zmluvy sa spoločnosť IVEX GROUP zaväzuje
                sprístupniť Užívateľovi Služby online knižnice.
              </li> */}
              <li className="text-normal text-small text-medium">
                Dňom uzatvorenia Zmluvy sa spoločnosť XXXXXX zaväzuje
                sprístupniť Užívateľovi Služby online knižnice.
              </li>
              <li className="text-normal text-small text-medium">
                Po dobu 7 (siedmich) dní odo dňa uzatvorenia Zmluvy je Užívateľ
                oprávnený užívať Služby online knižnice bezodplatne (ďalej len
                ,,Skúšobná doba“). Po uplynutí Skúšobnej doby je Užívateľ
                oprávnený odstúpiť od Zmluvy a zrušiť Užívateľský účet alebo
                pokračovať v užívaní Služieb online knižnice po dobu
                prislúchajúcu jednej z foriem Predplatného, podľa bodu 4. tohto
                článku Všeobecných obchodných podmienok. Ak Užívateľ neodstúpi
                od Zmluvy a nezruší svoj Užívateľský účet, a zároveň si
                nevyberie jednu z foriem Predplatného podľa bodu 4. tohto článku
                Všeobecných obchodných podmienok, a to najneskôr v posledný deň
                Skúšobnej doby, znamená to, že súhlasí s odplatným užívaním
                Služieb online knižnice a automaticky mu začína plynúť Mesačné
                predplatné podľa bodu 4. písm. a. týchto Všeobecných obchodných
                podmienok. Užívateľ berie na vedomie a súhlasí s tým, že Mesačné
                predplatné sa obnovuje automaticky a to až do doby trvania
                Zmluvy alebo voľby inej formy predplatného podľa bodu 4. tohto
                článku Všeobecných obchodných podmienok.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Spoločnosť IVEX GROUP sa zaväzuje notifikovať Užívateľa o
                blížiacom sa uplynutí Skúšobnej doby, a to 2 (dva) dni pred jej
                uplynutím. Spoločnosť IVEX GROUP vykoná notifikáciu formou
                e-mailu zaslaného na e-mailovú adresu Užívateľa, ktorú uviedol
                pri registrácii do Online knižnice. V prípade, ak Užívateľ
                odstúpi od Zmluvy, spôsobom uvedeným v týchto Všeobecných
                obchodných podmienkach, a to v lehote 10 (desiatich) dní odo dňa
                skončenia Skúšobnej doby, a zároveň počas týchto 10 (desiatich)
                dní nevyužíval Služby online knižnice, ani nevykonával akúkoľvek
                aktivitu na svojom Užívateľskom účte, odstúpenie od Zmluvy je
                účinné a Zmluva zaniká ku dňu doručenia spoločnosti IVEX GROUP.
                Spoločnosť IVEX GROUP v takom prípade vráti sumu Mesačného
                predplatného na bankový účet Užívateľa, z ktorého Predplatné
                bolo pripísané, a to v lehote 5 (piatich) dní odo dňa doručenia
                odstúpenia od Zmluvy spoločnosti IVEX GROUP. Ak Užívateľ po dobu
                10 (desiatich) dní odo dňa skončenia Skúšobného obdobia využíval
                Služby online knižnice a/alebo vykonával akúkoľvek aktivitu na
                svojom Užívateľskom účte, spoločnosť IVEX GROUP je oprávnená
                postupovať podľa článku V týchto Všeobecných podmienok a
                Užívateľ nemá nárok na vrátenie sumy Mesačného predplatného.
              </li> */}
              <li className="text-normal text-small text-medium">
                Spoločnosť XXXXXXXX sa zaväzuje notifikovať Užívateľa o
                blížiacom sa uplynutí Skúšobnej doby, a to 2 (dva) dni pred jej
                uplynutím. Spoločnosť XXXXXXXXX vykoná notifikáciu formou
                e-mailu zaslaného na e-mailovú adresu Užívateľa, ktorú uviedol
                pri registrácii do Online knižnice. V prípade, ak Užívateľ
                odstúpi od Zmluvy, spôsobom uvedeným v týchto Všeobecných
                obchodných podmienkach, a to v lehote 10 (desiatich) dní odo dňa
                skončenia Skúšobnej doby, a zároveň počas týchto 10 (desiatich)
                dní nevyužíval Služby online knižnice, ani nevykonával akúkoľvek
                aktivitu na svojom Užívateľskom účte, odstúpenie od Zmluvy je
                účinné a Zmluva zaniká ku dňu doručenia spoločnosti XXXXXXX.
                Spoločnosť XXXXXXXXX v takom prípade vráti sumu Mesačného
                predplatného na bankový účet Užívateľa, z ktorého Predplatné
                bolo pripísané, a to v lehote 5 (piatich) dní odo dňa doručenia
                odstúpenia od Zmluvy spoločnosti XXXXXXXXXXX. Ak Užívateľ po
                dobu 10 (desiatich) dní odo dňa skončenia Skúšobného obdobia
                využíval Služby online knižnice a/alebo vykonával akúkoľvek
                aktivitu na svojom Užívateľskom účte, spoločnosť XXXXXXXXX je
                oprávnená postupovať podľa článku V týchto Všeobecných podmienok
                a Užívateľ nemá nárok na vrátenie sumy Mesačného predplatného.
              </li>
              <li className="text-normal text-small text-medium">
                Po skončení Skúšobnej doby je Užívateľ oprávnený vybrať si 1
                (jednu) z nasledovných foriem predplatného:
                <ol type="a">
                  <li className="text-normal text-small text-medium">
                    mesačné predplatné na obdobie 30 (tridsiatich) dní v sume
                    9,00 EUR (ďalej len ,,Mesačné predplatné“),
                  </li>
                  <li className="text-normal text-small text-medium">
                    semestrálne predplatné na obdobie 6 (šiestich) mesiacov v
                    celkovej sume 48,00 EUR (štyridsaťosem eur), t. j. 8,00EUR
                    (osem eur) mesačne (ďalej len ,,Semestrálne predplatné“),
                  </li>
                </ol>
              </li>
              <li className="text-normal text-small text-medium">
                Formu Predplatného si Užívateľ zvolí podľa vlastného výberu v
                časti ,,Úprava účtu‘‘ Užívateľského účtu. Predplatné je určené
                pre 1 (jedného) Užívateľa.
              </li>
              <li className="text-normal text-small text-medium">
                Predplatné sa po uplynutí príslušného obdobia automaticky
                obnovuje, a to do vtedy, kým ho Užívateľ nezmení v časti
                ,,Úprava účtu‘‘ Užívateľského účtu, alebo neskončí túto Zmluvu
                za podmienok uvedených v článku V. týchto Všeobecných obchodných
                podmienok.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              IV. Platobné podmienky
            </h3>
            <ol>
              <li className="text-normal text-small text-medium">
                Predplatné sa uhrádza v sume a spôsobom uvedeným v týchto
                Všeobecných obchodných podmienkach. Suma Predplatného za
                príslušné obdobie uvedené v článku II bod 4. týchto Všeobecných
                obchodných podmienok zahŕňa aj daň z pridanej hodnoty podľa
                príslušných právnych predpisov Slovenskej republiky.
              </li>
              <li className="text-normal text-small text-medium">
                Suma Predplatného sa uhrádza pred sprístupnením Služieb online
                knižnice Užívateľovi; sprístupnenie Služieb online knižnice
                počas Skúšobnej doby je bezodplatné. Suma Predplatného sa
                uhrádza cez platobnú bránu Global Payments.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Suma Predplatného sa uhrádza 1. (prvým) dňom príslušného
                obdobia. Zaplatením sumy Predplatného sa rozumie jej pripísanie
                na účet spoločnosti IVEX GROUP.
              </li> */}
              <li className="text-normal text-small text-medium">
                Suma Predplatného sa uhrádza 1. (prvým) dňom príslušného
                obdobia. Zaplatením sumy Predplatného sa rozumie jej pripísanie
                na účet spoločnosti XXXXXXXX.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Suma Predplatného na každé ďalšie obdobie bude automaticky
                odpisovaná z účtu Užívateľa, a to vždy k 1. (prvému) dňu
                príslušného obdobia. V prípade skončenia Zmluvy, spôsobom
                uvedeným v týchto Všeobecných obchodných podmienkach, sa
                spoločnosť IVEX GROUP zaväzuje v deň účinnosti skončenia Zmluvy
                zadať zrušenie automatického odpisovania Predplatného z účtu
                Užívateľa. Na odpis sumy Predplatného z účtu Užívateľa sa
                osobitná autorizácia zo strany Užívateľa nevyžaduje.
              </li> */}
              <li className="text-normal text-small text-medium">
                Suma Predplatného na každé ďalšie obdobie bude automaticky
                odpisovaná z účtu Užívateľa, a to vždy k 1. (prvému) dňu
                príslušného obdobia. V prípade skončenia Zmluvy, spôsobom
                uvedeným v týchto Všeobecných obchodných podmienkach, sa
                spoločnosť XXXXXXX zaväzuje v deň účinnosti skončenia Zmluvy
                zadať zrušenie automatického odpisovania Predplatného z účtu
                Užívateľa. Na odpis sumy Predplatného z účtu Užívateľa sa
                osobitná autorizácia zo strany Užívateľa nevyžaduje.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Ak suma Predplatného nebude z akýchkoľvek technických príčin
                alebo dôvodov na strane Užívateľa pripísaná na účet spoločnosti
                IVEX GROUP, a to do 7 (siedmych) dní odo dňa vykonania úhrady,
                spoločnosť IVEX GROUP je oprávnená prerušiť prístup Užívateľa k
                Službám online knižnice bez toho, aby bolo takéto prerušenie
                považované za porušenie povinnosti Zmluvy zo strany spoločnosti
                IVEX GROUP. Spoločnosť IVEX GROUP je oprávnená prerušiť prístup
                Užívateľa k Službám online knižnice, a to až do doby pripísania
                sumy Predplatného na účet spoločnosti IVEX GROUP.
              </li> */}
              <li className="text-normal text-small text-medium">
                Ak suma Predplatného nebude z akýchkoľvek technických príčin
                alebo dôvodov na strane Užívateľa pripísaná na účet spoločnosti
                XXXXXX, a to do 7 (siedmych) dní odo dňa vykonania úhrady,
                spoločnosť XXXXXXX je oprávnená prerušiť prístup Užívateľa k
                Službám online knižnice bez toho, aby bolo takéto prerušenie
                považované za porušenie povinnosti Zmluvy zo strany spoločnosti
                XXXXXXX. Spoločnosť XXXXXXXX je oprávnená prerušiť prístup
                Užívateľa k Službám online knižnice, a to až do doby pripísania
                sumy Predplatného na účet spoločnosti XXXXXXX.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              V. Odstúpenie od Zmluvy
            </h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                Počas Skúšobnej doby je Užívateľ oprávnený kedykoľvek odstúpiť
                od Zmluvy. Účinnosť odstúpenia od Zmluvy nastáva dňom doručenia
                odstúpenia od Zmluvy spoločnosti IVEX GROUP a k tomuto dňu
                Zmluva zaniká.
              </li> */}
              <li className="text-normal text-small text-medium">
                Počas Skúšobnej doby je Užívateľ oprávnený kedykoľvek odstúpiť
                od Zmluvy. Účinnosť odstúpenia od Zmluvy nastáva dňom doručenia
                odstúpenia od Zmluvy spoločnosti XXXXXX a k tomuto dňu Zmluva
                zaniká.
              </li>
              <li className="text-normal text-small text-medium">
                Počas Mesačného predplatného, Semestrálneho predplatného a
                Ročného predplatného je Užívateľ oprávnený odstúpiť od Zmluvy.
                Účinnosť odstúpenia od Zmluvy nastáva posledným dňom príslušného
                obdobia, za ktoré sa suma Predplatného uhrádza a k tomuto dňu
                Zmluva zaniká.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Odstúpenie od Zmluvy musí byť písomné a doručené spoločnosti
                IVEX GROUP na e-mailovú adresu predplatne@ivexlibrary.sk a/alebo
                na adresu sídla spoločnosti IVEX GROUP uvedenú v článku I bod 1.
                týchto Všeobecných obchodných podmienok.
              </li> */}
              <li className="text-normal text-small text-medium">
                Odstúpenie od Zmluvy musí byť písomné a doručené spoločnosti
                XXXXX na e-mailovú adresu predplatne@XXXXX.sk a/alebo na adresu
                sídla spoločnosti XXXXX uvedenú v článku I bod 1. týchto
                Všeobecných obchodných podmienok.
              </li>
              <li className="text-normal text-small text-medium">
                Užívateľ berie na vedomie a súhlasí, že pri odstúpení od Zmluvy
                nemá nárok na vrátanie sumy Predplatného, ktoré bolo uhradené
                pre príslušné obdobie.
              </li>
              <li className="text-normal text-small text-medium">
                Užívateľ berie na vedomie a výslovne súhlasí so začatím
                poskytovania Služieb online knižnice, a to pred uplynutím 14
                (štrnásť) dňovej lehoty na odstúpenie od Zmluvy odo dňa
                uzatvorenia Zmluvy. Užívateľ bol riadne poučený, že poskytnutím
                výslovného súhlasu podľa predchádzajúcej vety tohto bodu
                Všeobecných obchodných podmienok stráca právo na odstúpenie od
                Zmluvy, a to pred uplynutím 14 (štrnásť) dňovej lehoty na
                odstúpenie od Zmluvy, ktorá by začala plynúť odo dňa uzatvorenia
                Zmluvy.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              VI. Práva duševného vlastníctva
            </h3>
            <ol>
              <li className="text-normal text-small text-medium">
                Diela zverejnené a zdieľané v Online knižnici a Služby online
                knižnice sú chránené príslušnými právnymi predpismi Slovenskej
                republiky, a to najmä zákonom č. 185/2015 Z. z. Autorský zákon v
                znení neskorších právnych predpisov (ďalej len ,,Autorský
                zákon“).
              </li>
              {/* <li className="text-normal text-small text-medium">
                Užívateľ je oprávnený používať Dielo výlučne spôsobom podľa
                článku I bod 2 týchto Všeobecných obchodných podmienok. Užívateľ
                nie je oprávnený Diela zverejnené a zdieľané v Online knižnici
                najmä akokoľvek meniť, upravovať, spracovať, spájať s iným
                dielom, vyhotovovať rozmnoženiny Diela, distribuovať, alebo
                verejne rozširovať rozmnoženinu Diela prevodom vlastníckeho
                práva, vypožičaním alebo nájmom, uviesť Diela na verejnosti
                verejným vystavením rozmnoženiny Diela, odstrániť, meniť,
                schovávať alebo znejasniť informácie o majetkových právach
                spoločnosti IVEX GROUP alebo tretích osôb poskytujúcich licenciu
                pre Diela spoločnosti IVEX GROUP, ani používať Diela akýmkoľvek
                iným spôsobom, ktorý je v rozpore s podmienkami používania Diel
                uvedenými v týchto Všeobecných obchodných podmienkach.
              </li> */}
              <li className="text-normal text-small text-medium">
                Užívateľ je oprávnený používať Dielo výlučne spôsobom podľa
                článku I bod 2 týchto Všeobecných obchodných podmienok. Užívateľ
                nie je oprávnený Diela zverejnené a zdieľané v Online knižnici
                najmä akokoľvek meniť, upravovať, spracovať, spájať s iným
                dielom, vyhotovovať rozmnoženiny Diela, distribuovať, alebo
                verejne rozširovať rozmnoženinu Diela prevodom vlastníckeho
                práva, vypožičaním alebo nájmom, uviesť Diela na verejnosti
                verejným vystavením rozmnoženiny Diela, odstrániť, meniť,
                schovávať alebo znejasniť informácie o majetkových právach
                spoločnosti XXXXXXX alebo tretích osôb poskytujúcich licenciu
                pre Diela spoločnosti XXXXX, ani používať Diela akýmkoľvek iným
                spôsobom, ktorý je v rozpore s podmienkami používania Diel
                uvedenými v týchto Všeobecných obchodných podmienkach.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Spoločnosť IVEX GROUP poskytuje Užívateľovi nevýhradnú licenciu
                podľa príslušných ustanovení § 70 Autorského zákona.
              </li> */}
              <li className="text-normal text-small text-medium">
                Spoločnosť XXXXXXX poskytuje Užívateľovi nevýhradnú licenciu
                podľa príslušných ustanovení § 70 Autorského zákona.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Spoločnosť IVEX GROUP poskytuje Užívateľovi územne neobmedzenú a
                vecne obmedzená licenciu, a to len za účelom využívania Služieb
                online knižnice, a to po dobu trvania Zmluvy.
              </li> */}
              <li className="text-normal text-small text-medium">
                Spoločnosť XXXXXX poskytuje Užívateľovi územne neobmedzenú a
                vecne obmedzená licenciu, a to len za účelom využívania Služieb
                online knižnice, a to po dobu trvania Zmluvy.
              </li>
              <li className="text-normal text-small text-medium">
                Pre vylúčenie akýchkoľvek pochybností platí, že Zmluva nezakladá
                prevod vlastníckeho práva ani iného práva duševného vlastníctva
                k Dielam zverejneným a zdieľaným v Online knižnici a/alebo k
                Službám online knižnice.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              VII. Reklamácia a zodpovednosť za nemožnosť prístupu k Službám
              online knižnice
            </h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                Porušením povinnosti spoločnosti IVEX GROUP sprístupniť Služby
                online knižnice sa rozumie výpadok a/alebo technická porucha
                systému, v dôsledku ktorej Užívateľ nemôže užívať Služby online
                knižnice dlhšie ako 24 hodín.
              </li> */}
              <li className="text-normal text-small text-medium">
                Porušením povinnosti spoločnosti XXXXXX sprístupniť Služby
                online knižnice sa rozumie výpadok a/alebo technická porucha
                systému, v dôsledku ktorej Užívateľ nemôže užívať Služby online
                knižnice dlhšie ako 24 hodín.
              </li>
              <li className="text-normal text-small text-medium">
                {/* Spoločnosť IVEX GROUP nezodpovedá za nemožnosť Užívateľa k
                prístupu Službám online knižnice, ktorá vznikla z dôvodov na
                strane Užívateľa a/alebo z dôvodov, ktoré vznikli nezávisle od
                vôle spoločnosti IVEX GROUP a/alebo ktoré nemohla ovplyvniť.
                Spoločnosť IVEX GROUP nezodpovedá za: */}
                Spoločnosť XXXXXX nezodpovedá za nemožnosť Užívateľa k prístupu
                Službám online knižnice, ktorá vznikla z dôvodov na strane
                Užívateľa a/alebo z dôvodov, ktoré vznikli nezávisle od vôle
                spoločnosti XXXXXXX a/alebo ktoré nemohla ovplyvniť. Spoločnosť
                XXXXXX nezodpovedá za:
                <ol type="a">
                  <li className="text-normal text-small text-medium">
                    nemožnosť prístupu k Službám online knižnice, ktorá je
                    spôsobená technickými vlastnosťami zariadenia používaného
                    Užívateľom,
                  </li>
                  <li className="text-normal text-small text-medium">
                    za funkčnosť alebo prevádzkyschopnosť zariadenia Užívateľa,
                  </li>
                  <li className="text-normal text-small text-medium">
                    za škodu spôsobenú neoprávneným použitím prístupových údajov
                    k Užívateľskému účtu,
                  </li>
                  {/* <li className="text-normal text-small text-medium">
                    z dôvodu preťaženia internetu, funkčnosti a
                    prevádzkyschopnosti zariadení, sietí, elektroniky alebo
                    komunikácií, ktoré sú mimo kontroly spoločnosti IVEX GROUP,
                  </li> */}
                  <li className="text-normal text-small text-medium">
                    z dôvodu preťaženia internetu, funkčnosti a
                    prevádzkyschopnosti zariadení, sietí, elektroniky alebo
                    komunikácií, ktoré sú mimo kontroly spoločnosti XXXXXXXX,
                  </li>
                  {/* <li className="text-normal text-small text-medium">
                    za nesplnenie povinností z dôvodu okolností zapríčinených
                    tzv. vyššou mocou, t. j. okolnosti, ktorá nastala nezávisle
                    od vôle spoločnosti IVEX GROUP a bráni jej v splnení
                    povinnosti.
                  </li> */}
                  <li className="text-normal text-small text-medium">
                    za nesplnenie povinností z dôvodu okolností zapríčinených
                    tzv. vyššou mocou, t. j. okolnosti, ktorá nastala nezávisle
                    od vôle spoločnosti XXXXXXX a bráni jej v splnení
                    povinnosti.
                  </li>
                </ol>
              </li>
              {/* <li className="text-normal text-small text-medium">
                Užívateľ je povinný reklamovať chybu prístupu k Službám online
                knižnice, a to bez zbytočného odkladu, najneskôr do 5 (piatich)
                dní od jej výskytu na e-mailovú adresu:
                predplatne@ivexlibrary.sk a/alebo na adresu sídla spoločnosti
                IVEX GROUP uvedenú v článku I bod 1. týchto Všeobecných
                obchodných podmienok. Pri reklamácii chyby prístupu k Službám
                online knižnice je Užívateľ povinný uviesť jasný a zrozumiteľný
                popis reklamovanej chyby a časový údaj o výskyte tejto chyby. Za
                účelom vybavenia reklamácie je spoločnosť IVEX GROUP oprávnená
                vyžiadať od Užívateľa doplnenie technických a/alebo akýchkoľvek
                iných údajov.
              </li> */}
              <li className="text-normal text-small text-medium">
                Užívateľ je povinný reklamovať chybu prístupu k Službám online
                knižnice, a to bez zbytočného odkladu, najneskôr do 5 (piatich)
                dní od jej výskytu na e-mailovú adresu: predplatne@XXXXX.sk
                a/alebo na adresu sídla spoločnosti XXXXXXX uvedenú v článku I
                bod 1. týchto Všeobecných obchodných podmienok. Pri reklamácii
                chyby prístupu k Službám online knižnice je Užívateľ povinný
                uviesť jasný a zrozumiteľný popis reklamovanej chyby a časový
                údaj o výskyte tejto chyby. Za účelom vybavenia reklamácie je
                spoločnosť XXXXXXXXX oprávnená vyžiadať od Užívateľa doplnenie
                technických a/alebo akýchkoľvek iných údajov.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Spoločnosť IVEX GROUP je povinná vybaviť reklamáciu do 30
                (tridsiatich) dní odo dňa jej doručenia. Ak reklamácia Služieb
                online knižnice bude opodstatnená, spoločnosť IVEX GROUP
                poskytne Užívateľovi bezodplatný prístup k Službám online
                knižnice na 30 (tridsať) dní plynúcim po skončení posledného
                predplatného obdobia.
              </li> */}
              <li className="text-normal text-small text-medium">
                Spoločnosť XXXXXXX je povinná vybaviť reklamáciu do 30
                (tridsiatich) dní odo dňa jej doručenia. Ak reklamácia Služieb
                online knižnice bude opodstatnená, spoločnosť XXXXXXXX poskytne
                Užívateľovi bezodplatný prístup k Službám online knižnice na 30
                (tridsať) dní plynúcim po skončení posledného predplatného
                obdobia.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              VIII. Podávanie sťažností a podnetov
            </h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                Užívateľ je oprávnený podávať podnety a sťažnosti písomne, a to
                prostredníctvom e-mailu na adresu: [•] alebo na adresu
                spoločnosti IVEX GROUP uvedenú v článku I bod 1. týchto
                Všeobecných obchodných podmienok.
              </li> */}
              <li className="text-normal text-small text-medium">
                Užívateľ je oprávnený podávať podnety a sťažnosti písomne, a to
                prostredníctvom e-mailu na adresu: [•] alebo na adresu
                spoločnosti XXXXXXX uvedenú v článku I bod 1. týchto Všeobecných
                obchodných podmienok.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Spoločnosť IVEX GROUP informuje Užívateľa o posúdení podnetu
                alebo sťažnosti e-mailom na e-mailovú adresu Užívateľa, uvedenú
                pri registrácii do Online knižnice.
              </li> */}
              <li className="text-normal text-small text-medium">
                Spoločnosť XXXXXXX informuje Užívateľa o posúdení podnetu alebo
                sťažnosti e-mailom na e-mailovú adresu Užívateľa, uvedenú pri
                registrácii do Online knižnice.
              </li>
              <li className="text-normal text-small text-medium">
                Orgánom dozoru je Slovenská obchodná inšpekcia (SOI),
                Inšpektorát SOI pre Bratislavský kraj, so sídlom: Bajkalská
                21/A, P. O. BOX č. 5, 820 07 Bratislava, tel. č. 02/58 27 21 72,
                02/58 27 21 04.
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              IX. Alternatívne riešenie sporov
            </h3>
            <ol>
              {/* <li className="text-normal text-small text-medium">
                Užívateľ má právo obrátiť sa na spoločnosť IVEX GROUP so
                žiadosťou o nápravu, a to prostredníctvom e-mailu zaslaného na:
                predplatne@ivexlibrary.sk alebo na adresu spoločnosti IVEX GROUP
                uvedenú v článku I bod 1. týchto Všeobecných obchodných
                podmienok, ak nie je spokojný so spôsobom, ktorým spoločnosť
                IVEX GROUP vybavila jeho reklamáciu alebo ak sa domnieva, že
                spoločnosť IVEX GROUP porušila jeho práva. Ak spoločnosť IVEX
                GROUP odpovie na túto žiadosť zamietavo alebo na ňu neodpovie do
                30 (tridsiatich) dní od jej odoslania, Užívateľ má právo podať
                návrh na začatie alternatívneho riešenia sporu subjektu
                alternatívneho riešenia sporov (ďalej len „Subjekt“) podľa
                zákona č. 391/2015 Z. z. o alternatívnom riešení
                spotrebiteľských sporov a o zmene a doplnení niektorých zákonov
                (ďalej len ,,Zákon o alternatívnom riešení sporov“).
              </li> */}
              <li className="text-normal text-small text-medium">
                Užívateľ má právo obrátiť sa na spoločnosť XXXXXXXX so žiadosťou
                o nápravu, a to prostredníctvom e-mailu zaslaného na:
                predplatne@XXXXX.sk alebo na adresu spoločnosti XXXXXXX uvedenú
                v článku I bod 1. týchto Všeobecných obchodných podmienok, ak
                nie je spokojný so spôsobom, ktorým spoločnosť XXXXX vybavila
                jeho reklamáciu alebo ak sa domnieva, že spoločnosť XXXXX
                porušila jeho práva. Ak spoločnosť XXXXX odpovie na túto žiadosť
                zamietavo alebo na ňu neodpovie do 30 (tridsiatich) dní od jej
                odoslania, Užívateľ má právo podať návrh na začatie
                alternatívneho riešenia sporu subjektu alternatívneho riešenia
                sporov (ďalej len „Subjekt“) podľa zákona č. 391/2015 Z. z. o
                alternatívnom riešení spotrebiteľských sporov a o zmene a
                doplnení niektorých zákonov (ďalej len ,,Zákon o alternatívnom
                riešení sporov“).
              </li>
              <li className="text-normal text-small text-medium">
                Subjektami sú orgány a oprávnené právnické osoby podľa § 3
                Zákona o alternatívnom riešení sporov a ich zoznam je zverejnený
                na stránke Ministerstva hospodárstva Slovenskej republiky, a to{" "}
                <span>
                  https://www.mhsr.sk/obchod/ochrana-spotrebitela/alternativne-riesenie-spotrebitelskych-sporov-1/zoznam-subjektov-alternativneho-riesenia-spotrebitelskych-sporov-1
                </span>
                .
              </li>
              <li className="text-normal text-small text-medium">
                Návrh môže Užívateľ podať spôsobom určeným podľa § 12 Zákona o
                alternatívnom riešení sporov.
              </li>
              <li className="text-normal text-small text-medium">
                Užívateľ môže podať sťažnosť aj prostredníctvom platformy
                alternatívneho riešenia sporov RSO, ktorá je dostupná na{" "}
                <span>
                  https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.chooseLanguage
                </span>
                .
              </li>
            </ol>
          </div>

          <div className="col-12 col-lg-10 col-xl-8">
            <h3 className="text-title text-bold pb-3">
              X. Záverečné ustanovenia
            </h3>
            <ol>
              <li className="text-normal text-small text-medium">
                Tieto Všeobecné obchodné podmienky nadobúdajú platnosť a
                účinnosť dňa 1.1.2022.
              </li>
              <li className="text-normal text-small text-medium">
                Právne vzťahy neupravené týmito Všeobecnými obchodnými
                podmienkami sa riadia príslušnými platnými právnymi predpismi
                Slovenskej republiky, a to najmä zákonom č. 102/2014 Z. z. o
                ochrane spotrebiteľa pri predaji tovaru alebo poskytovaní
                služieb na základe zmluvy uzavretej na diaľku alebo zmluvy
                uzavretej mimo prevádzkových priestorov predávajúceho a o zmene
                a doplnení niektorých zákonov, zákonom č. 250/2007 Z. z. o
                ochrane spotrebiteľa a o zmene zákona Slovenskej národnej rady
                č. 372/1990 Zb. o priestupkoch v znení neskorších predpisov a
                zákonom č. 40/1964 Zb. Občiansky zákonník v znení neskorších
                právnych predpisov.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Užívateľ berie na vedomie, že akúkoľvek písomnosť týkajúcu sa
                odstúpenia od Zmluvy a/alebo reklamácie, ktorú zasiela
                spoločnosti IVEX GROUP je povinný zaslať spolu so žiadosťou o
                notifikáciu o doručení adresátovi, pričom z hľadiska doručenia
                je rozhodujúci dátum uvedený v notifikácii.
              </li> */}
              <li className="text-normal text-small text-medium">
                Užívateľ berie na vedomie, že akúkoľvek písomnosť týkajúcu sa
                odstúpenia od Zmluvy a/alebo reklamácie, ktorú zasiela
                spoločnosti XXXXX je povinný zaslať spolu so žiadosťou o
                notifikáciu o doručení adresátovi, pričom z hľadiska doručenia
                je rozhodujúci dátum uvedený v notifikácii.
              </li>
              {/* <li className="text-normal text-small text-medium">
                Spoločnosť IVEX GROUP je oprávnená kedykoľvek jednostranne
                zmeniť Všeobecné obchodné podmienky. Na vzťah medzi IVEX GROUP a
                Užívateľom sa aplikujú Všeobecné obchodné podmienky platné a
                účinné v čase uzatvorenia Zmluvy.
              </li> */}
              <li className="text-normal text-small text-medium">
                Spoločnosť XXXXX je oprávnená kedykoľvek jednostranne zmeniť
                Všeobecné obchodné podmienky. Na vzťah medzi XXXXX a Užívateľom
                sa aplikujú Všeobecné obchodné podmienky platné a účinné v čase
                uzatvorenia Zmluvy.
              </li>
              <li className="text-normal text-small text-medium">
                Príloha č. 1 tvorí neoddeliteľnú časť týchto Všeobecných
                obchodných podmienok.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VOP;
