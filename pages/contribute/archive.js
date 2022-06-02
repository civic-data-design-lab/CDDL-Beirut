/**
 * Archive Contribution Page
 *
 * @GatlenCulp update this as changes to the fields are made
 * TODO: Add craft discipline/craft discipline category. Don't forget to update
 * the fields in `convertArchiveContributionToSchema()` in `lib/utils.js`
 *
 * Pages:
 * 0. Archive Image Upload
 *    - imageData*
 *    - imageExtension* (implied)
 *    - caption*
 * 1. Archive About
 *    - `imageType`
 *    - `yearTaken` (e.g. `'2022`) *[yearTaken OR (startDecade AND endDecade)]
 *    - `startDecade` (e.g. `'1930'`) *[yearTaken OR (startDecade AND endDecade)]
 *    - `endDecade` *[yearTaken OR (startDecade AND endDecade)]
 *    - `workshopName`
 *    - `ownerName`
 *    - `referenceName`
 *    - `referenceUrl`
 *    - `referenceCopyright`
 * 2. Archive Location
 *    - buildingNumber
 *    - street
 *    - quarter*
 *    - sector*
 *    - lat*
 *    - lng*
 * 3: Preview
 */

import { useState, useEffect } from 'react';
import ImageUploadForm from '../../components/contribution/ImageUploadForm';
import LocationForm from '../../components/contribution/LocationForm';
import MultipageForm from '../../components/contribution/MultipageForm';
import Preview from '../../components/contribution/Preview';
import Head from 'next/head';
import {
  ARCHIVE_CONTRIBUTION_NAME,
  convertArchiveContributionToSchema,
} from '../../lib/utils';
import ArchiveAboutForm from '../../components/contribution/ArchiveAboutForm';
import Card from '../../components/Card';

// Required fields for each page
const REQUIRED_FIELDS = [
  ['imageData', 'caption'],
  ['imageType', 'referenceName'],
  ['quarter', 'sector', 'lat', 'lng'],
  ['consent']
];

const ArchiveContribution = () => {
  const [form, setForm] = useState({
    survey_origin: ARCHIVE_CONTRIBUTION_NAME,
  });
  const [dialog, setDialog] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (data) => {
    setForm((prevForm) => {
      const updatedFormData = { ...prevForm, ...data };
      console.log('setting form data to ', updatedFormData);
      localStorage.setItem(
        ARCHIVE_CONTRIBUTION_NAME,
        JSON.stringify(updatedFormData)
      );
      return updatedFormData;
    });
  };

  const onSubmit = () => {
    // Prepare the form data for submission
    const { archive, imageMeta, imageData } =
      convertArchiveContributionToSchema(form);

    const data = { archive, imageMetas: [imageMeta], imageData: [imageData] };

    fetch('/api/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          res.json().then((data) => setDialog(data.message));
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        console.log(data);
        setSubmitted(true);
        // Clear the form data
        setForm({});
        localStorage.removeItem(ARCHIVE_CONTRIBUTION_NAME);
      })
      .catch((err) => setDialog(err));
  };

  const showDialogContent = () => {
    return (
      <div>
        <h1>Failed to submit!</h1>
        <h4>{dialog}</h4>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Archive Contribution | Intangible Heritage Atlas</title>
      </Head>
      {dialog && (
        <Card handleClose={() => setDialog(null)}>
          <div className="card__content">{showDialogContent()}</div>
        </Card>
      )}
      <div className="Contribute drop-shadow__black">
        <MultipageForm
          name={ARCHIVE_CONTRIBUTION_NAME}
          pageTitles={[
            'Archive Upload',
            'About the Archive',
            'Location of Archival Image',
            'Preview',
          ]}
          formData={form}
          requiredFields={REQUIRED_FIELDS}
          onUpdate={updateForm}
          onSubmit={onSubmit}
          submitted={submitted}
        >
          <ImageUploadForm
            title="Archival Image Upload"
            label="Upload an archival image related to crafts in Beirut"
            requiredFields={REQUIRED_FIELDS[0]}
          />
          <ArchiveAboutForm 
            title="About the Archive"
            requiredFields={REQUIRED_FIELDS[1]}
          />
          <LocationForm 
            title="Location of Archival Image"
            mapCaption="Locate where this image was taken on the map. Please zoom in and move the pin to adjust for accuracy and to confirm that the pin is located correctly."
            requiredFields={REQUIRED_FIELDS[2]} 
          />
          <Preview 
            onUpdate={updateForm}
            requiredFields={REQUIRED_FIELDS[3]}
          />
        </MultipageForm>
      </div>
    </>
  );
};

export default ArchiveContribution;
