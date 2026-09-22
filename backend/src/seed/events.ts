export interface SeedEvent {
  titleEn: string;
  titleNp: string;
  descriptionEn: string;
  descriptionNp: string;
  startDate: Date;
  endDate: Date;
  location: string;
  registrationLink?: string;
}

/**
 * Sample association events for local development and demos.
 *
 * Fictional programmes, but modelled on the real HAN calendar — an AGM, staff
 * training, a provincial expo, season openings and district workshops — so the
 * events UI is exercised with plausible content. Replace before production.
 *
 * Dates deliberately straddle the present: one event has already finished, one
 * is running now, and the rest are upcoming. The events endpoint sorts by
 * `startDate` ascending, so this ordering makes past/current/upcoming rendering
 * visible without editing any data.
 */
export const SEED_EVENTS: SeedEvent[] = [
  {
    titleEn: "Monsoon Hospitality Safety Audit Workshop",
    titleNp: "मनसुन आतिथ्य सुरक्षा लेखाजोखा कार्यशाला",
    descriptionEn:
      "A one-day practical workshop on monsoon readiness for member properties: fire safety inspection, kitchen hygiene certification, landslide-season evacuation planning, and the updated provincial guest-registration requirements. Facilitated by the Provincial Tourism Directorate with a certificate of completion for each participating property.",
    descriptionNp:
      "सदस्य होटलहरूका लागि मनसुन तयारीसम्बन्धी एकदिवसीय व्यावहारिक कार्यशाला: अग्नि सुरक्षा निरीक्षण, भान्सा सरसफाई प्रमाणीकरण, पहिरो मौसममा निकासी योजना र पाहुना दर्तासम्बन्धी नवीकृत प्रादेशिक व्यवस्था। प्रदेश पर्यटन निर्देशनालयको सहजीकरणमा सञ्चालित, सहभागी प्रत्येक होटललाई सहभागिता प्रमाणपत्र प्रदान गरिने।",
    startDate: new Date("2026-08-14T09:30:00+05:45"),
    endDate: new Date("2026-08-14T16:30:00+05:45"),
    location: "HAN Sudurpashchim Hall, Ratopul, Dhangadhi, Kailali",
  },
  {
    titleEn: "Khaptad Trekking Season Opening",
    titleNp: "खप्तड पदयात्रा मौसम उद्घाटन",
    descriptionEn:
      "The formal opening of the autumn trekking season on the Khaptad circuit, marked at the Jhingrana trailhead. Member lodges along the route confirm their seasonal rates, the registered guide and porter roster is published, and the district administration briefs operators on permit procedure and high-altitude emergency contacts.",
    descriptionNp:
      "खप्तड परिपथमा शरद ऋतुको पदयात्रा मौसमको औपचारिक उद्घाटन, झिँग्राना प्रवेशद्वारमा आयोजित। मार्गका सदस्य लजहरूले मौसमी शुल्क निश्चित गर्ने, दर्ता भएका गाइड र भरियाको नामावली प्रकाशन गरिने तथा जिल्ला प्रशासनले अनुमति प्रक्रिया र उच्च हिमाली आपतकालीन सम्पर्कबारे जानकारी दिने।",
    startDate: new Date("2026-09-20T07:00:00+05:45"),
    endDate: new Date("2026-09-24T17:00:00+05:45"),
    location: "Jhingrana Trailhead, Khaptad National Park, Bajhang",
    registrationLink: "https://hansudurpashchim.org.np/events/khaptad-season-opening",
  },
  {
    titleEn: "Sudurpashchim Tourism Expo 2026",
    titleNp: "सुदूरपश्चिम पर्यटन प्रदर्शनी २०२६",
    descriptionEn:
      "The province's largest hospitality and travel trade fair, bringing together member hotels, homestay networks, transport operators, trekking agencies and handicraft producers from all eight districts. Three days of exhibition, a buyer-seller meet with inbound operators from Kathmandu and Delhi, and an evening programme of Deuda and Tharu performance.",
    descriptionNp:
      "प्रदेशको सबैभन्दा ठूलो आतिथ्य तथा पर्यटन व्यापार मेला, जसमा आठै जिल्लाका सदस्य होटल, होमस्टे सञ्जाल, यातायात व्यवसायी, पदयात्रा एजेन्सी र हस्तकला उत्पादकहरू सहभागी हुनेछन्। तीन दिनको प्रदर्शनी, काठमाडौँ र दिल्लीका आगमन व्यवसायीहरूसँग क्रेता-विक्रेता भेटघाट तथा साँझमा देउडा र थारू सांस्कृतिक प्रस्तुति।",
    startDate: new Date("2026-10-17T10:00:00+05:45"),
    endDate: new Date("2026-10-19T19:00:00+05:45"),
    location: "Dhangadhi Exhibition Ground, Ward 4, Dhangadhi, Kailali",
    registrationLink: "https://hansudurpashchim.org.np/events/tourism-expo-2026",
  },
  {
    titleEn: "Front Desk Excellence: Staff Training Programme",
    titleNp: "स्वागत कक्ष उत्कृष्टता: कर्मचारी तालिम कार्यक्रम",
    descriptionEn:
      "A three-day residential training for front-of-house staff of member properties, covering reservation systems, guest communication in English and Hindi, complaint resolution, and the digital guest register. Two seats are reserved free of charge for every Boutique and Homestay tier member.",
    descriptionNp:
      "सदस्य होटलका स्वागत कक्ष कर्मचारीका लागि तीनदिवसीय आवासीय तालिम, जसमा आरक्षण प्रणाली, अङ्ग्रेजी र हिन्दीमा पाहुनासँगको संवाद, गुनासो समाधान र डिजिटल पाहुना दर्ता समेटिएको छ। प्रत्येक बुटिक तथा होमस्टे श्रेणीका सदस्यका लागि दुई सिट निःशुल्क आरक्षित।",
    startDate: new Date("2026-11-05T08:00:00+05:45"),
    endDate: new Date("2026-11-07T17:00:00+05:45"),
    location: "Amargadhi Fort View Hotel, Amargadhi, Dadeldhura",
    registrationLink: "https://hansudurpashchim.org.np/events/front-desk-training",
  },
  {
    titleEn: "Homestay Sustainability Workshop",
    titleNp: "होमस्टे दिगोपन कार्यशाला",
    descriptionEn:
      "A working session for community homestay operators on waste segregation, solar water heating, plastic-free guest supplies and sourcing from village producers. Hosted in the Ramaroshan lake basin so that participants can see an operating off-grid property before the afternoon discussion.",
    descriptionNp:
      "सामुदायिक होमस्टे सञ्चालकहरूका लागि फोहोर छुट्याउने, सौर्य पानी तताउने, प्लास्टिकमुक्त पाहुना सामग्री र गाउँका उत्पादकबाट खरिदसम्बन्धी कार्य सत्र। दिउँसोको छलफलअघि सहभागीहरूले सञ्चालनमा रहेको अफ-ग्रिड होटल अवलोकन गर्न सकून् भनी रामारोशन ताल क्षेत्रमा आयोजित।",
    startDate: new Date("2026-11-22T09:00:00+05:45"),
    endDate: new Date("2026-11-23T16:00:00+05:45"),
    location: "Ramaroshan Eco Resort, Ramaroshan Rural Municipality, Achham",
    registrationLink: "https://hansudurpashchim.org.np/events/homestay-sustainability",
  },
  {
    titleEn: "HAN Sudurpashchim Annual General Meeting",
    titleNp: "हान सुदूरपश्चिम वार्षिक साधारण सभा",
    descriptionEn:
      "The statutory annual general meeting of the association. Agenda: presentation of the audited accounts, the executive committee's annual report, ratification of new member applications, the advocacy priorities to be tabled with the provincial government, and election to three vacant committee positions. Open to all members in good standing.",
    descriptionNp:
      "संघको विधानबमोजिमको वार्षिक साधारण सभा। कार्यसूची: लेखापरीक्षण भएको आर्थिक विवरण प्रस्तुति, कार्यसमितिको वार्षिक प्रतिवेदन, नयाँ सदस्यता आवेदनको अनुमोदन, प्रदेश सरकारसमक्ष पेस गर्ने पैरवीका प्राथमिकता तथा कार्यसमितिको तीन रिक्त पदमा निर्वाचन। सक्रिय सदस्यता कायम रहेका सबै सदस्यका लागि खुला।",
    startDate: new Date("2026-12-12T11:00:00+05:45"),
    endDate: new Date("2026-12-12T17:00:00+05:45"),
    location: "Karnali Grand Dhangadhi, Ratopul, Dhangadhi, Kailali",
    registrationLink: "https://hansudurpashchim.org.np/events/agm-2026",
  },
  {
    titleEn: "Api Himal Winter Tourism Meet",
    titleNp: "आपी हिमाल शीतकालीन पर्यटन भेला",
    descriptionEn:
      "A planning meet for operators working the northern high-altitude routes, focused on extending the season into winter: cold-weather lodge standards, winter trail conditions on the Api Base Camp approach, insurance requirements, and a joint marketing push for December-to-February departures.",
    descriptionNp:
      "उत्तरी उच्च हिमाली मार्गमा कार्यरत व्यवसायीहरूका लागि योजना भेला, मौसमलाई हिउँदसम्म विस्तार गर्ने उद्देश्यमा केन्द्रित: जाडो मौसमका लज मापदण्ड, आपी आधार शिविर मार्गको हिउँदे अवस्था, बीमा आवश्यकता तथा मंसिरदेखि फागुनसम्मका प्रस्थानका लागि संयुक्त बजारीकरण अभियान।",
    startDate: new Date("2027-01-16T09:00:00+05:45"),
    endDate: new Date("2027-01-17T16:00:00+05:45"),
    location: "Api Himal Base Lodge, Jayaprithvi Municipality, Chainpur, Bajhang",
  },
];
