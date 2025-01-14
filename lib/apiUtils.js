/**
 * API utilities module.
 *
 * Contains functions used by the API, and can be used during server-side
 * rendering to fetch data.
 *
 * @module apiUtils
 */

import dbConnect from './dbConnect';
import Workshop from '../models/Workshop';
import ImageMeta from '../models/ImageMeta';
import ImageData from '../models/ImageData';
import ImageDataOriginal from '../models/ImageDataOriginal';
import ImageDataThumbnail from '../models/ImageDataThumbnail';
import Archive from '../models/Archive';
import {
  Workshop as WorkshopType,
  ImageMeta as ImageMetaType,
  ArchiveObject as ArchiveType,
  ImageData as ImageDataType,
  ImageDataOriginal as ImageDataOriginalType,
} from '../models/Types';
import {
  get_distance_between_points,
  ARCHIVE_CONTRIBUTION_NAME,
  WORKSHOP_CONTRIBUTION_NAME,
} from './utils';
import Sticker from '../models/Sticker';
import getImageCompressions from './getImageCompressions';

/**
 * Given an ID, returns the object either from the workshosp or archive. This is
 * mainly used for the discover page.
 *
 * @param {string} id - The id of the workshop to fetch
 * @returns {{object: WorkshopType | ArchiveType, type: string}} - The workshop
 *    or archive object and type ('archive' or 'workshop')
 */
export const getWorkshopOrArchive = async (id) => {
  await dbConnect();

  const workshopDoc = await Workshop.findOne({ ID: id });
  if (workshopDoc) {
    const workshop = workshopDoc.toObject();
    workshop._id = workshop._id.toString();
    return { object: workshop, type: 'workshop' };
  }

  const archiveDoc = await Archive.findOne({ ID: id });
  if (archiveDoc) {
    const archive = archiveDoc.toObject();
    archive._id = archive._id.toString();
    return { object: archive, type: 'archive' };
  }
};

// --------------
// WORKSHOP UTILS
// --------------

/**
 * Gets all workshops from the database.
 *
 * @returns {WorkshopType[]} - A list of all workshops.
 */
export const getAllWorkshops = async (config) => {
  await dbConnect();

  const result = await Workshop.find({});
  const workshops = result
    .map((doc) => {
      /**
       * @type {WorkshopType}
       */
      const workshop = doc.toObject();
      workshop._id = workshop._id.toString();

      if (config?.idsOnly) {
        return {
          ID: workshop.ID,
        };
      }

      if (config?.lean) {
        const leanWorkshop = {
          ID: workshop.ID,
          shop_name: workshop.shop_name,
          craft_discipline_category: workshop.craft_discipline_category,
          location: {
            geo: workshop?.location?.geo,
          },
          shop_status: workshop.shop_status,
          decade_established: workshop.decade_established,
          thumb_img_id: workshop.thumb_img_id,
        };
        return leanWorkshop;
      }
      return workshop;
    })
    .filter((workshop) => {
      // Filter out workshops that are not verified.
      return workshop.verified;
    });

  return workshops;
};

/**
 * Retrieves a workshop by its `ID` property from the database.
 *
 * @param {string} id - The id of the workshop to retrieve
 * @returns {WorkshopType} The workshop object
 */
export const getWorkshop = async (id) => {
  await dbConnect();

  const doc = await Workshop.findOne({ ID: id });
  const workshop = doc.toObject();
  workshop._id = workshop._id.toString();
  return workshop;
};

export const saveNewImage = async (imgMeta, imgDataOrig) => {
  const newImageMeta = new ImageMeta(imgMeta);
  const resMeta = await newImageMeta.save();

  imgDataOrig.data = imgDataOrig.data.split(',').pop();
  imgDataOrig.data = Buffer.from(imgDataOrig.data, 'base64');

  // INFO: Save original image
  const newImageDataOriginal = new ImageDataOriginal(imgDataOrig);
  const resOrig = await newImageDataOriginal.save();

  // INFO: Get compressions
  const { imageBuffer, imageBufferThumbnail } = await getImageCompressions(
    imgDataOrig.data
  );
  // INFO: Save regular picture
  let imgData = imgDataOrig;
  imgData.filename = `${imgData.img_id}.${imgData.extension}`;
  imgData.data = imageBuffer;
  const newImageData = new ImageData(imgData);
  const res = await newImageData.save();

  // INFO: Save thumbnail picture
  let imgDataThumbnail = imgDataOrig;
  imgDataThumbnail.filename = `${imgData.img_id}_thumbnail.${imgData.extension}`;
  imgDataThumbnail.data = imageBufferThumbnail;
  const newImageThumbnail = new ImageDataThumbnail(imgDataThumbnail);
  const resThumbnail = await newImageThumbnail.save();

  return { resMeta, resOrig, res, resThumbnail };
};

