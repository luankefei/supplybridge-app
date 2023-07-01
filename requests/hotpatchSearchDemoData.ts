export default async function fakeData(data: any, opt: any) {
   // opt.q, opt.offset, opt.filter, opt.limit, ...
   if (!opt.q) return;
   const q = opt.q.toLowerCase();
   switch(q) {
   case 'wheel':
      data.stats.chain = ['Wheel'];
      data.stats.chainChildren = ['Steel Wheel', 'Alloy Wheel', 'Composite Wheel', 'Other Wheels'];
      data.stats.maj = [
      {
         "name": "MAXION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_3c123ce0-a794-11ed-b3d0-cd7bbc898ce3.jpeg"
      },
      {
         "name": "DICASTAL",
	 "logo": "https://cdn.supplybridge.com/images/companylogos/43366.jpeg"
      },
      {
         "name": "Iochpe-Maxion",
	 "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_a730c830-ef69-11ed-a59e-b59bae581542_35540.png"
      }
      ];
      data.stats.str = [
      {
         "name": "Astra",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_812a3a90-efb9-11ed-b4ee-f3768342eae9_7548.png"
      },
      {
         "name": "AUSTEM",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_8ccd37f0-efb2-11ed-b4ee-f3768342eae9_42559.png"
      },
      {
         "name": "HOWMET AEROSPACE",
	 "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_14fa2840-efae-11ed-b4ee-f3768342eae9_30084.png"
      }
      ];
      data.suppliers = [
      {
         "name": "MAXION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_3c123ce0-a794-11ed-b3d0-cd7bbc898ce3.jpeg",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Astra",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_812a3a90-efb9-11ed-b4ee-f3768342eae9_7548.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "AUSTEM",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_8ccd37f0-efb2-11ed-b4ee-f3768342eae9_42559.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "ASAHI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_32562240-efb8-11ed-b4ee-f3768342eae9_6329.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "BREMBO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_73a4dbe0-92ea-11ed-80ad-db9ed8d2453d.png",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "BRIDGESTONE",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_74a55bf0-92ea-11ed-80ad-db9ed8d2453d.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "CONTINENTAL",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_89b788f0-92eb-11ed-81db-39119462604a.jpeg",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "GESTAMP",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_07c22870-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "GKN",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_08a75850-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "HAINACHUAN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_16a2f210-efb5-11ed-b4ee-f3768342eae9_44179.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HANKOOK",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_259e8190-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "LISI AUTOMOTIVE",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_3c71a230-a6a8-11ed-8432-91b2319c9abc.webp",
         "headquarterId": 184,
         "locationId": 184
      },
      {
         "name": "OTTO FUCHS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_666c8360-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "PIRELLI",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_774e90b0-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "SCHAEFFLER",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_a968cc50-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "SUPERIOR INDUSTRIES",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_e04b3e60-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "TPR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_09119d90-ef8d-11ed-8691-79bd26e77b44_7883.png",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "GAC",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_bd6de100-efb4-11ed-b4ee-f3768342eae9_43969.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Knorr-Bremse",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_a6e09040-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DICASTAL",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Iochpe-Maxion",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "HOWMET AEROSPACE",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "CIE Automotive",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "Dongfeng Motor Parts And Components Group",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "MERITOR",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "SHILOH INDUSTRIES",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "SUMITOMO RUBBER",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TOPY INDUSTRIES",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TOYO TIRE",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TVS GROUP",
         "logo": null,
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "UNO MINDA",
         "logo": null,
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "WANXIANG QIANCHAO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YOKOHAMA RUBBER",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "CHANGCHUN FAWAY AUTOMOBILE CHANGCHUN FAW SIHUAN AUTOMOBILE",
         "headquarterId": null,
         "locationId": null
      }
      ];
      break;
   case 'starter battery':
   case 'Starterbatterie':
      data.stats.chain = ['Starter System', 'Starter Battery'];
      data.stats.chainChildren = ['AGM', 'EFB', 'FLOODED', 'GEL', 'LITHIUM-ION'];
      data.stats.locationId = {"16":2,"36":1,"40":1,"48":4,"54":1,"62":1,"69":5,"70":3,"91":4,"105":32,"113":3,"120":179,"127":1,"128":29,"129":7,"132":1,"133":15,"137":17,"143":4,"146":1,"150":1,"153":2,"155":3,"156":1,"157":1,"160":13,"162":10,"166":5,"170":1,"175":1,"177":2,"179":1,"181":1,"184":1,"185":12,"189":2,"191":1,"192":4,"202":1,"203":1,"204":1,"205":7,"206":2,"207":1,"211":1,"212":3,"214":1,"215":1,"216":5};
      data.stats.maj = [
      {
         "name": "GS YUASA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_21560270-92ee-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "VARTA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_31ddf6f0-92f0-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "GS YUASA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_21560270-92ee-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "CLARIOS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_79409980-92eb-11ed-81db-39119462604a.png"
      },
      {
         "name": "EXIDE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_42551c00-ef8b-11ed-8691-79bd26e77b44_6484.png"
      }
      ];
      data.stats.str = [
      {
         "name": "BANNER",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_58837880-efba-11ed-b4ee-f3768342eae9_8468.png"
      },
      {
         "name": "PULSE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b89ce610-efb6-11ed-b4ee-f3768342eae9_46054.png"
      },
      {
         "name": "AMARA RAJA",
	 "logo": "/cdn-stage/images/tmplogos/AMARA-RAJA.jpeg"
      },
      {
         "name": "LUMINOUS",
	 "logo": "/cdn-stage/images/tmplogos/LUMINOUS.jpeg"
      },
      {
         "name": "MUTLU AKÜ",
	 "logo": "/cdn-stage/images/tmplogos/MUTLU.jpeg"
      }
      ];
      data.suppliers = [
      {
         "name": "AMALGAMATIONS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_53c88220-efb2-11ed-b4ee-f3768342eae9_42409.png",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "GS YUASA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_21560270-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "VARTA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_31ddf6f0-92f0-11ed-9679-493af85a9ea9.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "CLARIOS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_79409980-92eb-11ed-81db-39119462604a.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "EXIDE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_42551c00-ef8b-11ed-8691-79bd26e77b44_6484.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "MAGNA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_eecbf890-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "CATL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c240be70-efb7-11ed-b4ee-f3768342eae9_5869.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HAINACHUAN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_16a2f210-efb5-11ed-b4ee-f3768342eae9_44179.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "BOSCH",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c0229960-efb7-11ed-b4ee-f3768342eae9_5864.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "HELLA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_34c71f10-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "FIAMM",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_d592de30-92ed-11ed-9679-493af85a9ea9.png",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "DENSO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_9cea2b10-92ed-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "PANASONIC",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_6becbf30-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "HANKOOK",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_259e8190-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "Hyundai Mobis",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_6324eef0-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "CAMEL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c7493b90-ef9e-11ed-b4ee-f3768342eae9_11587.png",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "Astra",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_812a3a90-efb9-11ed-b4ee-f3768342eae9_7548.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "TENNECO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_f1aeb0b0-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BANNER",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_58837880-efba-11ed-b4ee-f3768342eae9_8468.png",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "PULSE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b89ce610-efb6-11ed-b4ee-f3768342eae9_46054.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "CHILWEE GROUP",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_55724510-efb3-11ed-b4ee-f3768342eae9_43028.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "COSLIGHT",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_7fe9b300-92ed-11ed-9679-493af85a9ea9.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GOTION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_14eb2560-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUAWEI",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_590fc1b0-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YUEDA NEW ENERGY BATTERY",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_0c854e70-efb7-11ed-b4ee-f3768342eae9_47215.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GANFENG LITHIUM",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_957260d0-efba-11ed-b4ee-f3768342eae9_8803.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HENAN GREAT",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_429bf6f0-efb5-11ed-b4ee-f3768342eae9_44286.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LE LONG",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c5a470f0-efb9-11ed-b4ee-f3768342eae9_7701.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "STANDARD",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c5371f10-ef8b-11ed-8691-79bd26e77b44_6862.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ARADEX",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_a728a2d0-a794-11ed-b3d0-cd7bbc898ce3.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "APOLLO",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c4d8a760-efb7-11ed-b4ee-f3768342eae9_5892.png",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "CD",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_be96bfb0-efab-11ed-b4ee-f3768342eae9_27226.png",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "ROOTS INDUSTRIES",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_9c8d5320-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "Johnson Controls",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_supplier_5206.png",
         "headquarterId": 191,
         "locationId": 191
      },
      {
         "name": "MITSUBISHI ELECTRIC",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_2dc22290-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "HEXAGON PURUS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_45a7a5c0-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 204,
         "locationId": 204
      },
      {
         "name": "AKTEX",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_d5966e60-efb8-11ed-b4ee-f3768342eae9_6921.png",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "HYUNDAI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b2dc0250-efb7-11ed-b4ee-f3768342eae9_5784.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "ORIENTAL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_96114440-ef8b-11ed-8691-79bd26e77b44_6792.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SAMSUNG",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_a26a06d0-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "PROLOGIUM",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_8842c670-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "LUCAS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_95b72da0-ef9c-11ed-b4ee-f3768342eae9_10037.png",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "AUTO X",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_fc59b880-efb9-11ed-b4ee-f3768342eae9_8122.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ENERSYS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_fcdcb610-efb7-11ed-b4ee-f3768342eae9_6116.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "TATA",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "TVS GROUP",
         "logo": null,
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "CORUN NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FURUKAWA",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "LG CHEM",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SAMSUNG SDI",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SEBANG GLOBAL",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "AMARA RAJA",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "LUMINOUS",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "MUTLU AKÜ",
         "logo": null,
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "SIAPRA",
         "headquarterId": 62,
         "locationId": 62
      },
      {
         "name": "CENTURY BATTERIES",
         "headquarterId": 113,
         "locationId": 113
      },
      {
         "name": "CENTURY YUASA",
         "headquarterId": 113,
         "locationId": 113
      },
      {
         "name": "ICS INDUSTRIES  WELSHPOOL",
         "headquarterId": 113,
         "locationId": 113
      },
      {
         "name": "N.VBATTERY",
         "headquarterId": 175,
         "locationId": 175
      },
      {
         "name": "ACUMULADORES MOURA",
         "logo": null,
         "headquarterId": 69,
         "locationId": 69
      },
      {
         "name": "BUREAU BATERIAS",
         "headquarterId": 69,
         "locationId": 69
      },
      {
         "name": "ENERBRAX ACUMULADORES",
         "headquarterId": 69,
         "locationId": 69
      },
      {
         "name": "ENERTEC DO",
         "headquarterId": 69,
         "locationId": 69
      },
      {
         "name": "METALBAT INDUSTRIA E COMERCIO DE ACUMULADORES",
         "headquarterId": 69,
         "locationId": 69
      },
      {
         "name": "MONBAT",
         "logo": null,
         "headquarterId": 177,
         "locationId": 177
      },
      {
         "name": "MONBAT AD",
         "headquarterId": 177,
         "locationId": 177
      },
      {
         "name": "ADVANCED BATTERY CONCEPTS",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "ANODOX ENERGY",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "ALLGRAND NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "AOTONG AUTOMOBILE ELECTRICAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "BAOMAHE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "BOLDER BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "BYD INDUSTRIAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHANGHONG BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHANGHONG NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHANGHONG SUNPOWER NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHANGQING BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHILWEE POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINATECH",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHUANXI STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CONGHUA GUANGLI BATTERY ENTERPRISE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "COPOWER NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "COSMX BATTERY",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CSPOWER BATTERY TECH",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DEKE ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DMS TECH",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DONGBEI STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Dongfeng Electric Vehicle",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DONGLIBAO POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DYNAVOLT",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIANGSU GOLDEN SUNSHINE NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LEOCH INTERNATIONAL",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LEOCH POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHAOXING HUITONG BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHENYUAN POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SINOEV",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SVOLT ENERGY",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIANNENG BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIANNENG SHUAI FUDE ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIANYINYAN MECHANICAL ELECTRICAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIECHENG INFORMATION TECHNOLOGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINYA AUTO BODY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XUNQI BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHONGSHUO BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHONGXING PYLON TECHNOLOGIES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZIBO TORCH ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CAS JIU MING NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CD BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DAFENG",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DAFENG GROUP",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "DETAILONG",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Do-Fluoride New Materials",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ENERGYTUBE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "EVE HYPERPOWER BATTERIES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "EVE INNOVATION ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "EVPS POWER BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FENGFAN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FENGFAN BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FENGFAN HONGWEN BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FENGRI ELECTRIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FINDREAMS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FINDREAMS BATTERY",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FUAN YILONG BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FUZHOU BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GOLDEN INFINITY GREEN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GREE ALTAIRNANO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GREE TITANIUM NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GUANGDONG AOKLY GROUP",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GUOYING HONGQI BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GW BATTERIES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Hebei Allgrand Battery",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Hebei ANZ NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HENDA BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HENGDA BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HONGCHENG POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUAFU ENERGY STORAGE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUATECHPOWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUAYUAN ACCUMULATOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUIFENG ELECTRIC MACHINERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUISHIYOU",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HUITONG",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "IQ INTERNATIONAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JANYCEN ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIADE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Jiangsu AILISON Storage Battery",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIANGSU AIXINKE ENERGY JIANGSU VEHICLE POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIANGSU WEIFENG POWER INDUSTRY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIAYANG BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIN XIN NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JINGJIN ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JINLANG ELECTROMECHANICAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JINMA INDUSTRIAL BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIULI ELECTRONIC TECH",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIUYU INDUSTRIAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JUJIANG POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "KAIJIE POWER SUPPLY INDUSTRIAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "KEBE POWER BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "KOMASU BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "KUAIYIDE AUTO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LANGFANG QIANGSHENG",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LANGFANG SUNSHINE BATTERIES INDUSTRIAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LEADHOO BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LIANHONG ACCURATE MODEL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LIEREN ELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LINA ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LINGYUN STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LINKEDRIVING",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LISHEN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LITONGWEI ELECTRONIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LONGKOU BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LUQIAO YONGYINGDA AUTO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LUZHOU DUOGUAN PLASTICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "MAANSHAN HAIYING BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "MEWYEAH",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "MOTTCELL NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "NANFANG GUANGYUAN SUPER ENERGY BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "NANJING DONGYU OFFNENBACH NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "NATIONAL AERO GUANGZHOU",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "NINGBO DONGHAI STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "NINGBO SEALAKE STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "NINGBO SHUNHONG ELECTRICAL APPLIANCE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "OFFNENBACH NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ORIENTAL SMART LION NEW POWER BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "OURSUN NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "PEOPLE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "POWER TECH INTERNATIONAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "POWTECH NEW POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "POWTECH NEW POWER SHENZHEN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "PYLON TECHNOLOGIES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "RAINCHST AUTOMOBILE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "REAL DRAGON POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "REJOY BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "RELY BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "RITAR POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ROYPOW",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "RUIYU ACCUMULATOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SANTE POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHANGYU AOLONG ELECTRICAL SOURCE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHANYAN INTELLIGENT AUTO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHENCHI BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHIJIAZHUANG DILONG",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHIJIAZHUANG STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHIPAI GENERAL STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHUANGFAN STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SIMCO AUTO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SINOPOLY BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SUPER SPEED BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SUQI STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TAIFENG MOLD",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TANGWEN STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TONGBA STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TONGLI",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "UBETTER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "UNIONBAT",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "UPLUS ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "WANLI NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "WESTLAKE NEW ENERGY CHINA",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "WOLONG ELECTRIC GROUP DENGTA POWER SOURCE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YAHENG POWER GROUP",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YIDEWEI ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YINHUI ELECTRIC APPLIANCES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YINKAI POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YONGLI BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YUANZHENG POWER SOURCE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YUCYR TRAFFIC APPLIANCES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YUDONG NEW ENERGY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG GUYUE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG GUYUE STORAGE BATTERY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG JUJIANG POWER SUPPLY",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG JUST ELECTRICAL APPLIANCES",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG PINGHU HUALONG INDUSTRIAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG TIANNENG BATTERY JIANGSU",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHEJIANG ZHENGTONG POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHENJIANG TAIJI ELECTRIC VEHICLE POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHONGCHENG POWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "HEWKEL",
         "headquarterId": 179,
         "locationId": 179
      },
      {
         "name": "CHLORIDE EGYPT E",
         "headquarterId": 16,
         "locationId": 16
      },
      {
         "name": "NOUR BATTERIES",
         "headquarterId": 16,
         "locationId": 16
      },
      {
         "name": "AKKSI",
         "headquarterId": 181,
         "locationId": 181
      },
      {
         "name": "DANIEL DOYEN BATTERY",
         "headquarterId": 184,
         "locationId": 184
      },
      {
         "name": "AKKUTEAM ENERGIETECHNIK",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "DYNAMIS BATTERIEN",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "EMENO BATTERIES",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "ENERSYS DE",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "FUTAVIS",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "HOPPECKE BATTERIEN",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "JAUCH",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "TRIATHLON BATTERIEN",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "TATFOOK",
         "headquarterId": 127,
         "locationId": 127
      },
      {
         "name": "C.S.ISZ",
         "headquarterId": 189,
         "locationId": 189
      },
      {
         "name": "VARIENS KERESKEDELMI",
         "headquarterId": 189,
         "locationId": 189
      },
      {
         "name": "AGASTYA AUTOMOTIVES",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "ALTIGREEN PROPULSION LABS",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "BLACK HORSE FAS",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "CHHEDA ELECTRICALS AND ELECTRONICS",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "DN Automotive",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "JAY",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "VIRIDI EMOBILITY TECHNOLOGY",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "AMCO BATTERIES",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "CENTURY Engineering",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "EASTMAN AUTO POWER",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "MINDA STORAGE BATTERIES",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "NORDISCHE TECHNOLOGIES PRIVATE",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "PANNA BATTERY",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "PERMINTEX AUTOMOTIVE",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "PLASTOMECH INDUSTRIES",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "RAJA RAM SONS",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "RUCHIRA GREEN EARTH",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "SAVE ELECTRIC VEHICLES",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "SHIMADZU ANALYTICAL INDIA",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "TRON ENERGY",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "ZPOWER IMPEX",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "CENTRAL SURABAYA CONTACT BATTERY",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "GRAMITRAMA BATTERY",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "INDOBATT INDUSTRI PERMAI",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "MULTI FAJAR SARANA",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "SELATAN JADI JAYA",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "TRI MEGA BATERINDO",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "TRIMITRA BATERAI PRAKASA",
         "headquarterId": 129,
         "locationId": 129
      },
      {
         "name": "SOLAREDGE EMOBILITY",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "C.S.I.",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "CORBELLI ELETTRONICA SNC",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "IBRIDA CELL",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "DAIJI INDUSTRY",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "MELSEN",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "NIPRESS",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "FDK CORPORATION",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "NAGANUMA SHOJI",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "ORIENTAL YUASA",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "RESONAC MATERIALS",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "RYOKA SANGYO",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TOTSUCO",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "YOKOHAMA BATTERY",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "GPA BERHAD",
         "headquarterId": 143,
         "locationId": 143
      },
      {
         "name": "KPNK AUTOMOTIVE",
         "headquarterId": 143,
         "locationId": 143
      },
      {
         "name": "OSKA BATTERY",
         "headquarterId": 143,
         "locationId": 143
      },
      {
         "name": "WATTA BATTERY INDUSTRIES SENDIRIAN BERHAD",
         "headquarterId": 143,
         "locationId": 143
      },
      {
         "name": "ACUMULADORES OMEGA",
         "headquarterId": 91,
         "locationId": 91
      },
      {
         "name": "ACUMULADORES ROBINSON",
         "headquarterId": 91,
         "locationId": 91
      },
      {
         "name": "CD REYNOSA",
         "headquarterId": 91,
         "locationId": 91
      },
      {
         "name": "GONHER",
         "headquarterId": 91,
         "locationId": 91
      },
      {
         "name": "LA MAROCAINE INDUSTRIELLE DES BATTERIES MARIBAT",
         "headquarterId": 36,
         "locationId": 36
      },
      {
         "name": "SIAM GS BATTERY MYANMAR",
         "headquarterId": 146,
         "locationId": 146
      },
      {
         "name": "WHITE BV",
         "headquarterId": 202,
         "locationId": 202
      },
      {
         "name": "LINCON BATTERIES",
         "headquarterId": 40,
         "locationId": 40
      },
      {
         "name": "T TOVARNA AKUMULATORSKIH BATERIJ D.D NORTH MACEDONIA",
         "headquarterId": 203,
         "locationId": 203
      },
      {
         "name": "NATIONAL BATTERIES",
         "headquarterId": 150,
         "locationId": 150
      },
      {
         "name": "CENTURY MOTOLITE BATTERY",
         "headquarterId": 153,
         "locationId": 153
      },
      {
         "name": "PHILIPPINE BATTERIES PBI",
         "headquarterId": 153,
         "locationId": 153
      },
      {
         "name": "AUTOPART FABRYKA AKUMULATORÓW",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "DACPOL",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "ELEKTRO – METAL SOCHACZEW",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "JENOX",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "WAMTECHNIK",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "ZAP SZNAJDER BATTERIEN",
         "headquarterId": 205,
         "locationId": 205
      },
      {
         "name": "ENERGIA EM MOVIMENTO LDA",
         "headquarterId": 206,
         "locationId": 206
      },
      {
         "name": "FIB",
         "headquarterId": 206,
         "locationId": 206
      },
      {
         "name": "ROMBAT",
         "logo": null,
         "headquarterId": 207,
         "locationId": 207
      },
      {
         "name": "CJSC POROLSKY ACCUMULATOR",
         "headquarterId": 155,
         "locationId": 155
      },
      {
         "name": "OJSC TYUMEN BATTERIES",
         "headquarterId": 155,
         "locationId": 155
      },
      {
         "name": "PODOLSKIY ACCUMULATOR PAZ",
         "headquarterId": 155,
         "locationId": 155
      },
      {
         "name": "MIDDLE EAST BATTERY MEBCO",
         "headquarterId": 156,
         "locationId": 156
      },
      {
         "name": "YHI",
         "logo": null,
         "headquarterId": 157,
         "locationId": 157
      },
      {
         "name": "TAB TOVARNA",
         "headquarterId": 211,
         "locationId": 211
      },
      {
         "name": "Amalgamated Batteries",
         "headquarterId": 48,
         "locationId": 48
      },
      {
         "name": "ATLAS BATTERY",
         "headquarterId": 48,
         "locationId": 48
      },
      {
         "name": "FIRST NATIONAL BATTERY",
         "headquarterId": 48,
         "locationId": 48
      },
      {
         "name": "METAIR INVESTMENTS",
         "headquarterId": 48,
         "locationId": 48
      },
      {
         "name": "DRB",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "Dong Ah Tire & Rubber",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "GS AUTO TECH",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "GS BATTERY",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "NAMIL BATTERY",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SEGL ENERGY",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SHIPBUILDING",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SM BEXEL",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "WONHAND INDUSTRIAL",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "ELECTRO AUTO SA MADRID",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "FULMEN IBERICA",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "INDUSTRIAL TECNICA RAYO",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "CSB ENERGY",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "CENS ENERGYTECH",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "ENERGYWITH",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "HYPER STRONG",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "KUNG LONG BATTERIES",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "SAN YANG POWER",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "SHIN CHIN INDUSTRIAL",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "SUPERATION INDUSTRIAL",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "SWAN STORAGE BATTERY",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "TEAMWORLD INDUSTRIES",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "YATZ ELECTRONICS INDUSTRY",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "THAI BELLCO BATTERY",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "RUNG SAENG WORACHAK 1992",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "SIAM BATTERY",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "SIAM CHOAK BOON MA",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "SIAM GS SALES",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "SRITHAI SUPERWARE PUBLIC",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "THAI CAR SHOW AUTOMOTIVE",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "THAI ENERGY STORAGE",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "THAI SOLDER INDUSTRY",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "THAIHUAWEI BATTERY",
         "headquarterId": 162,
         "locationId": 162
      },
      {
         "name": "Afrique Câbles",
         "headquarterId": 54,
         "locationId": 54
      },
      {
         "name": "ATTITUDE PLASTIC",
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "YIGIT AKU",
         "logo": null,
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "INCI GS",
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "YALÇIN AKÜ ELEKTRIK SANTIC.",
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "AKOM TRADING HOUSE",
         "headquarterId": 215,
         "locationId": 215
      },
      {
         "name": "ALBRIGHT",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "ALEXANDER TECHNOLOGIES",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "FARADION",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "TUDOR",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "AKUMA",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ALBEMARLE LITHIUM",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "AXION POWER INTERNATIONAL",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BATTERY BANK",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "CD TECHNOLOGIES",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "DISCOVER ENERGY",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "DISCOVER MIXTECH",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BITRODE",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "EAST PENN",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ENERSYS ENERGY",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "FUSION",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "HAWKER",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "HD POWER SOLUTIONS",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "LCI INDUSTRIES",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "NEW FOCUS LIGHTING",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "NEXCERIS",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "NORTHSTAR BATTERY",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "PRESTOLITE ELECTRIC",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "STRYTEN",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "TROJAN BATTERY",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ULTRALIFE CORPORATION",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ACCUMA",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ACCUMA TECH",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ACDELCO",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ACTION BATTERIES",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "DRY CELL AND STORAGE BATTERY JOINT STOCK",
         "headquarterId": 170,
         "locationId": 170
      }
      ];
      break;
   case 'hv battery':
      data.stats.chain = ['Battery', 'HV Battery'];
      data.stats.chainChildren = ['NMC', 'LFP', 'SOLID STATE', 'SILICON ANODE', 'NCA', 'COBALT-FREE', 'NiMH', 'LiPo'];
      data.stats.maj = [
      {
         "name": "CATL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c240be70-efb7-11ed-b4ee-f3768342eae9_5869.png"
      },
      {
         "name": "PANASONIC",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_6becbf30-92ef-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "SK INNOVATION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_c084c880-92ef-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "BYD",
	 "logo": "https://cdn.supplybridge.com/images/logos/logo_e32b1480-92e9-11ed-80ad-db9ed8d2453d.png"
      },
      {
         "name": "SAMSUNG SDI",
	 "logo": "https://cdn.supplybridge.com/images/companylogos/46174.jpeg"
      }
      ];
      data.stats.str = [
      {
         "name": "NORTHVOLT",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_5a0ddb50-92ef-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "FACTORIAL ENERGY",
	 "logo": "https://cdn.supplybridge.com/images/logos/logo_c07dae80-92ed-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "MORROW",
	 "logo": "https://cdn.supplybridge.com/images/logos/logo_36a70d30-92ef-11ed-9679-493af85a9ea9.jpeg"
      },
      {
         "name": "SOLID POWER",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_0028fb80-ef63-11ed-a59e-b59bae581542_32017.png"
      }
      ];
      data.suppliers = [
      {
         "name": "CALB",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_5cee7f50-92ea-11ed-80ad-db9ed8d2453d.jpeg",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CATL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c240be70-efb7-11ed-b4ee-f3768342eae9_5869.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GOTION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_14eb2560-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GS YUASA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_21560270-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "PANASONIC",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_6becbf30-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "SUNWODA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_edc20d30-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ILIKA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_6be78480-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICROVAST",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_222fa420-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NORTHVOLT",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_5a0ddb50-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PROLOGIUM",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_8842c670-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SK INNOVATION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_c084c880-92ef-11ed-9679-493af85a9ea9.png"
      },
      {
         "name": "ADVANO",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "AESC ENVISION",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "AMPRIUS",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BEYONDER",
         "headquarterId": 204,
         "locationId": 204
      },
      {
         "name": "BLACKSTONE RESOURCES",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "BYD",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ENEVATE",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ENOVIX",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "FARASIS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "GROUP14",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "LISHEN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "MORROW",
         "headquarterId": 204,
         "locationId": 204
      },
      {
         "name": "NEXEON",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "OneD Battery Sciences",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "REPT",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SILA",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "STOREDOT",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "WELION",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Clis",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ADVENT TECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DEEPGREEN METALS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DRAGONFLY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FACTORIAL ENERGY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FREYR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "IONIC MATERIALS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ITALVOLT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LEYDENJAR"
      },
      {
         "name": "LG ENERGY SOLUTIONS"
      },
      {
         "name": "LI-CYCLE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MP MATERIALS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PEVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QUANTUMSCAPE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROMEO POWER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SAMSUNG SDI",
         "logo": null
      },
      {
         "name": "SES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SION POWER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SOLID POWER",
         "headquarterId": null,
         "locationId": null
      }
      ];
      break;
   case 'software':
      data.stats.chain = ['Software', 'Software'];
      data.stats.chainChildren = ['Embedded System', 'Applications'];
      data.stats.locationId = {"70":2,"105":16,"113":1,"120":4,"128":10,"132":5,"133":1,"137":2,"166":1,"173":1,"183":1,"185":4,"189":2,"192":1,"212":1,"214":1,"216":1};
      data.stats.maj = [
      {
         "name": "EDGE3 Technologies",
         "logo": "/cdn-stage/images/tmplogos/EDGE3-TECHNOLOGIES.jpeg"
      },
      {
         "name": "Vision.ai",
         "logo": "/cdn-stage/images/tmplogos/VISION.AI.jpeg"
      }
      ];
      data.stats.str = [
      {
         "name": "Cipia",
         "logo": "/cdn-stage/images/tmplogos/CIPIA.jpeg"
      },
      {
         "name": "Eyeris",
	 "logo": "/cdn-stage/images/tmplogos/EYERIS.jpeg"
      },
      {
         "name": "SmartMobileVision",
	 "logo": "/cdn-stage/images/tmplogos/SMARTMOBILEVISION.jpeg"
      },
      {
         "name": "Zhitu Technology",
	 "logo": "/cdn-stage/images/tmplogos/ZHITU-TECHNOLOGY.jpeg"
      }
      ];
      data.suppliers = [
      {
         "name": "ADASKY",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_84e81170-92e9-11ed-b760-b1ef6e26ff52.png",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "Danlaw technologies",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_91b7f510-92ed-11ed-9679-493af85a9ea9.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "emotion3D",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_6bbd3170-efba-11ed-b4ee-f3768342eae9_8513.png",
         "headquarterId": 173,
         "locationId": 173
      },
      {
         "name": "StradVision",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_d8d992d0-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "Cipia",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "Eyeris",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "SmartMobileVision",
         "headquarterId": 189,
         "locationId": 189
      },
      {
         "name": "Zhitu Technology",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Adaptant Solutions",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "APTJ ",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "iniVation",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "EDGE3 Technologies",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Vision.ai",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Acsia Technologies",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "AImotive",
         "headquarterId": 189,
         "locationId": 189
      },
      {
         "name": "Algolux",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "Apostera",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "ASM Technologies",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "Avin Systems",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "Basemark",
         "headquarterId": 183,
         "locationId": 183
      },
      {
         "name": "Bilims",
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "CamCom",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "CST",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "Delta IOT",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "dreyev",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "DynaOptics",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Evidence",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "Gadgeon Systems Inc",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Ielektron Technologies",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "IoTmotive",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "Mekvahan",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "Merlin Mobility",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "MINIEYE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Momenta.ai",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "MotionsCloud",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "Nueevo",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "NuronLabs",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Phiar Technologies",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Photocert",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "Relimetrics",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Rhonda Software",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "RideVision",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "Senior Automation Co., Ltd ",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Sensor Cortek",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "SoctAI",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "Starkbits",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Stemic Drive",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "TECAHEAD",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "Technosoft Engineering Projects",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "TrueMotion",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "viisights",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "Visionary Machines",
         "headquarterId": 113,
         "locationId": 113
      },
      {
         "name": "Waylens Inc.",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "Zilogic Systems",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "BlueBinaries",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Cognitive Pilot"
      },
      {
         "name": "Cognitive Technologies"
      },
      {
         "name": "Delopt",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Electrono Solutions",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ONEMEE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Terrific.AI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "The In-Cabin Experience Alliance",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Virtual Forest",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Way Ahead Technologies",
         "headquarterId": null,
         "locationId": null
      }
      ];
      break;
   case 'semiconductor':
      data.stats.chain = ['Semiconductor'];
      data.stats.chainChildren = ['IC','ASIC','LSI','Diode','LED','Transistor','CPU','Memory','EEPROM'];
      data.stats.maj = [
      {
         "name": "INFINEON",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_2018a3a0-efb8-11ed-b4ee-f3768342eae9_6273.png"
      },
      {
         "name": "Nvidia",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_04694330-a6a7-11ed-8432-91b2319c9abc.jpeg"
      },
      {
         "name": "NXP SEMICONDUCTORS",
         "logo": "/cdn-stage/images/tmplogos/NXP-SEMICONDUCTORS.jpeg"
      },
      {
         "name": "TSMC",
	 "logo": "/cdn-stage/images/tmplogos/TMSC.jpeg"
      },
      {
         "name": "AMD",
	 "logo": "/cdn-stage/images/tmplogos/AMD.jpeg"
      }
      ];
      data.stats.str = [
      {
         "name": "BDSTAR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b86f6a40-efb2-11ed-b4ee-f3768342eae9_42660.png"
      },
      {
         "name": "AKUSTICA",
	 "logo": "/cdn-stage/images/tmplogos/AKUSTICA.jpeg"
      },
      {
         "name": "ALPSENTEK",
	 "logo": "/cdn-stage/images/tmplogos/ALPSENTEK.jpeg"
      },
      {
         "name": "BESTLIGHT",
	 "logo": "/cdn-stage/images/tmplogos/BESTLIGHT.jpeg"
      }
      ];
      data.suppliers = [
      {
         "name": "BDSTAR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b86f6a40-efb2-11ed-b4ee-f3768342eae9_42660.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "INFINEON",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_2018a3a0-efb8-11ed-b4ee-f3768342eae9_6273.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "Nvidia",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_04694330-a6a7-11ed-8432-91b2319c9abc.jpeg",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BOSCH",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c0229960-efb7-11ed-b4ee-f3768342eae9_5864.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "CONTINENTAL",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_89b788f0-92eb-11ed-81db-39119462604a.jpeg",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "DENSO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_9cea2b10-92ed-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "GENTEX",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_00d36bb0-92f2-11ed-9ddd-3d42ac08c31f.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "HELLA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_34c71f10-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "HITACHI",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_4b509f40-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "IMASEN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_bd6ad6f0-efb8-11ed-b4ee-f3768342eae9_6686.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "LEAR",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_5d317ef0-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "LITTELFUSE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_69279dd0-ef8b-11ed-8691-79bd26e77b44_6728.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "MAGNA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_eecbf890-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "MAGNETI MARELLI",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_00d10210-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 192,
         "locationId": 192
      },
      {
         "name": "MARELLI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_cf52aa60-ef8a-11ed-8691-79bd26e77b44_5876.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "MITSUBISHI ELECTRIC",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_2dc22290-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "MOBILEYE VISION",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_0ba67140-a6a7-11ed-8432-91b2319c9abc.png",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "MOTHERSON",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_02c2d910-ef8b-11ed-8691-79bd26e77b44_6172.png",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "PANASONIC",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_6becbf30-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "PLASTIC OMNIUM",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_7b312210-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 184,
         "locationId": 184
      },
      {
         "name": "Renesas",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_6ff21770-ef8c-11ed-8691-79bd26e77b44_7427.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "SMR AUTOMOTIVE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_e86c7260-ef8a-11ed-8691-79bd26e77b44_5997.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "TE Connectivity",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_ebcc30a0-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "TENNECO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_f1aeb0b0-92ef-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "TOYODA GOSEI",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_01aaa3c0-92f0-11ed-9679-493af85a9ea9.gif",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "VALEO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_20166ba0-92f0-11ed-9679-493af85a9ea9.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "XINGYU",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_e9d09970-ef8e-11ed-8691-79bd26e77b44_9623.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Yazaki",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_58815270-92f0-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "ABB",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_7fb2ab30-efb8-11ed-b4ee-f3768342eae9_6554.png",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "AMBARELLA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_552d6950-efb2-11ed-b4ee-f3768342eae9_42412.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "AMPHENOL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_3114ac20-efb9-11ed-b4ee-f3768342eae9_7253.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "AMS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_af5df130-ef8d-11ed-8691-79bd26e77b44_8434.png",
         "headquarterId": 173,
         "locationId": 173
      },
      {
         "name": "ANTOLIN",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_d2e1ebd0-92e9-11ed-80ad-db9ed8d2453d.jpeg",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "APAG ELEKTRONIK",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_624c5420-efb2-11ed-b4ee-f3768342eae9_42452.png",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "ASAHI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_32562240-efb8-11ed-b4ee-f3768342eae9_6329.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "AUTOCHIPS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_8f290240-efb2-11ed-b4ee-f3768342eae9_42564.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "AUTOMOTIVE LIGHTING",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_99725ee0-efb2-11ed-b4ee-f3768342eae9_42587.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "CYPRESS SEMICONDUCTOR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_9d6f87b0-efb3-11ed-b4ee-f3768342eae9_43191.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "DONGWOO PRECISION",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_ef4e3d60-efb3-11ed-b4ee-f3768342eae9_43428.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "FAGOR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_344fcc30-efb4-11ed-b4ee-f3768342eae9_43627.png",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "GRAKON",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_fa5a3140-efb4-11ed-b4ee-f3768342eae9_44101.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "HYUNDAI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b2dc0250-efb7-11ed-b4ee-f3768342eae9_5784.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "INTEL",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_0ad42d20-a6a7-11ed-8432-91b2319c9abc.jpeg",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ISHIKAWA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_e03852a0-efb5-11ed-b4ee-f3768342eae9_44719.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "JOHNSON MATTHEY",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_9905a110-efb7-11ed-b4ee-f3768342eae9_5663.png",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "KOSTAL",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_ae5a7930-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "KYOCERA",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_c2d58bc0-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "MINEBEA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_252c3460-ef8b-11ed-8691-79bd26e77b44_6238.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "MOBILEYE",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_c204e3e0-a7ab-11ed-be1d-ef885c933fe6.svg",
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "ODELO",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_510e7590-ef8e-11ed-8691-79bd26e77b44_9099.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "OSRAM",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_0ee90c00-ef8b-11ed-8691-79bd26e77b44_6185.png",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "QINGNAN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b99290b0-efb6-11ed-b4ee-f3768342eae9_46070.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SAMSUNG",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_a26a06d0-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SENSETIME",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_7a584ae0-ef8c-11ed-8691-79bd26e77b44_7445.png",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "STAR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_e9f01a40-ef8c-11ed-8691-79bd26e77b44_7833.png",
         "headquarterId": 207,
         "locationId": 207
      },
      {
         "name": "STMICROELECTRONICS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_80636190-ef8c-11ed-8691-79bd26e77b44_7459.png",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "TDK",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_eab8ebe0-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TEXAS INSTRUMENTS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c62df7a0-ef8a-11ed-8691-79bd26e77b44_5834.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "WIPAC",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_a7d2d6c0-ef78-11ed-a59e-b59bae581542_41677.png",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "Knorr-Bremse",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_a6e09040-92ee-11ed-9679-493af85a9ea9.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LG",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_d50b6940-92ee-11ed-9679-493af85a9ea9.jpeg",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AKL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c98c8090-efb9-11ed-b4ee-f3768342eae9_7958.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ALI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_6b6f2360-efb8-11ed-b4ee-f3768342eae9_6461.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AXION",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_70904350-ef78-11ed-a59e-b59bae581542_41584.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BOSTAR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_516f3400-ef5e-11ed-a59e-b59bae581542_27560.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CARSEM",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_4dc7e400-efb8-11ed-b4ee-f3768342eae9_6385.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CARSIG",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_d2098a00-efab-11ed-b4ee-f3768342eae9_27308.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CEBU MITSUMI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_9466a810-efb8-11ed-b4ee-f3768342eae9_6600.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CISSOID",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_adccd070-efba-11ed-b4ee-f3768342eae9_8864.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DELTA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_117b27c0-efbb-11ed-b4ee-f3768342eae9_9309.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DELTA ELECTRONICS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_93fc18b0-92ed-11ed-9679-493af85a9ea9.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FASTECH",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_ad6ce810-efb8-11ed-b4ee-f3768342eae9_6651.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FINE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_5262d370-efb9-11ed-b4ee-f3768342eae9_7314.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FULSCIENCE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_bc1e4f30-efb7-11ed-b4ee-f3768342eae9_5843.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GLOBALFOUNDRIES",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_59bb0390-efb9-11ed-b4ee-f3768342eae9_7332.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HANKUK",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_21e072b0-efb5-11ed-b4ee-f3768342eae9_44203.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "IA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_83bc67b0-ef78-11ed-a59e-b59bae581542_41620.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INTERNATIONAL",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_bf458a60-efb8-11ed-b4ee-f3768342eae9_6691.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "IWASEYA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b3c231b0-efb9-11ed-b4ee-f3768342eae9_7663.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JAE",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c2a81650-efb8-11ed-b4ee-f3768342eae9_6698.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMEN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_f9ae04d0-ef8a-11ed-8691-79bd26e77b44_6157.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMINUS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b35da780-ef8d-11ed-8691-79bd26e77b44_8599.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MITSUMI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_77854a30-ef8b-11ed-8691-79bd26e77b44_6749.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NICHICON",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_6005b4c0-ef8c-11ed-8691-79bd26e77b44_7398.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OKAYA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_cf7080b0-ef8c-11ed-8691-79bd26e77b44_7786.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PHILIPS",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_ccd9b3c0-ef8d-11ed-8691-79bd26e77b44_8652.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "REBO",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_91f8bcb0-92ef-11ed-9679-493af85a9ea9.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_b26d6600-ef8b-11ed-8691-79bd26e77b44_6832.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMICONDUCTOR",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_49dfe2f0-ef8d-11ed-8691-79bd26e77b44_8070.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHINDENGEN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_e383d0c0-ef8c-11ed-8691-79bd26e77b44_7821.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_f7874250-ef8c-11ed-8691-79bd26e77b44_7852.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAISEI",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_f6fdee10-ef8c-11ed-8691-79bd26e77b44_7851.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TTTECH",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_f11a1900-ef8d-11ed-8691-79bd26e77b44_8723.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VTN",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_15a5c2a0-ef8f-11ed-8691-79bd26e77b44_9775.png",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AKUSTICA",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ALPSENTEK",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "NXP SEMICONDUCTORS",
         "logo": null,
         "headquarterId": 202,
         "locationId": 202
      },
      {
         "name": "TSMC",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "AMD",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ams-OSRAM",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "FAWER",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "FORVIA HELLA",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "ICHIKOH",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "KOITO",
         "logo": null,
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "LG ELECTRONICS",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "LG INNOTEK",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "LUMAX INDUSTRIES",
         "logo": null,
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "Marelli Motherson",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "STANLEY ELECTRIC",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TOKAI RIKA",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TT ELECTRONICS",
         "logo": null,
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "UAES",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "WEICHAI",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "47TH RESEARCH INSTITUTE OF CHINA",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ABL Lights",
         "headquarterId": 185,
         "locationId": 185
      },
      {
         "name": "ABLIC",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "ACCOPOWER",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "Actron Technology",
         "headquarterId": 160,
         "locationId": 160
      },
      {
         "name": "Adaptive Micro Systems",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ANALOG DEVICES",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "AUTO ELECTRONIC CONTROL SYSTEM",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "BAYRAKTARLAR",
         "headquarterId": 166,
         "locationId": 166
      },
      {
         "name": "BOURNS",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BOYD",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "BYD",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINA ELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINA ELECTRONICS NO.26 RESEARCH INSTITUTE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINA KEY SYSTEM",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINA KEY SYSTEM NANJING",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINA KEY SYSTEM WUHAN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINA RESOURCES MICROELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHINATECH",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHIPANALOG MICROELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHIPNEXT SEMICONDUCTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CHIPON MICROELECTRONIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "CML INNOVATIVE",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "DONGFENG",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Grupo Antolin",
         "headquarterId": 212,
         "locationId": 212
      },
      {
         "name": "HUADA",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Huixiang New Energy ",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "JIANGSU YUNYI ELECTRIC",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "KEEPER",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "LEAP MOTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "LINEAR TECHNOLOGY",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "LUMILEDS",
         "headquarterId": 202,
         "locationId": 202
      },
      {
         "name": "MELEXIS",
         "logo": null,
         "headquarterId": 175,
         "locationId": 175
      },
      {
         "name": "MITSUMI ELECTRIC",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "NGK",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "NISSHINBO",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "NORTH AMERICAN LIGHTING",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ON SEMICONDUCTOR",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ONSTAR",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "PHILIPS ELECTRONICS",
         "logo": null,
         "headquarterId": 202,
         "locationId": 202
      },
      {
         "name": "SAMSUNG ELECTRONICS",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SANGYO",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "SCHRADER INTERNATIONAL",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "SEMITEC CORPORATION",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "SENTEC EE",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "SEOUL SEMICONDUCTOR",
         "logo": null,
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "Shanghai Aerospace Automobile Electromechanical (HT-SAAE)",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHAOXING WEIGUANG VEHICLE LAMP",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHENGYI ELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHENGYI ELECTRONICS WANJIANG  DONGGUAN SHENGYI ELECTRONIC WANJIANG",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHENYI AUTO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Shenzhen Allystar Technology",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "Shenzhen Car Audio",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHIBO CAR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "SHINDENGEN ELECTRIC",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "SONY SEMICONDUCTOR",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "STANDARD MOTOR",
         "logo": null,
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "SUMITOMO ELECTRIC DEVICE INNOVATION",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "SVOLT ENERGY",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TAMAGAWA DENKI",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TAMAGAWA SEIKI",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TELECHIPS",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "Tianjin Automobile Muffler Factory",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIANTONGWEISHI ELECTRONIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIANXING ELECTRONIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TIANYUN AUTO ELECTRIC SYSTEM",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TOKYO COSMOS ELECTRIC",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TOSHIBA ELECTRONIC",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "TOWER SEMICONDUCTOR",
         "logo": null,
         "headquarterId": 132,
         "locationId": 132
      },
      {
         "name": "TRINNO TECHNOLOGY",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "TRUMETER TECHNOLOGIES",
         "headquarterId": 216,
         "locationId": 216
      },
      {
         "name": "TTTECH AUTO",
         "logo": null,
         "headquarterId": 173,
         "locationId": 173
      },
      {
         "name": "TURCK DUOTEC",
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "UNO MINDA",
         "logo": null,
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "VARROC",
         "logo": null,
         "headquarterId": 128,
         "locationId": 128
      },
      {
         "name": "VELLE",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "WON MOTORS",
         "headquarterId": 137,
         "locationId": 137
      },
      {
         "name": "XIHUA",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XILINX",
         "logo": null,
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XIN",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XIN FA ELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINDONG SEMICONDUCTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINER SEMICONDUCTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINGHUA TRANSISTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINXIANG HUADAN ELECTRONIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINYI AUTOMOBILE ELECTRONICS LAMPS AND LRTERNS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XINYUENENG SEMICONDUCTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XSIGNAL INTEGRATED MICROELECTRONICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XTX",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XUANXINWEI",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "XUZHENG AUTO ELECTRONIC",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "YAMAGATA ELECTRONIC CORPORATION",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "YAMAGUCHI ELECTRIC",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "YAMAHA CORPORATION",
         "logo": null,
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "YAMEI MICROWAVE INSTRUMENT",
         "headquarterId": 133,
         "locationId": 133
      },
      {
         "name": "ZHONGWEI LIGHTGUIDE",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHONGXIN INTEGRATED CIRCUIT NINGBO",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZHONGXIN JINGLAI SEMICONDUCTOR",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZIBO MICRO COMMERCIAL",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "ZIBO YUHAI ELECTRONIC CERAMICS",
         "headquarterId": 120,
         "locationId": 120
      },
      {
         "name": "BESTLIGHT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ADL LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Advanced Optoelectronic Technology",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Advanced Semiconductor Engineering",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Aienyi Electronics",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AIM INTEGRATED CIRCUITS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AIPU VEHICLE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AISPEECH INFORMATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AIZU FUJITSU SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Akita Shindengen",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ALEDIA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Allegro MicroSystems",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ALLIX",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Allwinner Technology",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ALPHA AND OMEGA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ALPHAHOLDINGS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AMA PRECISION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "American Zettler",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AMI SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AMICC OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AMPCO MANUFACTURERS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ANDES ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AOI ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ARKMICRO TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ARM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ARROW SAFETY DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ARS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ASAHI KASEI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ASAHI PRECISION RUBBER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ASAHI RISE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ASAHI RUBBER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ASIAN STANLEY INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AST",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ATECT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AUK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AUTIC INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AUTO GAUGE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AUTOLITE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AUTOMATED ASSEMBLY CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AUTONIC ELECTRON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AVIO EXCELENTE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "AXELL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BAJATO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BASIC SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BECOM ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BEIJING BIGMOMENT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BEIJING GEWELL ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BEILAND",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BEST BRIGHT ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BESYO AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BG APPLIANCES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BIG TIME AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BIGMOMENT SEMICONDUCTOR FUJIAN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BLACK SESAME TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BLUE ROCKET ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BROADCOM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "BUYANG ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "C.H.TREFLECTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CALTERAH SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CANJING ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CANSEMI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CAS MICROELECTRONICS INTEGRATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CCS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CELLION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHENGXING ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHERNG LIAN ENTERPRISE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHICONY ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHICONY POWER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHO KWANG LAMP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHONGQING CLOUDCHILD",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHONGQING LANSHAN AUTO ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHUANG HSIANG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CHUO DENSHI KOGYO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CIMU INTELL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CIRTEK ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CITIZEN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CITY KNIGHT AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CIX",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CLD AUTO ELECTRICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "COMMSCOPE INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "COMNEX SIGNAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "COOLSEMI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CORE AND MATERIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CORENERGY SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CR MICROASSEMBLY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CREATION ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CREATIVE CHIPS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CREVERSE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CRRC YONGJI ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CRS ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "CVITEK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DAEWOO ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DANXI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DAYA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DE AMERTEK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DELCO AUTO ELECTRONIC INSTRUMENT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DEYU AUTOMOBILE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DH LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIABELL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIALIGHT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIALOG SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIGI INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIGIMAX INNOVATIVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIGUANG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DIODES ZETEX NEUHAUS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Diodes-Zetex",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DOMINANT OPTO TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DONGGUAN ASAHI RUBBER PRECISIONB",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DONGGUAN OASIS ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DONGGUAN WELKIN ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DONGGUANG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DONGYUN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DOSILICON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DOWA ELECTRONICS MATERIALS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DREAMTECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DROCTOPUS INTELLIGENT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DTK AUTO PRESS COMPS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "DUOTEC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "E & E Components",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "E&E Manufacturing",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EAGLEPOWER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EASTERN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ECARX Technology",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ECD ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EDISON OPTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EDISON OPTO CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EEASY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EFFICIENT POWER CONVERSION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EFI Lighting",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EIC SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELAN CAR MANUFACTURE PINGHU",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELECTROMAGNETICA",
         "logo": null,
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELEKTRA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELEKTRA ZAKLADY ELEKTROMECHANICZNE SPOLDZIELNIA INWALIDOW",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELITES GROUP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELMOS NORTH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELMOS SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ELMOS SEMICONDUCTOR SE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EPISTAR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EPSON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ERISED SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ESEN OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ESSYS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ESUSE AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ESWIN COMPUTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EUROPEAN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EVAS INTELIGENCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EVERLIGHT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EVERLIGHT ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EVERLIGHT OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EVLITE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "EXAR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FAIRCHILD SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FANBANG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FENO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FIEM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FIEM RESEARCH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FISILINK MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FLAG CHIP MICRO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FLT FUTURE TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FLYING FAIRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FORGE EUROPA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FORTOP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FORTSENSE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FORWARD ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FUDAN MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Fuji Electric",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FUJITSU",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FUKUSHIMA SANKEN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FULLHAN MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FURI ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "FUTURE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GANEXT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GEMAC CHEMNITZ",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GENERAL LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GENPHOAL OPTICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GEO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GIANTLIGHT TRAFFIC SUPPLIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GIGADEVICE SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GMY LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GONGMO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GOODARK ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GOPHER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GREATEK ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GRECON SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GREEN PROSPERITY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GROTE INDUSTRIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GTA SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GUANGYISHUN PHOTOELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GUDE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "GUOFANG AUTOMOTIVE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HABIT ILLUCOM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HAGIWARA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HAIGE COMMUNICATIONS GROUP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HAILO TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HAKKOSONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HAKODATE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HAMAMATSU",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HANA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HANGSHUN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HARISON TOSHIBA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HARMSWORTH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HATE SENSOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HEESUNG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HENGQIN GALLIUM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HENGYANG NO.3 RADIO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HESHAN GMY LIGHTING ELECTRICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HGC WUHAN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HIGASHINESHINDENGEN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HIGH AOMORI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HIJI HIGHTECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HILUX AUTOELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HIMA LIGHTING TECHNICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HIMAX TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HITECH OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HIVRON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HK KEMEI ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HOLOPHANE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HOLTEK SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HOLY STONE ENTERPRISE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HONG JING PLASTIC OPTICAL FIBER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HONGJING OPTOELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HONGLI DISPLAY ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HONGXIN PRECISION DIE CASTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HONGYUAN INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HOTO INTELLIGENT CONTROL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HUAAO ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HUAJING BEICHUAN ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HUALIAN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HUANGHE INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HUAXING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HUIHONG ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "HYGON MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "IAM ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ICATCH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ICHAUS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ICHIUN PRECISE INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ICORE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ILJIN MATERIALS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "IMAGINATION TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INBISEN SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INDIE MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INDUSTRIA ELETRONICA BERGSON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INNOREX VINA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INTEGRATED MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INTEGRATED SILICON SOLUTION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "INVENTCHIP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "IRVINE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ISABELLENHUETTE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ISABELLENHÜTTE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ITO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JHETECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JHM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIA'EN SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIALI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIALONG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIANGSU AZURE CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIANGSU MARCHING POWER MICROELECTRONICS GROUP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIANGSU XINGSHUN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIANKE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIANWEI ELECTRONICS AND SCIENCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIASIMENG INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JIMENES LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JINGDING OPTOELECTRONICS DISPLAY ELECTRONIC EQUIPMENT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JINGHENG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JINGHONG AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JINGWAH ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JINHUI ILLUMINATE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JINNUO ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JKL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JOD OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JOKON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JPM INDUSTRIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JSC RUSELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JT MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JUCAR AUTO ACCESSORIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "JUTE INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KAGA TOSHIBA ELECTRONICS COPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KAISERS INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KANDA KOGYO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KAOTAI ENTERPRISE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KASHIMA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KAU HUA INDUSTRIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KEC CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KEC CORPORATION GUMI PLANT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KEONWOO PRECISION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KIA SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KINETIC TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KINETIC TECHNOLOGIES S",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KING YU PHOTO ELECTRICITY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KING YUAN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KINGBRIGHT ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KIONIX",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KKCHIPS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KLITE INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KNIULINK SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KOBO LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KODENSHI CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KODENSHI SY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KONDO ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KONICA MINOLTA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KONICA MINOLTA HEADQUARTERS NORTH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KPLANNING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KRS ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KUMHO HT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KUNGAOXINXIN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KURODA ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KWANG MYUNG SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KYOEI ELECTORONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KYOTO PLATEC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KYOTO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "KYUSHU DENSHI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LANDONE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LANSON ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LAP ELECTRICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LAPIS SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LAPL AUTOMOTIVE PRIVATE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LASTER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LASTER TECH CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LASTER TECH ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LATTICE SEMICONDUCTOR CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LECIP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LED GLOBAL LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LEDDAR TECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LEDTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LEIDITECH ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LESHAN RADIO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LEXTAR ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LEZEN LIGHTING ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LIANCHUANG PHOTOELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LIANXINFENG OPTO SHENZHEN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LIGHTECH ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LIGHTO PLAST INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LIMA INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LINCSTECH YGA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LINGBENYANG INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LINGWO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LINGXIN MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Lite-On",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LONGLI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUCIDITY ENTERPRISE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMAX ANCILLARY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMEN SPECIAL CABLES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMILEDS NETHERLANDS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMILEDS SA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LUMINWAVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "LX SEMICON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "M SQUARE SHANGHAI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MACOM SOLUTIONS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MACROBLOCK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAOMAO AUTOMOBILE FITTINGS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAPLESEMI SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MARVELL SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAXIM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAXIM INTEGRATED",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAXIM INTEGRATED CHINA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAXIM INTEGRATED INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAXWAY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MAXWELL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MEGACHIPS CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MELEXIS TECHNICAL RESEARCH CENTER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MELEXIS TECHNOLOGIES SA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MEMSIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MENTOR  PRÄZISIONSBAUTEILE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MERAK PHOTON SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MERCURY CHIP ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "METAGRA INDUSTRY NV",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICHINOKUSOUND",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICRO DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICROCHIP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICROCHIP MUNICH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICROCREATIVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICRODIODE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MICROWAVE OPTICAL SEMICONDUCTORS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MIN HSIANG CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MINIATURE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MIPS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MIYAKAWA CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MIYAMOTO ELECTRIC HORNTOKAMACHI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MIYOSHI ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MOBILEYE GERMANY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MOFFETT AI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MONOLITHIC POWER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MONOLITHIC POWER SAN JOSE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MORIROKU PRECISION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MORITEX CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MORIYAMA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MORIYAMA CORPORATION UTSUNOMIYA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MORNINGCORE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MOTIONSILICON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MOTORCOMM MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MPEG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MPS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MULTIDIMENSION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "MUYE MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NAM YUNG LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NANJING HOUMO INTELLIGENCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NANJING SEMIDRIVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NANJING TIANYIHEXIN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NANJING ZHILINGXIN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NANTONG FUJITSU MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NAO ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NEBULA LINK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NESSCAP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NEW TOP AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NEWARK ELEMENT14",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NEXPERIA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NEXPERIA NEWPORT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NEXTVPU",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NICHIA CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO AX SENSING ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO BIGMOMENT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO FENGMEI VISION ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO GUDA MECHANICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO HUADUN NEW ENERGY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO KINGBAND AUTOMOBILE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO NEWSTARS SPARK PLUG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO SENFOTO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO SHENGXIN ELECTRONIC SCIENCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO WEIJIA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NINGBO YINZHOU TIANXING AUTOMOBILE ELECTRICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NIPPON PULSE MOTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NISSHINBO MICRO DEVICES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NISSHINBO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NMB SPORE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NMB TECHNOLOGIES CORPORATION DETROIT OFFICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NNP ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NO ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NO.6 SEMICONDUCTOR DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NO.7 RADIO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NONAKA SS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NORTH SEOUL SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NORTHSOUTH MACHINE ELECTRICAL ING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NOVOSENSE MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NOVUS SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NTK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NUCLEI SYSTEM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "NUVOTON CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OCEAN LIGHT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OHIRA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OJSC AVTOELECTROARMATURA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OKAYA ELECTRIC INDUSTRIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OMNIVISION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ON SEMICONDUCTOR.",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ONET TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OPTRONICS INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ORCHID RADIO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ORIGIN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ORIGIN US BRANCH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ORITEK SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OSHINO LAMPS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OSUN ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OTECH AUTOMOTIVE TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OULONDUN INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "OVERSEAS CHINESE ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "P.TOSRAM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PAKERS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PARA LIGHT NANJING ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PARTRICH AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PATEO",
         "logo": null,
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PATLITE CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PATLITE CORPORATION.",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PCN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PEREI GROUP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PETERSON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PHIGENT ROBOTICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PHILIPS AUTOMOTIVE LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PHILIPS ELECTRONICS AND LIGHTING  PHILIPPINES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PHLEXING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PIMCHIP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "POLAR SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "POLARIS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "POLYTECHNIC NEW SOURCE POWER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "POSSUMIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "POWER INTEGRATIONS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "POWERAMPER ELECTRONIC INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PRINCETON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PRO QUIP INTERNATIONAL KOREA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PROSPERITY DIELECTTICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "PURDY ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QIAITE ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QIMONDA INTERNATIONAL TRADE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QING CHI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QINGZHI ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QISHI XINGGUANG ELECTRIC APPLIANCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QST CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QUALTRE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "QUITEWIN CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "R.I.COSRL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RADIANT POLYMERS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RAM OPTICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RAPIDUS CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RECO AUTOMOTIVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RECTIFICADORES INTERNACIONALES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RECTIFIER AUTO PART",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RED MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "REFOND OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "REFOND OPTOELECTRONICS ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RENESUS SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RESISTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RICOH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RIGGER MICRO GROUP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RISING AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM APOLLO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM ELECTRONICS DALIAN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM ELECTRONICS PHILIPPINES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM INTEGRATED",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM POWERVATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHM WAKO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ROHMWAKO ELECTRONICS MALAYSIA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RONGCHENG LIFE LAMP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "RUNXIN INFORMATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SAFUWE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SAMMOON AUTO ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SANAN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SANFU OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SANKEN ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SANKEN POWER UK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SARR SA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SCHRADER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SCHRADERBRIDGEPORT INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEA LINK INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEDEMAC MECHATRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEEHI MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEETRUM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEIKO EPSON CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEIKO NPC CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMICONDUCTOR CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMICONDUCTOR DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMICONDUCTOR ELECTRONICS SHAOXING CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMICONDUCTOR INTERNATIONAL CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMICONDUCTOR TSMC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMIKRON INTERNATIONAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMIMENT ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMITEC CORP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMITEC ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEMITEC KOREA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SENDYNE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SENFOTO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SENSOR ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEOUL VIOSYS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEPUNG ELECTRONIC PRECISION INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SERVICES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SEVEN COLOR STAR OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SGKS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SGR SEMICONDUCTORS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHANGDIAN AUTOMATIC CONTROL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHANTENG ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHARP CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHARP MICROELECTRONICS OF THE S",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHELDAHL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHIMA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHIMADA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHINDENGEN ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHINKO SHOJI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHISHI TONGDA ELECTRICAL APPLIANCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHIYU INTELLIGENCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHOUGANG MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHOWA ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHUANGLING ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHUANGQI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SHUIMU LANJING SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SIENGINE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SIFIVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SIGNIFY NETHERLANDS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SILICON INTEGRATED",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SILICON LABORATORIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SILING ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SINAR ANGKASA RUNGKUT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SINBLE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SINE MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SINGA ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SIPLP MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SKYWATER FOUNDRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SKYWATER FOUNDRY FLORIDA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SKYWORKS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SL ALABAMA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SMAC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SMART LOGIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SMR AUTOMOTIVE MIRROR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SMR HUAXIANG AUTOMOTIVE MIRRORS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SMT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SOCIEDADE IRMÃOS MIRANDA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SOCIONEXT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SOLITORCH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SONY DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SONY SEMICONDUCTOR CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SPECTRUM SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STANLEY LED LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STANLEY TSURUOKA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STANLEYIDESS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STAR I",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STARLIGHT INDUSTRIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STERADIAN SEMICONDUCTORS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STMICROELECTRONICS AGRATE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STMICROELECTRONICS ANG MO KIO PTE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STMICROELECTRONICS CATANIA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STMICROELECTRONICS DESIGN CENTRE AND HEADQUARTER ASIA/PAC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STMICROELECTRONICS LIVONIA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "STS MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUIJING OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNLIGHT OPTO DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNON AUTO ACCESSORY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNPE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNPLUS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNPU OO SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNWA TECHNOS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNWA TECHNOS CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUNWAY AUTO ELECTRICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SUPRAJIT ING PHOENIX LAMPS DIVISION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SWINDON SILICON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SYNAPTICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SYNERGY TECHNICA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SYNOPSYS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SYNOPSYS  ASCHHEIM",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "SYSTEM '",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TA YIH INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TA YOUNG ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAI YUE ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAIHE ZHAOQING ELECTRONICS INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAIYANGHUI ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAIYO YUDEN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAIZHAN MECHANICAL AND ELECTRICA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAKAHATA ELECTRONICS CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAKATSUKI ELECTRIC INDUSTRY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TAKATSUKI ELECTRIC INDUSTRY KINPO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TANGFU ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TCL CHINA STAR OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TDK INVENSENSE INC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TDKMICRONAS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TECHSEM SEMICONDUCTORS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TECHTOTOP MICROELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TECHTUIT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TELEDYNE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TELIT COMMUNICATIONS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TEMIC DISORETE SEMICONDUCTORS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TENWIN CHIP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TG OPSEED",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "THINE ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "THINKING ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "THINKING ELECTRONIC INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "THINKING JIANGXI ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "THINKING YICHANG ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TINYCHIP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TLSI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOKYO ELETECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TONG YAH ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOPCO SCIENTIFIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOREX SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA DEVICE CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA ELECTRONIC DEVICE SOLUTIONS CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA ELECTRONICS EUROPE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA LIGHTING  CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA LIGHTING HONG KONG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOSHIBA SHOMEI PRECISION CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOURY ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOWA ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TOWA RUBBER CHEMICALS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TRANSISTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TRS MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TRUCKLITE EUROPE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TRUMETER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TSING MICRO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TSMC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TT OPTEK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TTCONTROL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TTTECH COMPUTER",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TVS AUTOSERV",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TYC BROTHER INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "TYRI S",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UBLOX AG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UMC ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNICORE COMMUNICATIONS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIGROUP GUOXIN MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIMICRON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIMICRON CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIMICRON ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIMICRON TONGTAI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIQUE DIECASTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNISOC TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "United Semiconductor",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNITY OPTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIVERSAL ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNIVERSAL SCIENTIFIC INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UNO MINDA SWITCH DIVISION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "UTAC SERVICES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VALENS SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VANGUARD INTERNATIONAL SEMICONDUCTOR CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VARIAN TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VEHICLE NETWORKING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VEHICLE SAFETY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VIGNESH POLYMERS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VIKOUSI ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISHAY",
         "logo": null,
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISHAY ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISHAY INTERTECHNOLOGY",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISHAY S",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISHAYSILICONIX",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISION AUTOMOBILE ELECTRONICS INDUSTRIAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VISION AUTOMOTIVE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VITI ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "VSORA",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WAFER LEVEL CSP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WAKO ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WAMCO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WATT AUTO ELECTRICAL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WAXUBOL MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WEIFENGHENG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WEIWANG LIGHTS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WENRUN ELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WIESON TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WILBRECHT LEDCO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WILL SEMICONDUCTOR SHANGHAI",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WINBOND ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WINGTECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WINNER AUTO LAMP",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WITEK ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WOLFSPEED",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WOODWARD",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "WTS WISSENSTRANSFERGESELLSCHAFT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Wuhu Anrui Optoelectronics",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "XENLIGHT",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "XF SARAWAK",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "XFAB SEMICONDUCTOR FOUNDRIES AG",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "XIAOGAN REALIGHT AUTO LIGHTING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "XINGANG SEMICONDUCTOR DEVICE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YAGUANG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YANGZHONG HUAXING ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YAR TON ENTERPRISE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YEA SHIN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YENYO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YICHENGLONG CAR ACCESSORIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YINGHUA ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YINGNUOMING ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YINGRUICHUANG ELECTRONIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YIOU GUAN OPTOTECH",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YITOA MICRO CORPORATION",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YIXING ZHILIAN AUTOMOBILE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YOONJIN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YOSHIKAWA ELECTRONICS BINTAN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YOSHIKAWAKOGYO RF SEMICON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YOUKONG ZHIXING",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YUEN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YUEQING CHSKY AUTOMOBILE APPARATUS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "Yufeng Group",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YUIL SMT.",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YUNTU SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YUTEC PHOTOELECTRIC",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "YUYAO KEYU VEHICEL PART",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHANCHEN BROWN AUTO SPARE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHANGJIAKOU NO.4 RADIO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG FARIZON ZHIXIN",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG GENCOMM AUTOMATIC CONTROL",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG GENIUSPROS TECHNOLOGIES",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG GOODWAY AUTOMOBILE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG GUANGTE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG HUDIAN AUTO ELECTRIC APPLIANCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG JINGNENG MICROELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG JINYUAN OPTOELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG SIFANG ELECTRON",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG XINGPU AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHEJIANG YUEQING DONGZHENG RECTIFIER MANUFACTURE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHENHUA GROUP SCIENCE",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHENHUA GROUP YONGGUANG ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHENYU",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHIYUAN ELECTRONICS",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHONGFEI AUTO",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZHONGHUAN SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZMJ SEMICONDUCTOR",
         "headquarterId": null,
         "locationId": null
      },
      {
         "name": "ZUKEN ELMIC",
         "headquarterId": null,
         "locationId": null
      }
      ];
      break;
   case 'recycling, reuse':
      data.stats.chain = ['Recycling, Reuse'];
      data.stats.chainChildren = ['Recycling (HV Battery)'];
      data.stats.maj = [
      {
         "name": "REDWOOD MATERIALS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_92c82050-a798-11ed-b9ac-23d01d8d758b.png"
      },
      {
         "name": "ELKEM",
	 "logo": "/cdn-stage/images/tmplogos/ELKEM.jpeg"
      }
      ];
      data.stats.str = [
      {
         "name": "LIBREC",
	 "logo": "/cdn-stage/images/tmplogos/LIBREC.jpeg"
      },
      {
         "name": "LI-CYCLE",
	 "logo": "/cdn-stage/images/tmplogos/LI-CYCLE.jpeg"
      },
      {
         "name": "TITAN",
	 "logo": "/cdn-stage/images/tmplogos/TITAN.jpeg"
      }
      ];
      data.suppliers = [
      {
         "name": "ASCEND ELEMENTS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_732bc7b0-a798-11ed-b9ac-23d01d8d758b.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "REDWOOD MATERIALS",
         "logo": "https://cdn.supplybridge.com/images/logos/logo_92c82050-a798-11ed-b9ac-23d01d8d758b.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "SENSATA",
         "logo": "https://cdn-stage.supplybridge.com/images/logos/logo_c4f6d730-ef8a-11ed-8691-79bd26e77b44_5831.png",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ELKEM",
         "headquarterId": 204,
         "locationId": 204
      },
      {
         "name": "LIBREC",
         "headquarterId": 214,
         "locationId": 214
      },
      {
         "name": "LI-CYCLE",
         "headquarterId": 70,
         "locationId": 70
      },
      {
         "name": "MOMENT ENERGY",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "ONTO Technology",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "REDIVIVUS",
         "headquarterId": 105,
         "locationId": 105
      },
      {
         "name": "TITAN",
         "headquarterId": 105,
         "locationId": 105
      }
      ];
      break;
   case '':
      data.stats.chain = [];
      data.stats.chainChildren = [];
      data.stats.maj = [];
      data.stats.str = [];
      data.suppliers = [];
      break;
   }
}
