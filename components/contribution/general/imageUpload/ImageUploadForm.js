import SingleImageUpload from './SingleImageUpload';
import BooleanButtonForm from '../booleanButtonForm/BooleanButtonForm';
import UploadedImage from './UploadedImage';

import { useState, useEffect } from 'react';

/**
 * Image upload form component for the contribution page. Right now it only
 * accepts one image using the `SingleImageUpload` component. TODO: Add support
 * for multiple images.
 *
 * @param {object} props - Props
 * @param {function} props.onUpdate - The function to call when the value of the
 *    image field updates (`{imageData: string}`)
 * @param {string} props.formData - The current form data.
 * @param {string} props.dataLocation - Location in the form object to read/save the images
 * @param {string} props.title - The title of this form
 * @param {string} props.label - The label of this form (e.g. 'Upload an image')
 * @param {Number} props.maxNumberOfImages - Number of images allowed for selection on this form. Any more than one will display the image sidebar.
 * @returns
 */
const ImageUploadForm = ({
  onUpdate,
  formData,
  dataLocation,
  title,
  label,
  imageRequired,
  captionRequired,
  maxNumberOfImages = 1,
}) => {

  const [imageFormState, setImageFormState] = useState({});
  const [imageIndex, setImageIndex] = useState(0); // TODO: Set up multi-image upload.

  const updateImageFormState = (newData) => {
    setImageFormState((prevForm) => {
      const updatedFormData = { ...prevForm, ...newData };
      // console.log('setting ImageFormState to ', updatedFormData);
      onUpdate(updatedFormData);
      return updatedFormData;
    });
  };
  

  return (
    <form className="ImageUploadForm">
      <div className={'subsection'}>
      <h3 className={'Contribute-form-section-heading'}> {title || 'Image Upload'}</h3>

          {maxNumberOfImages != 1 &&
            [...Array(maxNumberOfImages).keys()].map((i) => {
              return (
                <UploadedImage
                  onUpdate={onUpdate}
                  formData={formData}
                  imageId={i}
                />
              );
            })}
        </div>
          <div className={'subsection'}>
            <label className={imageRequired ? 'required' : ''}>{label || 'Upload an image'}</label>
            <SingleImageUpload
              handleUpdateImage={(imagebuffer, extension) => {
                updateImageFormState({
                  [dataLocation]: [{
                    imageData: imagebuffer,
                    imageExtension: extension,
                  }],
                });
                // onUpdate({ [dataLocation]: { imageData: imagebuffer, imageExtension: extension } })
              }}
              currentImage={
                formData[dataLocation]
                  ? formData[dataLocation][0]['imageData']
                  : ''
              }
              // currentImage={formData[dataLocation][]}
            />
          </div>

          <div className={'subsection'}>
            <label className={captionRequired ? 'required' : ''} htmlFor="caption">
              Enter a caption or a story associated with this image.
            </label>
            <textarea
              name="caption"
              id="caption"
              value={formData.caption || ''}
              onChange={(e) => onUpdate({ caption: e.target.value })}
            />
          </div>


    </form>
  );
};

export default ImageUploadForm;
