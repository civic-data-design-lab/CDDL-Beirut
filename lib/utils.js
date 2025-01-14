/**
 * Generic utilities module.
 *
 * Contains functions and constants that can be used throughout the entire
 * project.
 *
 * Note:
 *      "_"-prefixed functions are not meant to be used outside of this file,
 *      they are simply helper functions.
 *
 * @module utils
 */

const turfLength = require('@turf/length').default;
const { lineString } = require('@turf/helpers');

const DEFAULT_ID_LENGTH = 10;
const MAPBOX_STYLE_URL =
  'mapbox://styles/mitcivicdata/cl3j8uw87005614locgk6feit';
const ARCHIVE_CONTRIBUTION_NAME = 'archive_contribution';
const WORKSHOP_CONTRIBUTION_NAME = 'workshop_contribution';
const CRAFT_TYPES = [
  'Brass',
  'Ceramics',
  'Copper',
  'Embroidery',
  'Food',
  'Furniture',
  'Glass',
  'Jewelry',
  'Leather',
  'Metalwork',
  'Marquetry',
  'Sculpture',
  'Shoemaker',
  'Soap',
  'Tailor',
  'Tapestry',
  'Upholstery',
  'Wickerwork',
  'Woodwork',
];
const CRAFT_CATEGORIES = [
  'Architectural',
  'Cuisine',
  'Decorative',
  'Fashion',
  'Functional',
  'Furniture',
  'Textiles',
];
const IMAGE_TYPES = [
  { name: 'Storefront', value: 'storefront' },
  { name: 'Street view', value: 'street' },
  { name: 'Souk/Marketplace/Bazaar', value: 'souk' },
  { name: 'Other outdoor space', value: 'public_realm' },
  { name: 'Indoor view', value: 'indoor' },
  { name: 'Craftsperson', value: 'craftsperson' },
  { name: 'Craft object', value: 'craft' },
  { name: 'Aerial view', value: 'aerial' },
  { name: 'Other', value: 'other' },
];

// Broken down by Quarter, then into sector. https://www.lebanesearabicinstitute.com/areas-beirut/
// Unsure if Arabic will be used yet until translate tool is implemented. Fill out later.
const BEIRUT_ZONES = {
  quarters: [
    {
      EN: 'Bourj Hammoud',
      AR: 'برج حمود',
      sectors: [
        {
          EN: 'Nor Marash',
          AR: '',
          index: '77',
        },
        {
          EN: 'Nor Adana',
          AR: '',
          index: '78',
        },
        {
          EN: 'Haret Sader',
          AR: '',
          index: '79',
        },
        {
          EN: 'Dora',
          AR: '',
          index: '80',
        },
        {
          EN: 'Shatiq-Al-Bahri',
          AR: '',
          index: '81',
        },
        {
          EN: 'Nor Sis',
          AR: '',
          index: '82',
        },
      ],
    },
    {
      EN: 'Marfaa',
      AR: 'المرْفأ',
      sectors: [
        {
          EN: 'Nejmeh',
          AR: 'النِّجْمِة',
          index: '11',
        },
        {
          EN: 'Majidiye',
          AR: 'المَجيدِيِّة',
          index: '12',
        },
        {
          EN: 'Marfaa',
          AR: 'المَرْفَأ',
          index: '14',
        },
        {
          EN: 'Nouveau Secteur',
          AR: 'المَنْطَقة المُسْتَحْدَثِة',
          index: '15',
        },
      ],
    },
    {
      EN: 'Mina El-Hosn',
      AR: 'ميناء الحصن',
      sectors: [
        {
          EN: 'Mina El-Hosn',
          AR: 'ميناء الحصن',
          index: '20',
        },
        {
          EN: 'Bab Idriss',
          AR: '',
          index: '21',
        },
        {
          EN: 'Qantari',
          AR: '',
          index: '22',
        },
      ],
    },
    {
      EN: 'Zuqaq El-Blat',
      AR: '',
      sectors: [
        {
          EN: 'Serail',
          AR: '',
          index: '23',
        },
        {
          EN: 'Batrakieh',
          AR: '',
          index: '24',
        },
      ],
    },
    {
      EN: 'Bachoura',
      AR: '',
      sectors: [
        {
          EN: 'Basta El-Tahta',
          AR: '',
          index: '25',
        },
        {
          EN: 'Bachoura',
          AR: '',
          index: '26',
        },
      ],
    },
    {
      EN: 'Saifi',
      AR: '',
      sectors: [
        {
          EN: 'Yesouieh',
          AR: '',
          index: '27',
        },
        {
          EN: 'Mar Maroun',
          AR: '',
          index: '28',
        },
        {
          EN: 'Gemmayzeh',
          AR: '',
          index: '29',
        },
      ],
    },
    {
      EN: 'Dar El-Mreisseh',
      AR: '',
      sectors: [
        {
          EN: 'Ain El-Mreisseh',
          AR: '',
          index: '30',
        },
        {
          EN: 'Jamia',
          AR: '',
          index: '31',
        },
        {
          EN: 'Ras Beirut',
          AR: '',
          index: '35',
        },
      ],
    },
    {
      EN: 'Ras Beirut',
      AR: '',
      sectors: [
        {
          EN: 'Jounblat',
          AR: '',
          index: '32',
        },
        {
          EN: 'Snoubra',
          AR: '',
          index: '33',
        },
        {
          EN: 'Hamra',
          AR: '',
          index: '34',
        },
        {
          EN: 'Manara',
          AR: '',
          index: '36',
        },
        {
          EN: 'Qoreitem',
          AR: '',
          index: '37',
        },
        {
          EN: 'Raoucheh',
          AR: '',
          index: '38',
        },
        {
          EN: 'Ain El-Tineh',
          AR: '',
          index: '39',
        },
      ],
    },
    {
      EN: 'Mousaitbeh',
      AR: '',
      sectors: [
        {
          EN: 'El Zarif',
          AR: '',
          index: '40',
        },
        {
          EN: 'Sanayeh',
          AR: '',
          index: '41',
        },
        {
          EN: 'Tallet Druze',
          AR: '',
          index: '42',
        },
        {
          EN: 'Dar El-Fatwa',
          AR: '',
          index: '44',
        },
        {
          EN: 'Tallet El-Khayat',
          AR: '',
          index: '45',
        },
        {
          EN: 'UNESCO',
          AR: '',
          index: '46',
        },
        {
          EN: 'Mar Elias',
          AR: '',
          index: '47',
        },
        {
          EN: 'Wata',
          AR: '',
          index: '48',
        },
        {
          EN: 'Mousaitbeh',
          AR: '',
          index: '49',
        },
      ],
    },
    {
      EN: 'Mazraa',
      AR: '',
      sectors: [
        {
          EN: 'Burj Abi Haidar',
          AR: '',
          index: '50',
        },
        {
          EN: 'Basta El-Faouqa',
          AR: '',
          index: '51',
        },
        {
          EN: 'Ras El-Nabaa',
          AR: '',
          index: '52',
        },
        {
          EN: 'Mazraa',
          AR: '',
          index: '53',
        },
        {
          EN: 'Malaab',
          AR: '',
          index: '55',
        },
        {
          EN: 'Tariq El-Jdideh',
          AR: '',
          index: '56',
        },
        {
          EN: 'Horch',
          AR: '',
          index: '57',
        },
        {
          EN: 'Parc',
          AR: '',
          index: '58',
        },
        {
          EN: 'Amlieh',
          AR: '',
          index: '59',
        },
      ],
    },
    {
      EN: 'Achrafieh',
      AR: '',
      sectors: [
        {
          EN: 'Furn El-Hayek',
          AR: '',
          index: '61',
        },
        {
          EN: 'Nasra',
          AR: '',
          index: '62',
        },
        {
          EN: 'Archafieh',
          AR: '',
          index: '63',
        },
        {
          EN: 'Hôtel Dieu',
          AR: '',
          index: '64',
        },
        {
          EN: 'Mar Mitr',
          AR: '',
          index: '65',
        },
        {
          EN: 'Adlieh (Palais de Justice)',
          AR: '',
          index: '66',
        },
        {
          EN: 'Sioufi',
          AR: '',
          index: '67',
        },
        {
          EN: 'Ghabi',
          AR: '',
          index: '68',
        },
        {
          EN: 'Corniche El-Nahr',
          AR: '',
          index: '69',
        },
      ],
    },
    {
      EN: 'Rmeil',
      AR: '',
      sectors: [
        {
          EN: 'Mar Nkoula',
          AR: '',
          index: '71',
        },
        {
          EN: 'Hikmeh',
          AR: '',
          index: '73',
        },
        {
          EN: 'Mustashfa El-Roum (Hôpital Orthodoxe)',
          AR: '',
          index: '74',
        },
        {
          EN: 'Jeitaoui',
          AR: '',
          index: '78',
        },
        {
          EN: 'Qobaiyat',
          AR: '',
          index: '79',
        },
      ],
    },
    {
      EN: 'Medawar',
      AR: '',
      sectors: [
        {
          EN: 'Rmeil',
          AR: '',
          index: '72',
        },
        {
          EN: 'Mar Mikhael',
          AR: '',
          index: '75',
        },
        {
          EN: 'Khodr',
          AR: '',
          index: '76',
        },
        {
          EN: 'Jisr',
          AR: '',
          index: '77',
        },
      ],
    },
  ],
};

const REGEX_VALIDATION = {
  tel: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
  email:
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  url: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i,
  twitter_handle: /^@\w+$/,
  instagram_handle: /^@[\w\.]+$/,
};

// Hello someone in 2030 hehehe
const VALID_DECADES = [
  1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000,
  2010, 2020,
];

/**
 * Checks if the given string has an image file extension.
 * https://bobbyhadz.com/blog/javascript-check-if-url-is-image
 *
 * @param {string} s - The string to check.
 * @returns {boolean} True if the string has an image file extension.
 */
const isImage = (s) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(s);
};

/**
 * Generates a random numeric string ID of the given length.
 *
 * @param {string} length - The length of the ID to generate.
 * @returns {string} The random ID.
 */
const generateId = (length) => {
  if (!length) {
    length = DEFAULT_ID_LENGTH;
  }

  const randString = Math.random()
    .toString()
    .substring(2, length + 2);
  return randString;
};

/**
 * @param {string} dateStr - Unknown
 * @param {number} startDecade
 * @param {number} endDecade
 * @returns {{number, number}} { year, decade }
 */
const _getYearAndDecade = (dateStr, startDecade, endDecade) => {
  const year = dateStr?.split('-')[0];

  if (year) {
    const decade = Math.floor(year / 10) * 10;
    return { year, decade: [decade, decade] };
  }

  let decade = [];
  if (startDecade && endDecade) {
    decade = [startDecade, endDecade];
  } else if (startDecade) {
    decade = [startDecade, 2020];
  } else if (endDecade) {
    decade = [1880, endDecade];
  }

  return { year, decade };
};

/**
 * Given a list of submitted craft types, returns whatever is default or considered other
 */

const _separateOtherCrafts = (formCrafts, other) => {
  let defaultCrafts = [];
  let otherCrafts = [];
  formCrafts.map((craft) => {
    if (CRAFT_TYPES.indexOf(craft) > -1) {
      defaultCrafts.push(craft);
    } else {
      otherCrafts.push(craft);
    }
  });
  if (other) {
    if (otherCrafts.length > 0) {
      return otherCrafts;
    } else {
      return null;
    }
  } else {
    if (defaultCrafts.length > 0) {
      return defaultCrafts;
    } else {
      return null;
    }
  }
};

/**
 * Given an entry, determines if it is written in English (EN) or Arabic (AR)
 */

