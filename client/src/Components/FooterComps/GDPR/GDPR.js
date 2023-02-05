import React, { useEffect } from "react";

import GdprSectionI from "./GdprSectionI/GdprSectionI";

const GDPR = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="gdpr">
      {/* Section I */}
      <GdprSectionI />

      {/* ÚVOD */}
      <div className="gdpr-main">
        {/* Wave */}
        <div className="wave">
          <div className="wave-down">
            <img src="/img/wave-down-gray.svg" alt="wave" />
          </div>
        </div>
        <div className="container-lg px-0 py-5 space">
          <div className="col-12 col-lg-10 col-xl-8 col-xxl-6">
            <h4 className="text-normal text-bold">1. Úvod</h4>

            {/* <p className="text-normal text-small text-medium">
              Ďakujeme, že ste si vybrali IVEX Library!
            </p> */}
            <p className="text-normal text-small text-medium">
              Ďakujeme, že ste si vybrali XXXXX
            </p>

            {/* <p className="text-normal text-small text-medium">
              V rámci IVEX Library vám chceme poskytnúť ten najlepší možný
              zážitok, aby ste si našu službu užívali. K tomu potrebujeme
              porozumieť vašim čitateľským zvykom, aby sme mohli poskytovať
              výnimočnú a personalizovanú službu špeciálne pre vás. Vaše
              súkromie a bezpečnosť vašich osobných údajov sú a vždy budú pre
              nás nesmierne dôležité. Preto chceme transparentne vysvetliť, ako
              a prečo zhromažďujeme, uchovávame, zdieľame a používame vaše
              osobné údaje, a zároveň popísať, aké kontrolné opatrenia a
              možnosti máte k dispozícii, podľa toho kedy a ako sa rozhodnete
              zdieľať svoje osobné údaje.
            </p> */}

            <p className="text-normal text-small text-medium">
              V rámci XXXXX vám chceme poskytnúť ten najlepší možný zážitok, aby
              ste si našu službu užívali. K tomu potrebujeme porozumieť vašim
              čitateľským zvykom, aby sme mohli poskytovať výnimočnú a
              personalizovanú službu špeciálne pre vás. Vaše súkromie a
              bezpečnosť vašich osobných údajov sú a vždy budú pre nás nesmierne
              dôležité. Preto chceme transparentne vysvetliť, ako a prečo
              zhromažďujeme, uchovávame, zdieľame a používame vaše osobné údaje,
              a zároveň popísať, aké kontrolné opatrenia a možnosti máte k
              dispozícii, podľa toho kedy a ako sa rozhodnete zdieľať svoje
              osobné údaje.
            </p>

            <p className="text-normal text-small text-medium">
              To je naším cieľom a tieto Zásady ochrany osobných údajov
              („Zásady") ďalej v texte podrobne vysvetlia, čo máme na mysli.
            </p>

            {/* O týchto zásadach */}
            <h4 className="text-normal text-bold">2. O týchto Zásadách</h4>

            {/* <p className="text-normal text-small text-medium">
                            Tieto Zásady stanovujú základné informácie týkajúce sa zaobchádzania s vašimi osobnými údajmi v rámci vzťahu so spoločnosťou IVEX GROUP s.r.o. Zásady platia pre všetky služby IVEX GROUP s.r.o. a akékoľvek pridružené služby (ďalej len „Služba IVEX Libray"). Podmienky, ktorými sa riadi používanie Služby IVEX Library, sú definované v našich Podmienkach používania („Podmienky používania").
                        </p> */}

            <p className="text-normal text-small text-medium">
              Tieto Zásady stanovujú základné informácie týkajúce sa
              zaobchádzania s vašimi osobnými údajmi v rámci vzťahu so
              spoločnosťou XXXXX Zásady platia pre všetky služby XXXXX a
              akékoľvek pridružené služby (ďalej len „Služba XXXXX"). Podmienky,
              ktorými sa riadi používanie Služby XXXXX, sú definované v našich
              Podmienkach používania („Podmienky používania").
            </p>

            <p className="text-normal text-small text-medium">
              V budúcnosti môžeme vyvinúť nové alebo ponúknuť doplnkové služby.
              Ak zavedenie týchto nových alebo doplnkových služieb bude viesť k
              podstatnej zmenu spôsobu, akým zhromažďujeme alebo spracúvame vaše
              osobné údaje, poskytneme vám viac informácií alebo doplnkové
              podmienky alebo zásady. Pokiaľ nebude uvedené inak, nové alebo
              doplnkové služby sa pri zavedení budú riadiť týmito Zásadami.
            </p>

            <p className="text-normal text-small text-medium">
              Cieľom týchto Zásad je:
            </p>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                zabezpečiť, aby ste porozumeli tomu, aké osobné údaje o vás
                zhromažďujeme, dôvodom, prečo ich zhromažďujeme a používame a s
                kým ich zdieľame;
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              {/* <p className="text-normal text-small text-medium">
                vysvetliť spôsob, akým používame osobné údaje, ktoré nám
                poskytnete, aby sme vám mohli zaistiť skvelý zážitok pri
                používaní Služby IVEX Library a
              </p> */}
              <p className="text-normal text-small text-medium">
                vysvetliť spôsob, akým používame osobné údaje, ktoré nám
                poskytnete, aby sme vám mohli zaistiť skvelý zážitok pri
                používaní Služby XXXXX a
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                vysvetliť vaše práva a možnosti v súvislosti s osobnými údajmi,
                ktoré o vás zhromažďujeme a spracovávame, a poskytnúť informácie
                o tom, ako budeme chrániť vaše súkromie.
              </p>
            </div>

            {/* <p className="text-normal text-small text-medium">
              Veríme, že vám to pomôže porozumieť, aké záväzky týkajúce sa
              ochrany osobných údajov voči vám máme. Informácie o tom, ako nás
              kontaktovať, ak máte nejaké otázky alebo obavy, nájdete nižšie v
              časti 13 „Ako nás kontaktovať". Alternatívne, pokiaľ nesúhlasíte s
              obsahom týchto Zásad, vezmite prosím na vedomie, že je len na vás,
              či sa rozhodnete Službu IVEX Library využívať.
            </p> */}

            <p className="text-normal text-small text-medium">
              Veríme, že vám to pomôže porozumieť, aké záväzky týkajúce sa
              ochrany osobných údajov voči vám máme. Informácie o tom, ako nás
              kontaktovať, ak máte nejaké otázky alebo obavy, nájdete nižšie v
              časti 13 „Ako nás kontaktovať". Alternatívne, pokiaľ nesúhlasíte s
              obsahom týchto Zásad, vezmite prosím na vedomie, že je len na vás,
              či sa rozhodnete Službu XXXXX využívať.
            </p>

            {/* Vaše práva a preferencie: možnosti voľby a kontroly */}
            <h4 className="text-normal text-bold">
              3. Vaše práva a preferencie: možnosti voľby a kontroly
            </h4>

            <p className="text-normal text-small text-medium">
              Všeobecné nariadenie o ochrane údajov, alebo „GDPR", dáva
              jednotlivcom určité práva týkajúce sa ich osobných údajov. Preto
              sme radi, že môžeme ponúknuť transparentnosť a riadenie prístupu,
              ktoré používateľom pomôžu tieto práva využívať. Práva, ktoré má
              jednotlivec k dispozícii v rozsahu povolenom platnými právnymi
              predpismi, sú:
            </p>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo na prístup - právo byť informovaný o osobných údajoch,
                ktoré o vás spracovávame, a požadovať k nim prístup;
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo na opravu - právo požadovať, aby sme zmenili alebo
                aktualizovali vaše osobné údaje, ak sú nepresné alebo neúplné;
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo na výmaz - právo požadovať, aby sme vaše osobné údaje
                vymazali;
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo na obmedzenie - právo požadovať, aby sme dočasne alebo
                natrvalo prestali spracovávať všetky vaše osobné údaje alebo ich
                časť;
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo namietať - právo kedykoľvek vzniesť námietku proti tomu,
                aby sme spracovávali vaše osobné údaje z dôvodov týkajúcich sa
                vašej konkrétnej situácie (napríklad proti profilovaniu vrátane
                personalizácie a behaviorálnej reklamy);
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo vzniesť námietku proti spracovaniu osobných údajov na
                účely priameho marketingu;
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                právo na prenosnosť údajov - právo požadovať kópiu vašich
                osobných údajov v elektronickom formáte a právo preniesť tieto
                osobné údaje na využitie v rámci služby inej strany a
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              {/* <p className="text-normal text-small text-medium">
                                právo nebyť predmetom automatizovaného rozhodovania – právo nebyť predmetom rozhodnutia založeného výlučne na automatizovanom rozhodovaní, vrátane profilovania, pokiaľ by dané rozhodnutie vyvolávalo vo vzťahu k vám právne účinky alebo by vás podobným spôsobom významne ovplyvnilo. IVEX GROUP s.r.o. vykonáva len také profilovanie, ktoré nemá právne účinky, ktoré sa vás týkajú alebo vás podobne významne ovplyvňujú.
                            </p> */}
              <p className="text-normal text-small text-medium">
                právo nebyť predmetom automatizovaného rozhodovania – právo
                nebyť predmetom rozhodnutia založeného výlučne na
                automatizovanom rozhodovaní, vrátane profilovania, pokiaľ by
                dané rozhodnutie vyvolávalo vo vzťahu k vám právne účinky alebo
                by vás podobným spôsobom významne ovplyvnilo. XXXXX vykonáva len
                také profilovanie, ktoré nemá právne účinky, ktoré sa vás týkajú
                alebo vás podobne významne ovplyvňujú.
              </p>
            </div>

            {/* <p className="text-normal text-small text-medium">
                            Aby sme vám umožnili dozvedieť sa viac o týchto právach ako aj o tom, ako ich jednoducho uplatňovať a zaznamenať vaše preferencie týkajúce sa spôsobu, akým IVEX GROUP s.r.o. používa vaše osobné údaje, ponúkame vám nasledujúce informačné zdroje:
                        </p> */}

            <p className="text-normal text-small text-medium">
              Aby sme vám umožnili dozvedieť sa viac o týchto právach ako aj o
              tom, ako ich jednoducho uplatňovať a zaznamenať vaše preferencie
              týkajúce sa spôsobu, akým XXXXX používa vaše osobné údaje,
              ponúkame vám nasledujúce informačné zdroje:
            </p>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                Nastavenie ochrany súkromia (prístup cez stránku vášho účtu) –
                umožňuje vám vybrať si z možností spracovávania určitých
                osobných údajov a ponúka automatizovanú funkciu „Stiahnuť vaše
                údaje" na stiahnutie základných informácií o vašom účte a
                používaní.
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              {/* <p className="text-normal text-small text-medium">
                                Nastavenie oznámení (prístup cez stránku vášho účtu) – umožní vám vybrať si, ktoré marketingové oznámenia budete od IVEX GROUP s.r.o. dostávať. Tieto nastavenia môžete prepínať a tak sa prihlasovať na prijímanie rôznych druhov e-mailov a push notifikácií, alebo sa od nich odhlasovať. Upozorňujeme, že marketingové správy od IVEX GROUP s.r.o. odosielané prostredníctvom e-mailu obsahujú mechanizmus na zrušenie odberu v rámci samotnej správy (napr. odkaz na odhlásenie v e-mailoch, ktoré vám posielame). Kliknutím na odkaz v e-maile sa odhlásite z prijímania ďalších správ danej kategórie (napr. aktualizácie týkajúce sa autorov). Stránku Nastavenia oznámení môžete použiť na výber nastavení pre všetky kategórie e-mailov a marketingových push notifikácií.
                            </p> */}

              <p className="text-normal text-small text-medium">
                Nastavenie oznámení (prístup cez stránku vášho účtu) – umožní
                vám vybrať si, ktoré marketingové oznámenia budete od XXXXX
                dostávať. Tieto nastavenia môžete prepínať a tak sa prihlasovať
                na prijímanie rôznych druhov e-mailov a push notifikácií, alebo
                sa od nich odhlasovať. Upozorňujeme, že marketingové správy od
                XXXXX odosielané prostredníctvom e-mailu obsahujú mechanizmus na
                zrušenie odberu v rámci samotnej správy (napr. odkaz na
                odhlásenie v e-mailoch, ktoré vám posielame). Kliknutím na odkaz
                v e-maile sa odhlásite z prijímania ďalších správ danej
                kategórie (napr. aktualizácie týkajúce sa autorov). Stránku
                Nastavenia oznámení môžete použiť na výber nastavení pre všetky
                kategórie e-mailov a marketingových push notifikácií.
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                Zásady pre súbory cookies – na tomto mieste sú poskytované
                informácie o tom, ako používame súbory cookies, vrátane reklamy,
                ktorá je založená na vašich záujmoch. Nájdete tu aj informácie o
                tom, ako môžete riadiť svoje preferencie týkajúce sa súborov
                cookies a vypnúť niektoré druhy sledovania a
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              {/* <p className="text-normal text-small text-medium">
                Informačné zdroje k zákazníckej podpore – na našej webovej
                stránke zákazníckej podpory máme niekoľko stránok s ďalšími
                informáciami k otázkam ochrany údajov. Hlavným zdrojom
                informácií je článok o právach vo vzťahu k údajom a o nastavení
                ochrany osobných údajov, ktorý obsahuje odpovede na „často
                kladené otázky" o spracovávaní osobných údajov v Službe IVEX
                Library.
              </p> */}

              <p className="text-normal text-small text-medium">
                Informačné zdroje k zákazníckej podpore – na našej webovej
                stránke zákazníckej podpory máme niekoľko stránok s ďalšími
                informáciami k otázkam ochrany údajov. Hlavným zdrojom
                informácií je článok o právach vo vzťahu k údajom a o nastavení
                ochrany osobných údajov, ktorý obsahuje odpovede na „často
                kladené otázky" o spracovávaní osobných údajov v Službe XXXXX.
              </p>
            </div>

            <p className="text-normal text-small text-medium">
              Ak máte otázky týkajúce sa ochrany osobných údajov, vašich práv,
              alebo ich uplatňovania, prosíme, aby ste kontaktovali našu
              zodpovednú osobu pre ochranu údajov prostredníctvom formulára
              „Kontaktujte nás" na stránke v sekcii kontakt. Ak máte obavy
              týkajúce sa nášho spracovávania vašich osobných údajov, dúfame, že
              ich spoločne vyriešime. Môžete však kontaktovať aj svoj lokálny
              úrad pre ochranu údajov.
            </p>

            <h4 className="text-normal text-bold">
              4. Osobné údaje, ktoré od vás získavame
            </h4>

            <p className="text-normal text-small text-medium">
              V tabuľkách uvedených nižšie sme zostavili kategórie osobných
              údajov, ktoré o vás zhromažďujeme a používame, vrátane spôsobu ich
              získavania:
            </p>

            {/* <p className="text-normal text-small text-medium">
              Tabuľka nižšie uvádza osobné údaje, ktoré sa zhromažďujú pri vašej
              registrácii do Služby IVEX Library:
            </p> */}

            <p className="text-normal text-small text-medium">
              Tabuľka nižšie uvádza osobné údaje, ktoré sa zhromažďujú pri vašej
              registrácii do Služby XXXXX:
            </p>

            <div className="table">
              <table>
                <tr>
                  <th>
                    <span className="table-bold">
                      Kategórie osobných údajov
                    </span>
                  </th>
                  <th>
                    <span className="table-bold">Popis kategórie</span>
                  </th>
                </tr>
                <tr>
                  <td>
                    <span className="table-bold">Údaje o používateľovi</span>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Sú to osobné údaje, ktoré nám poskytnete, alebo ich
                      zhromaždíme, aby sme vám umožnili zaregistrovať sa a
                      používať Službu IVEX Library. Tieto údaje zahŕňať zahŕňajú
                      vaše používateľské meno, e-mailovú adresu.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Sú to osobné údaje, ktoré nám poskytnete, alebo ich
                      zhromaždíme, aby sme vám umožnili zaregistrovať sa a
                      používať Službu XXXXX. Tieto údaje zahŕňať zahŕňajú vaše
                      používateľské meno, e-mailovú adresu.
                    </p>

                    {/* <p className="text-normal text-small text-medium">
                      Tieto údaje sú potrebné na vytvorenie vášho účtu, a na to,
                      aby sme Vám poskytovali Službu IVEX Library.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Tieto údaje sú potrebné na vytvorenie vášho účtu, a na to,
                      aby sme Vám poskytovali Službu XXXXX.
                    </p>

                    <p className="text-normal text-small text-medium">
                      Máte možnosť poskytnúť nám aj dodatočné osobné údaje, aby
                      sme mohli váš účet viac personalizovať, napríklad názov
                      školy a ročník. Ak si neprajete personalizáciu služby na
                      základe Vašich dodatočných údajov, nevypĺňajte ich.
                    </p>
                  </td>
                </tr>
              </table>
            </div>

            {/* <p className="text-normal text-small text-medium">
              Tabuľka nižšie uvádza osobné údaje, ktoré sa zhromažďujú počas
              vášho používania Služby IVEX Library:
            </p> */}

            <p className="text-normal text-small text-medium">
              Tabuľka nižšie uvádza osobné údaje, ktoré sa zhromažďujú počas
              vášho používania Služby XXXXX:
            </p>

            <div className="table">
              <table>
                <tr>
                  <th>
                    <span className="table-bold">
                      Kategórie osobných údajov
                    </span>
                  </th>
                  <th>
                    <span className="table-bold">Popis kategórie</span>
                  </th>
                </tr>
                <tr>
                  <td>
                    <span className="table-bold">Údaje o používateľovi</span>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Sú to osobné údaje, ktoré sa o vás zhromažďujú, keď
                      vstupujete do Služby IVEX Library a/alebo ju používate, a
                      zahŕňajú:
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Sú to osobné údaje, ktoré sa o vás zhromažďujú, keď
                      vstupujete do Služby XXXXX a/alebo ju používate, a
                      zahŕňajú:
                    </p>
                    <div className="list">
                      <div className="point"></div>
                      {/* <p className="text-normal text-small text-medium">
                        Informácie o vašom type programu Služby IVEX Library.
                      </p> */}

                      <p className="text-normal text-small text-medium">
                        Informácie o vašom type programu Služby XXXXX.
                      </p>
                    </div>

                    <div className="list">
                      <div className="point"></div>
                      {/* <p className="text-normal text-small text-medium">
                        Informácie o vašich interakciách so Službou IVEX
                        Library, ktoré zahŕňajú profilovanie, na ktoré sú
                        použité napríklad informácie o vašom vyhľadávaní
                        (vrátane dátumu a času vašich požiadaviek), informácie o
                        publikáciách, ktoré ste otvorili, obľúbené publikácie,
                        ktoré označíte, históriu prehliadania a interakcie so
                        Službou IVEX Library, obsahom, ako aj interakcie s iními
                        používateľmi IVEX Library. Môžu sem tiež patriť
                        informácie o tom, ako používate aplikácie tretích strán
                        v súvislosti so Službou IVEX Library.
                      </p> */}

                      <p className="text-normal text-small text-medium">
                        Informácie o vašich interakciách so Službou XXXXX, ktoré
                        zahŕňajú profilovanie, na ktoré sú použité napríklad
                        informácie o vašom vyhľadávaní (vrátane dátumu a času
                        vašich požiadaviek), informácie o publikáciách, ktoré
                        ste otvorili, obľúbené publikácie, ktoré označíte,
                        históriu prehliadania a interakcie so Službou XXXXX,
                        obsahom, ako aj interakcie s iními používateľmi XXXXX.
                        Môžu sem tiež patriť informácie o tom, ako používate
                        aplikácie tretích strán v súvislosti so Službou XXXXX.
                      </p>
                    </div>

                    <div className="list">
                      <div className="point"></div>
                      {/* <p className="text-normal text-small text-medium">
                        Môžu sem tiež patriť informácie o tom, ako používate
                        aplikácie tretích strán v súvislosti so Službou IVEX
                        Library. Závery týkajúce sa vašich záujmov a
                        preferencií, vyvodené na základe vášho používania Služby
                        IVEX Library sú tiež súčasťou Vášho profilovania.
                      </p> */}

                      <p className="text-normal text-small text-medium">
                        Môžu sem tiež patriť informácie o tom, ako používate
                        aplikácie tretích strán v súvislosti so Službou XXXXX.
                        Závery týkajúce sa vašich záujmov a preferencií,
                        vyvodené na základe vášho používania Služby XXXXX sú
                        tiež súčasťou Vášho profilovania.
                      </p>
                    </div>

                    <div className="list">
                      <div className="point"></div>
                      {/* <p className="text-normal text-small text-medium">
                        Užívateľský obsah (ako je definovaný v VOP), ktorý
                        publikujete v IVEX Library, napríklad fotografie a
                        interakcie s tímom Služieb zákazníkom IVEX Library.
                        Určité technické údaje, ktoré môžu zahŕňať: informácie o
                        adrese URL; on-line identifikátory vrátane údajov o
                        súboroch cookie a IP adries; informácie o typoch
                        zariadení, ktoré používate, napríklad jedinečné ID
                        zariadení, typ sieťového pripojenia (napr. wifi, 3G,
                        LTE, Bluetooth), poskytovateľa, výkon siete a
                        zariadenia, typ prehliadača, jazyk, informácie
                        umožňujúce správu digitálnych práv, operačný systém;
                        atribúty o zariadeniach vo vašej sieti wifi, ktoré sú k
                        dispozícii na pripojenie k Službe IVEX Library
                        (napríklad reproduktory); miesto, kde sa nachádzate, bez
                        presného určenia, ktoré môže byť odvodené alebo vyvodené
                        z určitých technických údajov (napr. z vašej IP adresy,
                        jazykového nastavenia vášho zariadenia, alebo platobnej
                        meny), na účely splnenia geografických požiadaviek v
                        našich licenčných zmluvách a poskytovania
                        personalizovaného obsahu a reklamy a údaje zo senzoru v
                        mobilnom zariadení generované pohybom alebo orientáciou
                      </p> */}

                      <p className="text-normal text-small text-medium">
                        Užívateľský obsah (ako je definovaný v VOP), ktorý
                        publikujete v XXXXX, napríklad fotografie a interakcie s
                        tímom Služieb zákazníkom XXXXX. Určité technické údaje,
                        ktoré môžu zahŕňať: informácie o adrese URL; on-line
                        identifikátory vrátane údajov o súboroch cookie a IP
                        adries; informácie o typoch zariadení, ktoré používate,
                        napríklad jedinečné ID zariadení, typ sieťového
                        pripojenia (napr. wifi, 3G, LTE, Bluetooth),
                        poskytovateľa, výkon siete a zariadenia, typ
                        prehliadača, jazyk, informácie umožňujúce správu
                        digitálnych práv, operačný systém; atribúty o
                        zariadeniach vo vašej sieti wifi, ktoré sú k dispozícii
                        na pripojenie k Službe XXXXX (napríklad reproduktory);
                        miesto, kde sa nachádzate, bez presného určenia, ktoré
                        môže byť odvodené alebo vyvodené z určitých technických
                        údajov (napr. z vašej IP adresy, jazykového nastavenia
                        vášho zariadenia, alebo platobnej meny), na účely
                        splnenia geografických požiadaviek v našich licenčných
                        zmluvách a poskytovania personalizovaného obsahu a
                        reklamy a údaje zo senzoru v mobilnom zariadení
                        generované pohybom alebo orientáciou
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="table-bold">
                      Údaje o platbách a nákupoch
                    </span>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Určité osobné údaje môžeme zhromažďovať, ak sa
                      zaregistrujete do služby na skúšku (Trial), alebo si
                      zakúpite niektorý z našich platených odberov (podľa
                      uvedených VOP), alebo vykonáte prostredníctvom Služby IVEX
                      Library iný nákup. Konkrétne osobné údaje, ktoré sa budú
                      zhromažďovať, sa budú líšiť v závislosti od platobnej
                      metódy, ale budú zahŕňať napríklad nasledujúce informácie:
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Určité osobné údaje môžeme zhromažďovať, ak sa
                      zaregistrujete do služby na skúšku (Trial), alebo si
                      zakúpite niektorý z našich platených odberov (podľa
                      uvedených VOP), alebo vykonáte prostredníctvom Služby
                      XXXXX iný nákup. Konkrétne osobné údaje, ktoré sa budú
                      zhromažďovať, sa budú líšiť v závislosti od platobnej
                      metódy, ale budú zahŕňať napríklad nasledujúce informácie:
                    </p>
                    <div className="list">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Meno a priezvisko
                      </p>
                    </div>

                    <div className="list">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Typ kreditnej alebo debetnej karty, dátum skončenia
                        platnosti a určité číslice z čísla vašej karty
                      </p>
                    </div>

                    <div className="list">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Detaily o histórii vašich nákupov a platieb
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            {/* Na aké účely osobné údaje používame */}
            <h4 className="text-normal text-bold">
              5. Na aké účely osobné údaje používame
            </h4>

            {/* <p className="text-normal text-small text-medium">
              Počas toho, ako používate Službu IVEX Library alebo s ňou
              pracujete, používame na spracovanie vašich osobných údajov, ktoré
              zhromažďujeme, rôzne technológie, a to z rôznych dôvodov. V
              nasledujúcej tabuľke uvádzame dôvody, prečo osobné údaje
              spracúvame, príslušné právne základy, o ktoré sa opierame a ktoré
              nám umožňujú legálne spracovávať osobné údaje, a kategórie
              osobných údajov (určené v Časti 4 „Osobné údaje, ktoré
              zhromažďujeme" používané na nasledujúce účely:
            </p> */}

            <p className="text-normal text-small text-medium">
              Počas toho, ako používate Službu XXXXX alebo s ňou pracujete,
              používame na spracovanie vašich osobných údajov, ktoré
              zhromažďujeme, rôzne technológie, a to z rôznych dôvodov. V
              nasledujúcej tabuľke uvádzame dôvody, prečo osobné údaje
              spracúvame, príslušné právne základy, o ktoré sa opierame a ktoré
              nám umožňujú legálne spracovávať osobné údaje, a kategórie
              osobných údajov (určené v Časti 4 „Osobné údaje, ktoré
              zhromažďujeme" používané na nasledujúce účely:
            </p>

            <div className="table">
              <table>
                <tr>
                  <th>
                    {/* <span className="table-bold">
                                            Popis, prečo IVEX GROUP spracúva vaše osobné údaje („účel spracovania“) Právny základ pre účel spracovania    
                                        </span> */}

                    <span className="table-bold">
                      Popis, prečo XXXXX spracúva vaše osobné údaje („účel
                      spracovania“) Právny základ pre účel spracovania
                    </span>
                  </th>
                  <th>
                    <span className="table-bold">
                      Právny základ pre účel spracovania:
                    </span>
                  </th>
                  <th>
                    {/* <span className="table-bold">
                      Kategórie osobných údajov používané IVEX Library na účely
                      spracovania:
                    </span> */}

                    <span className="table-bold">
                      Kategórie osobných údajov používané XXXXX na účely
                      spracovania:
                    </span>
                  </th>
                </tr>
                <tr>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Poskytovanie a personalizácia Služby IVEX Library.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Poskytovanie a personalizácia Služby XXXXX.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zmluvy
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o platbách a nákupoch
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje na overenie programu
                      </p>
                    </div>
                  </td>
                </tr>
                {/* Druhý riadok */}
                <tr>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Pochopenie, diagnostika, vyhľadanie a odstránenie
                      problémov týkajúcich sa Služby IVEX Library.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Pochopenie, diagnostika, vyhľadanie a odstránenie
                      problémov týkajúcich sa Služby XXXXX.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zmluvy
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Tretí riadok */}
                <tr>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Vyhodnotenie a vývoj nových funkcií, technológií a
                      zlepšení Služby IVEX Library.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Vyhodnotenie a vývoj nových funkcií, technológií a
                      zlepšení Služby XXXXX.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Súhlas
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Štvrtý riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Dodržiavanie zákonných povinností a plnenie požiadaviek
                      orgánov činných v trestnom konaní.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zákonných povinností
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o platbách a nákupoch
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje na overenie programu
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje poskytované v rámci
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        súťaží, prieskumov a lotérií
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Piatý riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Plnenie zmluvných povinností voči tretím stranám,
                      napríklad prijímanie primeraných opatrení s ohľadom na
                      oznámenia o porušovaní práv duševného vlastníctva a o
                      nevhodnom obsahu.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Agregované a anonymizované údaje o používateľoch,
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní, platbách a nákupoch
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Žiadne osobné údaje nezdieľame
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Šiesty riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Preukazovanie a uplatňovanie právnych nárokov alebo obrana
                      pred právnymi nárokmi.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o platbách a nákupoch
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje na overenie programu
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje poskytované v rámci
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        súťaží, prieskumov a lotérií
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Siedmy riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Obchodné plánovanie, príprava výkazov a prognóz.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o platbách a nákupoch
                      </p>
                    </div>
                  </td>
                </tr>

                {/* ôsmy riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Spracovávanie platieb.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zmluvy
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zákonných povinností
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o platbách a nákupoch
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Deviaty riadok */}
                <tr>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Odhaľovanie podvodného správania, vrátane podvodných
                      platieb a podvodného používania Služby IVEX Library.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Odhaľovanie podvodného správania, vrátane podvodných
                      platieb a podvodného používania Služby XXXXX.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zmluvy
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zákonných povinností
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o platbách a nákupoch
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje na overenie programu
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Jedenásty riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Realizovanie výskumu, prieskumov.
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zmluvy
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Súhlas
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používateľovi
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje o používaní
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje poskytované v rámci prieskumov
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Dvanásty riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Realizovanie súťaží
                    </p>
                  </td>

                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Súhlas – primárne
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Plnenie zmluvy -sekundárne
                      </p>
                    </div>

                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Oprávnený záujem - sekundárne
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="list px-0">
                      <div className="point"></div>
                      <p className="text-normal text-small text-medium">
                        Údaje poskytované v rámci súťaží
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <p className="text-normal text-small text-medium">
              tak informácie o tom, ako nás v tejto súvislosti kontaktovať,
              nájdete v Časti 13 „Ako nás kontaktovať".
            </p>

            {/* O týchto zásadach */}
            <h4 className="text-normal text-bold">
              6. Zdieľanie osobných údajov
            </h4>

            {/* <p className="text-normal text-small text-medium">
              Vytvorili sme kategórie príjemcov osobných údajov, zhromaždených
              alebo generovaných pri vašom používaní Služby IVEX Library.
            </p> */}

            <p className="text-normal text-small text-medium">
              Vytvorili sme kategórie príjemcov osobných údajov, zhromaždených
              alebo generovaných pri vašom používaní Služby XXXXX.
            </p>

            <p className="text-normal text-small text-medium">
              Verejne dostupné informácie
            </p>

            {/* <p className="text-normal text-small text-medium">
              Ak využijete funkciu Služby IVEX Library, ktorá je verejná,
              napríklad komentovanie knihy, nasledujúce osobné údaje budú v
              službe IVEX Library verejne dostupné: vaše používateľské meno a
              profilový obrázok, ak ho budete mať.
            </p> */}

            <p className="text-normal text-small text-medium">
              Ak využijete funkciu Služby XXXXX, ktorá je verejná, napríklad
              komentovanie knihy, nasledujúce osobné údaje budú v službe XXXXX
              verejne dostupné: vaše používateľské meno a profilový obrázok, ak
              ho budete mať.
            </p>

            <p className="text-normal text-small text-medium">
              Informácie, ktoré môžeme zdieľať
            </p>

            <div className="table">
              <table>
                <tr>
                  <th>
                    <span className="table-bold">Kategórie príjemcov</span>
                  </th>
                  <th>
                    <span className="table-bold">Dôvod zdieľania</span>
                  </th>
                </tr>
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Poskytovatelia služieb
                    </p>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                                            Spolupracujeme s poskytovateľmi služieb, ktorí pracujú v našom mene, čo si môže vyžadovať prístup k niektorým osobným údajom, aby nám mohli poskytovať svoje služby. Medzi tieto spoločnosti patria také, ktoré sme si najali na poskytovanie zákazníckej podpory, prevádzkovanie technickej infraštruktúry, ktorú potrebujeme na poskytovanie Služby IVEX Library, pomoc pri ochrane a zabezpečení našich systémov a služieb a pomoc pri obchodovaní s vlastnými produktmi a službami spoločnosti IVEX Library, ako aj s partnerskými produktmi, službami, podujatiami a na spoločné propagačné aktivity, do ktorých je spoločnosť IVEX GROUP s.r.o. zainteresovaná.
                                        </p> */}
                    <p className="text-normal text-small text-medium">
                      Spolupracujeme s poskytovateľmi služieb, ktorí pracujú v
                      našom mene, čo si môže vyžadovať prístup k niektorým
                      osobným údajom, aby nám mohli poskytovať svoje služby.
                      Medzi tieto spoločnosti patria také, ktoré sme si najali
                      na poskytovanie zákazníckej podpory, prevádzkovanie
                      technickej infraštruktúry, ktorú potrebujeme na
                      poskytovanie Služby XXXXX, pomoc pri ochrane a zabezpečení
                      našich systémov a služieb a pomoc pri obchodovaní s
                      vlastnými produktmi a službami spoločnosti XXXXX, ako aj s
                      partnerskými produktmi, službami, podujatiami a na
                      spoločné propagačné aktivity, do ktorých je spoločnosť
                      XXXXX zainteresovaná.
                    </p>
                  </td>
                </tr>

                {/* Druhý riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Spracovatelia platieb
                    </p>
                  </td>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Vaše osobné údaje budeme podľa potreby zdieľať s našimi
                      spracovateľmi platieb, aby sme im umožnili vaše platby
                      spracovať.
                    </p>
                  </td>
                </tr>

                {/* Tretí riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Reklamní partneri
                    </p>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                      Spolupracujeme s reklamnými partnermi, aby sme mohli
                      prispôsobiť obsah reklamy, ktorý môžete prijímať v rámci
                      Služby IVEX Library. Títo partneri nám pomáhajú poskytovať
                      vám relevantnejšiu reklamu a propagačné správy, ktoré môžu
                      zahŕňať reklamu na základe záujmov (známej tiež ako
                      on-line behaviorálna reklama založená na Vašom
                      profilovaní), kontextovú reklamu a všeobecnú reklamu v
                      Službe IVEX Library. Spolu s našimi reklamnými partnermi
                      môžeme spracúvať niektoré osobné údaje, aby IVEX Library
                      mohla porozumieť vašim záujmom alebo preferenciám a aby
                      sme tak mohli poskytovať reklamu, ktorá je pre vás
                      relevantnejšia.
                    </p> */}

                    <p className="text-normal text-small text-medium">
                      Spolupracujeme s reklamnými partnermi, aby sme mohli
                      prispôsobiť obsah reklamy, ktorý môžete prijímať v rámci
                      Služby XXXXX. Títo partneri nám pomáhajú poskytovať vám
                      relevantnejšiu reklamu a propagačné správy, ktoré môžu
                      zahŕňať reklamu na základe záujmov (známej tiež ako
                      on-line behaviorálna reklama založená na Vašom
                      profilovaní), kontextovú reklamu a všeobecnú reklamu v
                      Službe XXXXX. Spolu s našimi reklamnými partnermi môžeme
                      spracúvať niektoré osobné údaje, aby XXXXX mohla
                      porozumieť vašim záujmom alebo preferenciám a aby sme tak
                      mohli poskytovať reklamu, ktorá je pre vás relevantnejšia.
                    </p>
                  </td>
                </tr>

                {/* Štvrtý riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Akademickí výskumníci
                    </p>
                  </td>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Vaše osobné údaje môžeme zdieľať pre činnosti, ako je
                      štatistická analýza a vedecké štúdie, ale iba v
                      anonymizovanom formáte.
                    </p>
                  </td>
                </tr>

                {/* Piatý riadok */}
                <tr>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                                            Ostatné spoločnosti skupiny IVEX GROUP s.r.o.
                                        </p> */}

                    <p className="text-normal text-small text-medium">
                      Ostatné spoločnosti skupiny XXXXX
                    </p>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                                            Vaše osobné údaje zdieľame s ostatnými spoločnosťami v skupine IVEX GROUP s.r.o., ak je to potrebné v rámci výkonu našej každodennej podnikateľskej činnosti a na to, aby sme mohli Službu IVEX Library udržiavať a poskytovať vám ju.
                                        </p> */}

                    <p className="text-normal text-small text-medium">
                      Vaše osobné údaje zdieľame s ostatnými spoločnosťami v
                      skupine XXXXX, ak je to potrebné v rámci výkonu našej
                      každodennej podnikateľskej činnosti a na to, aby sme mohli
                      Službu XXXXX udržiavať a poskytovať vám ju.
                    </p>
                  </td>
                </tr>

                {/* Šiesty riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Orgány činné v trestnom konaní a orgány na ochranu údajov
                    </p>
                  </td>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Vaše osobné údaje zdieľame, ak sa v dobrej viere
                      domnievame, že je to potrebné na účely splnenia právnych
                      povinností vyplývajúcich z príslušných zákonov, alebo v
                      rámci reakcie na legitímne právne procesy, ako je
                      povolenie na prehliadku, súdne rozhodnutie alebo
                      predvolanie.
                    </p>
                    <p className="text-normal text-small text-medium">
                      Vaše osobné údaje zdieľame aj v prípade, že sa v dobrej
                      viere domnievame, že je to potrebné na účely našich
                      vlastných oprávnených záujmov alebo oprávnených záujmov
                      tretej strany súvisiacich s národnou bezpečnosťou,
                      vymáhaním práva, súdnym sporom, vyšetrovaním trestného
                      činu, ochranou bezpečnosti akejkoľvek osoby, alebo z
                      dôvodu prevencie úmrtia či bezprostrednej ujmy na zdraví
                      za predpokladu, že tento záujem podľa nášho názoru nie je
                      prevážený vašimi záujmami alebo základnými právami a
                      slobodami vyžadujúcimi ochranu vašich osobných údajov.
                    </p>
                  </td>
                </tr>

                {/* Siedmy riadok */}
                <tr>
                  <td>
                    <p className="text-normal text-small text-medium">
                      Kupujúci nášho podniku
                    </p>
                  </td>
                  <td>
                    {/* <p className="text-normal text-small text-medium">
                                            Vaše osobné údaje budeme zdieľať v prípadoch, že budeme predávať náš podnik kupujúcemu alebo o tomto predaji budeme s potenciálnym kupujúcim rokovať. V takej situácii bude IVEX GROUP s.r.o. aj naďalej zabezpečovať dôvernosť vašich osobných údajov a upozorní vás predtým ako budú vaše osobné údaje prenesené kupujúcemu alebo budú podliehať iným zásadám ochrany osobných údajov.
                                        </p> */}

                    <p className="text-normal text-small text-medium">
                      Vaše osobné údaje budeme zdieľať v prípadoch, že budeme
                      predávať náš podnik kupujúcemu alebo o tomto predaji
                      budeme s potenciálnym kupujúcim rokovať. V takej situácii
                      bude XXXXX aj naďalej zabezpečovať dôvernosť vašich
                      osobných údajov a upozorní vás predtým ako budú vaše
                      osobné údaje prenesené kupujúcemu alebo budú podliehať
                      iným zásadám ochrany osobných údajov.
                    </p>
                  </td>
                </tr>
              </table>
            </div>

            {/* O týchto zásadach */}
            <h4 className="text-normal text-bold">
              7. Uchovávanie a výmaz údajov
            </h4>

            {/* <p className="text-normal text-small text-medium">
              Vaše osobné našich zákonných povinností a riešenie sporov.
              Niektoré vaše osobné údaje budeme vo všeobecnosti uchovávať tak
              dlho, kým budete používateľom Služby IVEX Library. Uchovávame
              napríklad vaše Údaje o používateľovi, čítané publikácie, obľúbené
              publikácie a informácie o účte.
            </p> */}

            <p className="text-normal text-small text-medium">
              Vaše osobné našich zákonných povinností a riešenie sporov.
              Niektoré vaše osobné údaje budeme vo všeobecnosti uchovávať tak
              dlho, kým budete používateľom Služby XXXXX. Uchovávame napríklad
              vaše Údaje o používateľovi, čítané publikácie, obľúbené publikácie
              a informácie o účte.
            </p>

            <p className="text-normal text-small text-medium">
              V prípadoch, kedy je spracovanie založené na Vašom súhlase, budeme
              Vaše osobné údaje spracovávať počas doby, na ktorú nám súhlas
              udelíte, ak bude súhlas časovo obmedzený, prípadne kratšie, ak
              svoj súhlas odvoláte skôr.
            </p>

            <p className="text-normal text-small text-medium">
              Ak nás o to požiadate, vymažeme alebo anonymizujeme vaše osobné
              údaje tak, aby vás už viac neidentifikovali.
            </p>

            <p className="text-normal text-small text-medium">
              Výnimkami z vyššie uvedených prípadov sú situácie, kedy sme zo
              zákona oprávnení alebo povinní si určité osobné údaje ponechať
              dlhšie, vrátane nasledujúcich situácií:
            </p>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                Ak v súvislosti s vaším účtom existuje nevyriešená záležitosť,
                ako napríklad neuhradená platba na vašom účte alebo nevyriešený
                nárok či spor, potrebné osobné údaje si ponecháme až do
                vyriešenia takejto záležitosti
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                V prípadoch, kedy je potrebné, aby sme si ponechali osobné údaje
                z dôvodu našej právnej, daňovej, auditnej alebo účtovnej
                povinnosti, ponecháme si potrebné osobné údaje po dobu
                vyžadovanú príslušnými právnymi predpismi, napríklad Údaje o
                platbách a nákupoch máme povinnosť uchovávať 10 rokov; a/alebo
              </p>
            </div>

            <div className="list">
              <div className="point"></div>
              <p className="text-normal text-small text-medium">
                V prípadoch, kedy je to potrebné z dôvodu našich oprávnených
                obchodných záujmov, ako je prevencia podvodov alebo zachovanie
                bezpečnosti našich používateľov.
              </p>
            </div>

            {/* Prenos do iných štátov */}
            <h4 className="text-normal text-bold">8. Prenos do iných štátov</h4>

            {/* <p className="text-normal text-small text-medium">
                            IVEX Library zdieľa vaše osobné údaje globálne s ďalšími spoločnosťami v skupine IVEX GROUP s.r.o., ak je to potrebné na účely vykonávania činností uvedených v týchto Zásadách. IVEX GROUP s.r.o. si taktiež na spracovanie vašich osobných údajov môže najať tretie strany, nachádzajúce sa v iných štátoch, než je váš domovský štát alebo, takýmto tretím stranám vaše osobné údaje poskytnúť. Vaše osobné údaje tak môžu podliehať aj zákonom o ochrane osobných údajov, ktoré sa líšia od zákonov vo vašom štáte.
                        </p> */}

            <p className="text-normal text-small text-medium">
              XXXXX zdieľa vaše osobné údaje globálne s ďalšími spoločnosťami v
              skupine XXXXX, ak je to potrebné na účely vykonávania činností
              uvedených v týchto Zásadách. XXXXX si taktiež na spracovanie
              vašich osobných údajov môže najať tretie strany, nachádzajúce sa v
              iných štátoch, než je váš domovský štát alebo, takýmto tretím
              stranám vaše osobné údaje poskytnúť. Vaše osobné údaje tak môžu
              podliehať aj zákonom o ochrane osobných údajov, ktoré sa líšia od
              zákonov vo vašom štáte.
            </p>

            {/* <p className="text-normal text-small text-medium">
                            Osobné údaje zhromaždené na území Európskej únie a Švajčiarska môžu byť prenesené a spracúvané tretími stranami v štáte mimo Európskej únie a Švajčiarska. V takých prípadoch spoločnosť IVEX GROUP s.r.o. zaručí, že prenos vašich osobných údajov sa vykonáva v súlade s príslušnými zákonmi o ochrane osobných údajov a najmä, že sú uplatnené príslušné zmluvné, technické a organizačné opatrenia ako napríklad štandardné zmluvné doložky schválené Komisiou EÚ.
                        </p> */}

            <p className="text-normal text-small text-medium">
              Osobné údaje zhromaždené na území Európskej únie a Švajčiarska
              môžu byť prenesené a spracúvané tretími stranami v štáte mimo
              Európskej únie a Švajčiarska. V takých prípadoch spoločnosť XXXXX
              zaručí, že prenos vašich osobných údajov sa vykonáva v súlade s
              príslušnými zákonmi o ochrane osobných údajov a najmä, že sú
              uplatnené príslušné zmluvné, technické a organizačné opatrenia ako
              napríklad štandardné zmluvné doložky schválené Komisiou EÚ.
            </p>

            <p className="text-normal text-small text-medium">
              Ďalšie podrobnosti o bezpečnostných opatreniach, ktoré používame
              na ochranu vašich osobných údajov, nájdete v Časti 10 „Uchovávanie
              vašich osobných údajov v bezpečí" týchto Zásad.
            </p>

            {/* Odkazy */}
            <h4 className="text-normal text-bold">9. Odkazy</h4>

            {/* <p className="text-normal text-small text-medium">
              Môžeme zobrazovať reklamy tretích strán a iný obsah odkazujúci na
              webové stránky tretích strán. Nemôžeme kontrolovať alebo niesť
              zodpovednosť za obsah a postupy tretích strán v oblasti ochrany
              osobných údajov. Ak kliknete na reklamu alebo odkaz tretej strany,
              vezmite, prosím, na vedomie, že tým opúšťate Službu IVEX Library a
              na akékoľvek vami poskytnuté osobné údaje sa prestávajú vzťahovať
              tieto Zásady. Prečítajte si, prosím, zásady ochrany osobných
              údajov týchto tretích strán, aby ste zistili, akým spôsobom
              zhromažďujú a spracovávajú vaše osobné údaje.
            </p> */}

            <p className="text-normal text-small text-medium">
              Môžeme zobrazovať reklamy tretích strán a iný obsah odkazujúci na
              webové stránky tretích strán. Nemôžeme kontrolovať alebo niesť
              zodpovednosť za obsah a postupy tretích strán v oblasti ochrany
              osobných údajov. Ak kliknete na reklamu alebo odkaz tretej strany,
              vezmite, prosím, na vedomie, že tým opúšťate Službu XXXXX a na
              akékoľvek vami poskytnuté osobné údaje sa prestávajú vzťahovať
              tieto Zásady. Prečítajte si, prosím, zásady ochrany osobných
              údajov týchto tretích strán, aby ste zistili, akým spôsobom
              zhromažďujú a spracovávajú vaše osobné údaje.
            </p>

            {/* Uchovávanie vašich osobných údajov v bezpečí */}
            <h4 className="text-normal text-bold">
              10. Uchovávanie vašich osobných údajov v bezpečí
            </h4>

            <p className="text-normal text-small text-medium">
              Je našou povinnosťou chrániť osobné údaje našich používateľov.
              Zavádzame vhodné technické a organizačné opatrenia, ktoré pomáhajú
              chrániť bezpečnosť vašich osobných údajov, avšak upozorňujeme, že
              žiadny systém nie je nikdy úplne bezpečný. Zaviedli sme rôzne
              postupy, vrátane pseudonymizácie, šifrovania, pravidiel týkajúcich
              sa prístupu a uchovávania, ktoré bránia neoprávnenému prístupu a
              zbytočnému uchovávaniu osobných údajov v našich systémoch.
            </p>

            {/* <p className="text-normal text-small text-medium">
              Ochranu vášho používateľského účtu zabezpečuje heslo, preto vám
              odporúčame používať silné heslo, jedinečné pre váš účet v IVEX
              Library, nikdy ho nikomu neprezrádzať, obmedziť prístup k vášmu
              počítaču a prehliadaču a po ukončení používania Služby IVEX
              Library sa z nej odhlásiť.
            </p> */}

            <p className="text-normal text-small text-medium">
              Ochranu vášho používateľského účtu zabezpečuje heslo, preto vám
              odporúčame používať silné heslo, jedinečné pre váš účet v XXXXX,
              nikdy ho nikomu neprezrádzať, obmedziť prístup k vášmu počítaču a
              prehliadaču a po ukončení používania Služby XXXXX sa z nej
              odhlásiť.
            </p>

            {/* Deti */}
            <h4 className="text-normal text-bold">11. Deti</h4>

            {/* <p className="text-normal text-small text-medium">
              Služba IVEX Library nie je určená pre deti mladšie ako 16 rokov.
              Služba IVEX Library nie je ponúkaná ani deťom vo veku, kedy je
              nezákonné spracovávať ich osobné údaje, alebo je na základe GDPR
              či iných miestnych zákonov na spracovávanie ich osobných údajov
              vyžadovaný súhlas rodiča.
            </p> */}

            <p className="text-normal text-small text-medium">
              Služba XXXXX nie je určená pre deti mladšie ako 16 rokov. Služba
              XXXXX nie je ponúkaná ani deťom vo veku, kedy je nezákonné
              spracovávať ich osobné údaje, alebo je na základe GDPR či iných
              miestnych zákonov na spracovávanie ich osobných údajov vyžadovaný
              súhlas rodiča.
            </p>

            {/* <p className="text-normal text-small text-medium">
              Vedome nezhromažďujeme osobné údaje od detí mladších ako 16 rokov
              alebo od detí, ktorých vek je nižší ako prípustná veková hranica
              („Veková hranica"). Pokiaľ nedosahujete Vekovú hranicu,
              nepoužívajte, prosím, Službu IVEX Library, a neposkytujte nám
              žiadne osobné údaje.
            </p> */}

            <p className="text-normal text-small text-medium">
              Vedome nezhromažďujeme osobné údaje od detí mladších ako 16 rokov
              alebo od detí, ktorých vek je nižší ako prípustná veková hranica
              („Veková hranica"). Pokiaľ nedosahujete Vekovú hranicu,
              nepoužívajte, prosím, Službu XXXXX, a neposkytujte nám žiadne
              osobné údaje.
            </p>

            {/* <p className="text-normal text-small text-medium">
                            Ak ste rodičom dieťaťa mladšieho ako je Veková hranica a dozviete sa, že vaše dieťa poskytlo IVEX GROUP s.r.o. svoje osobné údaje, prosíme, aby ste nás kontaktovali prostredníctvom formulára „Kontaktujte nás" na stránke v sekcii kontakt, a môžete požiadať o uplatnenie svojich príslušných práv podrobne uvedených v Časti 3 „Vaše práva a preferencie: možnosti voľby a kontroly" týchto Zásad.
                        </p> */}

            <p className="text-normal text-small text-medium">
              Ak ste rodičom dieťaťa mladšieho ako je Veková hranica a dozviete
              sa, že vaše dieťa poskytlo XXXXX svoje osobné údaje, prosíme, aby
              ste nás kontaktovali prostredníctvom formulára „Kontaktujte nás"
              na stránke v sekcii kontakt, a môžete požiadať o uplatnenie
              svojich príslušných práv podrobne uvedených v Časti 3 „Vaše práva
              a preferencie: možnosti voľby a kontroly" týchto Zásad.
            </p>

            {/* <p className="text-normal text-small text-medium">
              Ak sa dozvieme, že sme zhromažďovali osobné údaje dieťaťa
              mladšieho ako 16 rokov, vykonáme primerané kroky na vymazanie
              osobných údajov. Tento postup môže vyžadovať odstránenie účtu IVEX
              Library tohto dieťaťa.
            </p> */}

            <p className="text-normal text-small text-medium">
              Ak sa dozvieme, že sme zhromažďovali osobné údaje dieťaťa
              mladšieho ako 16 rokov, vykonáme primerané kroky na vymazanie
              osobných údajov. Tento postup môže vyžadovať odstránenie účtu
              XXXXX tohto dieťaťa.
            </p>

            {/* Zmeny týchto Zásad */}
            <h4 className="text-normal text-bold">12. Zmeny týchto Zásad</h4>

            <p className="text-normal text-small text-medium">
              V týchto Zásadách môžeme príležitostne vykonávať zmeny.
            </p>

            {/* <p className="text-normal text-small text-medium">
              Ak tieto Zásady zmeníme, primerane daným okolnostiam vás na to
              vopred upozorníme, napr. zobrazením dobre viditeľného oznámenia v
              Službe IVEX Library, alebo zaslaním e-mailu a/alebo
              prostredníctvom notifikácie v zariadení.
            </p> */}

            <p className="text-normal text-small text-medium">
              Ak tieto Zásady zmeníme, primerane daným okolnostiam vás na to
              vopred upozorníme, napr. zobrazením dobre viditeľného oznámenia v
              Službe XXXXX, alebo zaslaním e-mailu a/alebo prostredníctvom
              notifikácie v zariadení.
            </p>

            <p className="text-normal text-small text-medium">
              Preto si, prosím, každé takéto oznámenie pozorne prečítajte.
            </p>

            {/* <p className="text-normal text-small text-medium">
              Ak si želáte zistiť viac o týchto Zásadách a o tom, ako IVEX GROUP
              s.r.o. používa vaše osobné údaje, kontaktujte, prosím, naše
              zákaznícke centrum na stránke www.ivexlibrary.sk v sekcii kontakt.
            </p> */}

            <p className="text-normal text-small text-medium">
              Ak si želáte zistiť viac o týchto Zásadách a o tom, ako XXXXX
              s.r.o. používa vaše osobné údaje, kontaktujte, prosím, naše
              zákaznícke centrum na stránke www.XXXXX.sk v sekcii kontakt.
            </p>

            {/* Ako nás kontaktovať*/}
            <h4 className="text-normal text-bold">13. Ako nás kontaktovať</h4>

            {/* <p className="text-normal text-small text-medium">
              Ďakujeme, že ste si prečítali naše Zásady. Ak máte k týmto Zásadám
              akékoľvek otázky, obráťte sa na našu zodpovednú osobu pre ochranu
              údajov prostredníctvom formulára „Kontaktujte nás" na stránke v
              sekcii kontakt, prostredníctvom e-mailu ochrana@ivexlibrary.sk,
              alebo nám napíšte na nasledujúcu adresu:
            </p> */}

            <p className="text-normal text-small text-medium">
              Ďakujeme, že ste si prečítali naše Zásady. Ak máte k týmto Zásadám
              akékoľvek otázky, obráťte sa na našu zodpovednú osobu pre ochranu
              údajov prostredníctvom formulára „Kontaktujte nás" na stránke v
              sekcii kontakt, prostredníctvom e-mailu ochrana@XXXXX.sk, alebo
              nám napíšte na nasledujúcu adresu:
            </p>

            <div className="list">
              <div className="point"></div>
              {/* <p className="text-normal text-small text-medium">
                IVEX GROUP s.r.o.
              </p> */}
              <p className="text-normal text-small text-medium">XXXXX</p>
            </div>

            <div className="list">
              <div className="point"></div>
              {/* <p className="text-normal text-small text-medium">
                Moyzesova 933/8 Bratislava 811 05 Slovensko
              </p> */}
              <p className="text-normal text-small text-medium">XXXXX</p>
            </div>

            {/* <p className="text-normal text-small text-medium">
              Prevádzkovateľom údajov na účely osobných údajov spracovávaných
              podľa týchto Zásad je spoločnosť IVEX GROUP s.r.o.
            </p> */}

            <p className="text-normal text-small text-medium">
              Prevádzkovateľom údajov na účely osobných údajov spracovávaných
              podľa týchto Zásad je spoločnosť XXXXX
            </p>

            {/* <p className="text-normal text-small text-medium">
              Dúfame, že sa vám IVEX Library páči!
            </p> */}

            <p className="text-normal text-small text-medium">
              Dúfame, že sa vám XXXXX páči!
            </p>

            {/* <p className="text-normal text-small text-medium">
              IVEX GROUP s.r.o. !
            </p> */}

            <p className="text-normal text-small text-medium">XXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPR;
