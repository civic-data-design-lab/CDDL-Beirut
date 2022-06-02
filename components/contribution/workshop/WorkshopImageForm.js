import ImageUploadForm from '../general/imageUpload/ImageUploadForm';

const WorkshopImageForm = ({ onUpdate, formData, title, label }) => {
  return (
    <div className="WorkshopImageForm">
      <ImageUploadForm
        onUpdate={onUpdate}
        formData={formData}
        dataLocation="workshop_images"
        title="Craft Workshop Image Upload"
        label="Upload an image of the craft workshop"
        requiredFields={[]}
      />
    </div>
  );
};

export default WorkshopImageForm;