const _determineLanguage = (string) => {
  let arabic = /^[a-zA-Z\u0600-\u06FF0-9,!? .;:'"/_-]*$/;
  let english = /^[a-zA-Z0-9,!? .;:'"/_-]*$/;

  if (english.test(string)) {
    return 'en';
  } else {
    if (arabic.test(string)) {
      return 'ar';
    }
  }
};

const _determineArabic = (string) => {
  let arabic = /^[a-zA-Z\u0600-\u06FF0-9,!? .;:'"/_-]*$/;
  if (arabic.test(string)) {
    return string;
  } else {
    return null;
  }
};

// /**
//  * Converts an object mapping keys to boolean values to arrays of keys mapped to
//  * true and keys mapped to false.
//  *
//  * @param {object} mapping - The mapping object, maps keys to booleans.
//  * @returns {object} Two arrays of keys, one for the keys that are true, and one
//  *    for the keys that are false.
//  */
// const _arrayifyTrueFalseMapping = (mapping) => {
//   const trueValues = [];
//   const falseValues = [];
//   for (const key in mapping) {
//     if (mapping[key]) {
//       trueValues.push(key);
//     } else {
//       falseValues.push(key);
//     }
//   }
//   return { trueValues, falseValues };
// };

const isProperlyTruthy = (x) => {
  if (x) {
    return !(typeof x == 'object' ? Object.keys(x).length == 0 : !x);
  } else return false;
};

/**
 * Extracts the location from the raw contribution form data.
 *
 * @param {object} form - Raw form data
 * @returns {import("../models/Types").Location} The location object.
 */
const _getLocationFromForm = (data) => {
  let address = null;
  if (data.buildingNumber && data.street) {
    address = `${data.buildingNumber} ${data.street}`;
  } else if (data.buildingNumber) {
    address = `${data.buildingNumber}`;
  } else if (data.street) {
    address = `${data.street}`;
  }
  const location = {
    geo: {
      lng: data.lng ? data.lng : null,
      lat: data.lat ? data.lat : null,
    },
    address: {
      content: address,
      content_ar: null,
      content_orig: address,
      content_orig_lang: 'en', // Assume the content is in English
    },
    location_notes: data.location_notes,
    adm1: null, // TODO: Can be inferred from adm4
    adm2: null, // TODO: Can be inferred from adm4
    adm3: data.quarter,
    adm4: data.sector,
  };

  return location;
};

const _getImageDataFromWorkshopForm = (data, id) => {
  if (data.images && Object.keys(data.images).length < 1) return;

  let imageMeta = null;
  let location = _getLocationFromForm(data);

  /**
   * @type {import("../models/Types").ImageDataOriginal}
   */
  let imageDataOriginal = null;

  let imageIds = [];

  let imageMetas = [];
  let imageDataOriginals = [];

  for (const [key, value] of Object.entries(data.images)) {
    let imageIndex = parseInt(key);
    if (value.imageData) {
      if (data.images[imageIndex].imageData) {
        let imageId = `${id}_${imageIndex}`;

        const imageName = `${imageId}_original.${data.images[imageIndex].imageExtension}`;
        const imageUrl = `http://cddl-beirut.herokuapp.com/api/images/${imageId}.${data.images[imageIndex].imageExtension}`;

        // Create image meta object
        imageMeta = {
          img_id: imageId,
          response_id: id,
          from_survey: WORKSHOP_CONTRIBUTION_NAME,
          is_thumbnail: imageIndex === 1,
          type: data.image_content[key],
          craft_category: data.craft_category,
          craft_type: data.type_of_craft,
          keywords: [...data.type_of_craft, ...data.craft_category],
          is_series: false,
          location: location,
          year_taken: 2022, // TODO #12.b
          decade_taken: [2020, 2020],
          caption: data.caption[key],
          src: imageUrl,
          extension: data.images[key].imageExtension,
        };

        imageDataOriginal = {
          img_id: imageId,
          from_survey: WORKSHOP_CONTRIBUTION_NAME,
          filename: imageName,
          data: data.images[key].imageData,
          extension: data.images[key].imageExtension,
        };

        imageIds.push(imageId);
        imageMetas.push(imageMeta);
        imageDataOriginals.push(imageDataOriginal);
      }
    }
  }

  return { imageIds, imageMetas, imageDataOriginals };
};

/**
 * Converts raw form data from the workshop contribution to the workshop
 * database schema.
 *
 * @param {object} data - Raw form data. See `pages/contribution/workshop.js`
 * @returns {object} Object containing the workshop data and corresponding image
 *    metadata. Note that the image metadata will be null if no image is
 *    provided.
 */
const convertWorkshopContributionToSchema = (data, formSchema) => {
  const aboutPage = formSchema.pages.about;
  const locationPage = formSchema.pages.location;
  // const craftPage = formSchema.pages.about_the_craft;
  const imagePage = formSchema.pages.image_upload;
  const previewPage = formSchema.pages.preview;

  const newWorkshopId = generateId();

  // INFO: Get the image type
  const imageType = data.image_content;

  // INFO: Get the year and decade
  const { year: yearEstablished, decade: decadeEstablished } =
    _getYearAndDecade(data[aboutPage.fields.year_established.field_name]);

  // INFO: Get the location
  const location = _getLocationFromForm(data);

  // INFO: Prepare the image medata and image data objects

  /**
   * @type {import("../models/Types").ImageMeta}
   */
  let { imageIds, imageMetas, imageDataOriginals } =
    _getImageDataFromWorkshopForm(data, newWorkshopId);

  // INFO: get craft types and craft other types
  let craftDiscipline = _separateOtherCrafts(
    data[aboutPage.fields.type_of_craft.field_name],
    false
  );
  let craftDisciplineOther = _separateOtherCrafts(
    data[aboutPage.fields.type_of_craft.field_name],
    true
  );

  /**
   * @type {import("../models/Types").Workshop}
   */
  const workshop = {
    ID: newWorkshopId,
    survey_origin: WORKSHOP_CONTRIBUTION_NAME,
    ID_craftspeople: null,
    shop_name: {
      content: data[aboutPage.fields.shop_name.field_name],
      content_ar: _determineArabic(data[aboutPage.fields.shop_name.field_name]),
      content_orig: data[aboutPage.fields.shop_name.field_name],
      content_orig_lang: _determineLanguage(
        data[aboutPage.fields.shop_name.field_name]
      ),
    },
    shop_owner_name: null, // No owner name included in the form
    contact_info: {
      email: data[aboutPage.fields.email.field_name] || null,
      phone: data[aboutPage.fields.phone.field_name] || null,
      website: data[aboutPage.fields.website.field_name] || null,
      facebook: data[aboutPage.fields.facebook.field_name] || null,
      instagram: data[aboutPage.fields.instagram.field_name] || null,
      twitter: data[aboutPage.fields.twitter.field_name] || null,
      other_social_media:
        data[aboutPage.fields.other_social_media.field_name] || null,
    },
    craft_discipline_category: data[
      aboutPage.fields.craft_category.field_name
    ].map((category) => {
      return category.toLowerCase();
    }),
    craft_discipline: craftDiscipline,
    craft_discipline_other: craftDisciplineOther, // Maybe should pull this from type_of_craft
    location: location,
    shop_status: data[aboutPage.fields.status.field_name],
    year_established: yearEstablished,
    decade_established: decadeEstablished,
    data_collection_comments: null,
    produced_here: true,
    thumb_img_id: imageIds[0], // Currently only accepts a single image.
    images: imageIds,
    consent: data[previewPage.fields.consent.field_name] || false,
    object: 'workshop',
    verified: false,
  };

  return {
    workshop,
    imageMetas,
    imageDataOriginals,
  };
};

const _getImageDataFromArchiveForm = (data, id) => {
  if (data.images && Object.keys(data.images).length < 1) return;

  let imageMetas = [];
  let location = _getLocationFromForm(data);

  let imageDataOriginals = [];
  let imageIds = [];

  for (const [key, value] of Object.entries(data.images)) {
    if (value.imageData) {
      const imageIndex = parseInt(key);

      let imageId = `${id}_${imageIndex}`;

      const imageUrl = `http://cddl-beirut.herokuapp.com/api/images/${imageId}.${data.images[imageIndex].imageExtension}`;
      const imageName = `${imageId}_original.${data.images[imageIndex].imageExtension}`;

      // Create image meta object
      let imageMeta = {
        img_id: imageId,
        response_id: id,
        from_survey: ARCHIVE_CONTRIBUTION_NAME,
        is_thumbnail: imageIndex === 1,
        type: data.image_type[key],
        craft_category: data.craft_category,
        craft_type: data.type_of_craft,
        keywords: [...data.craft_category, ...data.type_of_craft],
        is_series: false,
        location: location,
        year_taken: data.year_taken,
        decade_taken: [data.start_decade, data.end_decade],
        caption: data.caption[key],
        src: imageUrl,
        extension: data.images[key].imageExtension,
      };

      let imageDataOriginal = {
        img_id: imageId,
        from_survey: ARCHIVE_CONTRIBUTION_NAME,
        filename: imageName,
        data: data.images[key].imageData,
        extension: data.images[key].imageExtension,
      };

      imageIds.push(imageId);
      imageDataOriginals.push(imageDataOriginal);
      imageMetas.push(imageMeta);
    }
  }

  return { imageIds, imageMetas, imageDataOriginals };
};

/**
 * Converts raw form data from the archive contribution to the archive
 * database schema.
 *
 * @param {object} data - Raw form data. See `pages/contribution/archive.js`
 * @returns {object} Object containing the archive data and corresponding image
 *    metadata. Note that the image metadata will be null if no image is
 *    provided.
 */
const convertArchiveContributionToSchema = (data, formSchema) => {
  const imagePage = formSchema.pages.image_upload;
  const aboutPage = formSchema.pages.about;
  const locationPage = formSchema.pages.location;
  const previewPage = formSchema.pages.preview;

  console.debug(imagePage);

  const newArchiveId = generateId();

  // INFO: Prepare the image medata and image data objects
  const location = _getLocationFromForm(data);

  // INFO: Format the year/decade data
  const { year, decade } = _getYearAndDecade(
    data[imagePage.fields.year_taken.field_name],
    data[imagePage.fields.start_decade.field_name],
    data[imagePage.fields.end_decade.field_name]
  );
  // INFO: Define image (meta and data) if it exists in data
  const { imageIds, imageMetas, imageDataOriginals } =
    _getImageDataFromArchiveForm(data, newArchiveId);

  // INFO: get craft types and craft other types
  let craftDiscipline = _separateOtherCrafts(
    data[imagePage.fields.type_of_craft.field_name],
    false
  );
  let craftDisciplineOther = _separateOtherCrafts(
    data[imagePage.fields.type_of_craft.field_name],
    true
  );

  /**
   * @type {import("../models/Types").ArchiveObject}
   */
  const archive = {
    ID: newArchiveId,
    info_type: ARCHIVE_CONTRIBUTION_NAME,
    craft_discipline_category: data[
      imagePage.fields.craft_category.field_name
    ].map((category) => {
      return category.toLowerCase();
    }),
    craft_discipline: craftDiscipline,
    craft_discipline_other: craftDisciplineOther,
    primary_location: location,
    shop_name: {
      content: data[aboutPage.fields.workshop_name.field_name],
      content_ar: _determineArabic(
        data[aboutPage.fields.workshop_name.field_name]
      ),
      content_orig: data[aboutPage.fields.workshop_name.field_name],
      content_orig_lang: _determineLanguage(
        data[aboutPage.fields.workshop_name.field_name]
      ),
    },
    owner_name: {
      content: data[aboutPage.fields.owner_name.field_name],
      content_ar: _determineArabic(
        data[aboutPage.fields.owner_name.field_name]
      ),
      content_orig: data[aboutPage.fields.owner_name.field_name],
      content_orig_lang: _determineLanguage(
        data[aboutPage.fields.owner_name.field_name]
      ),
    },
    primary_year: year,
    primary_decade: decade,
    is_duplicate_of: null,
    is_series: false,
    primary_historic_map: null,
    reference: {
      // TODO #12.d
      name: data[aboutPage.fields.reference_name.field_name], // Name of person submitting the photo
      ref_type: data[aboutPage.fields.type_of_reference.field_name],
      type_other: null,
      location: null,
      catalog: null,
      link: null,
      keywords: null,
      citation: data[aboutPage.fields.reference_source_citation.field_name],
      year: null,
      copyright: data[aboutPage.fields.reference_copyright.field_name],
      scan: null,
    },
    thumb_img_id: imageIds[0],
    images: imageIds,
    consent: data[previewPage.fields.consent.field_name] || false,
    object: 'archive',
    verified: false,
  };

  return {
    archive,
    imageMetas,
    imageDataOriginals,
  };
};

/**
 * Gets the distance between two lat/long points.
 *
 * @param {import('../models/Types').LatLng} geo1 - The first lat/long point.
 * @param {import('../models/Types').LatLng} geo2 - The second lat/long point.
 * @returns {number} The distance between the two points in meters
 */
const get_distance_between_points = (geo1, geo2) => {
  try {
    const line = lineString([
      [geo1.lng, geo1.lng],
      [geo2.lng, geo2.lat],
    ]);
    const length = turfLength(line, { units: 'meters' });
    return length;
  } catch (err) {
    console.error(err);
    return Infinity;
  }
};

const TRANSLATIONS = {
  resources: {
    en: {
      translation: {
        Arabic: 'Arabic',
        English: 'English',
        'Living Heritage Atlas | Beirut': 'Living Heritage Atlas | Beirut',
        "Mapping and Activating Beirut's Craftsmanship":
          "Mapping and Activating Beirut's Craftsmanship",
        '': '',
        'the spatial presence of craftsmanship in Beirut':
          'the spatial presence of craftsmanship in Beirut',
        Discover: 'Discover',
        'local workshops and archival images of craftsmanship':
          'local workshops and archival images of craftsmanship',
        Contribute: 'Contribute',
        'images of contemporary and historic craft workshops':
          'images of contemporary and historic craft workshops',
        Download: 'Download',
        'data from the Living Heritage Atlas':
          'data from the Living Heritage Atlas',
        About: 'About',
        'the Living Heritage Atlas': 'the Living Heritage Atlas',
        Back: 'Back',
        Next: 'Next',
        'Search by craft workshop name': 'Search by craft workshop name',
        'Historical Maps': 'Historical Maps',
        'Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database':
          'Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database',
        'Filter By': 'Filter By',
        'Craft Type': 'Craft Type',
        'Time Range': 'Time Range',
        'Show only current craft workshops':
          'Show only current craft workshops',
        'Locate this craft workshop on the map':
          'Locate this craft workshop on the map',
        'Locate this archival image on the map':
          'Locate this archival image on the map',
        'Discover similar craft workshops': 'Discover similar craft workshops',
        'Discover similar archival images': 'Discover similar archival images',
        'Add an Archival Image': 'Add an Archival Image',
        'Contribute to the Living Heritage Atlas! Add a current craft workshop or upload an archival image in Beirut to the database.':
          'Contribute to the Living Heritage Atlas! Add a current craft workshop or upload an archival image in Beirut to the database.',
        'Add a Craft Workshop': 'Add a Craft Workshop',
        'What is this?': 'What is this?',
        'Ongoing Workshop Data Collection': 'Ongoing Workshop Data Collection',
        'What would you like to contribute?':
          'What would you like to contribute?',
        'The research team of the \u201cIntangible Heritage Atlas | Crafts\u201d has conducted multiple data collections initiatives through interviews, desk-research, archival research and surveys. Some data gathering activities are still scheduled to happen during participatory mapping workshops in late June and others will continue throughout summer 2022 through our website \u201cContribute\u201d tab.':
          'The research team of the \u201cIntangible Heritage Atlas | Crafts\u201d has conducted multiple data collections initiatives through interviews, desk-research, archival research and surveys. Some data gathering activities are still scheduled to happen during participatory mapping workshops in late June and others will continue throughout summer 2022 through our website \u201cContribute\u201d tab.',
        'The overall goal of our data collection strategy and methodology is to maximes the inclusiveness of our data gathering methods and sources. More specifically, the data collected by our team includes both oral stories, persona photos from craftspeople workshops but also visual material collected from libraries and private collections. In light of this unique patchwork of data, our team strongly believe that the \u201cIntangible Heritage Atlas | Crafts\u201d has the potential to enrich the narrative on craftsmanship in the city of Beirut and shed light onto those cultural practices that do not usually make it to relevant policy decisions and documents.':
          'The overall goal of our data collection strategy and methodology is to maximes the inclusiveness of our data gathering methods and sources. More specifically, the data collected by our team includes both oral stories, persona photos from craftspeople workshops but also visual material collected from libraries and private collections. In light of this unique patchwork of data, our team strongly believe that the \u201cIntangible Heritage Atlas | Crafts\u201d has the potential to enrich the narrative on craftsmanship in the city of Beirut and shed light onto those cultural practices that do not usually make it to relevant policy decisions and documents.',
        'Discard Record': 'Discard Record',
        'Continue Record': 'Continue Record',
        'Would you like to continue with your existing record or discard it?':
          'Would you like to continue with your existing record or discard it?',
        'You have an unsubmitted workshop contribution':
          'You have an unsubmitted workshop contribution',
        'You have an unsubmitted archive contribution':
          'You have an unsubmitted archive contribution',
        'Name of Shop': 'Name of Shop',
        'About the Craft Workshop': 'About the Craft Workshop',
        'Shop Information': 'Shop Information',
        'Shop Name': 'Shop Name',
        'Date Established': 'Date Established',
        'Shop Status': 'Shop Status',
        'Shop Contact Information': 'Shop Contact Information',
        'Owner Name': 'Owner Name',
        'Phone Number': 'Phone Number',
        'Email Address': 'Email Address',
        Website: 'Website',
        'Social Media': 'Social Media',
        'Location Information': 'Location Information',
        'Address Information': 'Address Information',
        '(English Preferred)': '(English Preferred)',
        'Building Number': 'Building Number',
        'Street Name/Number': 'Street Name/Number',
        Municipality: 'Municipality',
        'Point Location': 'Point Location',
        'Add shop point': 'Add shop point',
        'Drag marker to change location': 'Drag marker to change location',
        'About the Craft': 'About the Craft',
        'Craft Discipline': 'Craft Discipline',
        'What categories does the shop produce':
          'What categories does the shop produce',
        'Your custom tag was invalid. Please enter a tag that contains only letters.':
          'Your custom tag was invalid. Please enter a tag that contains only letters.',
        'Your custom tag is already in the set of default tags.':
          'Your custom tag is already in the set of default tags.',
        'Your custom tag was invalid. Please enter a tag that is less than 50 characters.':
          'Your custom tag was invalid. Please enter a tag that is less than 50 characters.',
        'Spaces are not allowed in custom tag.':
          'Spaces are not allowed in custom tag.',
        'Workshop Image Upload': 'Workshop Image Upload',
        'Upload an image of the Workshop': 'Upload an image of the Workshop',
        'Enter a caption or story associated with the image.':
          'Enter a caption or story associated with the image.',
        'Click to upload image': 'Click to upload image',
        'Upload an archival image related to crafts in Beirut':
          'Upload an archival image related to crafts in Beirut',
        'What is shown in this image?': 'What is shown in this image?',
        Storefront: 'Storefront',
        'Street view': 'Street view',
        Craftsperson: 'Craftsperson',
        'Craft object': 'Craft object',
        'Other outdoor space': 'Other outdoor space',
        'Missing Fields Required': 'Missing Fields Required',
        'You are missing the following fields (marked with *):':
          'You are missing the following fields (marked with *):',
        'Go Back': 'Go Back',
        'Continue Anyways': 'Continue Anyways',
        'Archive Upload': 'Archive Upload',
        'Image Information': 'Image Information',
        'What is the image showing?': 'What is the image showing?',
        'What year was the image taken?': 'What year was the image taken?',
        'Shop Discipline': 'Shop Discipline',
        'Please specify other discipline': 'Please specify other discipline',
        'Shop Address': 'Shop Address',
        'Shop Location': 'Shop Location',
        'Shop Operation Status': 'Shop Operation Status',
        'Contact Information': 'Contact Information',
        Architectural: 'Architectural',
        Cuisine: 'Cuisine',
        Decorative: 'Decorative',
        Fashion: 'Fashion',
        Functional: 'Functional',
        Furniture: 'Furniture',
        Textiles: 'Textiles',
        Brass: 'Brass',
        Ceramics: 'Ceramics',
        Copper: 'Copper',
        Embroidery: 'Embroidery',
        Food: 'Food',
        Glass: 'Glass',
        Jewelry: 'Jewelry',
        Leather: 'Leather',
        Metalwork: 'Metalwork',
        Marquetry: 'Marquetry',
        Sculpture: 'Sculpture',
        Shoemaker: 'Shoemaker',
        Soap: 'Soap',
        Tailor: 'Tailor',
        Tapestry: 'Tapestry',
        Upholstery: 'Upholstery',
        Wickerwork: 'Wickerwork',
        Woodwork: 'Woodwork',
        Other: 'Other',
        Open: 'Open',
        'Temporarily Closed': 'Temporarily Closed',
        'Permanently Closed': 'Permanently Closed',
        Yes: 'Yes',
        No: 'No',
        'Filter Component (Explore and Discover Page)':
          'Filter Component (Explore and Discover Page)',
        'Enter Shop Name': 'Enter Shop Name',
        'Year Range': 'Year Range',
        'Only Show Active Businesses': 'Only Show Active Businesses',
        'Reset Filters': 'Reset Filters',
        'Map Layer Filter': 'Map Layer Filter',
        'Reset Maps': 'Reset Maps',
        'Map Card': 'Map Card',
        Handbags: 'Handbags',
        Wigs: 'Wigs',
        'Circus props': 'Circus props',
        Antiques: 'Antiques',
        'Printing press': 'Printing press',
        'Lamp design and creation': 'Lamp design and creation',
        Carpentry: 'Carpentry',
        'Fabric reseller': 'Fabric reseller',
        'Printing and binding': 'Printing and binding',
        Chocolate: 'Chocolate',
        'Block printing': 'Block printing',
        'Artisanal bread': 'Artisanal bread',
        'Chrome plating': 'Chrome plating',
        'Silkscreen painting': 'Silkscreen painting',
        Aluminum: 'Aluminum',
        'Art gallery and printing press': 'Art gallery and printing press',
        'Plastic recycling and resin': 'Plastic recycling and resin',
        Plexiglass: 'Plexiglass',
        'Stainless, silver, stones, porcelain, paintings, antiques maker and repair':
          'Stainless, silver, stones, porcelain, paintings, antiques maker and repair',
        Watchmaking: 'Watchmaking',
        'Fashion design': 'Fashion design',
        'Vintage furniture': 'Vintage furniture',
        Curtains: 'Curtains',
        Printing: 'Printing',
        Repair: 'Repair',
        'Mourakbati of stones': 'Mourakbati of stones',
        Perfumery: 'Perfumery',
        'Jewelry base piece design': 'Jewelry base piece design',
        'Shoe repair only': 'Shoe repair only',
        'Painting and repair': 'Painting and repair',
        'Stailness steel': 'Stailness steel',
        'Book binding': 'Book binding',
        'Antique watch repair and restoration':
          'Antique watch repair and restoration',
        'Mens suits fashion design': 'Mens suits fashion design',
        'Painting frames': 'Painting frames',
        'Chandelier making and repair': 'Chandelier making and repair',
        Gunsmith: 'Gunsmith',
        'pipe maker': 'pipe maker',
        Upcycling: 'Upcycling',
        Calligraphy: 'Calligraphy',
        'Bronze, marble, granite sculpture':
          'Bronze, marble, granite sculpture',
        'Belts, zippers, buttons, wallets': 'Belts, zippers, buttons, wallets',
        Mechanic: 'Mechanic',
        'Mold maker': 'Mold maker',
        'Womens shoemaker and repair': 'Womens shoemaker and repair',
        'Explore Similar Shops': 'Explore Similar Shops',
        'Image Captions': 'Image Captions',
        Captured: 'Captured',
        Established: 'Established',
        admin3Name: 'admin3Name',
        'Beirut Central District': 'Beirut Central District',
        Medawar: 'Medawar',
        'Minet el-Hosn': 'Minet el-Hosn',
        Marfaa: 'Marfaa',
        'Ain el-Mreisseh': 'Ain el-Mreisseh',
        'Ras Beyrouth': 'Ras Beyrouth',
        'Zoukak el-Blatt': 'Zoukak el-Blatt',
        Saifeh: 'Saifeh',
        Remeil: 'Remeil',
        Moussaytbeh: 'Moussaytbeh',
        Bachoura: 'Bachoura',
        Achrafieh: 'Achrafieh',
        Mazraa: 'Mazraa',
        'Bourj Hammoud': 'Bourj Hammoud',
        Baouchriyeh: 'Baouchriyeh',
        Dekouaneh: 'Dekouaneh',
        'Sinn El-Fil': 'Sinn El-Fil',
        ZoneName: 'ZoneName',
        'Mar Maroun': 'Mar Maroun',
        Kreitem: 'Kreitem',
        Sanayeh: 'Sanayeh',
        Snoubra: 'Snoubra',
        'Mar Nkoula': 'Mar Nkoula',
        'Tallet Druze': 'Tallet Druze',
        Patriarcat: 'Patriarcat',
        Ghabi: 'Ghabi',
        'Furn El Hayek': 'Furn El Hayek',
        Yessouiyeh: 'Yessouiyeh',
        Raoucheh: 'Raoucheh',
        'Mar Mitr': 'Mar Mitr',
        'Basta El-Tahta': 'Basta El-Tahta',
        Moussaitbe: 'Moussaitbe',
        'Dar El-Fatwa': 'Dar El-Fatwa',
        'Ain El Tine': 'Ain El Tine',
        Achrafiye: 'Achrafiye',
        Nasra: 'Nasra',
        'Bourj Abi Haidar': 'Bourj Abi Haidar',
        'Basta Faouka': 'Basta Faouka',
        UNESCO: 'UNESCO',
        'Mar Mikhael': 'Mar Mikhael',
        'Ras Beirut': 'Ras Beirut',
        'Ain Mreisse': 'Ain Mreisse',
        Khodr: 'Khodr',
        Jisr: 'Jisr',
        Hamra: 'Hamra',
        Jounblat: 'Jounblat',
        Manara: 'Manara',
        Kantari: 'Kantari',
        'Bab Idriss': 'Bab Idriss',
        Nejmeh: 'Nejmeh',
        Serail: 'Serail',
        Gemmayzeh: 'Gemmayzeh',
        Geitawi: 'Geitawi',
        'Hop. Orthodoxe': 'Hop. Orthodoxe',
        Qobaiyat: 'Qobaiyat',
        'Al Hikma': 'Al Hikma',
        'El Zarif': 'El Zarif',
        'Ras El Nabaa': 'Ras El Nabaa',
        Sioufi: 'Sioufi',
        'Tallet El-Khayat': 'Tallet El-Khayat',
        'El Aamiliye': 'El Aamiliye',
        'Hotel Dieu': 'Hotel Dieu',
        Wata: 'Wata',
        'Mar Elias': 'Mar Elias',
        Malaab: 'Malaab',
        'El Horsh': 'El Horsh',
        'Tariq El-Jdideh': 'Tariq El-Jdideh',
        'Minet El Hosn': 'Minet El Hosn',
        Majidiye: 'Majidiye',
        'Corniche El-Nahr': 'Corniche El-Nahr',
        'Palais De Justice': 'Palais De Justice',
        "Shati' Al Bahri": "Shati' Al Bahri",
        Dora: 'Dora',
        'Maritime Domain': 'Maritime Domain',
        'Haret Sader ': 'Haret Sader ',
        'Nor Adana': 'Nor Adana',
        Ghilane: 'Ghilane',
        'Nor Sis': 'Nor Sis',
        Nabaa: 'Nabaa',
        'Mar Doumit': 'Mar Doumit',
        'Nor Marash': 'Nor Marash',
        'Explore Similar Images': 'Explore Similar Images',
        Mechanics: 'Mechanics',
        'Only Show Current Craft Workshops':
          'Only Show Current Craft Workshops',
        'Loading Workshops and Archival Images':
          'Loading Workshops and Archival Images',
        'current workshops and archival images of craftsmanship':
          'current workshops and archival images of craftsmanship',
        'to the Living Heritage Atlas with photos of craftsmanship':
          'to the Living Heritage Atlas with photos of craftsmanship',
        'the Living Heritage Atlas | Beirut':
          'the Living Heritage Atlas | Beirut',
        'Contact us at livingheritage@mit.edu with any questions or comments about the Living Heritage Atlas | Beirut.':
          'Contact us at livingheritage@mit.edu with any questions or comments about the Living Heritage Atlas | Beirut.',
        '2022 Living Heritage Atlas 2022. All rights reserved.':
          ' 2022 Living Heritage Atlas 2022. All rights reserved.',
        'Contribute to the Living Heritage Atlas!':
          'Contribute to the Living Heritage Atlas!',
        'Add a current craft workshop or upload an archival image to the database.':
          'Add a current craft workshop or upload an archival image to the database.',
        or: 'or',
        'What category of crafts are produced in this workshop?':
          'What category of crafts are produced in this workshop?',
        'What type of crafts are produced in this workshop? If entering a custom type, English is preferred.':
          'What type of crafts are produced in this workshop? If entering a custom type, English is preferred.',
        'If exact year is unknown, please provide a decade range':
          'If exact year is unknown, please provide a decade range',
        'Image Upload': 'Image Upload',
        'Upload an image': 'Upload an image',
        'Enter a caption or a story associated with this image.':
          'Enter a caption or a story associated with this image.',
        'Archival Image Upload': 'Archival Image Upload',
        'Upload an archival image of a craft workshop':
          'Upload an archival image of a craft workshop',
        'Start Decade': 'Start Decade',
        'End Decade': 'End Decade',
        'Either a year or range of decades must be provided.':
          'Either a year or range of decades must be provided.',
        'Craft Information': 'Craft Information',
        'Please only select one option.': 'Please only select one option.',
        'Please only select up to X options.':
          'Please only select up to X options.',
        'Archival Information': 'Archival Information',
        'General Information': 'General Information',
        'Associated craft workshop name': 'Associated craft workshop name',
        'if applicable': 'if applicable',
        'Associated workshop owner name': 'Associated workshop owner name',
        '(optional - name may be publicly displayed)':
          '(optional - name may be publicly displayed)',
        'Reference Information': 'Reference Information',
        'Owner of personal photo (I have the rights to share this image)':
          'Owner of personal photo (I have the rights to share this image)',
        'Print source (book, newspaper, magazine, article, printed periodical, etc.)':
          'Print source (book, newspaper, magazine, article, printed periodical, etc.)',
        'Electronic source (database, website, blog, social media, etc.)':
          'Electronic source (database, website, blog, social media, etc.)',
        'Name of person submitting the photo':
          'Name of person submitting the photo',
        '(optional - if no name is included, the photo will be submitted anonymously)':
          '(optional - if no name is included, the photo will be submitted anonymously)',
        'Any additional copyright information?':
          'Any additional copyright information?',
        Preview: 'Preview',
        Consent: 'Consent',
        'Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your information and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) with the Living Heritage Atlas. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!':
          'Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your information and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) with the Living Heritage Atlas. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!',
        Longitude: 'Longitude',
        Latitude: 'Latitude',
        Sector: 'Sector',
        Quarter: 'Quarter',
        'Location of Archival Image': 'Location of Archival Image',
        'Reference Copyright': 'Reference Copyright',
        'Reference Name': 'Reference Name',
        'Reference Source Citation': 'Reference Source Citation',
        'Type of Reference': 'Type of Reference',
        'Workshop Name': 'Workshop Name',
        'Year Taken': 'Year Taken',
        'Image Type': 'Image Type',
        Caption: 'Caption',
        'Craft Workshop Image Upload': 'Craft Workshop Image Upload',
        'Time Frame': 'Time Frame',
        Address: 'Address',
        'Drag marker to change the location':
          'Drag marker to change the location',
        'Ain El-Mreisseh': 'Ain El-Mreisseh',
        'Mina El-Hosn': 'Mina El-Hosn',
        Mousaitbeh: 'Mousaitbeh',
        Rmeil: 'Rmeil',
        Saifi: 'Saifi',
        'Zuqaq El-Blat': 'Zuqaq El-Blat',
        'Adlieh (Palais de Justice)': 'Adlieh (Palais de Justice)',
        'Ain El-Tineh': 'Ain El-Tineh',
        Amlieh: 'Amlieh',
        Archafieh: 'Archafieh',
        'Basta El-Faouqa': 'Basta El-Faouqa',
        Batrakieh: 'Batrakieh',
        'Burj Abi Haidar': 'Burj Abi Haidar',
        'Furn El-Hayek': 'Furn El-Hayek',
        Hikmeh: 'Hikmeh',
        Horch: 'Horch',
        Jeitaoui: 'Jeitaoui',
        'Mustashfa El-Roum (H\u00f4pital Orthodoxe)':
          'Mustashfa El-Roum (H\u00f4pital Orthodoxe)',
        'Nouveau Secteur': 'Nouveau Secteur',
        Qoreitem: 'Qoreitem',
        'Ras El-Nabaa': 'Ras El-Nabaa',
        Yesouieh: 'Yesouieh',
        'You are missing some necessary fields!':
          'You are missing some necessary fields!',
        'Please go back and fill in the required fields (*) before being able to see the preview and submit.':
          'Please go back and fill in the required fields (*) before being able to see the preview and submit.',
        'Missing Required Fields': 'Missing Required Fields',
        'Locate where this image was taken on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.':
          'Locate where this image was taken on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.',
        Current: 'Current',
        'Craft Shop (No name provided)': 'Craft Shop (No name provided)',
        'Storefront view of ': 'Storefront view of ',
        'Streetview of ': 'Streetview of ',
        'Interior view of ': 'Interior view of ',
        'Indoor view of ': 'Indoor view of ',
        'Crafts produced by ': 'Crafts produced by ',
        'Craft produced by ': 'Craft produced by ',
        'Craftsperson of ': 'Craftsperson of ',
        'Crafts produced in ': 'Crafts produced in ',
        'Craftsperson inside ': 'Craftsperson inside ',
        'Craftsperson in front of ': 'Craftsperson in front of ',
        'Crafts displayed in storefront of ':
          'Crafts displayed in storefront of ',
        'Electronics sale and repair': 'Electronics sale and repair',
        Clothing: 'Clothing',
        Lighting: 'Lighting',
        'Knitting and sewing supplies': 'Knitting and sewing supplies',
        'Shoe repair': 'Shoe repair',
        'Plastic recycling': 'Plastic recycling',
        'Masbaha islamic prayer beads': 'Masbaha islamic prayer beads',
        Photography: 'Photography',
        'Bookseller, distributor and publisher':
          'Bookseller, distributor and publisher',
        'Textile spinning': 'Textile spinning',
        'Silk, thread, spools': 'Silk, thread, spools',
        Supplies: 'Supplies',
        'Post office': 'Post office',
        'Photography and chemistry': 'Photography and chemistry',
        'Wool mattresses': 'Wool mattresses',
        Tinning: 'Tinning',
        'Shoe cleaning': 'Shoe cleaning',
        Weapons: 'Weapons',
        'Photography, painting': 'Photography, painting',
        Tannery: 'Tannery',
        Calendars: 'Calendars',
        'Silk spinning': 'Silk spinning',
        'Carpets, barber': 'Carpets, barber',
        Florist: 'Florist',
        Hatmaking: 'Hatmaking',
        Cobbler: 'Cobbler',
        Marble: 'Marble',
        Locksmith: 'Locksmith',
        'Copper moulding': 'Copper moulding',
        Pipemaker: 'Pipemaker',
        'Spice market and grocer': 'Spice market and grocer',
        'Cinema, arts and entertainment': 'Cinema, arts and entertainment',
        'Sewing, buttons': 'Sewing, buttons',
        Carpets: 'Carpets',
        Tools: 'Tools',
        'Musical instruments': 'Musical instruments',
        'Clothing, hats, shoes': 'Clothing, hats, shoes',
        'Clothing and fabric': 'Clothing and fabric',
        Socks: 'Socks',
        Commerce: 'Commerce',
        'Cream, plaster, fish oil': 'Cream, plaster, fish oil',
        'Photography and tools': 'Photography and tools',
        Cars: 'Cars',
        'Electronics (repair)': 'Electronics (repair)',
        Watchmaker: 'Watchmaker',
        Millinery: 'Millinery',
        'Shawls, jackets, abbayas, fabric': 'Shawls, jackets, abbayas, fabric',
        "Gogh's trade": "Gogh's trade",
        'Trade Cloth': 'Trade Cloth',
        'Fabric and cloth making': 'Fabric and cloth making',
        'Hand-wooven silk abbayas, cotton and wool nightgowns, handmade scarves, towels and beachwear, ethnic dresses and table linens':
          'Hand-wooven silk abbayas, cotton and wool nightgowns, handmade scarves, towels and beachwear, ethnic dresses and table linens',
        'Storefront sign painter': 'Storefront sign painter',
        "Women's fabric": "Women's fabric",
        Hats: 'Hats',
        'Oriental antiques': 'Oriental antiques',
        Stockings: 'Stockings',
        'Watch repair': 'Watch repair',
        'Piano tuner': 'Piano tuner',
        Zincography: 'Zincography',
        'Building material and services': 'Building material and services',
        'Sewing classes': 'Sewing classes',
        'Ready clothing': 'Ready clothing',
        'Garments retailer': 'Garments retailer',
        'Shoe design and modeling': 'Shoe design and modeling',
        'Handbags and luggage': 'Handbags and luggage',
        "Children's toys": "Children's toys",
        'Architectural crafts': 'Architectural crafts',
        'Fabric and textiles': 'Fabric and textiles',
        'Vintage furniture repair': 'Vintage furniture repair',
        'Tailor repair': 'Tailor repair',
        'Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your craft workshop information, location, and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) about your craft workshop with the Living Heritage Atlas. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!':
          'Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your craft workshop information, location, and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) about your craft workshop with the Living Heritage Atlas. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!',
        'Operation Status': 'Operation Status',
        'Year Established': 'Year Established',
        'Closed (temporary)': 'Closed (temporary)',
        Destroyed: 'Destroyed',
        'Business Contact Information': 'Business Contact Information',
        'This information will be publicly available on the Living Heritage Atlas | Beirut database and website.':
          'This information will be publicly available on the Living Heritage Atlas | Beirut database and website.',
        Email: 'Email',
        'Upload success!': 'Upload success!',
        Click: 'Click',
        here: 'here',
        'to make another contribution, or click':
          'to make another contribution, or click',
        'to return to the main site.': 'to return to the main site.',
        'Upload Failed!': 'Upload Failed!',
        'We could not process your response.':
          'We could not process your response.',
        Submit: 'Submit',
        Select: 'Select',
        Operation: 'Operation',
        'Select up to': 'Select up to',
        options: 'options',
        'Image Tags': 'Image Tags',
        'Upload an image of the craft workshop':
          'Upload an image of the craft workshop',
        'Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.':
          'Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.',
        'About the Workshop': 'About the Workshop',
        'Workshop Location': 'Workshop Location',
        'Craft Workshop Location': 'Craft Workshop Location',
        'Please only select up to': 'Please only select up to',
        'options.': 'options.',
        'You have already selected this tag from the default tags.':
          'You have already selected this tag from the default tags.',
        'Please select it from the default tags.':
          'Please select it from the default tags.',
        'Your custom tag was invalid.': 'Your custom tag was invalid.',
        'Please enter a tag that is less than 50 characters.':
          'Please enter a tag that is less than 50 characters.',
        'Enter Other': 'Enter Other',
        'Dar El-Mreisseh': 'Dar El-Mreisseh',
        Qantari: 'Qantari',
        Jamia: 'Jamia',
        Parc: 'Parc',
        'Consent to Publish Data': 'Consent to Publish Data',
        'Business contact information required':
          'Business contact information required',
        'Craft Category': 'Craft Category',
        'Type of Craft': 'Type of Craft',
        'Please enter a tag that contains only letters.':
          'Please enter a tag that contains only letters.',
        'Closed (permanent)': 'Closed (permanent)',
        'Your response has been recorded.': 'Your response has been recorded.',
        'Submitting...': 'Submitting...',
        'to return to your form.': 'to return to your form.',
        Map: 'Map',
        workshop: 'workshop',
        Since: 'Since',
        "Mapping and activating Beirut's crafts":
          "Mapping and activating Beirut's crafts",
        "Living Heritage Atlas\u2002|\u2002Beirut is a design-based research project that contributes to the urban planning discussion on Beirut's heritage by rendering visible the often unrecognized living heritage of craftsmanship \u2014 with its crafts, public spaces, and local knowledge.\r":
          "Living Heritage Atlas\u2002|\u2002Beirut is a design-based research project that contributes to the urban planning discussion on Beirut's heritage by rendering visible the often unrecognized living heritage of craftsmanship \u2014 with its crafts, public spaces, and local knowledge.\r",
        'This project has been developed by the Massachusetts Institute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL), and it is supported by Dar Group.':
          'This project has been developed by the Massachusetts Institute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL), and it is supported by Dar Group.',
        'Living Heritage Atlas\u2002|\u2002Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economy at different urban scales.':
          'Living Heritage Atlas\u2002|\u2002Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economy at different urban scales.',
        'This project seemingly bridges the digital to the physical by advancing three key interventions:\r':
          'This project seemingly bridges the digital to the physical by advancing three key interventions:\r',
        'It constructs a digital archive of geolocated historic data and images using visual and textual materials from local archives, residents, and craftspeople. Data is open-access and available to download at:':
          'It constructs a digital archive of geolocated historic data and images using visual and textual materials from local archives, residents, and craftspeople. Data is open-access and available to download at: ',
        'It implements a series of small neighborhood-wide interventions by disseminating site-specific street stickers and physical signages that connect physical spaces in contemporary Beirut to the historic images available on the Living Heritage Atlas | Beirut digital archive':
          'It implements a series of small neighborhood-wide interventions by disseminating site-specific street stickers and physical signages that connect physical spaces in contemporary Beirut to the historic images available on the Living Heritage Atlas | Beirut digital archive',
        'It connects stakeholders working on the topic of craftsmanship through community meetings, participatory mapping workshops, and share-your-story events on the spaces and history of craftsmanship in Beirut':
          'It connects stakeholders working on the topic of craftsmanship through community meetings, participatory mapping workshops, and share-your-story events on the spaces and history of craftsmanship in Beirut',
        'Living Heritage Atlas\u2002|  Mapping Beirut\u2019s Craftsmanship Event (July 7th) ':
          'Living Heritage Atlas\u2002|  Mapping Beirut\u2019s Craftsmanship Event (July 7th) ',
        'The Living Heritage Atlas Event is a three hour round table and  mapping event that will take place on Thursday July 7 from 6:00 PM-9:15 PM at the Abroyan Factory in Bourj Hammoud. . ':
          'The Living Heritage Atlas Event is a three hour round table and  mapping event that will take place on Thursday July 7 from 6:00 PM-9:15 PM at the Abroyan Factory in Bourj Hammoud. . ',
        'Featured Event:': 'Featured Event:',
        'Two-hour roundtable discussion and mapping event':
          'Two-hour roundtable discussion and mapping event',
        'Date&#58;': 'Date:',
        'Thursday, July 7, 2022': 'Thursday, July 7, 2022',
        'Time&#58;': 'Time:',
        '6:00&ndash;9:15pm': '6:00&ndash;9:15pm',
        'Location&#58;': 'Location:',
        'Abroyan Factory': 'Abroyan Factory (Bourj Hammoud, Beirut)',
        'Register:': 'Register:',
        'RSVP your attendance in advance via the ':
          'RSVP your attendance in advance via the ',
        'Ihjoz event webpage': 'Ihjoz event webpage',
        'Discussion during this event will primary be conducted in English; if you prefer to converse in Arabic, there will be a person at each table ready to help translate to and from Arabic and English as needed.':
          'Discussion during this event will primary be conducted in English; if you prefer to converse in Arabic, there will be a person at each table ready to help translate to and from Arabic and English as needed.',
        'Pre-Opening': 'Pre-Opening',
        The: 'The',
        'MIT Future Heritage Lab': 'MIT Future Heritage Lab',
        '(FHL) ': '(FHL) ',
        and: 'and',
        'MIT Civic Data Design Lab': 'MIT Civic Data Design Lab',
        '(CDDL)': '(CDDL)',
        'will present the': 'will present the',
        'digital archive of geolocated historic data and images using visual and textual materials from local archives, residents and craftspeople.':
          'digital archive of geolocated historic data and images using visual and textual materials from local archives, residents and craftspeople.',
        'Bring a living heritage item!': 'Bring a living heritage item!',
        'Invitees and guests are asked to bring with them a living heritage item to contribute to the living heritage atlas. We define this element as a photograph, plan, map, guidebook, newspaper clipping, or artefact related to the past, present of crafts and craftsmanship in the city. All items will be scanned by our data collectors and returned by the end of the event.':
          'Invitees and guests are asked to bring with them a living heritage item to contribute to the living heritage atlas. We define this element as a photograph, plan, map, guidebook, newspaper clipping, or artefact related to the past, present of crafts and craftsmanship in the city. All items will be scanned by our data collectors and returned by the end of the event.',
        'Opening Remarks': 'Opening Remarks',
        'Each participant will be given a tag based on his/her contribution to the event. Categories will include: experts, contributors, advocates, moderators, craftsmen, data collectors.':
          'Each participant will be given a tag based on his/her contribution to the event. Categories will include: experts, contributors, advocates, moderators, craftsmen, data collectors.',
        'Opening Presentation by MIT FHL & CDDL':
          'Opening Presentation by MIT FHL & CDDL',
        'Mapping Methods Discussion': 'Mapping Methods Discussion',
        '630pm': '6:30pm',
        '745pm': '7:45pm',
        Reset: 'Reset',
        'View Images': 'View Images',
        'Mapping Methods is an animated panel-discussion/workshop format that invites stakeholders to map their research and cooperation methods. The goal of the Mapping Methods sessions is to connect local stakeholders and investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy-decisions.':
          'Mapping Methods is an animated panel-discussion/workshop format that invites stakeholders to map their research and cooperation methods. The goal of the Mapping Methods sessions is to connect local stakeholders and investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy-decisions.',
        'Three back-to back round table discussions will take place consecutively with 25 minutes dedicated to each one. Each table will include 3-4 experts, 1 moderator, and 1-2 craftspeople':
          'Three back-to back round table discussions will take place consecutively with 25 minutes dedicated to each one. Each table will include 3-4 experts, 1 moderator, and 1-2 craftspeople',
        'Round Table Discussion 01 (25 min) Documenting Craftsmanship ':
          'Round Table Discussion 01 (25 min): Documenting Craftsmanship ',
        "Round Table Discussion 02 (25 min) Legitimizing Craftsmen's Presence":
          "Round Table Discussion 02 (25 min): Legitimizing Craftsmen's Presence",
        'Exploring the potential of archiving and documentation as a means to stimulate a vibrant crafts culture.':
          'Exploring the potential of archiving and documentation as a means to stimulate a vibrant crafts culture.',
        "Advocating for the regulatory laws, crafts people's legal rights, and articulating the economic value of the crafts sector.":
          "Advocating for the regulatory laws, crafts people's legal rights, and articulating the economic value of the crafts sector.",
        'Round Table Discussion 03 (25 min) Mobilizing Crafts in Shared Spaces':
          'Round Table Discussion 03 (25 min): Mobilizing Crafts in Shared Spaces',
        'Leveraging the intersection of data, art, and shared space as a catalyst for craftsmanship in the city.':
          'Leveraging the intersection of data, art, and shared space as a catalyst for craftsmanship in the city.',
        Break: 'Break',
        '700pm': '7:00pm',
        700: '7:00pm',
        745: '7:45',
        '745pm': '7:45pm',
        'Living Heritage Atlas |  Mapping Beirut’s Craftsmanship Event':
          'Living Heritage Atlas |  Mapping Beirut’s Craftsmanship Event',
        630: '6:30',
        800: '8:00',
        '800pm': '8:00pm',
        'Data Collectors are asked to scan collected items/findings.':
          'Data Collectors are asked to scan collected items/findings.',
        'Mapathon Discussion': 'Mapathon Discussion',
        '900pm': '9:00pm',
        'Mapathons are workshops designed specifically to map new data on the existing database of craftsmanship in Beirut. The goal of the mapathon is to invite the public, as well as local photographers, craftsmen, elders, and others to grow the database of historical and current images and locations of craftsmen in Beirut. Every new finding and correction to the map will be projected and displayed in real-time.':
          'Mapathons are workshops designed specifically to map new data on the existing database of craftsmanship in Beirut. The goal of the mapathon is to invite the public, as well as local photographers, craftsmen, elders, and others to grow the database of historical and current images and locations of craftsmen in Beirut. Every new finding and correction to the map will be projected and displayed in real-time.',
        'Experts and participants are asked to brainstorm effective ways to use the open database within their scope of work.':
          'Experts and participants are asked to brainstorm effective ways to use the open database within their scope of work.',
        'Guests and participants are invited to contribute to the database with their \u201cliving heritage item.\u201d':
          'Guests and participants are invited to contribute to the database with their \u201cliving heritage item.\u201d',
        'Closing Remarks': 'Closing Remarks',
        '915pm': '9:15pm',
        'MIT FHL & CDDL will conclude the event with closing remarks.':
          'MIT FHL & CDDL will conclude the event with closing remarks.',
        Credits: 'Credits',
        'This project has been developed by the Massachusetts Institute of Technology (MIT); more specifically by the Civic Data Design Lab and the Future Heritage Lab. The \u201cLiving Heritage Atlas | Beirut\u201d is supported by \u201cDar Group\u201d through a 2021 seed grant that has enabled MIT faculty members to conduct research on the challenges experienced in Beirut in the aftermath of the August 2020 port explosion.':
          'This project has been developed by the Massachusetts Institute of Technology (MIT); more specifically by the Civic Data Design Lab and the Future Heritage Lab. The \u201cLiving Heritage Atlas | Beirut\u201d is supported by \u201cDar Group\u201d through a 2021 seed grant that has enabled MIT faculty members to conduct research on the challenges experienced in Beirut in the aftermath of the August 2020 port explosion.',
        'Future Heritage Lab': 'Future Heritage Lab',
        'The MIT Future Heritage Lab invents creative responses to conflict and crisis. We develop and implement projects and alternative educational formats at the intersection of art, culture, and preservation technology to address the emotional, cultural, and practical needs of communities in threat. We believe that culture is an essential human need, and a powerful tool to address conflicts and injustice. We build on our experience in Art, Design, and Cultural Preservation and leverage the MIT expertise in new technologies to collaborate with a global and diverse network of partners and ensure the quality and a wide reach of our work. We build future heritage by creating cultural projects on a civic scale that translate traditional crafts into new technologies, advance  knowledge transfer across borders, and have a positive impact on threatened communities.':
          'The MIT Future Heritage Lab invents creative responses to conflict and crisis. We develop and implement projects and alternative educational formats at the intersection of art, culture, and preservation technology to address the emotional, cultural, and practical needs of communities in threat. We believe that culture is an essential human need, and a powerful tool to address conflicts and injustice. We build on our experience in Art, Design, and Cultural Preservation and leverage the MIT expertise in new technologies to collaborate with a global and diverse network of partners and ensure the quality and a wide reach of our work. We build future heritage by creating cultural projects on a civic scale that translate traditional crafts into new technologies, advance  knowledge transfer across borders, and have a positive impact on threatened communities.',
        'Civic Data Design Lab': 'Civic Data Design Lab',
        'The MIT Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by using spatial analytics to expose patterns and communicating those results, through design, to new audiences.':
          'The MIT Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by using spatial analytics to expose patterns and communicating those results, through design, to new audiences.',
        'Future Heritage Lab Team': 'Future Heritage Lab Team',
        'Civic Data Design Lab Team': 'Civic Data Design Lab Team',
        'Azra Aksamija, Director': 'Azra Aksamija, Director',
        'Daniella Maamari (MIT SMArchS \u201820), Lead Researcher & Project Manager':
          'Daniella Maamari (MIT SMArchS \u201820), Lead Researcher & Project Manager',
        'Sarine Agopian, Archival Research Assistant':
          'Sarine Agopian, Archival Research Assistant',
        'Ahmad Beydoun, Design/Events Assistant':
          'Ahmad Beydoun, Design/Events Assistant',
        'Ramzi Alieh, Design/Fabrication Assistant':
          'Ramzi Alieh, Design/Fabrication Assistant',
        'Racha Doughman, Events Manager': 'Racha Doughman, Events Manager',
        'Reem Obeid, Fieldwork/ Research Assistant':
          'Reem Obeid, Fieldwork/ Research Assistant',
        'Rasha Zayour, Fieldwork/ Research Assistant':
          'Rasha Zayour, Fieldwork/ Research Assistant',
        'Reem Farhat, Fieldwork Assistant': 'Reem Farhat, Fieldwork Assistant',
        'Kamila El Khechen, Fieldwork Assistant':
          'Kamila El Khechen, Fieldwork Assistant',
        'Raafat Majzoub, Research Contributor':
          'Raafat Majzoub, Research Contributor',
        'Sarah Williams, Director': 'Sarah Williams, Director',
        'Carmelo Ignaccolo (Ph.D. Candidate at MIT DUSP), Lead Researcher & Project Manager':
          'Carmelo Ignaccolo (Ph.D. Candidate at MIT DUSP), Lead Researcher & Project Manager',
        'Ashley Louie, Project Manager': 'Ashley Louie, Project Manager',
        'Enrique Casillas, Research Assistant Web Developer':
          'Enrique Casillas, Research Assistant Web Developer',
        'Huiwen Shi, Research Assistant Web Developer':
          'Huiwen Shi, Research Assistant Web Developer',
        'Sophia Zheng, GIS Research Assistant':
          'Sophia Zheng, GIS Research Assistant',
        'Doris Duanmu, Graphic Design Assistant':
          'Doris Duanmu, Graphic Design Assistant',
        'Gatlen Culp, Research Assistant Web Developer ':
          'Gatlen Culp, Research Assistant Web Developer ',
        'Kelly Fang, Research Assistant Web Developer ':
          'Kelly Fang, Research Assistant Web Developer ',
        'Wesley Woo, Research Assistant Web Developer ':
          'Wesley Woo, Research Assistant Web Developer ',
        'Rasha Zayour, Research Assistant Translation':
          'Rasha Zayour, Research Assistant Translation',
        'Program Schedule': 'Program Schedule',
        'Register to attend Living Heritage Atlas | ;Beirut events via the ':
          'Register to attend Living Heritage Atlas | Beirut events via the ',
        Date: 'Date',
        'Tuesday, July 5': 'Tuesday, July 5',
        'Wednesday, July 6': 'Wednesday, July 6',
        'Thursday, July 7': 'Thursday, July 7',
        'Friday, July 8': 'Friday, July 8',
        'Crafts Workshops Tour': 'Crafts Workshops Tour',
        'Gemmayze - Mar Mikhael (Doniguian Armenian bookstore)':
          'Gemmayze - Mar Mikhael (Doniguian Armenian bookstore)',
        'Intimate walking tour of 3-4 craft workshops in the Gemmayze and Mar Mikhael area':
          'Intimate walking tour of 3-4 craft workshops in the Gemmayze and Mar Mikhael area',
        '2:00': '2:00',
        '400pm': '4:00pm',
        'Archival Workshops Tour': 'Archival Workshops Tour',
        'Al Balad (Samir Kassir Square)': 'Al Balad (Samir Kassir Square)',
        'Walking tour of the locations of the old craft workshops and souks in Al Balad':
          'Walking tour of the locations of the old craft workshops and souks in Al Balad',
        600: '6:00',
        'No events': 'No events',
        'Living Heritage Atlas | Event (Abroyan Factory, Bourj Hammoud)':
          'Living Heritage Atlas | Event (Abroyan Factory, Bourj Hammoud)',
        'Living Heritage Atlas Event': 'Living Heritage Atlas Event',
        '(Abroyan Factory, Bourj Hammoud)': '(Abroyan Factory, Bourj Hammoud)',
        '1. Opening remarks by MIT CDDL & FHL (6:00 - 6:30 PM)':
          '1. Opening remarks by MIT CDDL & FHL (6:00 - 6:30 PM)',
        '2. Mapping methods, 3 roundtable discussions (6:30 - 7:45 PM)':
          '2. Mapping methods, 3 roundtable discussions (6:30 - 7:45 PM)',
        '3. Mapathon (8:00 - 9:00 PM)': '3. Mapathon (8:00 - 9:00 PM)',
        '4. Closing remarks (9:00 - 9:15 PM)':
          '4. Closing remarks (9:00 - 9:15 PM)',
        'Intimate walking tour of 3-4 craft workshops in the Bourj Hammoud area':
          'Intimate walking tour of 3-4 craft workshops in the Bourj Hammoud area',
        'Bourj Hammoud (Municipality Square)':
          'Bourj Hammoud (Municipality Square)',
        'Walking tour of the locations of the old craft workshops and souks in Bourj Hammoud':
          'Walking tour of the locations of the old craft workshops and souks in Bourj Hammoud',
      },
    },
    ar: {
      translation: {
        Arabic: '\u0627\u0644\u0639\u0631\u0628\u064a',
        English: '\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629',
        'Living Heritage Atlas | Beirut':
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0628\u064a\u0631\u0648\u062a',
        "Mapping and Activating Beirut's Craftsmanship":
          '\u062a\u062e\u0637\u064a\u0637 \u0648 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a',
        '': '',
        'the spatial presence of craftsmanship in Beirut':
          '\u0627\u0644\u062d\u0636\u0648\u0631 \u0627\u0644\u0645\u0643\u0627\u0646\u064a \u0644\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a',
        Discover: '\u0627\u0628\u062d\u062b',
        'local workshops and archival images of craftsmanship':
          '\u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0644\u062d\u0631\u0641\u064a\u0629',
        Contribute: '\u0633\u0627\u0647\u0645',
        'images of contemporary and historic craft workshops':
          '\u0635\u0648\u0631 \u0645\u0646 \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629 \u0648\u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629',
        Download: '\u062a\u0646\u0632\u064a\u0644 ',
        DOWNLOAD: 'تنزيل',
        'data from the Living Heritage Atlas':
          '\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0646 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a',
        About:
          '\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639',
        'the Living Heritage Atlas':
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a',
        Back: '\u0627\u0644\u0633\u0627\u0628\u0642',
        Next: '\u0627\u0644\u062a\u0627\u0644\u064a ',
        'Search by craft workshop name':
          '\u0627\u0644\u0628\u062d\u062b \u0639\u0646 \u0637\u0631\u064a\u0642 \u0627\u0633\u0645 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629',
        'Historical Maps':
          '\u0627\u0644\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629',
        'Discover local workshops and archival images of craftsmanship in the Living Heritage Atlas | Beirut database':
          '\u0627\u0643\u062a\u0634\u0641 \u0648\u0631\u0634 \u0639\u0645\u0644 \u0645\u062d\u0644\u064a\u0629 \u0648 \u0635\u0648\u0631 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0628\u064a\u0631\u0648\u062a',
        'Filter By':
          '\u0627\u0644\u062a\u0635\u0646\u064a\u0641 \u062d\u0633\u0628',
        'Craft Type': '\u0646\u0648\u0639 \u0627\u0644\u062d\u0631\u0641\u0629',
        'Time Range':
          '\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0632\u0645\u0646\u064a',
        'Show only current craft workshops':
          '\u0627\u0639\u0631\u0636 \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0641\u0642\u0637',
        'Locate this craft workshop on the map':
          '\u062d\u062f\u062f \u0645\u0648\u0642\u0639 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0647\u0630\u0647 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629',
        'Locate this archival image on the map':
          '\u062d\u062f\u062f \u0645\u0648\u0642\u0639 \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629',
        'Discover similar craft workshops':
          '\u0627\u0643\u062a\u0634\u0641 \u0648\u0631\u0634 \u062d\u0631\u0641\u064a\u0629 \u0645\u0645\u0627\u062b\u0644\u0629',
        'Discover similar archival images':
          '\u0627\u0643\u062a\u0634\u0641 \u0635\u0648\u0631 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0645\u0645\u0627\u062b\u0644\u0629',
        'Add an Archival Image':
          '\u0623\u0636\u0641 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629',
        'Contribute to the Living Heritage Atlas! Add a current craft workshop or upload an archival image in Beirut to the database.':
          '\u0633\u0627\u0647\u0645 \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a! \u0623\u0636\u0641 \u0648\u0631\u0634\u0629 \u062d\u0631\u0641\u064a\u0629 \u062d\u0627\u0644\u064a\u0629 \u0623\u0648 \u0642\u0645  \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a.',
        'Add a Craft Workshop':
          '\u0623\u0636\u0641 \u0648\u0631\u0634\u0629 \u062d\u0631\u0641\u064a\u0629',
        'What is this?': '\u0645\u0627 \u0647\u0630\u0627\u061f ',
        'Ongoing Workshop Data Collection':
          '\u062c\u0645\u0639 \u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062c\u0627\u0631\u064a\u0629 ',
        'What would you like to contribute?':
          '\u0628\u0645\u0627 \u062a\u0648\u062f \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629\u061f',
        'The research team of the \u201cIntangible Heritage Atlas | Crafts\u201d has conducted multiple data collections initiatives through interviews, desk-research, archival research and surveys. Some data gathering activities are still scheduled to happen during participatory mapping workshops in late June and others will continue throughout summer 2022 through our website \u201cContribute\u201d tab.':
          '\u0641\u0631\u064a\u0642 \u0627\u0644\u0628\u062d\u062b \u0641\u064a "\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u063a\u064a\u0631 \u0627\u0644\u0645\u0627\u062f\u064a | \u0627\u0644\u062d\u0631\u0641" \u0642\u0627\u0645 \u0628\u0645\u0628\u0627\u062f\u0631\u0627\u062a \u0645\u062a\u0639\u062f\u062f\u0629 \u0644\u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u0645\u0642\u0627\u0628\u0644\u0627\u062a \u0648\u0627\u0644\u0628\u062d\u0648\u062b \u0627\u0644\u0645\u0643\u062a\u0628\u064a\u0629 \u0648\u0627\u0644\u0628\u062d\u0648\u062b \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0648\u0627\u0644\u0645\u0633\u0648\u062d\u0627\u062a. \u0644\u0627 \u064a\u0632\u0627\u0644 \u0645\u0646 \u0627\u0644\u0645\u0642\u0631\u0631 \u0625\u062c\u0631\u0627\u0621 \u0628\u0639\u0636 \u0623\u0646\u0634\u0637\u0629 \u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u062e\u0644\u0627\u0644 \u0648\u0631\u0634 \u0639\u0645\u0644 \u0631\u0633\u0645 \u0627\u0644\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u062a\u0634\u0627\u0631\u0643\u064a\u0629 \u0641\u064a \u0623\u0648\u0627\u062e\u0631 \u062d\u0632\u064a\u0631\u0627\u0646\u060c \u0648\u0633\u062a\u0633\u062a\u0645\u0631 \u0623\u0646\u0634\u0637\u0629 \u0623\u062e\u0631\u0649 \u0637\u0648\u0627\u0644 \u0635\u064a\u0641 2022 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u062a\u0628\u0648\u064a\u0628 "\u0645\u0633\u0627\u0647\u0645\u0629" \u0639\u0644\u0649 \u0645\u0648\u0642\u0639 \u0627\u0644\u0648\u064a\u0628 \u0627\u0644\u062e\u0627\u0635 \u0628\u0646\u0627.',
        'The overall goal of our data collection strategy and methodology is to maximes the inclusiveness of our data gathering methods and sources. More specifically, the data collected by our team includes both oral stories, persona photos from craftspeople workshops but also visual material collected from libraries and private collections. In light of this unique patchwork of data, our team strongly believe that the \u201cIntangible Heritage Atlas | Crafts\u201d has the potential to enrich the narrative on craftsmanship in the city of Beirut and shed light onto those cultural practices that do not usually make it to relevant policy decisions and documents.':
          '\u064a\u062a\u0645\u062b\u0644 \u0627\u0644\u0647\u062f\u0641 \u0627\u0644\u0639\u0627\u0645 \u0644\u0627\u0633\u062a\u0631\u0627\u062a\u064a\u062c\u064a\u062a\u0646\u0627 \u0648\u0645\u0646\u0647\u062c\u064a\u062a\u0646\u0627 \u0644\u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u064a \u062a\u062d\u0642\u064a\u0642 \u0623\u0642\u0635\u0649 \u0642\u062f\u0631 \u0645\u0646 \u0627\u0644\u0634\u0645\u0648\u0644\u064a\u0629 \u0641\u064a \u0623\u0633\u0627\u0644\u064a\u0628\u0646\u0627 \u0648\u0645\u0635\u0627\u062f\u0631 \u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a. \u0648\u0648\u0628\u0634\u0643\u0644 \u0623\u0643\u062b\u0631 \u062a\u062d\u062f\u064a\u062f\u064b\u0627\u060c \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062c\u0645\u0639\u0647\u0627 \u0641\u0631\u064a\u0642\u0646\u0627 \u062a\u0634\u0645\u0644 \u0642\u0635\u0635\u0627 \u0634\u0641\u0648\u064a\u0629 \u0648\u0635\u0648\u0631\u0627 \u0634\u062e\u0635\u064a\u0629 \u0645\u0646 \u0648\u0631\u0634 \u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646 \u0648\u0643\u0630\u0644\u0643 \u0645\u0648\u0627\u062f \u0628\u0635\u0631\u064a\u0629 \u062a\u0645 \u062c\u0645\u0639\u0647\u0627 \u0645\u0646 \u0627\u0644\u0645\u0643\u062a\u0628\u0627\u062a \u0648\u0645\u0646 \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629. \u0648\u0641\u064a \u0636\u0648\u0621 \u0647\u0630\u0627 \u0627\u0644\u062e\u0644\u064a\u0637 \u0627\u0644\u0641\u0631\u064a\u062f \u0645\u0646 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a\u060c \u064a\u0639\u062a\u0642\u062f \u0641\u0631\u064a\u0642\u0646\u0627 \u0627\u0639\u062a\u0642\u0627\u062f\u0627 \u0631\u0627\u0633\u062e\u0627 \u0623\u0646 "\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u063a\u064a\u0631 \u0627\u0644\u0645\u0627\u062f\u064a | \u0627\u0644\u062d\u0631\u0641" \u064a\u0645\u0643\u0646 \u0623\u0646 \u064a\u062b\u0631\u064a \u0627\u0644\u0631\u0648\u0627\u064a\u0629 \u0639\u0646 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0645\u062f\u064a\u0646\u0629 \u0628\u064a\u0631\u0648\u062a \u0648\u064a\u0644\u0642\u064a \u0627\u0644\u0636\u0648\u0621 \u0639\u0644\u0649 \u062a\u0644\u0643 \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0627\u062a \u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629 \u0627\u0644\u062a\u064a \u0644\u0627 \u062a\u062a\u0641\u0642 \u0639\u0627\u062f\u0629 \u0645\u0639 \u0627\u0644\u0642\u0631\u0627\u0631\u0627\u062a \u0648\u0627\u0644\u0648\u062b\u0627\u0626\u0642 \u0627\u0644\u0633\u064a\u0627\u0633\u064a\u0629 \u0630\u0627\u062a \u0627\u0644\u0635\u0644\u0629.',
        'Discard Record': '\u062d\u0630\u0641 \u0627\u0644\u0633\u062c\u0644',
        'Continue Record':
          '\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0633\u062c\u0644',
        'Would you like to continue with your existing record or discard it?':
          '\u0647\u0644 \u062a\u0631\u063a\u0628 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0641\u064a \u0633\u062c\u0644\u0643 \u0627\u0644\u062d\u0627\u0644\u064a \u0623\u0648 \u062d\u0630\u0641\u0647\u061f',
        'You have an unsubmitted workshop contribution':
          '\u0644\u062f\u064a\u0643 \u0645\u0633\u0627\u0647\u0645\u0629 \u0648\u0631\u0634\u0629 \u0639\u0645\u0644 \u0644\u0645 \u064a\u062a\u0645 \u0627\u0631\u0633\u0627\u0644\u0647\u0627 ',
        'You have an unsubmitted archive contribution':
          '\u0644\u062f\u064a\u0643 \u0645\u0633\u0627\u0647\u0645\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0645 \u064a\u062a\u0645 \u0627\u0631\u0633\u0627\u0644\u0647\u0627 ',
        'Name of Shop': '\u0627\u0633\u0645 \u0627\u0644\u0645\u062d\u0644',
        'About the Craft Workshop':
          '\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u0648\u0631\u0634\u0629 \u0627\u0644\u062d\u0631\u0641\u064a\u0629',
        'Shop Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0645\u062d\u0644',
        'Shop Name': '\u0627\u0633\u0645 \u0627\u0644\u0645\u062d\u0644',
        'Date Established':
          '\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062a\u0623\u0633\u064a\u0633',
        'Shop Status':
          '\u062d\u0627\u0644\u0629 \u0627\u0644\u0645\u062d\u0644',
        'Shop Contact Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u062d\u0644',
        'Owner Name': '\u0627\u0633\u0645 \u0627\u0644\u0645\u0627\u0644\u0643',
        'Phone Number':
          '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641',
        'Email Address':
          '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        Website:
          '\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        'Social Media':
          '\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a',
        'Location Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0645\u0648\u0642\u0639',
        'Address Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        '(English Preferred)':
          '(\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u0645\u0641\u0636\u0644\u0629)',
        'Building Number':
          '\u0631\u0642\u0645 \u0627\u0644\u0645\u0628\u0646\u0649',
        'Street Name/Number':
          '\u0627\u0633\u0645 / \u0631\u0642\u0645 \u0627\u0644\u0634\u0627\u0631\u0639 ',
        Municipality: '\u0627\u0644\u0628\u0644\u062f\u064a\u0629',
        'Point Location':
          '\u0623\u0634\u0631 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639',
        'Add shop point':
          '\u0623\u0636\u0641 \u0646\u0642\u0637\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u0644',
        'Drag marker to change location':
          '\u0627\u0633\u062d\u0628 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0644\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0645\u0648\u0642\u0639',
        'About the Craft':
          '\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u062d\u0631\u0641\u0629',
        'Craft Discipline':
          '\u062a\u062e\u0635\u0635 \u0627\u0644\u062d\u0631\u0641\u0629 ',
        'What categories does the shop produce':
          '\u0645\u0627 \u0647\u064a \u0627\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u062a\u064a \u064a\u0646\u062a\u062c\u0647\u0627 \u0627\u0644\u0645\u062d\u0644',
        'Your custom tag was invalid. Please enter a tag that contains only letters.':
          '\u0648\u0633\u0645\u0643 \u0627\u0644\u0645\u062e\u0635\u0635 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d. \u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0648\u0633\u0645 \u064a\u062d\u062a\u0648\u064a \u0639\u0644\u0649 \u0623\u062d\u0631\u0641 \u0641\u0642\u0637.',
        'Your custom tag is already in the set of default tags.': '',
        'Your custom tag was invalid. Please enter a tag that is less than 50 characters.':
          '\u0648\u0633\u0645\u0643 \u0627\u0644\u0645\u062e\u0635\u0635 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d. \u0627\u0644\u0631\u062c\u0627\u0621 \u0625\u062f\u062e\u0627\u0644 \u0648\u0633\u0645 \u0623\u0642\u0644 \u0645\u0646 50 \u062d\u0631\u0641\u064b\u0627.',
        'Spaces are not allowed in custom tag.':
          '\u0627\u0644\u0645\u0633\u0627\u0641\u0627\u062a \u0628\u064a\u0646 \u0627\u0644\u0643\u0644\u0645\u0627\u062a \u063a\u064a\u0631 \u0645\u0633\u0645\u0648\u062d \u0641\u064a \u0627\u0644\u0648\u0633\u0648\u0645 \u0627\u0644\u0645\u062e\u0635\u0635\u0629',
        'Workshop Image Upload':
          '\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644',
        'Upload an image of the Workshop':
          '\u0642\u0645 \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0644\u0644\u0648\u0631\u0634\u0629',
        'Enter a caption or story associated with the image.':
          '\u0623\u062f\u062e\u0644 \u062a\u0639\u0644\u064a\u0642\u064b\u0627 \u0623\u0648 \u0642\u0635\u0629 \u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u0635\u0648\u0631\u0629.',
        'Click to upload image':
          '\u0625\u0636\u063a\u0637 \u0644\u062a\u062d\u0645\u064a\u0644 \u0627\u0644\u0635\u0648\u0631\u0629',
        'Upload an archival image related to crafts in Beirut':
          '\u0642\u0645 \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0645\u062a\u0639\u0644\u0642\u0629 \u0628\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a',
        'What is shown in this image?':
          '\u0645\u0627\u0630\u0627 \u064a\u0638\u0647\u0631 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629\u061f',
        Storefront:
          '\u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u0645\u062d\u0644',
        'Street view':
          '\u0645\u0646\u0638\u0631 \u0627\u0644\u0634\u0627\u0631\u0639',
        Craftsperson: '\u062d\u0631\u0641\u064a',
        'Craft object':
          '\u0645\u0646\u062a\u0648\u062c \u062d\u0631\u0641\u064a',
        'Other outdoor space':
          '\u0645\u0643\u0627\u0646 \u062e\u0627\u0631\u062c\u064a \u0622\u062e\u0631',
        'Missing Fields Required':
          '\u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0641\u0642\u0648\u062f\u0629 \u0645\u0637\u0644\u0648\u0628\u0629',
        'You are missing the following fields (marked with *):':
          '\u0644\u0645 \u062a\u0642\u0645 \u0628\u0625\u062f\u062e\u0627\u0644 \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u062a\u0627\u0644\u064a\u0629 (\u0627\u0644\u0645\u0645\u064a\u0632\u0629 \u0628\u0639\u0644\u0627\u0645\u0629 *):',
        'Go Back': '\u0639\u064f\u062f \u0644\u0644\u0648\u0631\u0627\u0621',
        'Continue Anyways':
          '\u0627\u0644\u0645\u0648\u0627\u0635\u0644\u0629 \u0639\u0644\u0649 \u0623\u064a \u062d\u0627\u0644',
        'Archive Upload':
          '\u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0644\u0644\u0627\u0631\u0634\u064a\u0641',
        'Image Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u0635\u0648\u0631\u0629',
        'What is the image showing?':
          '\u0645\u0627\u0630\u0627 \u062a\u0638\u0647\u0631 \u0627\u0644\u0635\u0648\u0631\u0629\u061f',
        'What year was the image taken?':
          '\u0641\u064a \u0623\u064a \u0633\u0646\u0629 \u0627\u0644\u062a\u0642\u0637\u062a \u0627\u0644\u0635\u0648\u0631\u0629\u061f',
        'Shop Discipline':
          '\u062a\u062e\u0635\u0635 \u0627\u0644\u0645\u062d\u0644',
        'Please specify other discipline':
          '\u064a\u0631\u062c\u0649 \u062a\u062d\u062f\u064a\u062f \u062a\u062e\u0635\u0635 \u0622\u062e\u0631',
        'Shop Address':
          '\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0645\u062d\u0644',
        'Shop Location':
          '\u0645\u0648\u0642\u0639 \u0627\u0644\u0645\u062d\u0644',
        'Shop Operation Status':
          '\u062d\u0627\u0644\u0629 \u062a\u0634\u063a\u064a\u0644 \u0627\u0644\u0645\u062d\u0644',
        'Contact Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644',
        Architectural: '\u0645\u0639\u0645\u0627\u0631\u064a',
        Cuisine: '\u0637\u0628\u064a\u062e',
        Decorative: '\u0632\u062e\u0631\u0641\u064a',
        Fashion: '\u0645\u0648\u0636\u0629',
        Functional: '\u0639\u0645\u0644\u064a',
        Furniture: '\u0623\u062b\u0627\u062b',
        Textiles: '\u0645\u0646\u0633\u0648\u062c\u0627\u062a',
        Brass: '\u0646\u062d\u0627\u0633 \u0627\u0635\u0641\u0631',
        Ceramics: '\u062e\u0632\u0641',
        Copper: '\u0646\u062d\u0627\u0633',
        Embroidery: '\u062a\u0637\u0631\u064a\u0632',
        Food: '\u0637\u0639\u0627\u0645',
        Glass: '\u0632\u062c\u0627\u062c',
        Jewelry: '\u0627\u0644\u0645\u062c\u0648\u0647\u0631\u0627\u062a',
        Leather: '\u062c\u0644\u062f',
        Metalwork:
          '\u0623\u0639\u0645\u0627\u0644 \u0645\u0639\u062f\u0646\u064a\u0629',
        Marquetry: '\u0645\u0627\u0631\u0643\u062a\u0631\u064a',
        Sculpture: '\u0627\u0644\u0646\u062d\u062a',
        Shoemaker: '\u0627\u0644\u0627\u062d\u0630\u064a\u0647',
        Soap: '\u0635\u0627\u0628\u0648\u0646',
        Tailor: '\u062e\u064a\u0627\u0637',
        Tapestry: '\u0646\u0633\u064a\u062c',
        Upholstery: '\u0627\u0644\u0645\u0641\u0631\u0648\u0634\u0627\u062a',
        Wickerwork: '\u0627\u0644\u062e\u064a\u0632\u0631\u0627\u0646',
        Woodwork:
          '\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062e\u0634\u0628\u064a\u0629',
        Other: '\u0622\u062e\u0631',
        Open: '\u0641\u062a\u062d',
        'Temporarily Closed':
          '\u0645\u063a\u0644\u0642 \u0645\u0624\u0642\u062a\u0627',
        'Permanently Closed':
          '\u0645\u063a\u0644\u0642 \u0628\u0634\u0643\u0644 \u062f\u0627\u0626\u0645',
        Yes: '\u0646\u0639\u0645',
        No: '\u0643\u0644\u0627 ',
        'Filter Component (Explore and Discover Page)': '',
        'Enter Shop Name':
          '\u0623\u062f\u062e\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u062d\u0644',
        'Year Range':
          '\u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0646\u0648\u064a',
        'Only Show Active Businesses':
          '\u0639\u0631\u0636 \u0627\u0644\u062a\u062c\u0627\u0631\u0627\u062a \u0627\u0644\u0646\u0634\u0637\u0629 \u0641\u0642\u0637',
        'Reset Filters':
          '\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u062a\u0635\u0646\u064a\u0641\u0627\u062a ',
        'Map Layer Filter':
          '\u062a\u0635\u0646\u064a\u0641 \u0627\u0644\u062e\u0631\u064a\u0637\u0629',
        'Reset Maps':
          '\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u062e\u0631\u0627\u0626\u0637',
        'Map Card':
          '\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062e\u0631\u064a\u0637\u0629',
        Handbags: '\u062d\u0642\u0627\u0626\u0628 \u0627\u0644\u064a\u062f',
        Wigs: '\u0634\u0639\u0631 \u0645\u0633\u062a\u0639\u0627\u0631',
        'Circus props':
          '\u062f\u0639\u0627\u0626\u0645 \u0627\u0644\u0633\u064a\u0631\u0643',
        Antiques: '\u0627\u0644\u062a\u062d\u0641',
        'Printing press':
          '\u0637\u0628\u0627\u0639\u0629 \u0627\u0644\u0635\u062d\u064a\u0641\u0647',
        'Lamp design and creation':
          '\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u0635\u0628\u0627\u062d \u0648\u062e\u0644\u0642\u0647',
        Carpentry: '\u0646\u062c\u0627\u0631\u0629',
        'Fabric reseller':
          '\u0628\u0627\u0626\u0639 \u0623\u0642\u0645\u0634\u0629',
        'Printing and binding':
          '\u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0648\u0627\u0644\u062a\u062c\u0644\u064a\u062f',
        Chocolate: '\u0634\u0648\u0643\u0648\u0644\u0627',
        'Block printing':
          '\u0637\u0628\u0627\u0639\u0629 \u0628\u0627\u0644\u062e\u0634\u0628',
        'Artisanal bread':
          '\u0627\u0644\u062e\u0628\u0632 \u0627\u0644\u062d\u0631\u0641\u064a',
        'Chrome plating':
          '\u062a\u0635\u0641\u064a\u062d \u0627\u0644\u0643\u0631\u0648\u0645',
        'Silkscreen painting':
          '\u0627\u0644\u0637\u0628\u0627\u0639\u0629 \u0628\u0627\u0644\u0634\u0627\u0634\u0629 \u0627\u0644\u062d\u0631\u064a\u0631\u064a\u0629',
        Aluminum:
          '\u0627\u0644\u0623\u0644\u0648\u0645\u0646\u064a\u0648\u0645',
        'Art gallery and printing press':
          '\u0645\u0639\u0631\u0636 \u0627\u0644\u0641\u0646\u0648\u0646 \u0648\u0627\u0644\u0645\u0637\u0628\u0639\u0629',
        'Plastic recycling and resin':
          '\u0625\u0639\u0627\u062f\u0629 \u062a\u062f\u0648\u064a\u0631 \u0627\u0644\u0628\u0644\u0627\u0633\u062a\u064a\u0643 \u0648\u0627\u0644\u0631\u0627\u062a\u0646\u062c',
        Plexiglass: '\u0632\u062c\u0627\u062c \u0639\u0636\u0648\u064a',
        'Stainless, silver, stones, porcelain, paintings, antiques maker and repair':
          '\u0627\u0644\u0627\u0633\u062a\u0627\u0646\u0644\u0633 \u0648\u0627\u0644\u0641\u0636\u0629 \u0648\u0627\u0644\u0623\u062d\u062c\u0627\u0631 \u0648\u0627\u0644\u0628\u0648\u0631\u0633\u0644\u064a\u0646 \u0648\u0627\u0644\u0644\u0648\u062d\u0627\u062a \u0648\u0635\u0627\u0646\u0639 \u0627\u0644\u062a\u062d\u0641 \u0648\u062a\u0635\u0644\u064a\u062d\u0647\u0627',
        Watchmaking:
          '\u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0633\u0627\u0639\u0627\u062a',
        'Fashion design':
          '\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0623\u0632\u064a\u0627\u0621',
        'Vintage furniture':
          '\u0623\u062b\u0627\u062b \u0639\u062a\u064a\u0642',
        Curtains: '\u0633\u062a\u0627\u0626\u0631',
        Printing: '\u0637\u0628\u0627\u0639\u0629',
        Repair: '\u062a\u0635\u0644\u064a\u062d ',
        'Mourakbati of stones': '',
        Perfumery: '\u0627\u0644\u0639\u0637\u0648\u0631',
        'Jewelry base piece design':
          '\u062a\u0635\u0645\u064a\u0645 \u0642\u0637\u0639\u0629 \u0645\u062c\u0648\u0647\u0631\u0627\u062a \u0623\u0633\u0627\u0633\u064a\u0629',
        'Shoe repair only':
          '\u062a\u0635\u0644\u064a\u062d \u0627\u0644\u0623\u062d\u0630\u064a\u0629 \u0641\u0642\u0637',
        'Painting and repair':
          '\u0627\u0644\u0637\u0644\u0627\u0621 \u0648\u0627\u0644\u0625\u0635\u0644\u0627\u062d',
        'Stailness steel':
          '\u0633\u062a\u0627\u0646\u0644\u0633 \u0633\u062a\u064a\u0644',
        'Book binding':
          '\u062a\u062c\u0644\u064a\u062f \u0627\u0644\u0643\u062a\u0628',
        'Antique watch repair and restoration':
          '\u0625\u0635\u0644\u0627\u062d \u0648\u062a\u0631\u0645\u064a\u0645 \u0627\u0644\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u062a\u064a\u0642\u0629',
        'Mens suits fashion design':
          '\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0623\u0632\u064a\u0627\u0621 \u0644\u0644\u0631\u062c\u0627\u0644',
        'Painting frames':
          '\u0637\u0644\u0627\u0621 \u0627\u0644\u0625\u0637\u0627\u0631\u0627\u062a',
        'Chandelier making and repair':
          '\u0635\u0646\u0639 \u0627\u0644\u062b\u0631\u064a\u0627 \u0648\u0625\u0635\u0644\u0627\u062d\u0647\u0627',
        Gunsmith:
          '\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u0633\u0644\u062d\u0629',
        'pipe maker':
          '\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u0646\u0627\u0628\u064a\u0628',
        Upcycling:
          '\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u062f\u0648\u064a\u0631',
        Calligraphy: '\u0641\u0646 \u0627\u0644\u062e\u0637',
        'Bronze, marble, granite sculpture':
          '\u0646\u062d\u062a \u0645\u0646 \u0627\u0644\u0628\u0631\u0648\u0646\u0632 \u0648\u0627\u0644\u0631\u062e\u0627\u0645 \u0648\u0627\u0644\u062c\u0631\u0627\u0646\u064a\u062a',
        'Belts, zippers, buttons, wallets':
          '\u0623\u062d\u0632\u0645\u0629 \u060c \u0633\u062d\u0627\u0628\u0627\u062a \u060c \u0623\u0632\u0631\u0627\u0631 \u060c \u0645\u062d\u0627\u0641\u0638',
        Mechanic: '\u0645\u064a\u0643\u0627\u0646\u064a\u0643\u064a',
        'Mold maker':
          '\u0635\u0627\u0646\u0639 \u0627\u0644\u0642\u0648\u0627\u0644\u0628',
        'Womens shoemaker and repair':
          '\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u062d\u0630\u064a\u0629 \u0627\u0644\u0646\u0633\u0627\u0626\u064a\u0629 \u0648 \u0645\u0635\u0644\u062d\u0647\u0627',
        'Explore Similar Shops':
          '\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u062d\u0644\u0627\u062a \u0627\u0644\u0645\u0634\u0627\u0628\u0647\u0629',
        'Image Captions':
          '\u062a\u0639\u0644\u064a\u0642\u0627\u062a \u0644\u0644\u0635\u0648\u0631\u0629',
        Captured: '\u0627\u0644\u062a\u0642\u0637\u062a',
        Established: '\u0623\u0646\u0634\u0626\u062a',
        admin3Name: 'admin3Na_1',
        'Beirut Central District':
          '\u0648\u0633\u0637 \u0628\u064a\u0631\u0648\u062a',
        Medawar: '\u0645\u062f\u0648\u0631',
        'Minet el-Hosn':
          '\u0645\u064a\u0646\u0627 \u0627\u0644\u062d\u0635\u0646',
        Marfaa: '\u0645\u0631\u0641\u0623',
        'Ain el-Mreisseh':
          '\u0639\u064a\u0646 \u0627\u0644\u0645\u0631\u064a\u0633\u0647',
        'Ras Beyrouth': '\u0631\u0627\u0633 \u0628\u064a\u0631\u0648\u062a',
        'Zoukak el-Blatt':
          '\u0632\u0642\u0627\u0642 \u0627\u0644\u0628\u0644\u0627\u0637',
        Saifeh: '\u0635\u064a\u0641\u064a',
        Remeil: '\u0631\u0645\u064a\u0644',
        Moussaytbeh: '\u0645\u0635\u064a\u0637\u0628\u0629',
        Bachoura: '\u0628\u0627\u0634\u0648\u0631\u0629',
        Achrafieh: '\u0627\u0644\u0627\u0634\u0631\u0641\u064a\u0629',
        Mazraa: '\u0645\u0632\u0631\u0639\u0629',
        'Bourj Hammoud': '\u0628\u0631\u062c \u062d\u0645\u0651\u0648\u062f',
        Baouchriyeh: '\u0628\u0648\u0634\u0631\u064a\u0629',
        Dekouaneh: '\u062f\u0643\u0648\u0627\u0646\u0629',
        'Sinn El-Fil': '\u0633\u0646 \u0627\u0644\u0641\u064a\u0644',
        ZoneName: '',
        'Mar Maroun': '\u0645\u0627\u0631 \u0645\u0627\u0631\u0648\u0646',
        Kreitem: '\u0642\u0631\u064a\u0637\u0645',
        Sanayeh: '\u0635\u0646\u0627\u064a\u0639',
        Snoubra: '\u0635\u0646\u0648\u0628\u0631\u0629',
        'Mar Nkoula': '\u0645\u0627\u0631 \u0646\u064a\u0642\u0648\u0644\u0627',
        'Tallet Druze':
          '\u062a\u0644\u0629 \u0627\u0644\u062f\u0631\u0648\u0632',
        Patriarcat: '\u0627\u0644\u0628\u0637\u0631\u0643\u064a\u0629',
        Ghabi: '\u0627\u0644\u063a\u0627\u0628\u064a',
        'Furn El Hayek':
          '\u0641\u0631\u0646 \u0627\u0644\u062d\u0627\u064a\u0643',
        Yessouiyeh: '\u064a\u0627\u0633\u0648\u0639\u064a\u0629',
        Raoucheh: '\u0631\u0648\u0634\u0647',
        'Mar Mitr': '\u0645\u0627\u0631 \u0645\u062a\u0631',
        'Basta El-Tahta':
          '\u0628\u0633\u0637\u0629 \u0627\u0644\u062a\u062d\u062a\u0627',
        Moussaitbe: '\u0645\u0635\u064a\u0637\u0628\u0647',
        'Dar El-Fatwa':
          '\u062f\u0627\u0631 \u0627\u0644\u0641\u062a\u0648\u0649',
        'Ain El Tine':
          '\u0639\u064a\u0646 \u0627\u0644\u062a\u064a\u0646\u0647',
        Achrafiye: '\u0627\u0634\u0631\u0641\u064a\u0629',
        Nasra: '\u0627\u0644\u0646\u0651\u0627\u0635\u0652\u0631\u064e\u0629',
        'Bourj Abi Haidar':
          '\u0628\u0631\u062c \u0627\u0628\u064a \u062d\u064a\u062f\u0631',
        'Basta Faouka':
          '\u0628\u0633\u0637\u0629 \u0627\u0644\u0641\u0648\u0642\u0627',
        UNESCO: '\u064a\u0648\u0646\u0633\u0643\u0648',
        'Mar Mikhael':
          '\u0645\u0627\u0631 \u0645\u064a\u062e\u0627\u064a\u0644',
        'Ras Beirut': '\u0631\u0627\u0633 \u0628\u064a\u0631\u0648\u062a',
        'Ain Mreisse':
          '\u0639\u064a\u0646 \u0627\u0644\u0645\u0631\u064a\u0633\u064a',
        Khodr: '\u062e\u0636\u0631',
        Jisr: '\u0627\u0644\u062c\u0633\u0631',
        Hamra: '\u062d\u0645\u0631\u0627',
        Jounblat: '\u062c\u0646\u0628\u0644\u0627\u0637',
        Manara: '\u0645\u0646\u0627\u0631\u0629',
        Kantari: '\u0642\u0646\u0637\u0627\u0631\u064a',
        'Bab Idriss': '\u0628\u0627\u0628 \u0625\u062f\u0631\u064a\u0633',
        Nejmeh: '\u0646\u062c\u0645\u0647',
        Serail: '\u0627\u0644\u0633\u0631\u0627\u064a',
        Gemmayzeh: '\u062c\u0645\u064a\u0632\u0647',
        Geitawi: '\u062c\u0639\u064a\u062a\u0627\u0648\u064a',
        'Hop. Orthodoxe':
          '\u0645\u0650\u0633\u0652\u062a\u064e\u0634\u0652\u0641\u0649 \u0627\u0644\u0631\u0651\u0648\u0645',
        Qobaiyat: '\u0627\u0644\u0642\u0628\u064a\u0627\u062a',
        'Al Hikma': '\u0627\u0644\u062d\u0643\u0645\u0647',
        'El Zarif': '\u0627\u0644\u0638\u0631\u064a\u0641',
        'Ras El Nabaa': '\u0631\u0627\u0633 \u0627\u0644\u0646\u0628\u0639',
        Sioufi: '\u0633\u064a\u0648\u0641\u064a',
        'Tallet El-Khayat':
          '\u062a\u0644\u0629 \u0627\u0644\u062e\u064a\u0627\u0637',
        'El Aamiliye': '\u0627\u0644\u0639\u0627\u0645\u0644\u064a\u0647',
        'Hotel Dieu': '\u0627\u0648\u062a\u0644 \u062f\u064a\u0648',
        Wata: '\u0648\u0637\u0649',
        'Mar Elias': '\u0645\u0627\u0631 \u0625\u0644\u064a\u0627\u0633',
        Malaab: '\u0627\u0644\u0645\u0644\u0639\u0628',
        'El Horsh': '\u0627\u0644\u062d\u0631\u0634',
        'Tariq El-Jdideh':
          '\u0637\u0631\u064a\u0642 \u0627\u0644\u062c\u062f\u064a\u062f\u0629',
        'Minet El Hosn':
          '\u0645\u064a\u0646\u0629 \u0627\u0644\u062d\u0635\u0646',
        Majidiye: '\u0645\u062c\u064a\u062f\u064a\u0629',
        'Corniche El-Nahr':
          '\u0643\u0648\u0631\u0646\u064a\u0634 \u0627\u0644\u0646\u0647\u0631',
        'Palais De Justice':
          '\u0642\u0635\u0631 \u0627\u0644\u0639\u062f\u0644',
        "Shati' Al Bahri":
          '\u0634\u0627\u0637\u0626 \u0627\u0644\u0628\u062d\u0631\u064a',
        Dora: '\u0627\u0644\u062f\u0648\u0631\u0629',
        'Maritime Domain': '',
        'Haret Sader ': '\u062d\u0627\u0631\u0629 \u0635\u062f\u0631',
        'Nor Adana': '\u0646\u0648\u0631 \u0627\u0636\u0646\u0629',
        Ghilane: '\u0627\u0644\u063a\u064a\u0644\u0627\u0646',
        'Nor Sis': '\u0646\u0648\u0631 \u0633\u064a\u0633',
        Nabaa: '\u0627\u0644\u0646\u0628\u0639\u0629',
        'Mar Doumit': '\u0645\u0627\u0631 \u0636\u0648\u0645\u0637',
        'Nor Marash': '\u0646\u0648\u0631 \u0645\u0631\u0627\u0634',
        'Explore Similar Images':
          '\u0627\u0633\u062a\u0643\u0634\u0641 \u0635\u0648\u0631 \u0645\u0634\u0627\u0628\u0647\u0629',
        Mechanics: '\u0627\u0644\u0645\u064a\u0643\u0627\u0646\u064a\u0643',
        'Only Show Current Craft Workshops':
          '\u0627\u0639\u0631\u0636 \u0641\u0642\u0637 \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629',
        'current workshops and archival images of craftsmanship':
          '\u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0648\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0644\u062d\u0631\u0641\u064a\u0629',
        'to the Living Heritage Atlas with photos of craftsmanship':
          '\u0625\u0644\u0649 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0645\u0639 \u0635\u0648\u0631 \u0639\u0646 \u0627\u0644\u062d\u0631\u0641\u064a\u0629',
        'the Living Heritage Atlas | Beirut':
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0628\u064a\u0631\u0648\u062a',
        'Contact us at livingheritage@mit.edu with any questions or comments about the Living Heritage Atlas | Beirut.':
          '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0639\u0628\u0631 \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a livingheritage@mit.edu \u0644\u0637\u0631\u062d \u0623\u064a \u0623\u0633\u0626\u0644\u0629 \u0623\u0648 \u062a\u0639\u0644\u064a\u0642\u0627\u062a \u062d\u0648\u0644 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0628\u064a\u0631\u0648\u062a.',
        '2022 Living Heritage Atlas 2022. All rights reserved.':
          '\u0662\u0660\u0662\u0662 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0662\u0660\u0662\u0662. \u0643\u0627\u0641\u0629 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.',
        'Contribute to the Living Heritage Atlas!':
          '\u0633\u0627\u0647\u0645 \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a!',
        'Add a current craft workshop or upload an archival image to the database.':
          '\u0623\u0636\u0641 \u0648\u0631\u0634\u0629 \u062d\u0631\u0641\u064a\u0629 \u062d\u0627\u0644\u064a\u0629 \u0623\u0648 \u0642\u0645  \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a.',
        'What category of crafts are produced in this workshop?':
          '\u0625\u0644\u0649 \u0623\u064a \u0641\u0626\u0629 \u062a\u0646\u062a\u0645\u064a \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u0645\u0646\u062a\u062c\u0629 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0648\u0631\u0634\u0629\u061f',
        'What type of crafts are produced in this workshop? If entering a custom type, English is preferred.':
          '\u0645\u0627 \u0646\u0648\u0639 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u062a\u064a \u064a\u062a\u0645 \u0625\u0646\u062a\u0627\u062c\u0647\u0627 \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0648\u0631\u0634\u0629\u061f \u0641\u064a \u062d\u0627\u0644\u0629 \u0625\u062f\u062e\u0627\u0644 \u0646\u0648\u0639 \u0645\u062e\u0635\u0635 \u060c \u064a\u0641\u0636\u0644 \u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629.',
        'If exact year is unknown, please provide a decade range':
          '\u0625\u0630\u0627 \u0643\u0627\u0646\u062a \u0627\u0644\u0633\u0646\u0629 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641\u0629 \u0628\u0627\u0644\u0636\u0628\u0637 \u060c \u064a\u0631\u062c\u0649 \u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u0646\u0637\u0627\u0642 \u0627\u0644\u0633\u0646\u0648\u064a',
        'Image Upload':
          '\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 ',
        'Upload an image':
          '\u0642\u0645 \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629',
        'Enter a caption or a story associated with this image.':
          '\u0623\u062f\u062e\u0644 \u062a\u0639\u0644\u064a\u0642\u064b\u0627 \u0623\u0648 \u0642\u0635\u0629 \u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u0635\u0648\u0631\u0629.',
        'Archival Image Upload':
          '\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629',
        'Upload an archival image of a craft workshop':
          '\u0642\u0645 \u0628\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0623\u0631\u0634\u064a\u0641\u064a\u0629 \u0644\u0648\u0631\u0634\u0629 \u062d\u0631\u0641',
        'Start Decade':
          '\u0628\u062f\u0627\u064a\u0629 \u0627\u0644\u0639\u0642\u062f',
        'End Decade':
          '\u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u0639\u0642\u062f',
        'Either a year or range of decades must be provided.':
          '\u064a\u062c\u0628 \u062a\u0648\u0641\u064a\u0631 \u0633\u0646\u0629 \u0623\u0648 \u0646\u0637\u0627\u0642 \u0644\u0644\u0639\u0642\u0648\u062f.',
        'Craft Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0646 \u0627\u0644\u062d\u0631\u0641\u0629',
        'Please only select one option.':
          '\u0627\u0644\u0631\u062c\u0627\u0621 \u062a\u062d\u062f\u064a\u062f \u062e\u064a\u0627\u0631 \u0648\u0627\u062d\u062f \u0641\u0642\u0637.',
        'Please only select up to X options.':
          '\u0627\u0644\u0631\u062c\u0627\u0621 \u062a\u062d\u062f\u064a\u062f \u0645\u0627 \u064a\u0635\u0644 \u0625\u0644\u0649 X \u0645\u0646 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0641\u0642\u0637.',
        'Archival Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0623\u0631\u0634\u064a\u0641\u064a\u0629',
        'General Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0639\u0627\u0645\u0629',
        'Associated craft workshop name':
          '\u0627\u0633\u0645 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629',
        'if applicable':
          '\u0625\u0630\u0627 \u0643\u0627\u0646 \u0642\u0627\u0628\u0644\u0627 \u0644\u0644\u062a\u0637\u0628\u064a\u0642',
        'Associated workshop owner name':
          '\u0627\u0633\u0645 \u0635\u0627\u062d\u0628 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u0631\u062a\u0628\u0637',
        '(optional - name may be publicly displayed)':
          '(\u0627\u062e\u062a\u064a\u0627\u0631\u064a - \u0642\u062f \u064a\u062a\u0645 \u0639\u0631\u0636 \u0627\u0644\u0627\u0633\u0645 \u0639\u0644\u0646\u064b\u0627)',
        'Reference Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0645\u0631\u062c\u0639\u064a\u0629',
        'Owner of personal photo (I have the rights to share this image)':
          '\u0635\u0627\u062d\u0628 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0634\u062e\u0635\u064a\u0629 (\u0644\u062f\u064a \u062d\u0642\u0648\u0642 \u0645\u0634\u0627\u0631\u0643\u0629 \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629)',
        'Print source (book, newspaper, magazine, article, printed periodical, etc.)':
          '\u0645\u0635\u062f\u0631 \u0645\u0637\u0628\u0648\u0639 (\u0643\u062a\u0627\u0628 \u060c \u062c\u0631\u064a\u062f\u0629 \u060c \u0645\u062c\u0644\u0629 \u060c \u0645\u0642\u0627\u0644 \u060c \u062f\u0648\u0631\u064a\u0629 \u0645\u0637\u0628\u0648\u0639\u0629 \u060c \u0625\u0644\u062e.)',
        'Electronic source (database, website, blog, social media, etc.)':
          '\u0645\u0635\u062f\u0631 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a (\u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u060c \u0645\u0648\u0642\u0639 \u0648\u064a\u0628 \u060c \u0645\u062f\u0648\u0646\u0629 \u060c \u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a \u060c \u0625\u0644\u062e.)',
        'Name of person submitting the photo':
          '\u0627\u0633\u0645 \u0627\u0644\u0634\u062e\u0635 \u0627\u0644\u0645\u0642\u062f\u0645 \u0644\u0644\u0635\u0648\u0631\u0629',
        '(optional - if no name is included, the photo will be submitted anonymously)':
          '(\u0627\u062e\u062a\u064a\u0627\u0631\u064a - \u0625\u0630\u0627 \u0644\u0645 \u064a\u062a\u0645 \u0625\u062f\u062e\u0627\u0644 \u0623\u064a \u0627\u0633\u0645 \u060c \u0641\u0633\u064a\u062a\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0635\u0648\u0631\u0629 \u0628\u0634\u0643\u0644 \u0645\u062c\u0647\u0648\u0644)',
        'Any additional copyright information?':
          '\u0647\u0644 \u0647\u0646\u0627\u0643 \u0623\u064a \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629 \u0639\u0646 \u062d\u0642\u0648\u0642 \u0627\u0644\u0646\u0634\u0631\u061f',
        Preview: '\u0639\u0631\u0636 \u0645\u0633\u0628\u0642',
        Consent: '\u0645\u0648\u0627\u0641\u0642\u0629',
        'Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your information and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) with the Living Heritage Atlas. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!':
          '\u0633\u062a\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0645 \u062c\u0645\u0639\u0647\u0627 \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0648\u0633\u062a\u0643\u0648\u0646 \u0645\u062a\u0627\u062d\u0629 \u0644\u0644\u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u0639\u0627\u0645 \u0648\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0627 \u0641\u064a \u0627\u0644\u0623\u0628\u062d\u0627\u062b \u0648 \u0627\u0644\u062a\u062d\u0627\u0644\u064a\u0644 \u0627\u0644\u0645\u062c\u0647\u0648\u0644\u0629. \u0633\u064a\u062a\u0645 \u0639\u0631\u0636 \u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643 \u0648\u0635\u0648\u0631\u0643 \u0627\u0644\u0645\u0642\u062f\u0645\u0629 \u0639\u0644\u0649 \u0645\u0648\u0642\u0639 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a\u060c \u0643\u0645\u0627 \u0647\u0648 \u0645\u0648\u0636\u062d \u0641\u064a \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u0628\u0642 \u0623\u062f\u0646\u0627\u0647. \u064a\u0634\u064a\u0631 \u062a\u062d\u062f\u064a\u062f \u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u0628\u0639 \u0625\u0644\u0649 \u0645\u0648\u0627\u0641\u0642\u062a\u0643 \u0639\u0644\u0649 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0648\u0627\u0644\u0635\u0648\u0631 \u0645\u0639 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a. \u0634\u0643\u0631\u064b\u0627 \u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0630\u064a \u0642\u0636\u064a\u062a\u0647 \u0641\u064a \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629 \u0628\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u060c \u0646\u062d\u0646 \u0646\u0642\u062f\u0631 \u0645\u0633\u0627\u0647\u0645\u062a\u0643!',
        Longitude: '\u062e\u0637 \u0627\u0644\u0637\u0648\u0644',
        Latitude: '\u062e\u0637 \u0627\u0644\u0639\u0631\u0636',
        Sector: '\u0642\u0637\u0627\u0639',
        Quarter: '\u062d\u064a',
        'Location of Archival Image':
          '\u0645\u0648\u0642\u0639 \u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629',
        'Reference Copyright':
          '\u0645\u0631\u062c\u0639 \u062d\u0642\u0648\u0642 \u0627\u0644\u0646\u0634\u0631',
        'Reference Name':
          '\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u062c\u0639',
        'Reference Source Citation':
          '\u0645\u0631\u062c\u0639 \u0645\u0635\u062f\u0631 \u0627\u0644\u0627\u0642\u062a\u0628\u0627\u0633',
        'Type of Reference':
          '\u0646\u0648\u0639 \u0627\u0644\u0645\u0631\u062c\u0639\u064a\u0629',
        'Workshop Name':
          '\u0627\u0633\u0645 \u0627\u0644\u0648\u0631\u0634\u0629',
        'Year Taken':
          '\u0627\u0644\u0633\u0646\u0629 \u0627\u0644\u0645\u0623\u062e\u0648\u0630\u0629',
        'Image Type': '\u0646\u0648\u0639 \u0627\u0644\u0635\u0648\u0631\u0629',
        Caption: '\u0627\u0644\u062a\u0639\u0644\u064a\u0642',
        'Craft Workshop Image Upload':
          '\u062a\u062d\u0645\u064a\u0644 \u0635\u0648\u0631\u0629 \u0648\u0631\u0634\u0629 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629',
        'Time Frame':
          '\u0627\u0644\u0625\u0637\u0627\u0631 \u0627\u0644\u0632\u0645\u0646\u064a',
        Address: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646',
        'Drag marker to change the location':
          '\u0627\u0633\u062d\u0628 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0644\u062a\u063a\u064a\u064a\u0631 \u0627\u0644\u0645\u0648\u0642\u0639',
        'Ain El-Mreisseh':
          '\u0639\u064a\u0646 \u0627\u0644\u0645\u0631\u064a\u0633\u064a',
        'Mina El-Hosn':
          '\u0645\u064a\u0646\u0627 \u0627\u0644\u062d\u0635\u0646',
        Mousaitbeh: '\u0645\u0635\u064a\u0637\u0628\u0629',
        Rmeil: '\u0631\u0645\u064a\u0644',
        Saifi: '\u0635\u064a\u0641\u064a',
        'Zuqaq El-Blat':
          '\u0632\u0642\u0627\u0642 \u0627\u0644\u0628\u0644\u0627\u0637',
        'Adlieh (Palais de Justice)':
          '\u0642\u0635\u0631 \u0627\u0644\u0639\u062f\u0644 - \u0627\u0644\u0639\u062f\u0644\u064a\u0629 ',
        'Ain El-Tineh':
          '\u0639\u064a\u0646 \u0627\u0644\u062a\u064a\u0646\u0647',
        Amlieh: '\u0627\u0644\u0639\u0627\u0645\u0644\u064a\u0647',
        Archafieh: '\u0627\u0634\u0631\u0641\u064a\u0629',
        'Basta El-Faouqa':
          '\u0628\u0633\u0637\u0629 \u0627\u0644\u0641\u0648\u0642\u0627',
        Batrakieh: '\u0627\u0644\u0628\u0637\u0631\u0643\u064a\u0629',
        'Burj Abi Haidar':
          '\u0628\u0631\u062c \u0627\u0628\u064a \u062d\u064a\u062f\u0631',
        'Furn El-Hayek':
          '\u0641\u0631\u0646 \u0627\u0644\u062d\u0627\u064a\u0643',
        Hikmeh: '\u0627\u0644\u062d\u0643\u0645\u0647',
        Horch: '\u0627\u0644\u062d\u0631\u0634',
        Jeitaoui: '\u062c\u0639\u064a\u062a\u0627\u0648\u064a',
        'Mustashfa El-Roum (H\u00f4pital Orthodoxe)':
          '\u0645\u0633\u062a\u0634\u0641\u0649 \u0627\u0644\u0631\u0648\u0645',
        'Nouveau Secteur':
          '\u0627\u0644\u0642\u0637\u0627\u0639 \u0627\u0644\u062c\u062f\u064a\u062f',
        Qoreitem: '\u0642\u0631\u064a\u0637\u0645',
        'Ras El-Nabaa': '\u0631\u0627\u0633 \u0627\u0644\u0646\u0628\u0639',
        Yesouieh: '\u064a\u0627\u0633\u0648\u0639\u064a\u0629',
        'You are missing some necessary fields!':
          '\u0644\u0645 \u062a\u0642\u0645 \u0628\u0625\u062f\u062e\u0627\u0644 \u0628\u0639\u0636 \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0636\u0631\u0648\u0631\u064a\u0629!',
        'Please go back and fill in the required fields (*) before being able to see the preview and submit.':
          '\u064a\u0631\u062c\u0649 \u0627\u0644\u0631\u062c\u0648\u0639 \u0648\u0645\u0644\u0621 \u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 (*) \u0642\u0628\u0644 \u0627\u0644\u062a\u0645\u0643\u0646 \u0645\u0646 \u0631\u0624\u064a\u0629 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u0628\u0642 \u0648\u0627\u0644\u0625\u0631\u0633\u0627\u0644.',
        'Missing Required Fields':
          '\u0627\u0644\u062d\u0642\u0648\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0645\u0641\u0642\u0648\u062f\u0629',
        'Locate where this image was taken on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.':
          '\u062d\u062f\u062f \u0645\u0643\u0627\u0646 \u0627\u0644\u062a\u0642\u0627\u0637 \u0647\u0630\u0647 \u0627\u0644\u0635\u0648\u0631\u0629 \u0639\u0644\u0649 \u0627\u0644\u062e\u0631\u064a\u0637\u0629. \u064a\u0631\u062c\u0649 \u062a\u0643\u0628\u064a\u0631 \u0648\u062a\u062d\u0631\u064a\u0643 \u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0644\u0636\u0628\u0637 \u0627\u0644\u062f\u0642\u0629 \u0648\u0644\u0644\u062a\u0623\u0643\u064a\u062f \u0639\u0644\u0649 \u0623\u0646 \u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0645\u0648\u062c\u0648\u062f\u0629  \u0628\u0634\u0643\u0644 \u0635\u062d\u064a\u062d.',
        Current: '\u0627\u0644\u062d\u0627\u0644\u064a',
        'Craft Shop (No name provided)':
          '\u0645\u062d\u0644 \u0627\u0644\u062d\u0631\u0641 (\u0644\u0645 \u064a\u0630\u0643\u0631 \u0627\u0644\u0627\u0633\u0645)',
        'Storefront view of ':
          '\u0648\u0627\u062c\u0647\u0629 \u0645\u062d\u0644 ',
        'Street view of ':
          '\u0645\u0638\u0647\u0631 X \u0645\u0646 \u0627\u0644\u0634\u0627\u0631\u0639 ',
        'Interior view of ':
          '\u0639\u0631\u0636 \u062f\u0627\u062e\u0644\u064a \u0644- ',
        'Indoor view of ':
          '\u0639\u0631\u0636 \u062e\u0627\u0631\u062c\u064a \u0644- ',
        'Crafts produced by ':
          '\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u0645\u0646\u062a\u062c\u0629 \u0645\u0646 \u0642\u0650\u0628\u064e\u0644 ',
        'Craft produced by ':
          '\u0627\u0644\u062d\u0631\u0641\u0629 \u0627\u0644\u0645\u0646\u062a\u062c\u0629 \u0645\u0646 \u0642\u0650\u0628\u064e\u0644 ',
        'Craftsperson of ':
          '\u0627\u0644\u062d\u0631\u0641\u064a \u0644\u0645\u062a\u062c\u0631',
        'Crafts produced in ':
          '\u062d\u0631\u0641 \u0645\u0646\u062a\u062c\u0629 \u0641\u064a ',
        'Craftsperson inside ':
          '\u062d\u0631\u0641\u064a \u062f\u0627\u062e\u0644 ',
        'Craftsperson in front of ':
          '\u062d\u0631\u0641\u064a \u0623\u0645\u0627\u0645 ',
        'Crafts displayed in storefront of ':
          '\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u0645\u0639\u0631\u0648\u0636\u0629 \u0641\u064a \u0648\u0627\u062c\u0647\u0629 \u0645\u062d\u0644 ',
        'Electronics sale and repair':
          '\u0628\u064a\u0639 \u0648\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a',
        Clothing: '\u0645\u0644\u0627\u0628\u0633',
        Lighting: '\u0625\u0636\u0627\u0621\u0629',
        'Knitting and sewing supplies':
          '\u0645\u0633\u062a\u0644\u0632\u0645\u0627\u062a \u0627\u0644\u062d\u064a\u0627\u0643\u0629 \u0648\u0627\u0644\u062e\u064a\u0627\u0637\u0629',
        'Shoe repair':
          '\u062a\u0635\u0644\u064a\u062d \u0627\u0644\u0627\u062d\u0630\u064a\u0629',
        'Plastic recycling':
          '\u0625\u0639\u0627\u062f\u0629 \u062a\u062f\u0648\u064a\u0631 \u0627\u0644\u0628\u0644\u0627\u0633\u062a\u064a\u0643',
        'Masbaha islamic prayer beads':
          '\u0645\u0633\u0628\u062d\u0629 \u0625\u0633\u0644\u0627\u0645\u064a\u0629',
        Photography: '\u0627\u0644\u062a\u0635\u0648\u064a\u0631',
        'Bookseller, distributor and publisher':
          '\u0628\u0627\u0626\u0639 \u0627\u0644\u0643\u062a\u0628 \u0648\u0627\u0644\u0645\u0648\u0632\u0639 \u0648\u0627\u0644\u0646\u0627\u0634\u0631',
        'Textile spinning':
          '\u063a\u0632\u0644 \u0627\u0644\u0645\u0646\u0633\u0648\u062c\u0627\u062a',
        'Silk, thread, spools':
          '\u062d\u0631\u064a\u0631 \u060c \u062e\u064a\u0637 \u060c \u0645\u0643\u0628\u0627\u062a',
        Supplies: '\u0644\u0648\u0627\u0632\u0645',
        'Post office':
          '\u0645\u0643\u062a\u0628 \u0627\u0644\u0628\u0631\u064a\u062f',
        'Photography and chemistry':
          '\u0627\u0644\u062a\u0635\u0648\u064a\u0631 \u0648\u0627\u0644\u0643\u064a\u0645\u064a\u0627\u0621',
        'Wool mattresses':
          '\u0645\u0631\u0627\u062a\u0628 \u0645\u0646 \u0627\u0644\u0635\u0648\u0641',
        Tinning: '\u062a\u0639\u0644\u064a\u0628',
        'Shoe cleaning':
          '\u062a\u0646\u0638\u064a\u0641 \u0627\u0644\u0623\u062d\u0630\u064a\u0629',
        Weapons: '\u0623\u0633\u0644\u062d\u0629',
        'Photography, painting':
          '\u0627\u0644\u062a\u0635\u0648\u064a\u0631 \u0648 \u0627\u0644\u0631\u0633\u0645',
        Tannery: '\u0627\u0644\u0645\u062f\u0628\u063a\u0629',
        Calendars: '\u0627\u0644\u062a\u0642\u0648\u064a\u0645\u0627\u062a',
        'Silk spinning':
          '\u063a\u0632\u0644 \u0627\u0644\u062d\u0631\u064a\u0631',
        'Carpets, barber':
          '\u0627\u0644\u0633\u062c\u0627\u062f \u0648\u0627\u0644\u062d\u0644\u0627\u0642',
        Florist:
          '\u0628\u0627\u0626\u0639 \u0627\u0644\u0632\u0647\u0648\u0631',
        Hatmaking:
          '\u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0642\u0628\u0639\u0627\u062a',
        Cobbler: '\u0627\u0644\u0625\u0633\u0643\u0627\u0641\u064a',
        Marble: '\u0631\u062e\u0627\u0645',
        Locksmith:
          '\u0635\u0627\u0646\u0639 \u0648\u0645\u0635\u0644\u062d \u0627\u0644\u0623 \u0642\u0641\u0627\u0644',
        'Copper moulding': '\u0635\u0628 \u0627\u0644\u0646\u062d\u0627\u0633',
        Pipemaker:
          '\u0635\u0627\u0646\u0639 \u0627\u0644\u0623\u0646\u0627\u0628\u064a\u0628',
        'Spice market and grocer':
          '\u0633\u0648\u0642 \u0627\u0644\u0628\u0647\u0627\u0631\u0627\u062a \u0648\u0627\u0644\u0628\u0642\u0627\u0644\u0629',
        'Cinema, arts and entertainment':
          '\u0627\u0644\u0633\u064a\u0646\u0645\u0627 \u0648\u0627\u0644\u0641\u0646\u0648\u0646 \u0648\u0627\u0644\u062a\u0631\u0641\u064a\u0647',
        'Sewing, buttons':
          '\u0627\u0644\u062e\u064a\u0627\u0637\u0629 \u060c \u0627\u0644\u0623\u0632\u0631\u0627\u0631',
        Carpets: '\u0627\u0644\u0633\u062c\u0627\u062f',
        Tools: '\u0623\u062f\u0648\u0627\u062a',
        'Musical instruments':
          '\u0627\u0644\u0627\u062a \u0645\u0648\u0633\u064a\u0642\u064a\u0629',
        'Clothing, hats, shoes':
          '\u0627\u0644\u0645\u0644\u0627\u0628\u0633 \u0648\u0627\u0644\u0642\u0628\u0639\u0627\u062a \u0648\u0627\u0644\u0623\u062d\u0630\u064a\u0629',
        'Clothing and fabric':
          '\u0627\u0644\u0645\u0644\u0627\u0628\u0633 \u0648\u0627\u0644\u0646\u0633\u064a\u062c',
        Socks: '\u062c\u0648\u0627\u0631\u0628',
        Commerce: '\u062a\u062c\u0627\u0631\u0629',
        'Cream, plaster, fish oil':
          '\u0643\u0631\u064a\u0645 \u060c \u062c\u0635 \u060c \u0632\u064a\u062a \u0633\u0645\u0643',
        'Photography and tools':
          '\u0627\u0644\u062a\u0635\u0648\u064a\u0631 \u0648\u0627\u0644\u0623\u062f\u0648\u0627\u062a',
        Cars: '\u0633\u064a\u0627\u0631\u0627\u062a',
        'Electronics (repair)':
          '\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a\u0627\u062a (\u0625\u0635\u0644\u0627\u062d)',
        Watchmaker: '\u0627\u0644\u0633\u0627\u0639\u0627\u062a\u064a',
        Millinery:
          '\u0642\u0628\u0639\u0627\u062a \u0646\u0633\u0627\u0626\u064a\u0629',
        'Shawls, jackets, abbayas, fabric':
          '\u0634\u0627\u0644\u0627\u062a \u060c \u062c\u0627\u0643\u064a\u062a\u0627\u062a \u060c \u0639\u0628\u0627\u064a\u0627\u062a \u060c \u0642\u0645\u0627\u0634',
        "Gogh's trade": '\u062a\u062c\u0627\u0631\u0629 \u062c\u0648\u062e',
        'Trade Cloth':
          '\u062a\u062c\u0627\u0631\u0629 \u0627\u0644\u0642\u0645\u0627\u0634',
        'Fabric and cloth making':
          '\u0635\u0646\u0627\u0639\u0629 \u0627\u0644\u0646\u0633\u064a\u062c \u0648\u0627\u0644\u0642\u0645\u0627\u0634',
        'Hand-wooven silk abbayas, cotton and wool nightgowns, handmade scarves, towels and beachwear, ethnic dresses and table linens':
          '\u0639\u0628\u0627\u0621\u0627\u062a \u062d\u0631\u064a\u0631\u064a\u0629 \u0645\u0646\u0633\u0648\u062c\u0629 \u064a\u062f\u0648\u064a\u064b\u0627 \u060c \u0642\u0645\u0635\u0627\u0646 \u0646\u0648\u0645 \u0642\u0637\u0646\u064a\u0629 \u0648\u0635\u0648\u0641\u064a\u0629 \u060c \u0623\u0648\u0634\u062d\u0629 \u0645\u0635\u0646\u0648\u0639\u0629 \u064a\u062f\u0648\u064a\u064b\u0627 \u060c \u0645\u0646\u0627\u0634\u0641 \u0648 \u0623\u0644\u0628\u0633\u0629 \u0628\u062d\u0631 \u060c \u0641\u0633\u0627\u062a\u064a\u0646 \u0639\u0631\u0642\u064a\u0629 \u0648\u0628\u064a\u0627\u0636\u0627\u062a \u0645\u0627\u0626\u062f\u0629',
        'Storefront sign painter':
          '\u0631\u0633\u0627\u0645 \u0644\u0627\u0641\u062a\u0629 \u0648\u0627\u062c\u0647\u0629 \u0627\u0644\u0645\u062d\u0644',
        "Women's fabric":
          '\u0646\u0633\u064a\u062c \u0646\u0633\u0627\u0626\u064a',
        Hats: '\u0627\u0644\u0642\u0628\u0639\u0627\u062a',
        'Oriental antiques':
          '\u062a\u062d\u0641 \u0634\u0631\u0642\u064a\u0629',
        Stockings: '\u062c\u0648\u0627\u0631\u0628',
        'Watch repair':
          '\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u0633\u0627\u0639\u0627\u062a',
        'Piano tuner':
          '\u0645\u0648\u0627\u0644\u0641 \u0627\u0644\u0628\u064a\u0627\u0646\u0648',
        Zincography:
          '\u0627\u0644\u062d\u0641\u0631 \u0627\u0644\u0632\u0646\u0643\u064a',
        'Building material and services':
          '\u0645\u0648\u0627\u062f \u0627\u0644\u0628\u0646\u0627\u0621 \u0648\u0627\u0644\u062e\u062f\u0645\u0627\u062a',
        'Sewing classes':
          '\u062f\u0631\u0648\u0633 \u0627\u0644\u062e\u064a\u0627\u0637\u0629',
        'Ready clothing':
          '\u0645\u0644\u0627\u0628\u0633 \u062c\u0627\u0647\u0632\u0629',
        'Garments retailer':
          '\u062a\u0627\u062c\u0631 \u0645\u0644\u0627\u0628\u0633 \u0628\u0627\u0644\u062a\u062c\u0632\u0626\u0629',
        'Shoe design and modeling':
          '\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0623\u062d\u0630\u064a\u0629 \u0648\u0627\u0644\u0646\u0645\u0630\u062c\u0629',
        'Handbags and luggage':
          '\u062d\u0642\u0627\u0626\u0628 \u0627\u0644\u064a\u062f \u0648\u0627\u0644\u0623\u0645\u062a\u0639\u0629',
        "Children's toys":
          '\u0644\u0639\u0628 \u0627\u0644\u0623\u0637\u0641\u0627\u0644',
        'Architectural crafts':
          '\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629',
        'Fabric and textiles':
          '\u0627\u0644\u0646\u0633\u064a\u062c \u0648\u0627\u0644\u0645\u0646\u0633\u0648\u062c\u0627\u062a',
        'Vintage furniture repair':
          '\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u0623\u062b\u0627\u062b \u0627\u0644\u0639\u062a\u064a\u0642',
        'Tailor repair':
          '\u0627\u0644\u0625\u0635\u0644\u0627\u062d \u0648 \u0627\u0644\u062e\u064a\u0627\u0637a',
        'Data collected will be added to the Living Heritage Atlas database and will be available for public download and use in anonymized research and analysis. Your craft workshop information, location, and photo(s) submitted will be displayed on the Living Heritage Atlas website, as shown in the preview below. Checking this box indicates that you consent to sharing information and photo(s) about your craft workshop with the Living Heritage Atlas. Thank you for taking the time to contribute data to the Living Heritage Atlas, we appreciate your input!':
          '\u0633\u062a\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0645 \u062c\u0645\u0639\u0647\u0627 \u0625\u0644\u0649 \u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0648\u0633\u062a\u0643\u0648\u0646 \u0645\u062a\u0627\u062d\u0629 \u0644\u0644\u062a\u0646\u0632\u064a\u0644 \u0627\u0644\u0639\u0627\u0645 \u0648\u0627\u0633\u062a\u062e\u062f\u0627\u0645\u0647\u0627 \u0641\u064a \u0627\u0644\u0623\u0628\u062d\u0627\u062b \u0648 \u0627\u0644\u062a\u062d\u0627\u0644\u064a\u0644 \u0627\u0644\u0645\u062c\u0647\u0648\u0644\u0629. \u0633\u064a\u062a\u0645 \u0639\u0631\u0636 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0643 \u060c \u0648\u0627\u0644\u0645\u0648\u0642\u0639 \u060c \u0648\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u0645\u0642\u062f\u0645\u0629 \u0639\u0644\u0649 \u0645\u0648\u0642\u0639 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0639\u0644\u0649 \u0627\u0644\u0648\u064a\u0628 \u060c \u0643\u0645\u0627 \u0647\u0648 \u0645\u0648\u0636\u062d \u0641\u064a \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u0628\u0642 \u0623\u062f\u0646\u0627\u0647. \u064a\u0634\u064a\u0631 \u062a\u062d\u062f\u064a\u062f \u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u0628\u0639 \u0625\u0644\u0649 \u0645\u0648\u0627\u0641\u0642\u062a\u0643 \u0639\u0644\u0649 \u0645\u0634\u0627\u0631\u0643\u0629 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0648\u0627\u0644\u0635\u0648\u0631 \u062d\u0648\u0644 \u0648\u0631\u0634\u0629 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0643 \u0645\u0639 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a. \u0634\u0643\u0631\u064b\u0627 \u0644\u0643 \u0639\u0644\u0649 \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0630\u064a \u0642\u0636\u064a\u062a\u0647 \u0641\u064a \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629 \u0628\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u060c \u0646\u062d\u0646 \u0646\u0642\u062f\u0631 \u0645\u0633\u0627\u0647\u0645\u062a\u0643!',
        'Operation Status':
          '\u062d\u0627\u0644\u0629 \u0627\u0644\u062a\u0634\u063a\u064a\u0644 ',
        'Year Established':
          '\u0633\u0646\u0629 \u0627\u0644\u062a\u0623\u0633\u064a\u0633',
        'Closed (temporary)':
          '\u0645\u063a\u0644\u0642 (\u0645\u0624\u0642\u062a)',
        Destroyed: '\u0645\u0647\u062f\u0645',
        'Business Contact Information':
          '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644 \u0627\u0644\u0645\u0647\u0646\u064a\u0629',
        'This information will be publicly available on the Living Heritage Atlas | Beirut database and website.':
          '\u0633\u062a\u0643\u0648\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0645\u062a\u0627\u062d\u0629 \u0644\u0644\u062c\u0645\u0647\u0648\u0631 \u0639\u0644\u0649 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0645\u0648\u0642\u0639 \u0628\u064a\u0631\u0648\u062a.',
        Email:
          '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a',
        'Upload success!':
          '\u062a\u0645 \u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0628\u0646\u062c\u0627\u062d!',
        Click: '\u0627\u0646\u0642\u0631',
        here: '\u0647\u0646\u0627',
        'to make another contribution, or click':
          '\u0644\u062a\u0642\u062f\u064a\u0645 \u0645\u0633\u0627\u0647\u0645\u0629 \u0623\u062e\u0631\u0649 \u060c \u0623\u0648 \u0627\u0646\u0642\u0631 ',
        'to return to the main site.':
          '\u0644\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u0631\u0626\u064a\u0633\u064a.',
        'Upload Failed!':
          '\u0627\u0644\u062a\u062d\u0645\u064a\u0644 \u0641\u0634\u0644!',
        'We could not process your response.':
          '\u0644\u0645 \u0646\u062a\u0645\u0643\u0646 \u0645\u0646 \u0633\u064a\u0631 \u0639\u0645\u0644\u064a\u0629 \u0631\u062f\u0643.',
        Wed: 'الأربعاء',
        Reset: 'إعادة تعيين',
        "Mapping and activating Beirut's crafts":
          '\u0645\u0633\u062d \u0648 \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a',
        "Living Heritage Atlas\u2002|\u2002Beirut is a design-based research project that contributes to the urban planning discussion on Beirut's heritage by rendering visible the often unrecognized living heritage of craftsmanship \u2014 with its crafts, public spaces, and local knowledge.\r":
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a|  \u0628\u064a\u0631\u0648\u062a \u0647\u0648 \u0645\u0634\u0631\u0648\u0639 \u0628\u062d\u062b\u064a\u0651 \u064a\u0635\u0628 \u0641\u064a \u0645\u062c\u0627\u0644 \u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0648\u064a\u0633\u0627\u0647\u0645 \u0641\u064a \u062a\u062d\u0641\u064a\u0632 \u0645\u0646\u0627\u0642\u0634\u0627\u062a \u062d\u0648\u0644 \u0627\u0644\u062a\u062e\u0637\u064a\u0637 \u0627\u0644\u062d\u0636\u0631\u064a \u0644\u062a\u0631\u0627\u062b \u0628\u064a\u0631\u0648\u062a \u0645\u0646 \u062e\u0644\u0627\u0644 \u0625\u0628\u0631\u0627\u0632 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a \u0644\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u0630\u064a \u064a\u0639\u062a\u0628\u0631 \u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641 \u0641\u064a \u0643\u062b\u064a\u0631 \u0645\u0646 \u0627\u0644\u0623\u062d\u064a\u0627\u0646. \u064a\u062a\u0639\u0631\u0651\u0641 \u0627\u0644\u0645\u0634\u062a\u0631\u0643 \u0639\u0644\u0649 \u0627\u0644\u062d\u0631\u0641\u064a\u0651\u0629 \u0625\u0628\u062a\u062f\u0627\u0621\u064b \u0645\u0646 \u0645\u062c\u0627\u0644\u0627\u062a\u0647\u0627 \u0648\u0645\u0633\u0627\u062d\u0627\u062a\u0647\u0627 \u0627\u0644\u0639\u0627\u0645\u0651\u0629 \u0648\u0645\u0639\u0631\u0641\u062a\u0647\u0627 \u0627\u0644\u0645\u062d\u0644\u064a\u0651\u0629.',
        'This project has been developed by the Massachusetts Institute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL), and it is supported by Dar Group.':
          '\u062a\u0645 \u062a\u0637\u0648\u064a\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0646 \u0642\u0650\u0628\u0644 \u0645\u0639\u0647\u062f \u0645\u0627\u0633\u0627\u062a\u0634\u0648\u0633\u062a\u0633 \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 (MIT) \u060c \u0645\u062e\u062a\u0628\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0646\u064a\u0629 (CDDL) \u0648\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a(FHL)\u060c \u0648\u0628\u062f\u0639\u0645 \u0645\u0646 \u0645\u062c\u0645\u0648\u0639\u0629 \u062f\u0627\u0631.',
        'Living Heritage Atlas\u2002|\u2002Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economy at different urban scales.':
          '\u064a\u0639\u062a\u0631\u0641 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0628\u0623\u0646 \u0627\u0644\u062d\u0631\u0641\u064a\u0651\u064a\u0646 \u0647\u0645 \u0645\u062c\u0645\u0648\u0639\u0629 \u0645\u0647\u0645\u0651\u0634\u0629  \u0628\u0634\u0643\u0644 \u0643\u0628\u064a\u0631\u060c \u0648\u064a\u0639\u0645\u0644\u0648\u0646 \u0639\u0646\u062f \u062a\u0642\u0627\u0637\u0639 \u0627\u0644\u062a\u0631\u0627\u062b \u060c \u0648\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629 \u0644\u0644\u0635\u0646\u0627\u0639\u0629 \u060c \u0648\u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0651\u0629 \u0639\u0644\u0649 \u0646\u0637\u0627\u0642\u0627\u062a \u062d\u0636\u0631\u064a\u0651\u0629 \u0645\u062e\u062a\u0644\u0641\u0629.',
        'This project seemingly bridges the digital to the physical by advancing three key interventions:\r':
          '\u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u064a\u0631\u0628\u0637 \u0645\u0627 \u0628\u064a\u0646 \u0627\u0644\u0631\u0642\u0645\u064a \u0648\u0627\u0644\u0645\u0627\u062f\u064a \u0645\u0646 \u062e\u0644\u0627\u0644 \u062a\u0642\u062f\u064a\u0645 \u062b\u0644\u0627\u062b\u0629 \u062a\u062f\u062e\u0644\u0627\u062a \u0631\u0626\u064a\u0633\u064a\u0629:',
        'It constructs a digital archive of geolocated historic data and images using visual and textual materials from local archives, residents, and craftspeople. Data is open-access and available to download at:':
          '\u064a\u0646\u0634\u0626 \u0623\u0631\u0634\u064a\u0641\u064b\u0627 \u0631\u0642\u0645\u064a\u064b\u0627 \u0644\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0627\u0644\u0645\u062d\u062f\u062f\u0629 \u062c\u063a\u0631\u0627\u0641\u064a\u064b\u0627 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0648\u0627\u062f \u0627\u0644\u0645\u0631\u0626\u064a\u0629 \u0648\u0627\u0644\u0646\u0635\u064a\u0629 \u0645\u0646 \u0627\u0644\u0645\u062d\u0641\u0648\u0638\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0627\u0644\u0645\u0642\u064a\u0645\u064a\u0646 \u0648\u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646. \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0641\u062a\u0648\u062d\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 \u0648\u0645\u062a\u0627\u062d\u0629 \u0644\u0644\u062a\u0646\u0632\u064a\u0644 \u0639\u0644\u0649: ',
        'It implements a series of small neighborhood-wide interventions by disseminating site-specific street stickers and physical signages that connect physical spaces in contemporary Beirut to the historic images available on the Living Heritage Atlas | Beirut digital archive':
          '\u064a\u0646\u0641\u0630 \u0633\u0644\u0633\u0644\u0629 \u0645\u0646 \u0627\u0644\u062a\u062f\u062e\u0644\u0627\u062a \u0627\u0644\u0635\u063a\u064a\u0631\u0629 \u0639\u0644\u0649 \u0645\u0633\u062a\u0648\u0649 \u0627\u0644\u062d\u064a \u0645\u0646 \u062e\u0644\u0627\u0644 \u0646\u0634\u0631 \u0645\u0644\u0635\u0642\u0627\u062a \u0627\u0644\u0634\u0648\u0627\u0631\u0639 \u0648\u0627\u0644\u0644\u0627\u0641\u062a\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062a\u064a \u062a\u0631\u0628\u0637 \u0627\u0644\u0645\u0633\u0627\u062d\u0627\u062a \u0627\u0644\u0645\u0627\u062f\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a \u0627\u0644\u0645\u0639\u0627\u0635\u0631\u0629 \u0628\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0627\u0644\u0645\u062a\u0648\u0641\u0631\u0629 \u0639\u0644\u0649 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0623\u0631\u0634\u064a\u0641 \u0628\u064a\u0631\u0648\u062a \u0627\u0644\u0631\u0642\u0645\u064a',
        'It connects stakeholders working on the topic of craftsmanship through community meetings, participatory mapping workshops, and share-your-story events on the spaces and history of craftsmanship in Beirut':
          '\u064a\u0631\u0628\u0637 \u0623\u0635\u062d\u0627\u0628 \u0627\u0644\u0645\u0635\u0627\u0644\u062d \u0627\u0644\u0630\u064a\u0646 \u064a\u0639\u0645\u0644\u0648\u0646 \u0641\u064a \u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u062c\u062a\u0645\u0627\u0639\u0627\u062a \u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u060c \u0648\u0648\u0631\u0634 \u0639\u0645\u0644 \u0631\u0633\u0645 \u0627\u0644\u062e\u0631\u0627\u0626\u0637 \u0627\u0644\u062a\u0634\u0627\u0631\u0643\u064a\u0629 \u060c \u0648\u0641\u0639\u0627\u0644\u064a\u0627\u062a \u0645\u0634\u0627\u0631\u0643\u0629-\u0642\u0635\u062a\u0643 \u062d\u0648\u0644 \u0623\u0645\u0627\u0643\u0646 \u0648\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a',
        'Living Heritage Atlas\u2002|  Mapping Beirut\u2019s Craftsmanship Event (July 7th) ':
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u062d\u062f\u062b \u0644\u0645\u0633\u062d \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a (\u0667 \u062a\u0645\u0648\u0632)',
        'The Living Heritage Atlas Event is a three hour round table and  mapping event that will take place on Thursday July 7 from 6:00 PM-9:15 PM at the Abroyan Factory in Bourj Hammoud. . ':
          '\u0641\u0639\u0627\u0644\u064a\u0629 \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0647\u064a \u0645\u0624\u062a\u0645\u0631 \u0645\u0646\u0627\u0642\u0634\u0629 \u0644\u0645\u062f\u0629 \u062b\u0644\u0627\u062b \u0633\u0627\u0639\u0627\u062a \u0648\u062d\u062f\u062b \u0644\u0644\u0645\u0633\u062d \u0648\u0627\u0644\u062a\u0648\u062b\u064a\u0642 \u0627\u0644\u0630\u064a \u0633\u064a\u0639\u0642\u062f \u064a\u0648\u0645 \u0627\u0644\u062e\u0645\u064a\u0633 \u0667 \u062a\u0645\u0648\u0632 \u0645\u0646 \u0666:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b \u0625\u0644\u0649 \u0669:\u0661\u0665 \u0645\u0633\u0627\u0621\u064b \u0641\u064a \u0645\u0635\u0646\u0639 \u0623\u0628\u0631\u0648\u064a\u0627\u0646 \u0641\u064a \u0628\u0631\u062c \u062d\u0645\u0648\u062f. ',
        'Featured Event:': '\u062d\u062f\u062b \u0645\u0645\u064a\u0632:',
        'Date&#58;': '\u0627\u0644\u062a\u0627\u0631\u064a\u062e:',
        'Thursday, July 7, 2022':
          '\u0627\u0644\u062e\u0645\u064a\u0633 \u0667 \u062a\u0645\u0648\u0632 \u0662\u0660\u0662\u0662',
        'Time&#58;': '\u0627\u0644\u0648\u0642\u062a:',
        '6:00&ndash;9:15pm':
          '\u0666:\u0660\u0660 - \u0669:\u0661\u0665 \u0645\u0633\u0627\u0621\u064b',
        'Location&#58;': '\u0627\u0644\u0645\u0648\u0642\u0639:',
        'Abroyan Factory':
          '\u0645\u0635\u0646\u0639 \u0623\u0628\u0631\u0648\u064a\u0627\u0646',
        'Register:': '\u0627\u0644\u062a\u0633\u062c\u064a\u0644:',
        'RSVP your attendance in advance via the ':
          '\u0633\u062c\u0651\u0644 \u062d\u0636\u0648\u0631\u0643 \u0645\u0642\u062f\u0645\u064b\u0627 \u0639\u0628\u0631',
        'Ihjoz event webpage':
          '\u0635\u0641\u062d\u0629 \u0648\u064a\u0628 ihjoz',
        'Discussion during this event will primary be conducted in English; if you prefer to converse in Arabic, there will be a person at each table ready to help translate to and from Arabic and English as needed.':
          '\u0633\u062a\u062c\u0631\u0649 \u0627\u0644\u0645\u0646\u0627\u0642\u0634\u0629 \u062e\u0644\u0627\u0644 \u0647\u0630\u0627 \u0627\u0644\u062d\u062f\u062b \u0628\u0634\u0643\u0644 \u0623\u0633\u0627\u0633\u064a \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u061b \u0625\u0630\u0627 \u0643\u0646\u062a \u062a\u0641\u0636\u0644 \u0627\u0644\u062a\u062d\u062f\u062b \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u060c \u0641\u0633\u064a\u0643\u0648\u0646 \u0647\u0646\u0627\u0643 \u0634\u062e\u0635 \u0639\u0644\u0649 \u0643\u0644 \u0637\u0627\u0648\u0644\u0629 \u0639\u0644\u0649 \u0627\u0633\u062a\u0639\u062f\u0627\u062f \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u0641\u064a \u0627\u0644\u062a\u0631\u062c\u0645\u0629 \u0645\u0646 \u0648\u0625\u0644\u0649 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 \u062d\u0633\u0628 \u0627\u0644\u062d\u0627\u062c\u0629.',
        'Pre-Opening':
          '\u0642\u0628\u0644 \u0627\u0644\u0627\u0641\u062a\u062a\u0627\u062d',
        The: '\u0627\u0644',
        'MIT Future Heritage Lab':
          '\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a \u0644-MIT ',
        '(FHL) ': '(FHL) ',
        and: '\u0648',
        'MIT Civic Data Design Lab':
          '\u0645\u062e\u062a\u0628\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0646\u064a\u0629  \u0644-MIT ',
        '(CDDL)': '(CDDL)',
        'will present the': '\u0633\u064a\u0642\u062f\u0651\u0645\u0648\u0646 ',
        'digital archive of geolocated historic data and images using visual and textual materials from local archives, residents and craftspeople.':
          '\u0623\u0631\u0634\u064a\u0641 \u0631\u0642\u0645\u064a \u0644\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0627\u0644\u0645\u062d\u062f\u062f\u0629 \u062c\u063a\u0631\u0627\u0641\u064a\u064b\u0627 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0645\u0648\u0627\u062f \u0627\u0644\u0645\u0631\u0626\u064a\u0629 \u0648\u0627\u0644\u0646\u0635\u064a\u0629 \u0645\u0646 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u0627\u062a \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0627\u0644\u0645\u0642\u064a\u0645\u064a\u0646 \u0648\u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646.',
        'Bring a living heritage item!':
          '\u0623\u062d\u0636\u0631 \u0639\u0646\u0635\u0631 \u062a\u0631\u0627\u062b\u064a \u062d\u064a!',
        'Invitees and guests are asked to bring with them a living heritage item to contribute to the living heritage atlas. We define this element as a photograph, plan, map, guidebook, newspaper clipping, or artefact related to the past, present of crafts and craftsmanship in the city. All items will be scanned by our data collectors and returned by the end of the event.':
          '\u064a\u064f\u0637\u0644\u0628 \u0645\u0646 \u0627\u0644\u0645\u062f\u0639\u0648\u064a\u0646 \u0648\u0627\u0644\u0636\u064a\u0648\u0641 \u0625\u062d\u0636\u0627\u0631 \u0639\u0646\u0635\u0631 \u062a\u0631\u0627\u062b\u064a \u062d\u064a \u0644\u0644\u0645\u0633\u0627\u0647\u0645\u0629 \u0641\u064a \u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a. \u0646\u062d\u062f\u062f \u0647\u0630\u0627 \u0627\u0644\u0639\u0646\u0635\u0631 \u0639\u0644\u0649 \u0623\u0646\u0647 \u0635\u0648\u0631\u0629 \u0641\u0648\u062a\u0648\u063a\u0631\u0627\u0641\u064a\u0629 \u060c \u0623\u0648 \u062e\u0637\u0629 \u060c \u0623\u0648 \u062e\u0631\u064a\u0637\u0629 \u060c \u0623\u0648 \u062f\u0644\u064a\u0644 \u060c \u0623\u0648 \u0642\u0635\u0627\u0635\u0629 \u0645\u0646 \u0627\u0644\u0635\u062d\u0641 \u060c \u0623\u0648 \u0642\u0637\u0639\u0629 \u0623\u062b\u0631\u064a\u0629 \u062a\u062a\u0639\u0644\u0642 \u0628\u0627\u0644\u0645\u0627\u0636\u064a \u060c \u0648\u062d\u0627\u0636\u0631 \u0627\u0644\u062d\u0631\u0641 \u0648\u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629. \u0633\u064a\u062a\u0645 \u0641\u062d\u0635 \u062c\u0645\u064a\u0639 \u0627\u0644\u0639\u0646\u0627\u0635\u0631 \u0628\u0648\u0627\u0633\u0637\u0629 \u062c\u0627\u0645\u0639\u064a \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0644\u062f\u064a\u0646\u0627 \u0648\u0625\u0639\u0627\u062f\u062a\u0647\u0627 \u0628\u062d\u0644\u0648\u0644 \u0646\u0647\u0627\u064a\u0629 \u0627\u0644\u062d\u062f\u062b.',
        'Opening Remarks':
          '\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0627\u0641\u062a\u062a\u0627\u062d\u064a\u0629',
        'Each participant will be given a tag based on his/her contribution to the event. Categories will include: experts, contributors, advocates, moderators, craftsmen, data collectors.':
          '\u0633\u064a\u062a\u0645 \u0645\u0646\u062d \u0643\u0644 \u0645\u0634\u0627\u0631\u0643 \u0639\u0644\u0627\u0645\u0629 \u0628\u0646\u0627\u0621\u064b \u0639\u0644\u0649 \u0645\u0633\u0627\u0647\u0645\u062a\u0647 / \u0645\u0633\u0627\u0647\u0645\u062a\u0647\u0627 \u0641\u064a \u0627\u0644\u062d\u062f\u062b. \u0633\u062a\u0634\u0645\u0644 \u0627\u0644\u0641\u0626\u0627\u062a: \u0627\u0644\u062e\u0628\u0631\u0627\u0621 \u060c \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0648\u0646 \u060c \u0627\u0644\u0645\u0646\u0627\u0635\u0631\u0648\u0646 \u060c \u0627\u0644\u0648\u0633\u0637\u0627\u0621 \u060c \u0627\u0644\u062d\u0631\u0641\u064a\u0648\u0646 \u060c \u062c\u0627\u0645\u0639\u0648 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a.',
        'Opening Presentation by MIT FHL & CDDL':
          '\u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0627\u0641\u062a\u062a\u0627\u062d\u064a \u0628\u0648\u0627\u0633\u0637\u0629 MIT FHL & CDDL',
        'Mapping Methods Discussion':
          '\u0645\u0646\u0627\u0642\u0634\u0629 \u0637\u0631\u0642 \u0627\u0644\u0645\u0633\u062d',
        630: '\u0666:\u0663\u0660',
        '630pm': '\u0666:\u0663\u0660 \u0645\u0633\u0627\u0621\u064b',
        '700pm': '',
        'Living Heritage Atlas |  Mapping Beirut’s Craftsmanship Event':
          'أطلس التراث الحي | حدث لمسح الحرف اليدوية في بيروت',
        700: '',
        '745pm': '\u0667:\u0664\u0665 \u0645\u0633\u0627\u0621\u064b',
        'Mapping Methods is an animated panel-discussion/workshop format that invites stakeholders to map their research and cooperation methods. The goal of the Mapping Methods sessions is to connect local stakeholders and investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy-decisions.':
          '\u0637\u0631\u0642 \u0627\u0644\u0645\u0633\u062d \u0647\u064a \u0639\u0628\u0627\u0631\u0629 \u0639\u0646 \u062a\u0646\u0633\u064a\u0642 \u0644\u0648\u062d\u0629 \u0645\u0646\u0627\u0642\u0634\u0629 / \u0648\u0631\u0634\u0629 \u0639\u0645\u0644 \u0645\u062a\u062d\u0631\u0643 \u064a\u062f\u0639\u0648 \u0623\u0635\u062d\u0627\u0628 \u0627\u0644\u0645\u0635\u0644\u062d\u0629 \u0644\u0631\u0633\u0645 \u062e\u0631\u064a\u0637\u0629 \u0644\u0623\u0633\u0627\u0644\u064a\u0628 \u0627\u0644\u0628\u062d\u062b \u0648\u0627\u0644\u062a\u0639\u0627\u0648\u0646 \u0627\u0644\u062e\u0627\u0635\u0629 \u0628\u0647\u0645. \u0627\u0644\u0647\u062f\u0641 \u0645\u0646 \u062c\u0644\u0633\u0627\u062a \u0623\u0633\u0627\u0644\u064a\u0628 \u0627\u0644\u0645\u0633\u062d \u0647\u0648 \u0631\u0628\u0637 \u0623\u0635\u062d\u0627\u0628 \u0627\u0644\u0645\u0635\u0644\u062d\u0629 \u0627\u0644\u0645\u062d\u0644\u064a\u064a\u0646 \u0648\u0627\u0644\u062a\u062d\u0642\u064a\u0642 \u0641\u064a \u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0645\u062d\u062a\u0645\u0644 \u0648\u0645\u0646\u0647\u062c\u064a\u0627\u062a \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0639\u0644\u0649 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0646\u0634\u0637 \u0627\u0644\u0645\u0633\u0627\u062d\u0629 \u0627\u0644\u0639\u0627\u0645\u0629\u060c \u0648\u062a\u062e\u0644\u0642 \u0627\u0644\u0648\u0639\u064a \u060c \u0648\u062a\u0628\u0646\u064a \u0642\u0631\u0627\u0631\u0627\u062a \u0627\u0644\u0633\u064a\u0627\u0633\u0627\u062a.',
        'Three back-to back round table discussions will take place consecutively with 25 minutes dedicated to each one. Each table will include 3-4 experts, 1 moderator, and 1-2 craftspeople':
          '\u0633\u062a\u062c\u0631\u0649 \u062b\u0644\u0627\u062b \u062d\u0644\u0642\u0627\u062a \u0644\u0644\u0646\u0642\u0627\u0634 \u0645\u062a\u062a\u0627\u0644\u064a\u0629 \u0645\u0639 \u062a\u062e\u0635\u064a\u0635 \u0662\u0665 \u062f\u0642\u064a\u0642\u0629 \u0644\u0643\u0644 \u0645\u0646\u0647\u0627. \u0633\u062a\u0636\u0645 \u0643\u0644 \u0637\u0627\u0648\u0644\u0629 \u0663-\u0664 \u062e\u0628\u0631\u0627\u0621 \u0648\u0645\u0634\u0631\u0641 \u0648\u0627\u062d\u062f \u0648 \u0661-\u0662 \u062d\u0631\u0641\u064a\u064a\u0646.',
        'Round Table Discussion 01 (25 min) Documenting Craftsmanship':
          '\u0627\u0644\u062d\u0644\u0642\u0629 \u0627\u0644\u0623\u0648\u0644\u0649  (\u0662\u0665 \u062f\u0642\u064a\u0642\u0629): \u062a\u0648\u062b\u064a\u0642 \u0627\u0644\u062d\u0631\u0641\u064a\u0629',
        "Round Table Discussion 02 (25 min) Legitimizing Craftsmen's Presence":
          '\u0627\u0644\u062d\u0644\u0642\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629  (\u0662\u0665 \u062f\u0642\u064a\u0642\u0629): \u0625\u0636\u0641\u0627\u0621 \u0627\u0644\u0634\u0631\u0639\u064a\u0629 \u0639\u0644\u0649 \u0648\u062c\u0648\u062f \u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646 ',
        'Exploring the potential of archiving and documentation as a means to stimulate a vibrant crafts culture.':
          '\u0627\u0633\u062a\u0643\u0634\u0627\u0641 \u0625\u0645\u0643\u0627\u0646\u0627\u062a \u0627\u0644\u0623\u0631\u0634\u0641\u0629 \u0648\u0627\u0644\u062a\u0648\u062b\u064a\u0642 \u0643\u0648\u0633\u064a\u0644\u0629 \u0644\u062a\u062d\u0641\u064a\u0632 \u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0627\u0644\u0646\u0627\u0628\u0636\u0629 \u0628\u0627\u0644\u062d\u064a\u0627\u0629.',
        "Advocating for the regulatory laws, crafts people's legal rights, and articulating the economic value of the crafts sector.":
          '\u0627\u0644\u062f\u0641\u0627\u0639 \u0639\u0646 \u0627\u0644\u0642\u0648\u0627\u0646\u064a\u0646 \u0627\u0644\u0645\u0646\u0638\u0645\u0629 \u0648\u0627\u0644\u062d\u0642\u0648\u0642 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0644\u0623\u0635\u062d\u0627\u0628 \u0627\u0644\u062d\u0631\u0641 \u0648\u062a\u0648\u0636\u064a\u062d \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f\u064a\u0629 \u0644\u0642\u0637\u0627\u0639 \u0627\u0644\u062d\u0631\u0641.',
        'Round Table Discussion 03 (25 min) Mobilizing Crafts in Shared Spaces':
          ' \u0627\u0644\u062d\u0644\u0642\u0629 \u0627\u0644\u062b\u0627\u0644\u062b\u0629 (\u0662\u0665 \u062f\u0642\u064a\u0642\u0629): \u062f\u0648\u0631 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0641\u064a \u062a\u0641\u0639\u064a\u0644 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u0633\u0627\u062d\u0627\u062a \u0627\u0644\u0645\u0634\u062a\u0631\u0643\u0629 ',
        'Leveraging the intersection of data, art, and shared space as a catalyst for craftsmanship in the city.':
          '\u0627\u0644\u0627\u0633\u062a\u0641\u0627\u062f\u0629 \u0645\u0646 \u062a\u0642\u0627\u0637\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u0641\u0646 \u0648\u0627\u0644\u0645\u0633\u0627\u062d\u0629 \u0627\u0644\u0645\u0634\u062a\u0631\u0643\u0629 \u0643\u0645\u062d\u0641\u0632 \u0644\u0644\u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629.',
        Break: ' \u0625\u0633\u062a\u0631\u0627\u062d\u0629',
        745: '\u0667:\u0664\u0665',
        '800pm': '\u0668:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b',
        800: '\u0668:\u0660\u0660',
        900: '\u0669:\u0660\u0660',
        'Data Collectors are asked to scan collected items/findings.':
          '\u064a\u064f\u0637\u0644\u0628 \u0645\u0646 \u062c\u0627\u0645\u0639\u064a \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0633\u062d \u0627\u0644\u0639\u0646\u0627\u0635\u0631 / \u0627\u0644\u0646\u062a\u0627\u0626\u062c \u0627\u0644\u062a\u064a \u062a\u0645 \u062c\u0645\u0639\u0647\u0627.',
        'Mapathon Discussion':
          '\u0645\u0646\u0627\u0642\u0634\u0629 \u062d\u0648\u0644 \u0627\u0644- Mapathon',
        '900pm': '\u0669:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b',
        'Mapathons are workshops designed specifically to map new data on the existing database of craftsmanship in Beirut. The goal of the mapathon is to invite the public, as well as local photographers, craftsmen, elders, and others to grow the database of historical and current images and locations of craftsmen in Beirut. Every new finding and correction to the map will be projected and displayed in real-time.':
          '\u0627\u0644-\u0645\u0627\u0628\u0627\u062b\u0648\u0646 \u0647\u064a \u0648\u0631\u0634 \u0639\u0645\u0644 \u0645\u0635\u0645\u0645\u0629 \u062e\u0635\u064a\u0635\u064b\u0627 \u0644\u0631\u0633\u0645 \u062e\u0631\u064a\u0637\u0629 \u0644\u0628\u064a\u0627\u0646\u0627\u062a \u062c\u062f\u064a\u062f\u0629 \u062d\u0648\u0644 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0644\u0644\u062d\u0631\u0641 \u0627\u0644\u064a\u062f\u0648\u064a\u0629 \u0641\u064a \u0628\u064a\u0631\u0648\u062a. \u0627\u0644\u0647\u062f\u0641 \u0645\u0646 \u0627\u0644-\u0645\u0627\u0628\u0627\u062b\u0648\u0646 \u0647\u0648 \u062f\u0639\u0648\u0629 \u0627\u0644\u062c\u0645\u0647\u0648\u0631 \u0648\u0643\u0630\u0644\u0643 \u0627\u0644\u0645\u0635\u0648\u0631\u064a\u0646 \u0627\u0644\u0645\u062d\u0644\u064a\u064a\u0646 \u0648\u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646 \u0648\u0627\u0644\u0634\u064a\u0648\u062e \u0648\u063a\u064a\u0631\u0647\u0645 \u0644\u062a\u0648\u0633\u064a\u0639 \u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0648\u0627\u0644\u062d\u0627\u0644\u064a\u0629 \u0648\u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u062d\u0631\u0641\u064a\u064a\u0646 \u0641\u064a \u0628\u064a\u0631\u0648\u062a. \u0633\u064a\u062a\u0645 \u0639\u0631\u0636 \u0643\u0644 \u0627\u0643\u062a\u0634\u0627\u0641 \u0648\u062a\u0635\u062d\u064a\u062d \u062c\u062f\u064a\u062f \u0644\u0644\u062e\u0631\u064a\u0637\u0629 \u0641\u064a \u0627\u0644\u0648\u0642\u062a \u0627\u0644\u0641\u0639\u0644\u064a.',
        'Experts and participants are asked to brainstorm effective ways to use the open database within their scope of work.':
          '\u064a\u064f\u0637\u0644\u0628 \u0645\u0646 \u0627\u0644\u062e\u0628\u0631\u0627\u0621 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064a\u0646 \u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0641\u064a \u0637\u0631\u0642 \u0641\u0639\u0627\u0644\u0629 \u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0641\u062a\u0648\u062d\u0629 \u0641\u064a \u0646\u0637\u0627\u0642 \u0639\u0645\u0644\u0647\u0645.',
        'Guests and participants are invited to contribute to the database with their \u201cliving heritage item.\u201d':
          '\u0627\u0644\u0636\u064a\u0648\u0641 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u064a\u0646 \u0645\u062f\u0639\u0648\u0648\u0646 \u0644\u0644\u0645\u0633\u0627\u0647\u0645\u0629 \u0641\u064a \u0642\u0627\u0639\u062f\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0645\u0639 \u0639\u0646\u0635\u0631 \u0627\u0644\u062a\u0631\u0627\u062b\u0627\u0644\u062d\u064a',
        'Closing Remarks':
          '\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u062e\u062a\u0627\u0645\u064a\u0629',
        '915pm': '\u0669:\u0661\u0665 \u0645\u0633\u0627\u0621\u064b',
        'MIT FHL & CDDL will conclude the event with closing remarks.':
          '\u0633\u0648\u0641 \u064a\u062e\u062a\u062a\u0645 MIT FHL & CDDL \u0627\u0644\u062d\u062f\u062b \u0628\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u062e\u062a\u0627\u0645\u064a\u0629.',
        Credits: '\u0627\u0644\u062a\u0642\u0652\u062f\u0650\u064a\u0631',
        'This project has been developed by the Massachusetts Institute of Technology (MIT); more specifically by the Civic Data Design Lab and the Future Heritage Lab. The \u201cLiving Heritage Atlas | Beirut\u201d is supported by \u201cDar Group\u201d through a 2021 seed grant that has enabled MIT faculty members to conduct research on the challenges experienced in Beirut in the aftermath of the August 2020 port explosion.':
          '\u062a\u0645 \u062a\u0637\u0648\u064a\u0631 \u0647\u0630\u0627 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0646 \u0642\u0650\u0628\u0644 \u0645\u0639\u0647\u062f \u0645\u0627\u0633\u0627\u062a\u0634\u0648\u0633\u062a\u0633 \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 (MIT) \u060c \u062a\u062d\u062f\u064a\u062f\u0627 \u0645\u0646 \u0642\u0650\u0628\u0644 \u0645\u062e\u062a\u0628\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0646\u064a\u0629 \u0648\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a. \u064a\u062a\u0645 \u062f\u0639\u0645 "\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a" \u0645\u0646 \u0642\u0650\u0628\u0644 "\u0645\u062c\u0645\u0648\u0639\u0629 \u062f\u0627\u0631" \u0645\u0646 \u062e\u0644\u0627\u0644 \u0645\u0646\u062d\u0629 \u062a\u0623\u0633\u064a\u0633\u064a\u0629 \u0644\u0639\u0627\u0645 2021 \u0645\u0643\u0651\u0646\u062a \u0623\u0639\u0636\u0627\u0621 \u0647\u064a\u0626\u0629 \u0627\u0644\u062a\u062f\u0631\u064a\u0633 \u0641\u064a \u0645\u0639\u0647\u062f \u0645\u0627\u0633\u0627\u062a\u0634\u0648\u0633\u062a\u0633 \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0645\u0646 \u0625\u062c\u0631\u0627\u0621 \u0623\u0628\u062d\u0627\u062b \u062d\u0648\u0644 \u0627\u0644\u062a\u062d\u062f\u0651\u064a\u0627\u062a \u0627\u0644\u062a\u064a \u0648\u0627\u062c\u0647\u062a\u0647\u0627 \u0628\u064a\u0631\u0648\u062a \u0641\u064a \u0623\u0639\u0642\u0627\u0628 \u0627\u0646\u0641\u062c\u0627\u0631 \u0627\u0644\u0645\u0631\u0641\u0623 \u0641\u064a \u0623\u063a\u0633\u0637\u0633 2020.',
        'Future Heritage Lab':
          '\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a',
        'The MIT Future Heritage Lab invents creative responses to conflict and crisis. We develop and implement projects and alternative educational formats at the intersection of art, culture, and preservation technology to address the emotional, cultural, and practical needs of communities in threat. We believe that culture is an essential human need, and a powerful tool to address conflicts and injustice. We build on our experience in Art, Design, and Cultural Preservation and leverage the MIT expertise in new technologies to collaborate with a global and diverse network of partners and ensure the quality and a wide reach of our work. We build future heritage by creating cultural projects on a civic scale that translate traditional crafts into new technologies, advance  knowledge transfer across borders, and have a positive impact on threatened communities.':
          '\u064a\u062e\u062a\u0631\u0639 \u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a \u0641\u064a \u0645\u0639\u0647\u062f \u0645\u0627\u0633\u0627\u062a\u0634\u0648\u0633\u062a\u0633 \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0627\u0633\u062a\u062c\u0627\u0628\u0627\u062a \u0625\u0628\u062f\u0627\u0639\u064a\u0629 \u0644\u0644\u0635\u0631\u0627\u0639 \u0648\u0627\u0644\u0623\u0632\u0645\u0627\u062a. \u0646\u0642\u0648\u0645 \u0628\u062a\u0637\u0648\u064a\u0631 \u0648\u062a\u0646\u0641\u064a\u0630 \u0645\u0634\u0627\u0631\u064a\u0639 \u0648\u0623\u0634\u0643\u0627\u0644 \u062a\u0639\u0644\u064a\u0645\u064a\u0629 \u0628\u062f\u064a\u0644\u0629 \u0641\u064a \u062a\u0642\u0627\u0637\u0639 \u0627\u0644\u0641\u0646 \u0648\u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0648\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0627\u0644\u062d\u0641\u0638 \u0644\u062a\u0644\u0628\u064a\u0629 \u0627\u0644\u0627\u062d\u062a\u064a\u0627\u062c\u0627\u062a \u0627\u0644\u0639\u0627\u0637\u0641\u064a\u0629 \u0648\u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629 \u0648\u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0644\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u0645\u0647\u062f\u062f\u0629. \u0646\u0639\u062a\u0642\u062f \u0623\u0646 \u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0647\u064a \u062d\u0627\u062c\u0629 \u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u0623\u0633\u0627\u0633\u064a\u0629 \u060c \u0648\u0623\u062f\u0627\u0629 \u0642\u0648\u064a\u0629 \u0644\u0645\u0639\u0627\u0644\u062c\u0629 \u0627\u0644\u0646\u0632\u0627\u0639\u0627\u062a \u0648\u0627\u0644\u0638\u0644\u0645. \u0646\u062d\u0646 \u0646\u0628\u0646\u064a \u0639\u0644\u0649 \u062e\u0628\u0631\u062a\u0646\u0627 \u0641\u064a \u0627\u0644\u0641\u0646 \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0648\u0627\u0644\u0645\u062d\u0627\u0641\u0638\u0629 \u0639\u0644\u0649 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062b\u0642\u0627\u0641\u064a \u0648\u0646\u0633\u062a\u0641\u064a\u062f \u0645\u0646 \u062e\u0628\u0631\u0629 \u0645\u0639\u0647\u062f \u0645\u0627\u0633\u0627\u062a\u0634\u0648\u0633\u062a\u0633 \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0641\u064a \u0627\u0644\u062a\u0642\u0646\u064a\u0627\u062a \u0627\u0644\u062c\u062f\u064a\u062f\u0629 \u0644\u0644\u062a\u0639\u0627\u0648\u0646 \u0645\u0639 \u0634\u0628\u0643\u0629 \u0639\u0627\u0644\u0645\u064a\u0629 \u0648\u0645\u062a\u0646\u0648\u0639\u0629 \u0645\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u0621 \u0648\u0644\u0636\u0645\u0627\u0646 \u062c\u0648\u062f\u0629 \u0639\u0645\u0644\u0646\u0627 \u0648\u0646\u0637\u0627\u0642\u0647 \u0627\u0644\u0648\u0627\u0633\u0639. \u0646\u062d\u0646 \u0646\u0628\u0646\u064a \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a \u0645\u0646 \u062e\u0644\u0627\u0644 \u0625\u0646\u0634\u0627\u0621 \u0645\u0634\u0627\u0631\u064a\u0639 \u062b\u0642\u0627\u0641\u064a\u0629 \u0639\u0644\u0649 \u0646\u0637\u0627\u0642 \u0645\u062f\u0646\u064a \u062a\u062a\u0631\u062c\u0645 \u0627\u0644\u062d\u0631\u0641 \u0627\u0644\u062a\u0642\u0644\u064a\u062f\u064a\u0629 \u0625\u0644\u0649 \u062a\u0642\u0646\u064a\u0627\u062a \u062c\u062f\u064a\u062f\u0629 \u060c \u0648\u062a\u0639\u0632\u0632 \u0646\u0642\u0644 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0639\u0628\u0631 \u0627\u0644\u062d\u062f\u0648\u062f \u060c \u0648\u0644\u0647\u0627 \u062a\u0623\u062b\u064a\u0631 \u0625\u064a\u062c\u0627\u0628\u064a \u0639\u0644\u0649 \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u0645\u0647\u062f\u062f\u0629.',
        'Civic Data Design Lab':
          '\u0645\u062e\u062a\u0628\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0646\u064a\u0629 ',
        'The MIT Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by using spatial analytics to expose patterns and communicating those results, through design, to new audiences.':
          '\u064a\u0639\u0645\u0644 \u0645\u062e\u062a\u0628\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0646\u064a\u0629 \u0641\u064a \u0645\u0639\u0647\u062f \u0645\u0627\u0633\u0627\u062a\u0634\u0648\u0633\u062a\u0633 \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627 \u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0644\u0641\u0647\u0645\u0647\u0627 \u0644\u0644\u0635\u0627\u0644\u062d \u0627\u0644\u0639\u0627\u0645. \u0646\u062d\u0646 \u0646\u0633\u0639\u0649 \u0625\u0644\u0649 \u062a\u0637\u0648\u064a\u0631 \u0645\u0645\u0627\u0631\u0633\u0627\u062a \u0628\u062f\u064a\u0644\u0629 \u064a\u0645\u0643\u0646 \u0623\u0646 \u062a\u062c\u0639\u0644 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064a \u0646\u0642\u0648\u0645 \u0628\u0647 \u0628\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u0635\u0648\u0631 \u0623\u0643\u062b\u0631 \u062b\u0631\u0627\u0621\u064b \u0648\u0630\u0643\u0627\u0621\u064b \u0648\u0623\u0643\u062b\u0631 \u0635\u0644\u0629 \u0628\u0627\u0644\u0645\u0648\u0636\u0648\u0639 \u0648\u0623\u0643\u062b\u0631 \u0627\u0633\u062a\u062c\u0627\u0628\u0629 \u0644\u0627\u062d\u062a\u064a\u0627\u062c\u0627\u062a \u0648\u0645\u0635\u0627\u0644\u062d \u0627\u0644\u0645\u0648\u0627\u0637\u0646\u064a\u0646 \u0627\u0644\u0630\u064a\u0646 \u0647\u0645 \u062a\u0642\u0644\u064a\u062f\u064a\u064b\u0627 \u0639\u0644\u0649 \u0647\u0627\u0645\u0634 \u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0633\u064a\u0627\u0633\u0627\u062a. \u0641\u064a \u0647\u0630\u0647 \u0627\u0644\u0645\u0645\u0627\u0631\u0633\u0629 \u060c \u0646\u062c\u0631\u0628 \u0648\u0646\u0637\u0648\u0631 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u062a\u0635\u0648\u0631 \u0648\u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0633\u0645\u062d \u0644\u0646\u0627 \u0628\u062a\u0633\u0644\u064a\u0637 \u0627\u0644\u0636\u0648\u0621 \u0639\u0644\u0649 \u0627\u0644\u0638\u0648\u0627\u0647\u0631 \u0627\u0644\u062d\u0636\u0631\u064a\u0629. \u062a\u0633\u062a\u0639\u064a\u0631 \u0623\u0633\u0627\u0644\u064a\u0628\u0646\u0627 \u0645\u0646 \u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u0639\u0644\u0645 \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u062a\u062d\u0644\u064a\u0644\u0627\u062a \u0627\u0644\u0645\u0643\u0627\u0646\u064a\u0629 \u0644\u0643\u0634\u0641 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0648\u0625\u064a\u0635\u0627\u0644 \u062a\u0644\u0643 \u0627\u0644\u0646\u062a\u0627\u0626\u062c \u060c \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u062a\u0635\u0645\u064a\u0645 \u060c \u0625\u0644\u0649 \u062c\u0645\u0627\u0647\u064a\u0631 \u062c\u062f\u064a\u062f\u0629.',
        'Future Heritage Lab Team':
          '\u0641\u0631\u064a\u0642 \u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a',
        'Civic Data Design Lab Team':
          '\u0641\u0631\u064a\u0642 \u0645\u062e\u062a\u0628\u0631 \u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u062f\u0646\u064a\u0629 ',
        'Azra Aksamija, Director': '',
        'Daniella Maamari (MIT SMArchS \u201820), Lead Researcher & Project Manager':
          '',
        'Sarine Agopian, Archival Research Assistant': '',
        'Ahmad Beydoun, Design/Events Assistant': '',
        'Ramzi Alieh, Design/Fabrication Assistant': '',
        'Racha Doughman, Events Manager': '',
        'Reem Obeid, Fieldwork/ Research Assistant': '',
        'Rasha Zayour, Fieldwork/ Research Assistant': '',
        'Reem Farhat, Fieldwork Assistant': '',
        'Kamila El Khechen, Fieldwork Assistant': '',
        'Raafat Majzoub, Research Contributor': '',
        'Sarah Williams, Director': '',
        'Carmelo Ignaccolo (Ph.D. Candidate at MIT DUSP), Lead Researcher & Project Manager':
          '',
        'Ashley Louie, Project Manager': '',
        'Enrique Casillas, Research Assistant Web Developer': '',
        'Huiwen Shi, Research Assistant Web Developer': '',
        'Sophia Zheng, GIS Research Assistant': '',
        'Doris Duanmu, Graphic Design Assistant': '',
        'Gatlen Culp, Research Assistant Web Developer ': '',
        'Kelly Fang, Research Assistant Web Developer ': '',
        'Wesley Woo, Research Assistant Web Developer ': '',
        'Rasha Zayour, Research Assistant Translation': '',
        'Program Schedule':
          '\u062c\u062f\u0648\u0644 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c',
        'Register to attend Living Heritage Atlas | Beirut events via the ':
          '\u0633\u062c\u0644 \u0644\u062d\u0636\u0648\u0631 \u062d\u062f\u062b "\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0628\u064a\u0631\u0648\u062a" \u0639\u0628\u0631',
        Date: '\u0627\u0644\u062a\u0627\u0631\u064a\u062e:',
        'Tuesday, July 5':
          '\u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621 \u0665 \u062a\u0645\u0648\u0632 ',
        'Wednesday, July 6':
          '\u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621 \u0666 \u062a\u0645\u0648\u0632 ',
        'Thursday, July 7':
          '\u0627\u0644\u062e\u0645\u064a\u0633 \u0667 \u062a\u0645\u0648\u0632 ',
        'Friday, July 8':
          '\u0627\u0644\u062c\u0645\u0639\u0629 \u0668 \u062a\u0645\u0648\u0632 ',
        'Crafts Workshops Tour':
          '\u062c\u0648\u0644\u0629 \u0641\u064a \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u062d\u0631\u0641\u064a',
        'Gemmayze - Mar Mikhael (Doniguian Armenian bookstore)':
          '\u0627\u0644\u062c\u0645\u064a\u0632\u0629 - \u0645\u0627\u0631 \u0645\u062e\u0627\u064a\u0644 (\u0645\u0643\u062a\u0628\u0629 \u062f\u0648\u0646\u064a\u063a\u064a\u0627\u0646 \u0627\u0644\u0623\u0631\u0645\u0646\u064a\u0629)',
        'Intimate walking tour of 3-4 craft workshops in the Gemmayze and Mar Mikhael area':
          '\u062c\u0648\u0644\u0629 \u062d\u0645\u064a\u0645\u0629 \u0645\u0646 \u0663 \u0625\u0644\u0649 \u0664 \u0648\u0631\u0634 \u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062c\u0645\u064a\u0632\u0629 \u0648\u0645\u0627\u0631 \u0645\u062e\u0627\u064a\u0644',
        200: '\u0662:\u0660\u0660',
        '400pm': '\u0664:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b',
        'Archival Workshops Tour':
          '\u062c\u0648\u0644\u0629 \u0641\u064a \u0648\u0631\u0634 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0623\u0631\u0634\u064a\u0641\u064a\u0629',
        'Al Balad (Samir Kassir Square)':
          '\u0627\u0644\u0628\u0644\u062f (\u0633\u0627\u062d\u0629 \u0633\u0645\u064a\u0631 \u0642\u0635\u064a\u0631)',
        'Walking tour of the locations of the old craft workshops and souks in Al Balad':
          '\u062c\u0648\u0644\u0629 \u0641\u064a \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0648\u0631\u0634 \u0648\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u0642\u062f\u064a\u0645\u0629 \u0641\u064a \u0627\u0644\u0628\u0644\u062f',
        600: '\u0666:\u0660\u0660',
        'No events':
          '\u0644\u0627 \u064a\u0648\u062c\u062f \u0623\u062d\u062f\u0627\u062b \u0641\u064a \u0647\u0630\u0627 \u0627\u0644\u064a\u0648\u0645',
        'Living Heritage Atlas | Event (Abroyan Factory, Bourj Hammoud)':
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a | \u0627\u0644\u062d\u062f\u062b (\u0645\u0635\u0646\u0639 \u0627\u0628\u0631\u0648\u064a\u0627\u0646 \u060c \u0628\u0631\u062c \u062d\u0645\u0648\u062f)',
        'Living Heritage Atlas Event':
          '\u0623\u0637\u0644\u0633 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u062d\u064a \u0627\u0644\u062d\u062f\u062b',
        '(Abroyan Factory, Bourj Hammoud)':
          '(\u0645\u0635\u0646\u0639 \u0627\u0628\u0631\u0648\u064a\u0627\u0646 \u060c \u0628\u0631\u062c \u062d\u0645\u0648\u062f)',
        'Opening remarks by MIT CDDL & FHL (6:00 - 6:30 PM)':
          '\u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0627\u0641\u062a\u062a\u0627\u062d\u064a\u0629 \u0645\u0646 MIT CDDL & FHL (\u0666:\u0660\u0660 - \u0666:\u0663\u0660 \u0645\u0633\u0627\u0621\u064b)',
        'Mapping methods, 3 roundtable discussions (6:30 - 7:45 PM)':
          '\u0662. \u0637\u0631\u0642 \u0627\u0644\u0645\u0633\u062d \u060c \u0663 \u0645\u0646\u0627\u0642\u0634\u0627\u062a (\u0666:\u0663\u0660 - \u0667:\u0664\u0665 \u0645\u0633\u0627\u0621\u064b)',
        'Mapathon (8:00 - 9:00 PM)':
          '\u0663. \u0645\u0627\u0628\u0627\u062b\u0648\u0646 (\u0668:\u0660\u0660 - \u0669:\u0660\u0660 \u0645\u0633\u0627\u0621\u064b)',
        'Closing remarks (9:00 - 9:15 PM)':
          '\u0664. \u0645\u0644\u0627\u062d\u0638\u0627\u062a \u062e\u062a\u0627\u0645\u064a\u0629 (\u0669:\u0660\u0660 - \u0669:\u0661\u0665 \u0645\u0633\u0627\u0621\u064b)',
        'Intimate walking tour of 3-4 craft workshops in the Bourj Hammoud area':
          '\u062c\u0648\u0644\u0629 \u062d\u0645\u064a\u0645\u0629 \u0645\u0646 \u0663 \u0625\u0644\u0649 \u0664 \u0648\u0631\u0634 \u062d\u0631\u0641\u064a\u0629 \u0641\u064a \u0645\u0646\u0637\u0642\u0629 \u0628\u0631\u062c \u062d\u0645\u0648\u062f',
        'Bourj Hammoud (Municipality Square)':
          '\u0628\u0631\u062c \u062d\u0645\u0648\u062f (\u0645\u064a\u062f\u0627\u0646 \u0627\u0644\u0628\u0644\u062f\u064a\u0629)',
        'Walking tour of the locations of the old craft workshops and souks in Bourj Hammoud':
          '\u062c\u0648\u0644\u0629 \u0641\u064a \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0648\u0631\u0634 \u0648\u0627\u0644\u0623\u0633\u0648\u0627\u0642 \u0627\u0644\u062d\u0631\u0641\u064a\u0629 \u0627\u0644\u0642\u062f\u064a\u0645\u0629 \u0641\u064a \u0628\u0631\u062c \u062d\u0645\u0648\u062f',
        'We invite you to download data from the Living Heritage Atlas to use this data responsibly.':
          'ندعوكم لتنزيل البيانات من أطلس التراث الحي لاستخدامها بشكل مسؤول.',
        'Craftspeople have a historic role in perpetuating cultural practices in the city through their products and workshop spaces that are sites of socializing, learning, and commerce. However, they are marginalized in every reconstruction of the city and its subsequent gentrification. Our team believes that their movements and their workshops tell key stores on the urban development of Beirut that are worth uncovering.':
          'يلعب الحرفيون دورًا تاريخيًا في إدامة الممارسات الثقافية في المدينة من خلال منتجاتهم ومساحات ورش العمل التي تعتبر مواقع للتواصل الاجتماعي والتعلم والتجارة. ومع ذلك ، يتم تهميشهم في كل إعادة بناء للمدينة وترميمها اللاحق. يعتقد فريقنا أن تحركاتهم وورش عملهم تخبر المتاجر الرئيسية عن التطور الحضري لبيروت التي تستحق الكشف عنها.',
        'The Living Heritage Atlas | Beirut has conducted multiple data collection initiatives through interviews, desk-research, archivla research, and surveys in the field. The data collected by our team includes personal photos from craftspeople, visual material collected from libraries and private collections, and inputs received through our crowdsourcing platform, where users are invited to contribute to this database. The Living Heritage Atlas | Beirut is a unique dataset which includes:':
          'أطلس التراث الحي | بيروت أقام بمبادرات متعددة لجمع البيانات من خلال المقابلات ، والبحوث المكتبية ، وأبحاث الأرشيف ، والاستطلاعات الميدانية. تتضمن البيانات التي يجمعها فريقنا صورًا شخصية من حرفيين ، ومواد مرئية تم جمعها من المكتبات والمجموعات الخاصة ، والمدخلات الواردة من خلال منصة التعهيد الجماعي الخاصة بنا ، حيث تتم دعوة المستخدمين للمساهمة في قاعدة البيانات هذه. أطلس التراث الحي | بيروت هي مجموعة بيانات فريدة تشمل:',
        '20+ interviews with local stakeholders, NGOs, government organizations, and international agencies who joined forces since the aftermath of the August 4th explosion in Beirut':
          'أكثر من ٢٠ مقابلة مع أصحاب المصلحة المحليين والمنظمات غير الحكومية والمنظمات الحكومية والوكالات الدولية الذين وحدوا قواهم منذ أعقاب انفجار 4 آب في بيروت',
        "100+ location points of 100+ craftspeoples' workshops":
          'أكثر من ١٠٠ نقطة موقع لأكثر من ١٠٠ ورشة عمل للحرفيين',
        '60+ survey responses from craftspeople':
          'أكثر من ٦٠ استجابات استقصائية من الحرفيين',
        '600+ archival entries (both textual and visual) on craft spaces and workshops between the early 20th Century to present day':
          '٦٠٠+ مدخلات أرشيفية (نصية ومرئية) في المساحات الحرفية وورش العمل بين أوائل القرن العشرين حتى يومنا هذا',
        'Craft Workshop Data': 'بيانات ورشة العمل الحرفية',
        'This dataset contains publicly accessible information on current local craft workshops in Beirut. Data attributes available in this download include: location (latitude and longitude), craft type, operation status, decade of year established, and whether crafts are produced on site.':
          'تحتوي مجموعة البيانات هذه على معلومات يمكن  للجمهور الوصول إليها حول ورش العمل الحرفية المحلية الحالية في بيروت. تتضمن سمات البيانات المتوفرة في هذا التنزيل: الموقع (خطوط الطول والعرض) ، ونوع الحرفة ، وحالة العملية ، وعقد من العام ، وما إذا كان يتم إنتاج الحرف اليدوية في الموقع.',
        'Suggested citation:': 'الاقتباس المقترح:',
        'This dataset contains information gathered from multi-site archival research on the presence of craftsmanship in Beirut over time. Data attributes available in this download include: location (latitude and longitude), craft type, image caption, image type, year photo taken, reference source':
          'تحتوي مجموعة البيانات هذه على معلومات تم جمعها من أبحاث أرشيفية متعددة المواقع حول وجود الحرف اليدوية في بيروت بمرور الوقت. تشمل سمات البيانات المتوفرة في هذا التنزيل: الموقع (خطوط الطول والعرض) ، ونوع الحرف ، وتعليق الصورة ، ونوع الصورة ، وسنة التقاط الصورة ، والمصدر المرجعي',
        'MIT Civic Data Design Lab, Future Heritage Lab. Living Heritage Atlas | Beirut: Archival Information. Massachusetts Institute of Technology, 2022.':
          ' MIT مختبر تصميم البيانات المدنية،مختبر التراث المستقبلي. أطلس التراث الحي | بيروت: معلومات أرشيفية. معهد ماساتشوستس للتكنولوجيا، ٢٠٢٢.',
        'Images and Image Metadata': 'الصور والبيانات الوصفية للصور',
        'Download CSV': 'تنزيل ملف CSV',
        'Download JSON': 'تنزيل ملف  JSON',
        'Archival Information Data': 'بيانات المعلومات الأرشيفية',
        'Images from Living Heritage Atlas | Beirut are not currently available for download, but we plan to make these available in the near future. Stay tuned for more information soon!':
          'صور من أطلس التراث الحي | بيروت غير متاحة حاليًا للتنزيل ، لكننا نخطط لإتاحتها في المستقبل القريب. ترقبوا المزيد من المعلومات قريبا!',
        Submit: 'إرسال',
        '* Please enter a valid url': '* أدخل رابط صحيح من فضلك',
        '* Please enter a valid email address':
          '* يرجى إدخال عنوان بريد إلكتروني صالح',
        '* Please enter a valid phone number.': '* يرجى إدخال رقم هاتف صالح.',
        'The following fields are invalid:': 'التالية غير صالحة:',
        // "* The following fields are invalid: Phone Number, Email, Website, Social Media":"* الحقول التالية غير صالحة: رقم الهاتف ، البريد الإلكتروني ، الموقع الإلكتروني ، وسائل التواصل الاجتماعي",
        Select: 'إختيار',
        or: 'أو',
        Operation: 'عملية',
        'Select up to': 'إختار  ما يصل إلى',
        options: 'الخيارات',
        'Image Tags': 'وسوم الصورة',
        'Upload an image of the craft workshop':
          'قم بتحميل صورة لورشة العمل الحرفية',
        'Locate the craft workshop on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly.':
          'حدد موقع الورشة الحرفية على الخريطة. يرجى التكبير وتحريك الإشارة لضبط الدقة وللتأكيد على أن الإشارة موجودة بشكل صحيح.',
        'About the Workshop': ' نبذة عن الورشة',
        'Workshop Location': 'موقع الورشة',
        'Craft Workshop Location': 'موقع ورشة الحرف اليدوية',
        'Loading Workshops and Archival Images': 'تحميل صور الورش والأرشيف',
        'Please only select up to': 'الرجاء الإختيار ما يصل إلى',
        'options.': 'الخيارات.',
        'You have already selected this tag from the default tags.':
          'لقد قمت بالفعل بإختيار هذا الوسم من الوسوم الافتراضية.',
        'Please select it from the default tags.':
          'يرجى الإختيار من الوسوم الافتراضية.',
        'Please enter a tag that is less than 50 characters.':
          ' الرجاء إدخال وسم أقل من 50 حرفًا.',
        'Enter Other': 'أدخل أخرى',
        'Dar El-Mreisseh': 'دار المريسة',
        Qantari: 'قنطاري',
        Jamia: 'الجامعة',
        Parc: 'الحديقة',
        'Consent to Publish Data': 'الموافقة على نشر البيانات',
        'Business contact information required':
          'معلومات الاتصال المهنية مطلوبة',
        'Craft Category': 'فئة الحرفة',
        'Type of Craft': 'نوع الحرفة',
        'Your custom tag was invalid.': 'وسمك المخصص غير صالح.',
        'Please enter a tag that contains only letters.':
          'الرجاء إدخال وسم يحتوي على أحرف فقط.',
        'Closed (permanent)': 'مغلق (بشكل دائم) ',
        'Your response has been recorded.': 'لقد تم تسجيل ردك.',
        'Submitting...': 'يتم الارسال...',
        'to return to your form.': 'للعودة إلى النموذج الخاص بك.',
        Map: 'خريطة',
        workshop: 'ورشة',
        Since: 'منذ',
        'This archive image has been reviewed and verified.':
          'تمت مراجعة صورة الأرشيف هذه والتحقق منها.',
        'This archive image has not been reviewed and verified':
          'لم يتم مراجعة صورة الأرشيف هذه والتحقق منها.',
        'This crafts workshop has not been reviewed and verified':
          'لم يتم مراجعة هذه الورشة والتحقق منها',
        'This crafts workshop has been reviewed and verified':
          'تمت مراجعة ورشة العمل هذه والتحقق منها',
        'Two-hour roundtable discussion and mapping event':
          'مناقشة لمدة ساعتين وحدث المسح',
        'Abroyan Factor —Emile Eddeh Street, Bouj Hammoud, Beirut':
          'مصنع ابرويان - شارع اميل اده ، برج حمود ، بيروت',
        'We will begin with introductions; each participant will be given a tag based on their contribution to the event. Categories will include: expert, contributor, advocate, moderator, craftsperson, data collector.':
          'سنبدأ مع مقدمات. سيتم منح كل مشارك علامة بناءً على مساهمته في الحدث. ستشمل الفئات: خبير ، مساهم ، محامي ، وسيط ، حرفي ، جامع بيانات.',
        'MIT FHL & CDDL will kick-off the event with an opening presentation.':
          'سيبدأ مختبري MIT FHL & CDDL الحدث بعرض افتتاحي.',
        "We will divide into sub-groups to focus the discussion on three main topics: Documenting Craftsmanship, Legitimizing Craftspeople's Presence, and Mobilizing Crafts in Shared Spaces. Participants in each group will be asked to share their methods and to articulate different approaches to preserve living heritage. The moderator at each table will lead the discussion and report summarized findings at the end of the discussion. Experts will be guided to one of three tables based on their area of expertise. Discussion sub-groups:":
          'سنقسم إلى مجموعات فرعية لتركيز المناقشة على ثلاثة مواضيع رئيسية: توثيق الحرفية ، وإضفاء الشرعية على حضور الحرف اليدوية ، وتعبئة الحرف في الأماكن المشتركة. سيُطلب من المشاركين في كل مجموعة مشاركة أساليبهم والتعبير عن مناهج مختلفة للحفاظ على التراث الحي. سيقود المنسق في كل طاولة المناقشة ويبلغ النتائج الملخصة في نهاية المناقشة. سيتم إرشاد الخبراء إلى أحد الجداول الثلاثة بناءً على مجال خبرتهم. مجموعات المناقشة الفرعية:',
        'Data collectors will collect and scan your living heritage items.':
          'سيقوم جامعو البيانات بجمع وفحص عناصر التراث الحي الخاصة بك.',
        'View Map': 'رؤية الخريطة',
        'View Images': 'رؤية الصور',
        'Please upload images less than 4MB':
          'يرجى تحميل صور أقل من ٤ ميغا بايت',
        'Living Heritage Atlas': 'أطلس التراث الحي',
        'mapping and activating Beirut’s crafts': 'توثيق وتفعيل حرف بيروت',
        'Living Heritage Atlas documents and visualizes Beirut’s living heritage of artisanship by mapping its craftspeople and cataloging its crafts through an open-source database, viewable through an interactive website. This project celebrates the past and present of local artisanship through archival data, interviews and community workshops.':
          'يوثّق ويصوّر أطلس التراث الحيّ تراث بيروت الحيّ للحرف والصناعات التقليدية عن طريق رصد حرفيّيها وتصنيف منتجاتهم في قاعدة بيانات مفتوحة المصدر مُتاحٌ عرضُها على موقع إلكتروني تفاعلي. يحتفي هذا المشروع بالماضي والحاضر للحرفيّين المحليّين من خلال المستندات الأرشيفية والمقابلات وورش العمل المجتمعيّة.',
        "The goal of this atlas is to shed light on the intangible heritage of Beirut by highlighting craftspeople's cultural significance, vulnerability, and potential role in crafting the future of Beirut.":
          'والهدف الأسمى من هذا الأطلس هو إلقاء الضوء على التراث اللامادي لبيروت عن طريق التركيز على أهمية حرفيّي الحرف التقليدية الذين هُمّشوا تاريخيّا ودورهم في تشكيل مستقبل بيروت.',
        'the spatial presence of craftsmanship': 'لتوزّع الجغرافي للحرفيّة',
        'A selection of current and archival visual documentation contained in the Living Heritage Atlas database are displayed to the right — their placement creates a stylized map of the Beirut region. Living Heritage Atlas includes over 800 entries of historic craft workshops spaces and current craft workshops collected through on-site investigations, archival research, and community-based engagement. Each image has been mapped, and can be viewed in the context of Beirut’s urban fabric, thanks to a series of high-resolution historic maps. Explore the complete atlas online to discover Beirut’s intangible heritage through the interactive map.':
          'تظهر إلى اليمين مختارات من الوثائق البصريّة الحالية والأرشيفيّة الموجودة في قاعدة بيانات "أطلس التراث الحيّ"، وترتيبها يخلُق خريطة مُزَخرَفة لمنطقة بيروت. قاعدة معلوماتنا تتضمن أكثر من ٨٠٠ تسجيل لورش عمل حرفية سابقة و ورش عمل حرفيّة حاليّة تم جمعُها من خلال التحقيقات الميدانية والبحث الأرشيفي والمشاركة المجتمعيّة. تم تدوين كل إدخال على الخريطة ويمكن عرضُه في سياق نسيج مدينة بيروت العمراني عبر التاريخ، وذلك بفضل سلسلة من الخرائط التاريخية عالية الدّقة. إستكشف الأطلس الكامل لتراث بيروت اللامادي من خلال الخريطة التفاعليّة على الموقع!',
        'current craft workshops and archival images of craftsmanship':
          ' ورش الحرف التقليدية الحاليّة والصور الأرشيفيّة للورش الحرفيّة السابقة',
        'Living Heritage Atlas includes over 800 entries of historic craft spaces and current craft workshops collected through interviews, archival research, fieldwork, and community-based engagement. This online atlas documents information including the location, dates of operation, and type of craft captured in each image. Explore the complete atlas online to discover Beirut’s intangible heritage through these historic and contemporary images.':
          'قاعدة معلوماتنا تتضمن أكثر من 800 تسجيل لورش عمل حرفية سابقة و ورش عمل حرفيّة حاليّة تم جمعها من خلال التحقيقات الميدانية والبحث الأرشيفي والمشاركة المجتمعيّة. يوثّق هذا الاطلس الالكتروني معلومات عن موقع وتاريخ العمل ونوع الحرفة الموثّقة في كل صورة. إستكشف الأطلس الكامل لتراث بيروت اللامادي من خلال هذه الصور التاريخية والمعاصرة!',
        'Documenting Craftsmanship · Legitimizing Craftspeople’s Presence · Mobilizing Crafts in Shared Spaces':
          'توثيق الحِرَفِيَّة · دعم الوجود الحرفي · تعزيز الحرف في المساحات المشتركة',
        'Roundtable Discussions': 'حلقات النّقاش',
        'In July 2022, the Future Heritage Lab and the Civic Data Design Lab at MIT, the research team that created the Living Heritage Atlas, organized a roundtable discussion focused on preserving the living heritage of craftsmanship in Beirut. Over a dozen prominent stakeholders involved in the craftsmanship community came together to discuss three main topics: documenting craftsmanship, legitimizing craftpeoples’ presence, and mobilizing shared spaces. The event was held in the Abroyan Factory, a former textile factory and adapted event space in Bourj Hammoud.':
          'في تمّوز ٢٠٢٢، نظّم مختبر التراث المستقبلي (Future Heritage Lab) بالتعاون مع مختبر تصميم البيانات المدنيّة (Civic Data (Design Lab في معهد ماساتشوستس للتكنولوجيا (MIT)، وهما الفريقان البحثيّان اللذان أنشآ "أطلس التراث الحيّ"، مناقشات تمحورت حول الحفاظ على التراث الحيّ للحرفيّة في بيروت. إجتمع أكثر من عشرين شخصية بارزة تعمل في مجال الحرفيّة لمناقشة ثلاثة موضوعات رئيسيّة: توثيق الحرفيّة، دعم الوجود الحرفي، وتعزيز دور الحِرف في المساحات المشتركة. تم عقدُ الحدث في مصنع أبرويان، وهو مصنع نسيجٍ سابق تم تحويله لمساحة للفعاليات في برج حمود.',
        'Craft Workshop Tour': 'جولات الورش الحرفيّة ',
        'Exploring local practices first hand':
          'إستكشف الممارسات المحليّة عن قرب',
        'Visitors and local residents were invited to join walking tours in different areas of the city and meet with local craftspeople who toured the group through their shops. Craftspeople explained their practices by inscribing them into a more complex narrative of family heritage and knowledge.':
          'تمت دعوة الزوار والسكان المحليين للانضمام إلى جولات سيرٍ في مناطق مختلفة من المدينة والتعرف على الحرفيّين المحليين الذين بدورهم عرّفوا المجموعات على حرفهم في سياق جولة داخل ورشهم. وقد شرح الحرفيون ممارساتهم من خلال إدماج المشاركين في سردية أكثر تعقيدًا عن التراث العائلي والمعرفة.',
        'The event hosted 15 individuals at the time to maximize the learning experience and allow for connections to build between the craftsmen and the participants.':
          'استضاف الحدث ١٥ فردًا في كل جولة لتعزيز تجربة التعلم والسماح ببناء علاقات بين الحرفيين والمشاركين.',
        'Archival Image Tour': 'جولة الصور الأرشيفية',
        'Uncovering the past through digital tools':
          'كشف الستار عن الماضي من خلال الأدوات الرقمية',
        'During archival tours both residents and visitors explored the rich archival dataset of the Living Heritage Atlas through the stickers distributed around Beirut; people who joined these tours were encouraged to message a WhatsApp code written on the stickers, read out loud the stories delivered to their phones and collectively participate in a community exercise to acknowledge the historic presence (and often displacement) of workshops in Beirut.':
          'خلال الجولات الأرشيفيّة، إستكشف السكان والزوار مجموعة البيانات الأرشيفية الغنيّة التي يمتلكها "أطلس التراث الحيّ" من خلال الملصقات الموزعة في جميع أنحاء بيروت. شجّعت هذه الجولات المشاركين على إرسال رمز موجود على الملصقات عبر تطبيق "واتساب"، وقراءة القصص التي تصلهم بعد ذلك على هواتفهم المحمولة، والمشاركة بشكل جماعي في تمرين مجتمعي للتعرف على الوجود التاريخي (وغالبًا ما النزوح) للورش الحرفيّة و الحرفيّين في بيروت.',
        'Living Heritage Atlas celebrates the past and present of local artisanship in Beirut through archival data, interviews and community workshops. By leveraging historical data and interactions with craftspeople, the Living Heritage Atlas advocates for a more equitable future for small local crafts businesses. This project recognizes the enduring vulnerability of Beirut-based craftspeople as they cope with the ongoing economic crisis, post-disaster challenges and fierce global market competition.':
          'يحتفي "أطلس التراث الحي" بالماضي والحاضر للحرفيّة المحلية في بيروت من خلال البيانات الأرشيفية والمقابلات وورش العمل المجتمعية. من خلال الاستفادة من البيانات التاريخية والتفاعل مع الحرفيين، يسعى "أطلس التراث الحيّ" إلى المضي قدمًا نحو مستقبل أكثر عدالة للأعمال التجارية الصغيرة المحلية. يتعرّف هذا المشروع على التهميش المستمر لحرفيي بيروت في ظل التحديات الاقتصادية المستمرة وآثار الكوارث والمنافسة العالمية الشديدة',
        'Rebuilding Beirut': 'إعادة إعمار بيروت',
        'Using Data to Co-Design a New Future':
          'إستخدام البيانات لتصميم مستقبل جديد',
        '(2023 Exhibition in Venice)': '(معرض ٢٠٢٣ في البندقية)',
        'In May 2023, the Venice Biennale will feature “Tools for Rebuilding Beirut”, a showcase of three collaborative research and design proposals led by faculty, researchers and students from MIT’s School of Architecture and Planning. Each intervention addresses a unique aspect of rebuilding Beirut’s urban fabric: from the significance and vulnerability of cultural heritage in Living Heritage Atlas; to the environmental impacts of the explosion and the subsequent rebuilding efforts in City Scanner; to the redesign of streets and public space in Community Streets.':
          'في أيار٢٠٢٣، سيتم عرض "أدوات إعادة إعمار بيروت" في بينالي البندقية، وهو مشروع من ثلاثة مقترحات بحثية وتصميمية تعاونية يقودها أعضاء هيئة التدريس والباحثين والطلاب من كلية الهندسة المعمارية والتخطيط في معهد ماساتشوستس للتكنولوجيا (MIT). يتناول كل تدخل جانبًا فريدًا من إعادة بناء النسيج الحضري في بيروت: من أهمية وضعف التراث الثقافي في "أطلس التراث الحي" (Living Heritage Atlas)؛ إلى التأثيرات البيئية للانفجار وجهود إعادة البناء اللاحقة في "مسح المدينة" (City Scanner), إلى إعادة تصميم الشوارع والمساحات العامة في "الشوارع العامّة" (Community Streets).',
        'Community Engagement': 'المشاركة المجتمعيّة',
        'In July 2022, Living Heritage Atlas  held workshop walking tours, a participatory mapping workshop, and a panel discussion on documenting craftsmanship, legitimizing craftpeoples’ presence, and mobilizing shared spaces to connect stakeholders working on the craftsmanship in Beirut.':
          'في تموز ٢٠٢٢، نظّم "أطلس التراث الحي" جولات على ورشات العمل الحرفيّة، ورشة عمل تفاعليّة لرصد وتحديد مواقع الحرفيّين، وجلسة حوار حول توثيق الحرفيّة ودعم الوجود الحرفي وتعزيز المساحات المشتركة لربط أصحاب المصلحة العاملين في مجال الحرفية في بيروت',
        'Craft Workshop Tours': 'جولات الورش الحرفية',
        'The Craft Workshop Tours were a result of extensive work to locate as many craftsmen and learn more about their crafts and stories. In the Craft Workshop Tours, participants walked around the streets of Gemmayze, Mar Mikhael and Bourj Hammoud to meet local endangered and unrecognized craftsmen at an intimate scale, shedding light on this culture and enhancing its liveliness and know-how. The event hosted 15 individuals at the time to maximize the learning experience and allow for connections to build between the craftsmen and the participants.':
          'كانت جولات ورش الحرفية نتيجة للعمل المكثّف لتحديد أكبر عدد من مواقع الحرفيين والتعرف على حِرفهم وقصصهم. في جولات الورش الحرفيّة، تجوّل المشاركون في شوارع الجّميزة و مار مخايل و برج حمود للقاء الحرفيين المحليين المجهولين مسلطين الضوء على هذه الثقافة وتعزيز حيويتها وخُبراتها.تم تزويد المشاركين بعُدَّة محمولة لتحديد المواقع، تحتوي على خرائط صغيرة للأحياء لرصد مواقع ورش العمل وتدوين ملاحظات حول قصص الحرفيين خلال الجولات. تستوعب الفعالية ١٥ شخصًا في كل جولة لتعزيز تجربة التعلم والسماح ببناء الصلات بين الحرفيين والمشاركين. إحتفلت هذه الجولات بالمهارات المحلية للحرفيين، حيث حمل المشاركون الأعلام وحقائب الكتف الملونة - التي صمّمها أنتجها ستوديو كونوكو باستخدام تقنيات الطباعة بالقوالب - من قبل الفريق طوال الجولات.',
        'Throughout the Mar-Mikhael-Gemmayze Tour, the living heritage atlas team and participants toured several local craftsmen with different specialties and heard their stories: Mr. Doniguian, who runs a printing press on Armenia street, Studio Kunukku, a block-printing studio, The Circus Hub, one of the first manufacturers of circus equipment, and Coin d’Art, a painting, framing, and restoration family business.':
          'جولة مار مخايل - الجمّيزة: قام فريق "أطلس التراث الحيّ" والمشاركون بجولة في ورش الحرف المحليّة المتخصصة في مجالات مختلفة واستمعوا إلى قصص أصحابهم، بما في ذلك السيد دونيكيان الذي يدير مطبعة على شارع أرمينيا، واستوديو كونوكو للطباعة على القماش، والسيركس هاب (Circus Hub)، وهو واحد من أول منتجي معدات السيرك، و كوان دار للفن (Coin d’Art) عملٌ عائلي لصنع الإطارات وترميم اللوحات.',
        'The Bourj Hammoud Tour allowed participants to meet more crafts workshops due to the cluster of craftsmen in the area; the tour started with meeting Hagop Keshishian, known as Jackson, a local who makes and repairs shoes, and moved to meeting his next door neighbor Bedros Keshishian who works in woodworks and carpentry. The tour then resumed with meeting Gregor Ichkerian, a metal sculptor who works with his son, and then Peter Khatcherian, the only pipemaker in the Arab Region. The tour ended with meeting Noubar Eskidjian who specializes in copper work.':
          'جولة برج حمود: هذه الجولة سمحت للمشاركين بزيارة العديد من الورش الحرفيّة نظرًا لكثافة تجّمع الحرفيين في منطقة برج حمود. بدأت الجولة بلقاء هاكوب كشيشيان، المعروف باسم جاكسون، الحرفي المحلي الذي يقوم بصنع وإصلاح الأحذية، وانتقلت بعدها للقاء جاره بيدروس كشيشيان الذي يعمل في الأعمال الخشبية والنجارة. استكملت الجولة بلقاء غريغور اشكريان، نحّات معدني يعمل مع ابنه، ثم بيتر خاتشريان، المصنّع الوحيد للغليون في المنطقة العربية. اختتمت الجولة بلقاء نوبار إسكيدجيان الذي يختص في العمل بالنحاس.',
        'Archival Image Tours': '',
        'The Archival Tours brought to the public realm months of archival harvesting and research. By touring the streets of Al Balad and Bourj Hammoud, participants were able to enrich their narrative on craftsmanship in the city of Beirut while understanding the ways in which craftspeople have been  marginalized.':
          'أتاحت الجولات الأرشيفية للجمهور الاستفادة من أشهر من الحصاد الأرشيفي والبحث. من خلال جولاتهم في شوارع البلد وبرج حمود، تمكّن المشاركون من إثراء ما يعلمونه عن الحرفيّة في مدينة بيروت وفهم الطرق التي تم بها تهميش حرفيّيها.',
        'The team previously roamed these locations and placed geo-located stickers to allow for the tours to happen. During the tours, participants followed a map of where those stickers were(image 2), scanned the QR code on them image 3) which led them to a Whatsapp Chat where they sent an allocated code in order to get  to view an archival picture, and read a story about it. Unlike the crafts workshop tours, the archival tours focused more on the past of craftsmanship in the city, showing imagery of what was, rather than what is.':
          'كان قد سبق للفريق أن تجوّل في هذه المناطق ووضع ملصقات محددّة الاحداثيات للسماح بإقامة الجولات الأرشيفية. خلال الجولات، اتّبع المشاركون خريطة توضح مواقع هذه الملصقات (صورة 2) ومسحوا رمز الاستجابة السريعة (QR Code) الخاص بها (صورة 3)، الذي يوصلهم إلى دردشة عبر تطبيق واتساب، حيث يرسلون رمزا مخصصًا لمشاهدة صورة أرشيفية وقراءة قصّة عنها. على عكس جولات الورش الحرفيّة، تركّز الجولات الأرشيفية بشكل أكبر على ماضي الحرفيّة في المدينة، وتعرض صورًا عن ما كان موجودًا في الماضي بدلًا عن ما هو موجودٌ اللآن.',
        'These stickers remain posted throughout the city as a reminder to people of what used to exist in those spaces. They act as digital windows into the city’s past. Those interested in a self-guided archival tour can look for the stickers around Al-Balad and Bourj-Hammoud, for an archival digitally-powered experience of craftsmanship in Beirut.':
          'تبقى هذه الملصقات موجودة في جميع أنحاء المدينة كتذكير بما كان موجودًا في تلك الأماكن. فهي تعمل كنوافذ رقمية إلى الماضي في المدينة. يمكن للراغبين في خوض الجولات الأرشيفية بدون مرشد البحث عن الملصقات في منطقتي البلد وبرج حمود للحصول على تجربة رقميّة أرشيفية للحرفيّة في مدينة بيروت.',
        'Diverse panelists were invited to sit around for 3 roundtable events that discussed craftsmanship.The roundtable discussions were moderated by Daniella Maamari (lead researcher & project manager at FHL) and Racha Doughman (events coordinator).  Ahmad Khouja (Mashghal Initiative), Arpi Mangasserian (Badguer), Joy Kanaan (Beirut Heritage Initiative) and Pascale Habis (The Ready Hand) sat together for the first panel discussing the documentation of craftsmanship and its importance. In the second panel discussing the legitimizing of craftsmen’s presence, Camille Tarazi (Maison Tarazi), Mohamad Ayoub (NAHNOO), Nicole Hamouche and Roula Haidar (L’artisan du Liban) engaged in a fruitful conversation to look at the different ways this legitimizing can take place and how craftsman can benefit from a legal body to link them to stakeholders. The final panel which discussed the mobilizing of crafts in shared spaces featured Christina Abou Rouphael (Public Works Studio), Elena Costantinou (UNESCO), Nanor Karageozian (UN-Habitat) and Charbel Tawil (Nusaned), who discussed the role of public space and data as art and crafts catalysts.':
          'دُعي متحدثون متنوعون لمناقشات متنوعة حول الحرفية. أدار المناقشات كلّ من دانيللا معماري (الباحثة الرئيسية ومديرة المشروع في مختبر التراث المستقبلي) ورشا دوغمان (منسقة الأحداث). في حلقة النقاش الأولى، جلس أحمد خوجة (مبادرة مشغل) وأربي مانغاسريان (بادجير) وجوي كنعان (مبادرة تراث بيروت) وباسكال حبيص (The Ready Hand) لمناقشة توثيق الحرفية وأهميتها. في الجلسة الثانية، التي تناولت دعم الوجود الحرفي، شارك كلٌّ من كميل طرزي (Maison Tarazi) ومحمد أيوب (NAHNOO) ونيكول حاموش ورولا حيدر (L’artisan du Liban) في محادثة مثمرة للنظر في الطرق المختلفة التي يمكن فيها تشريع وجود الحرفيين وكيف يمكن للحرفيين الاستفادة من جهة قانونية لربطِهم بأصحاب المصالح. تضمنت الجلسة النهائية التي ناقشت تحريك الحرف في المساحات المشتركة كل من كريستينا أبو روفائيل (Public    ( Works Studio وإيلينا كوستانتينو (اليونسكو) ونانور كاراغوزين (UN-Habitat) وشربل طويل (Nusaned) الذين ناقشوا دور المساحات العامة والبيانات كمحفزات (محركات) للفن والحرف.',
        Mappathon: 'الرصد و التوثيق: ماباثون',
        'Participants were invited to contribute to the digital archive through a mapathon, a community mapping event, in which participants brought along a living heritage item (such as photos, maps, and fabric) to be scanned and returned to them. Over 70 participants were presented with detailed maps of Beirut in which they could locate and name crafts workshops that haven’t been previously located by the team. The points were added to the online directory and archival database in real-time and the attendees were provided with detailed instructions on how to contribute their points to be reviewed, through the website directly.':
          'دُعي المشاركين في الماباثون (Mapathon)، وهو فعالية رصد وتوثيق جماعي، للمساهمة في الأرشيف الرقمي من خلال إحضار عنصر تراثي حي (مثل الصور والخرائط والأقمشة) ليتم مسحه وإعادته إلى أصحابه. وتم تزويد أكثر من 70 مشاركًا بخرائط مفصّلة لبيروت، ليتمكنوا من رصد وتوثيق ورش الحرف التي لم يتم تحديدها من قِبل الفريق. وتمت إضافة النّقاط الجديدة إلى الدليل الرقمي وقاعدة البيانات الأرشيفية بشكلٍ فوري، وتلقى المشاركون تعليمات مفصّلة حول كيفية المساهمة في إضافة النقاط ليتم مراجعتها عبر الموقع الإلكتروني مباشرةً.',
        'Living Heritage Atlas was developed by the Civic Data Design Lab and the Future Heritage Lab at Massachusetts Institute of Technology (MIT). Living Heritage Atlas is supported by the Dar Group Urban Seed Grant Fund at MIT’s Norman B. Leventhal Center for Advanced Urbanism.':
          'تم تطوير "أطلس التراث الحي" من قبل "مختبر تصميم البيانات المدنية"(Civic Data Design Lab) و "مختبر التراث المستقبلي" (Future Heritage Lab) في معهد ماساتشوستس للتكنولوجيا (MIT). ويتم دعم المشروع من خلال منحة أوّليلة "Dar Group Urban Seed Grant Fund" تلقاها من مركز "نورمان بي ليفينثال للتحضر المتقدم" (Norman B. Leventhal Center for Advanced Urbanism) في معهد ماساتشوستس للتكنولوجيا (MIT).',
        'The Civic Data Design Lab at MIT works by using data for public good. Research methods in the lab employ an ethical approach to working with data. Collaboration within an interdisciplinary team of data scientists, policy experts, designers, and technologists catalyzes the development of alternative practices, which make data findings richer, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. Borrowing from the traditions of science and design, spatial analytics expose patterns and creative visualizations communicate results to reach new audiences.':
          'يعمل فريق مختبر تصميم البيانات المدنية (Civic Data Design Lab) في معهد ماساتشوستس للتكنولوجيا (MIT) عن طريق استخدام البيانات للمصلحة العامّة. تستخدم أساليب البحث في المختبر نهجًا أخلاقيًا في التعامل مع البيانات. يتعاون فريق متعدد التخصّصات المؤلّف من عُلماء البيانات وخبراء السياسات والمصممين والتقنيين على تعزيز وتطوير الممارسات البديلة التي تجعل نتائج البيانات أكثر غنىً وأكثر صلةً وأكثر استجابةً لاحتياجات ومصالح المواطنين الذين يعانون من التهميش في تطوير السياسات. مُستلهمةً من تقاليد العلوم والتصميم، تكشف التحليلات المكانية عن أنماط و تعمل مع التصوير البصري الإبداعي للوصول إلى جماهير جديدة.',
        'Sarah Williams (Director), Carmelo Ignaccolo (Lead Researcher & Project Manager), Ashley Louie (Exhibition Lead & Project Manager), Niko McGlashan, Kelly Fang, Enrique Casillas, Gatlen Culp, Huiwen Shi, Sophia Zheng':
          'سارة وليامز (المديرة)، كارميلو إنياكولو (الباحث الرئيسي ومدير المشروع)، آشلي لوي (مديرة المعرض ومديرة المشروع)، نيكو ماكغلاشان، كيلي فانغ، إنريكي كاسياس، غاتلين كالب، هويون شي، صوفيا جانغ',
        'Civic Data Design Lab Team': 'فريق مختبر تصميم البيانات المدنيّة:',
        'Civic Data Design Lab': 'مختبر تصميم البيانات المدنية',
        'The Future Heritage Lab collaborates with communities affected by conflict and crisis to collect and preserve histories of transcultural exchange and histories of threatened monuments, artifacts, textiles, and crafts. Linking art, culture, and technology, the Future Heritage Lab regenerates relevance of cultural heritage for contemporary conditions and for the future. The team builds future heritage by implementing civic-scale participatory cultural projects that translate traditional crafts into new technologies, advance knowledge transfer across borders, and have a positive impact on threatened communities.':
          'يتعاون مختبر التراث المستقبلي (The Future Heritage Lab) مع المجتمعات المتأثرة بالصراعات والأزمات لجمع والحفاظ على تاريخ التبادل الثقافي العابر للثقافات تاريخ المعالم المهددة والقطع الأثرية والمنسوجات والحرف. من خلال ربط الفن والثقافة والتكنولوجيا، يعيد مختبر التراث المستقبلي إحياء أهمية التراث الثقافي للظروف المعاصرة وللمستقبل. يبني الفريق التراث المستقبلي من خلال إنشاء مشاريع ثقافية على مستوى مدني تترجم المهن الحرفية التقليدية إلى التكنولوجيا الحديثة، وتعزز نقل المعرفة عبر الحدود، وتحقق تأثيرًا إيجابيًا على المجتمعات المهدّدة.',
        'Future Heritage Lab Team': 'فريق مختبر التراث المستقبلي',
        'Azra Aksamija (Director), Daniella Maamari (Lead Researcher & Project Manager), Sarine Agopian, Ramzi Alieh, Ahmad Beydoun, Racha Doughman, Reem Farhat, Kamila El Khechen, Raafat Majzoub, Fatima Moussa, Moussa Shabandar, Reem Obeid, Rasha Zayour':
          'أزرا أكشاميا (المديرة)، دانيللا معماري (الباحثة الرئيسية ومديرة المشروع)، رشا دوغمان، موسى شبندر، سارين أغوبيان، رمزي عالية، أحمد بيضون، ريم فرحات، كميلة الخشن، رأفت مجذوب، ريم عبيد،رشا زيور، فاطمة موسى.',
        'Venice Exhibit 2023': 'معرض ٢٠٢٣ في البندقية',
        'This photo is one of over 800 archival images that have been mapped and documented in the Living Heritage Atlas database.':
          'تُعد هذه الصورة واحدة بين أكثر من ٨٠٠ صورة أرشيفية تم تصويرها وتوثيقها في قاعدة بيانات أطلس التراث الحيّ.',
        'In this 1972 photograph, children of Nor Marash proudly demonstrate their tanner skills and displayed tanned leather on a wooden cart. The art of leather working is historically rooted in Bourj Hammoud, a place of refuge for many asylum seekers. The craft of tannery represents the survival of an inherited skill that has been passed down over generations and connects to the collective identity of the resilient community in Bourj Hammoud.':
          'في هذه الصورة التي التُقِطت في عام ١٩٧٢يعرض أطفال نور ماراش مهاراتهم في صناعة الجلود بفخر والجلود المُصنعة على عربة خشبية. تعود فنون العمل بالجلود بالتاريخ إلى برج حمود، مكان اللجوء للعديد من طالبي اللّجوء. تمثّل حرفة دبغ الجلود بقاءاً لمهارة موروثة تم تناقلها عبر الأجيال و ترتبط بالهوية الجماعيّة للمجتمع المتماسك في برج حمود. تُعد هذه الصورة واحدة بين أكثر من ٨٠٠',
        'The Tannery': 'الصورة الأرشيفية',
        'The Tannery | 1972 · Leather · Beirut River, Bourj Hammoud, El Meten Hayek, J. Bourj Hammoud: l’évolution du site urbain. Institut français du Proche-Orient (1972). Courtesy of Institut français du Proche-Orient.':
          'مدبغة الجلود | ١٩٧٢ · الجلود · نهر بيروت، برج حمود، المتن حايك، ج. برج حمود: تطور الموقع الحضري. المعهد الفرنسي في الشرق الأدنى (١٩٧٢). بإذن من المعهد الفرنسي في الشرق الأدنى.',
        'He/She has shared his/her practice with the Living Heritage Atlas, and his business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.':
          'قام/تقوم بمشاركة ممارسته/ا للحرفة مع أطلس التراث الحيّ ، وعمله/ا هو واحد من أكثر من ١١٠ ورشة حرفيّة حاليّة تم تصويرها وتوثيقها في قاعدة بياناتنا.',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: 'false',
  },
};

module.exports = {
  DEFAULT_ID_LENGTH,
  MAPBOX_STYLE_URL,
  ARCHIVE_CONTRIBUTION_NAME,
  BEIRUT_ZONES,
  WORKSHOP_CONTRIBUTION_NAME,
  CRAFT_CATEGORIES,
  CRAFT_TYPES,
  IMAGE_TYPES,
  REGEX_VALIDATION,
  VALID_DECADES,
  TRANSLATIONS,
  convertWorkshopContributionToSchema,
  convertArchiveContributionToSchema,
  isImage,
  generateId,
  get_distance_between_points,
  isProperlyTruthy,
};
