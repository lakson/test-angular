import { User } from './../../models';
import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  countriesCode = [
    {
    name: "Afghanistan",
    dial_code: "+93",
    code: "AF"
    },
    {
    name: "Algeria",
    dial_code: "+213",
    code: "DZ"
    },
    {
    name: "AmericanSamoa",
    dial_code: "+1684",
    code: "AS"
    },
    {
    name: "Andorra",
    dial_code: "+376",
    code: "AD"
    },
    {
    name: "Angola",
    dial_code: "+244",
    code: "AO"
    },
    {
    name: "Anguilla",
    dial_code: "+1264",
    code: "AI"
    },
    {
    name: "Antarctica",
    dial_code: "+672",
    code: "AQ"
    },
    {
    name: "Antigua and Barbuda",
    dial_code: "+1268",
    code: "AG"
    },
    {
    name: "Argentina",
    dial_code: "+54",
    code: "AR"
    },
    {
    name: "Cameroon",
    dial_code: "+237",
    code: "CM"
    },
    {
    name: "Canada",
    dial_code: "+1",
    code: "CA"
    },
    {
    name: "Cape Verde",
    dial_code: "+238",
    code: "CV"
    },
    {
    name: "Cayman Islands",
    dial_code: "+ 345",
    code: "KY"
    },
    {
    name: "Central African Republic",
    dial_code: "+236",
    code: "CF"
    },
    {
    name: "Chad",
    dial_code: "+235",
    code: "TD"
    },
    {
    name: "Chile",
    dial_code: "+56",
    code: "CL"
    },
    {
    name: "China",
    dial_code: "+86",
    code: "CN"
    },
    {
    name: "Equatorial Guinea",
    dial_code: "+240",
    code: "GQ"
    },
    {
    name: "Eritrea",
    dial_code: "+291",
    code: "ER"
    },
    {
    name: "Estonia",
    dial_code: "+372",
    code: "EE"
    },
    {
    name: "Ethiopia",
    dial_code: "+251",
    code: "ET"
    },
    {
    name: "Falkland Islands (Malvinas)",
    dial_code: "+500",
    code: "FK"
    },
    {
    name: "Faroe Islands",
    dial_code: "+298",
    code: "FO"
    },
    {
    name: "Fiji",
    dial_code: "+679",
    code: "FJ"
    },
    {
    name: "Finland",
    dial_code: "+358",
    code: "FI"
    },
    {
    name: "France",
    dial_code: "+33",
    code: "FR"
    },
    {
    name: "French Guiana",
    dial_code: "+594",
    code: "GF"
    },
    {
    name: "French Polynesia",
    dial_code: "+689",
    code: "PF"
    },
    {
    name: "Gabon",
    dial_code: "+241",
    code: "GA"
    },
    {
    name: "Gambia",
    dial_code: "+220",
    code: "GM"
    },
    {
    name: "Georgia",
    dial_code: "+995",
    code: "GE"
    },
    {
    name: "Germany",
    dial_code: "+49",
    code: "DE"
    },
    {
    name: "Ghana",
    dial_code: "+233",
    code: "GH"
    },
    {
    name: "Gibraltar",
    dial_code: "+350",
    code: "GI"
    },
    {
    name: "Greece",
    dial_code: "+30",
    code: "GR"
    },
    {
    name: "Guyana",
    dial_code: "+595",
    code: "GY"
    },
    {
    name: "Haiti",
    dial_code: "+509",
    code: "HT"
    },
    {
    name: "Holy See (Vatican City State)",
    dial_code: "+379",
    code: "VA"
    },
    {
    name: "Honduras",
    dial_code: "+504",
    code: "HN"
    },
    {
    name: "Hong Kong",
    dial_code: "+852",
    code: "HK"
    },
    {
    name: "Hungary",
    dial_code: "+36",
    code: "HU"
    },
    {
    name: "Iceland",
    dial_code: "+354",
    code: "IS"
    },
    {
    name: "India",
    dial_code: "+91",
    code: "IN"
    },
    {
    name: "Indonesia",
    dial_code: "+62",
    code: "ID"
    },
    {
    name: "Iran, Islamic Republic of Persian Gulf",
    dial_code: "+98",
    code: "IR"
    },
    {
    name: "Iraq",
    dial_code: "+964",
    code: "IQ"
    },
    {
    name: "Ireland",
    dial_code: "+353",
    code: "IE"
    },
    {
    name: "Isle of Man",
    dial_code: "+44",
    code: "IM"
    },
    {
    name: "Israel",
    dial_code: "+972",
    code: "IL"
    },
    {
    name: "Italy",
    dial_code: "+39",
    code: "IT"
    },
    {
    name: "Jamaica",
    dial_code: "+1876",
    code: "JM"
    },
    {
    name: "Japan",
    dial_code: "+81",
    code: "JP"
    },
    {
    name: "Jersey",
    dial_code: "+44",
    code: "JE"
    },
    {
    name: "Jordan",
    dial_code: "+962",
    code: "JO"
    },
    {
    name: "Kazakhstan",
    dial_code: "+77",
    code: "KZ"
    },
    {
    name: "Kenya",
    dial_code: "+254",
    code: "KE"
    },
    {
    name: "Liechtenstein",
    dial_code: "+423",
    code: "LI"
    },
    {
    name: "Lithuania",
    dial_code: "+370",
    code: "LT"
    },
    {
    name: "Luxembourg",
    dial_code: "+352",
    code: "LU"
    },
    {
    name: "Macao",
    dial_code: "+853",
    code: "MO"
    },
    {
    name: "Macedonia",
    dial_code: "+389",
    code: "MK"
    },
    {
    name: "Madagascar",
    dial_code: "+261",
    code: "MG"
    },
    {
    name: "Malawi",
    dial_code: "+265",
    code: "MW"
    },
    {
    name: "Malaysia",
    dial_code: "+60",
    code: "MY"
    },
    {
    name: "Maldives",
    dial_code: "+960",
    code: "MV"
    },
    {
    name: "Mali",
    dial_code: "+223",
    code: "ML"
    },
    {
    name: "Malta",
    dial_code: "+356",
    code: "MT"
    },
    {
    name: "Marshall Islands",
    dial_code: "+692",
    code: "MH"
    },
    {
    name: "Martinique",
    dial_code: "+596",
    code: "MQ"
    },
    {
    name: "Mauritania",
    dial_code: "+222",
    code: "MR"
    },
    {
    name: "Mauritius",
    dial_code: "+230",
    code: "MU"
    },
    {
    name: "Mayotte",
    dial_code: "+262",
    code: "YT"
    },
    {
    name: "Mexico",
    dial_code: "+52",
    code: "MX"
    },
    {
    name: "Micronesia, Federated States of Micronesia",
    dial_code: "+691",
    code: "FM"
    },
    {
    name: "Moldova",
    dial_code: "+373",
    code: "MD"
    },
    {
    name: "Monaco",
    dial_code: "+377",
    code: "MC"
    },
    {
    name: "Panama",
    dial_code: "+507",
    code: "PA"
    },
    {
    name: "Papua New Guinea",
    dial_code: "+675",
    code: "PG"
    },
    {
    name: "Paraguay",
    dial_code: "+595",
    code: "PY"
    },

    {
    name: "Pitcairn",
    dial_code: "+872",
    code: "PN"
    },
    {
    name: "Poland",
    dial_code: "+48",
    code: "PL"
    },
    {
    name: "Portugal",
    dial_code: "+351",
    code: "PT"
    },
    {
    name: "Puerto Rico",
    dial_code: "+1939",
    code: "PR"
    },
    {
    name: "Qatar",
    dial_code: "+974",
    code: "QA"
    },
    {
    name: "Romania",
    dial_code: "+40",
    code: "RO"
    },
    {
    name: "Russia",
    dial_code: "+7",
    code: "RU"
    },
    {
    name: "Rwanda",
    dial_code: "+250",
    code: "RW"
    },
    {
    name: "Somalia",
    dial_code: "+252",
    code: "SO"
    },
    {
    name: "South Africa",
    dial_code: "+27",
    code: "ZA"
    },
    {
    name: "South Sudan",
    dial_code: "+211",
    code: "SS"
    },
    {
    name: "South Georgia and the South Sandwich Islands",
    dial_code: "+500",
    code: "GS"
    },
    {
    name: "Spain",
    dial_code: "+34",
    code: "ES"
    },
    {
    name: "Sri Lanka",
    dial_code: "+94",
    code: "LK"
    },
    {
    name: "Sudan",
    dial_code: "+249",
    code: "SD"
    },
    {
    name: "Suriname",
    dial_code: "+597",
    code: "SR"
    },
    {
    name: "Svalbard and Jan Mayen",
    dial_code: "+47",
    code: "SJ"
    },
    {
    name: "Swaziland",
    dial_code: "+268",
    code: "SZ"
    },
    {
    name: "Sweden",
    dial_code: "+46",
    code: "SE"
    },
    {
    name: "Switzerland",
    dial_code: "+41",
    code: "CH"
    },
    {
    name: "Tajikistan",
    dial_code: "+992",
    code: "TJ"
    },
    {
    name: "Zimbabwe",
    dial_code: "+263",
    code: "ZW"
    }
  ];

  preferedLanguages = [
    {
      name: 'French',
      value: 'fr'
    },
    {
      name: 'English',
      value: 'en'
    }
  ];

   constructor(private firestore: Firestore) {
   }



   saveData(user: User) {
    const usersRef = collection(this.firestore, 'users');
    return addDoc(usersRef, user);
   }
}