/**
 * Saves the given workshop to the database. If `data.imageMetas` is null, does
 * not save it and the image data.
 *
 * @param {{workshop: WorkshopType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataOriginalType[]}} data - The workshop data to save, including image meta
 *    and image data.
 * @returns {{workshop: WorkshopType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataOriginalType[]}} Returns the saved workshop object and corresponding
 *    image objects if successful, otherwise returns null.
 */
export const saveNewWorkshop = async (data) => {
  await dbConnect();

  let savedWorkshop;
  let savedImageMetas = [];
  let savedImageDataOriginal = [];
  let savedImageData = [];
  let savedImageDataThumbnail = [];
  try {
    // INFO: Save the workshop to the database.
    const newWorkshop = new Workshop(data.workshop);
    savedWorkshop = await newWorkshop.save();

    if (data.imageMetas?.length > 0) {
      // INFO: Save the image metadata for the workshop.
      let imgMeta;
      let imgDataOrig;
      let resMeta;
      let resOrig;
      let res;
      let resThumbnail;
      for (let i = 0; i < data.imageMetas.length; i++) {
        imgMeta = data.imageMetas[i];
        imgDataOrig = data.imageDataOriginal[i];
        ({ resMeta, resOrig, res, resThumbnail } = await saveNewImage(
          imgMeta,
          imgDataOrig
        ));
        savedImageMetas.push(resMeta);
        savedImageDataOriginal.push(resOrig);
        savedImageData.push(res);
        savedImageDataThumbnail.push(resThumbnail);
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }

  return {
    workshop: savedWorkshop,
    imageMetas: savedImageMetas,
    imageDataOriginal: savedImageDataOriginal,
    imageData: savedImageData,
    ImageDataThumbnail: savedImageDataThumbnail,
  };
};

/**
 * Gets similar workshops to the given workshop.
 *
 * "Similar" in this case means that the intersection of craft disciplines is as
 * large as possible. If there are ties in the intersection, the closest
 * workshop is returned. This process is applied in a sorting order to get the
 * `k` most similar workshops.
 *
 * @param {WorkshopType} workshop - The workshop to get similar workshops for
 * @param {object} config - Configuration object
 * @param {number} config.count - The number of similar workshops to return
 */
export const getSimilarWorkshops = async (workshop, config) => {
  await dbConnect();

  const allWorkshops = await getAllWorkshops();
  const thisCraftDisciplineSet = new Set(workshop.craft_discipline);

  // Sort the workshops by distance from the given workshop.
  const similarWorkshops = allWorkshops
    .filter((w) => w.ID !== workshop.ID)
    .map((w) => {
      // Get the intersecting craft disciplines
      const intersect = w.craft_discipline.filter((x) =>
        thisCraftDisciplineSet.has(x)
      ).length;

      const distance = get_distance_between_points(
        workshop.location.geo,
        w.location.geo
      );
      return {
        workshop: w,
        intersect,
        distance,
      };
    })
    .sort((a, b) => {
      // Sort by the number of intersecting craft disciplines in descending order.
      const disciplineComp = b.intersect - a.intersect;
      if (disciplineComp !== 0) {
        return disciplineComp;
      }

      // If same, sort by distance in ascending order.
      return a.distance - b.distance;
    });

  return similarWorkshops.slice(0, config?.count || 6).map((x) => x.workshop);
};

// -----------
// IMAGE UTILS
// -----------

/**
 * Gets the image metadata.
 *
 * Users may provide an image ID (`img_id`), in which case the particular image
 * metadata object is returned, or a survey response ID (`response_id`), in
 * which case all image metadata for that response is returned. In either case,
 * an array of image metadata objects is returned.
 *
 * @param {string} id - The image or response ID
 * @returns {ImageMetaType[]} The image metadata objects
 */
export const getImageMeta = async (id) => {
  await dbConnect();

  const docs = await ImageMeta.find({
    $or: [{ img_id: id }, { response_id: id }],
  });
  const imageMetas = docs.map((doc) => {
    const imageMeta = doc.toObject();
    imageMeta._id = imageMeta._id.toString();
    return imageMeta;
  });

  return imageMetas;
};

export const getAllImageMetas = async (config) => {
  await dbConnect();

  const result = await ImageMeta.find({});
  const imagemetas = result.map((doc) => {
    /**
     * @type {ImageMetaType}
     */
    const meta = doc.toObject();
    meta._id = meta._id.toString();

    if (config?.idsOnly) {
      return {
        ID: meta.ID,
      };
    }

    if (config?.lean) {
      const leanMeta = {
        ID: meta.ID,
        type: meta.type,
      };
      return leanMeta;
    }
    return meta;
  });

  return imagemetas;
};

// --------------
// ARCHIVE UTILS
// --------------

/**
 * Gets all archive records from the database.
 *
 * @returns {ArchiveType[]} A list of all the archive objects.
 */
export const getAllArchives = async (config) => {
  await dbConnect();

  const result = await Archive.find({});
  const archiveObjs = result
    .map((doc) => {
      /**
       * @type {ArchiveType}
       */
      const archiveObj = doc.toObject();
      archiveObj._id = archiveObj._id.toString();

      if (config?.idsOnly) {
        return {
          ID: archiveObj.ID,
        };
      }

      if (config?.lean) {
        return {
          ID: archiveObj.ID,
          info_type: archiveObj.info_type,
          craft_discipline_category: archiveObj.craft_discipline_category,
          primary_location: {
            geo: archiveObj.primary_location.geo,
          },
          primary_decade: archiveObj.primary_decade,
          thumb_img_id: archiveObj.thumb_img_id,
        };
      }
      return archiveObj;
    })
    .filter((archive) => {
      // Filter out archives that are not verified.
      return archive.verified;
    });

  if (config?.visualOnly) {
    return archiveObjs.filter((obj) => obj.thumb_img_id);
  }

  return archiveObjs;
};

/**
 * Retrieves an archive response by its `ID` property from the database.
 *
 * @param {string} id - The id of the archive object to retrieve
 * @returns {ArchiveType} The archive response object
 */
export const getArchive = async (id) => {
  await dbConnect();

  const result = await Archive.findOne({ ID: id });
  result._id = result._id.toString();
  return result;
};

/**
 * Saves the given archival information to the database along with image
 * metadata and image data. If `data.imageMetas` is null, does not save it nor
 * the image data.
 *
 * @param {{archive: ArchiveType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataOriginalType[]}} data - The archive data to save, including image meta
 *    and image data.
 * @returns {{archive: ArchiveType, imageMetas: ImageMetaType[], imageData:
 *    ImageDataOriginalType[]}} Returns the saved archive object and corresponding
 *    image objects if successful, otherwise returns null.
 */
export const saveNewArchive = async (data) => {
  await dbConnect();

  let savedArchive;
  let savedImageMetas = [];
  let savedImageDataOriginal = [];
  let savedImageData = [];
  let savedImageDataThumbnail = [];
  try {
    // Save the archive to the database.
    const newArchive = new Archive(data.archive);
    savedArchive = await newArchive.save();

    if (data.imageMetas?.length > 0) {
      // INFO: Save the image metadata for the workshop.
      let imgMeta;
      let imgDataOrig;
      let resMeta;
      let resOrig;
      let res;
      let resThumbnail;
      for (let i = 0; i < data.imageMetas.length; i++) {
        imgMeta = data.imageMetas[i];
        imgDataOrig = data.imageDataOriginal[i];
        ({ resMeta, resOrig, res, resThumbnail } = await saveNewImage(
          imgMeta,
          imgDataOrig
        ));
        savedImageMetas.push(resMeta);
        savedImageDataOriginal.push(resOrig);
        savedImageData.push(res);
        savedImageDataThumbnail.push(resThumbnail);
      }
    }
  } catch (err) {
    console.error(err);
    return;
  }

  return {
    archive: savedArchive,
    imageMetas: savedImageMetas,
    imageDataOriginal: savedImageDataOriginal,
    imageData: savedImageData,
    ImageDataThumbnail: savedImageDataThumbnail,
  };
};

/**
 * Gets similar archives to the given archive.
 *
 * "Similar" in this case means that the intersection of craft disciplines is as
 * large as possible. If there are ties in the intersection, the closest
 * workshop is returned. This process is applied in a sorting order to get the
 * `k` most similar workshops.
 *
 * @param {ArchiveType} archive - The archive to get similar workshops for
 * @param {object} config - Configuration object
 * @param {number} config.count - The number of similar workshops to return
 */

export const getSimilarArchives = async (archive, config) => {
  await dbConnect();

  const allArchives = await getAllArchives();
  const thisCraftDisciplineSet = new Set(archive.craft_discipline);

  // Sort the workshops by distance from the given workshop.
  const similarArchives = allArchives
    .filter((a) => a.ID !== archive.ID)
    .map((a) => {
      // Get the intersecting craft disciplines
      const intersect = a.craft_discipline.filter((x) =>
        thisCraftDisciplineSet.has(x)
      ).length;

      const distance = get_distance_between_points(
        archive.primary_location.geo,
        a.primary_location.geo
      );
      if (a.thumb_img_id) {
        return {
          archive: a,
          intersect,
          distance,
        };
      }
    })
    .sort((a, b) => {
      // Sort by the number of intersecting craft disciplines in descending order.
      const disciplineComp = b.intersect - a.intersect;
      if (disciplineComp !== 0) {
        return disciplineComp;
      }

      // If same, sort by distance in ascending order.
      return a.distance - b.distance;
    });

  return similarArchives.slice(0, config?.count || 6).map((x) => x.archive);
};

// -------------
// STICKER UTILS
// -------------

/**
 * Given the code, returns the sticker data.
 *
 * Sticker data is obtained by joining together sticker objects, archive
 * information objects, and corresponding image metadata. If an archive is
 * indicated to be a duplicate of another archive, the duplicate archive is also
 * fetched.
 *
 * @param {string} code - The sticker code
 * @returns {{stickerData: {response_id: string, code: string, body: string,
 * imageSrc: Buffer}, message: string}} The sticker data and a message string if
 *    something went wrong. The sticker data consists of the archive response ID,
 *    the code used to find it, the body of the sticker, and the image data.
 */
export const getStickerData = async (code) => {
  // console.debug(code);
  const split_code = code.match(/[a-zA-Z]+|[0-9]+/g);
  const sticker_id = split_code[0];
  const language = split_code[1].toLowerCase();
  // TODO: Update this implentation if needed
  const sticker = await Sticker.findOne({ code: `LHA${sticker_id}` });
  if (!sticker) {
    return {
      stickerData: null,
      message: `Sticker with code "${sticker_id}" not found`,
    };
  }

  // Check if the corresponding archive info is a duplicate.
  // const archive = await getArchive(sticker.response_id);
  // if (!archive) {
  //   return {
  //     stickerData: null,
  //     message: `No associated archive response found for sticker, looked for ${sticker.response_id}`,
  //   };
  // }

  // Get the associated duplicate response IDs, getting all of the image
  // metadata
  // const primary_duplicate = archive.is_duplicate_of;
  // const associatedResponseIds = [archive.ID];
  // if (primary_duplicate) {
  //   console.log('Found duplicate', primary_duplicate);
  //   const associatedArchives = await Archive.find({
  //     is_duplicate_of: primary_duplicate,
  //   });
  //   associatedResponseIds.push(
  //     ...associatedArchives.filter((a) => a.ID !== archive.ID).map((a) => a.ID)
  //   );
  // }

  // console.log('Associated response IDs', associatedResponseIds);
  // // Get the image metadata for the sticker across all of the associated
  // // responses. Find the oldest image in the responses.
  // const archiveImageMetas = await ImageMeta.find({
  //   response_id: { $in: associatedResponseIds },
  // });
  // archiveImageMetas.sort((a, b) => {
  //   return a.decade_taken[0] - b.decade_taken[0];
  // });
  // const oldestImage = archiveImageMetas[0];

  // // Create the final message body using the sticker content
  // let body = sticker.content || '';
  // body = body.concat('\n See more at https://livingheritage.mit.edu/');

  // Return the sticker data.
  return {
    stickerData: {
      code: code,
      img_id: sticker.img_id,
      caption_EN: sticker.caption_EN,
      caption_AR: sticker.caption_AR,
    },
    message: 'Successfully retrieved sticker data',
  };
};
