import MapCardSlider from './Map/MapCardSlider';
import Slider from './Slider';
import { Archive as ArchiveType, ImageMeta } from '../models/Types';
import MiniMap from './discover/MiniMap';
import ImagePreview from './discover/ImagePreview';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

import { Trans, useTranslation } from 'react-i18next';
import Info from './Info';

const mainSliderStyle = {
  sliderContainer: 'mapSlider-container',
  buttonLabel: 'slider-btn-label',
  prevButton: 'btn-prev',
  nextButton: 'btn-next',
  wrapperContainer: 'mapSlider-wrapper',
};

/**
 * This component can be used to display a generic archive, either on the
 * Discover page or the Map page, or as the archive preview in the
 * contribution page.
 *
 * @param {object} props - Props
 * @param {ArchiveType} props.archive - Archive object to display
 * @param {ImageMeta[]} props.imageMetas - Image metadata for the archive,
 *    provided in an array
 * @param {string} props.imageSrc - Image source for the archive's images.
 *    Right now this is only really needed by the contribution preview.
 * @param {ArchiveType[]} props.similarArchives- Similar archive objects to
 *    display, provided in an array which may be empty or null.
 * @returns {JSX.Element}
 */
const Archive = ({
  archive,
  imageMetas,
  imageSrc,
  similarArchives,
  handleClose,
  lang,
  i18n,
  preview = false,
  preserveAspect = false,
}) => {
  const { t } = useTranslation();

  const getImages = () => {
    const thumbImage = imageMetas.filter(
      (image) => image.img_id === archive.thumb_img_id
    );
    const remainingImages = imageMetas.filter(
      (image) => image.img_id !== archive.thumb_img_id
    );
    const orderedImages = [...thumbImage, ...remainingImages];
    return orderedImages;
  };

  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(getImages());

  const onScroll = () => {
    const slider = document.querySelector('.mapSlider-container');
    const firstImage = document.querySelector('.mapCard-img');
    const parentPos = slider.getBoundingClientRect();
    const childPos = firstImage.getBoundingClientRect();
    const relativePos = parentPos.left - childPos.left;
    const parentWidth = parentPos.width;
    if (i18n.language === 'en') {
      setIndex(Math.round(relativePos / parentWidth));
    } else {
      setIndex(-Math.round(relativePos / parentWidth));
    }
  };

  useEffect(() => {
    setIndex(0);
    setImages(getImages());
  }, [archive]);

  const getShopName = () => {
    if (archive.shop_name['content']) {
      return archive.shop_name['content'];
    } else if (archive.shop_name['content_orig']) {
      return archive.shop_name['content_orig'];
    } else if (archive.owner_name.content) {
      return archive.owner_name.content;
    } else {
      return t('Archival Image');
    }
  };

  const getPrimaryDecade = () => {
    if (!archive.primary_decade && !archive.primary_year) {
      return null;
    }

    if (archive.primary_year) {
      return t('Captured') + ` ${archive.primary_year}`;
    }

    if (archive.primary_decade[0]) {
      return t('Captured') + ` ${archive.primary_decade[0]}`;
    }

    return null;
  };

  const getSubtitle = () => {
    let craftsList = [];
    let otherList = [];
    archive.craft_discipline.forEach((craft) => {
      if (craft.toUpperCase() === 'OTHER') {
        if (
          archive.craft_discipline_other &&
          archive.craft_discipline_other.length > 0
        ) {
          archive.craft_discipline_other.map((craftOther) => {
            const other =
              craftOther.charAt(0).toUpperCase() +
              craftOther.slice(1).toLowerCase();
            if (craftsList.indexOf(other) < 0) {
              otherList.push(craftOther.toLowerCase());
              if (craftsList.length < 1) {
                craftsList.push(t(other));
              } else {
                craftsList.push(' | ' + t(other));
              }
            }
          });
        }
      } else {
        const craftStr =
          craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase();
        if (craftsList.length < 1) {
          craftsList.push(t(craftStr));
        } else {
          if (otherList.indexOf(craft.toLowerCase()) < 0)
            craftsList.push(' | ' + t(craftStr));
        }
      }
    });

    if (
      Array.isArray(archive.craft_discipline_other) &&
      archive.craft_discipline_other.length > 0
    ) {
      archive.craft_discipline_other.forEach((craft) => {
        const craftStr =
          craft.charAt(0).toUpperCase() + craft.slice(1).toLowerCase();
        if (!craftsList) {
          craftsList.push(t(craftStr));
        } else if (otherList.indexOf(craft.toLowerCase()) < 0) {
          craftsList.push(' | ' + t(craftStr));
        }
      });
    }
    if (craftsList.length > 0) {
      return craftsList;
    } else {
      return null;
    }
  };

  const getCitation = () => {
    return (
      <>
        {archive.reference.link ? (
          <p className={'object-subtitle'}>
            Reference: {archive.reference.name},{' '}
            {
              <a href={archive.reference.link} target="_blank">
                {archive.reference.citation}
              </a>
            }
          </p>
        ) : (
          <p className={'object-subtitle'}>
            Reference: {archive.reference.name}, {archive.reference.citation}
          </p>
        )}
        {archive.reference.location && (
          <p className={'object-subtitle'}>
            Reference Location: {archive.reference.location}
          </p>
        )}
      </>
    );
  };

  const getCaption = () => {
    const currentMetaData = images[index];

    const viewKeywords = ['storefront', 'street', 'interior', 'indoor'];
    const interiorKeywords = ['interior', 'inside', 'indoor'];
    const viewSet = new Set(viewKeywords);

    if (currentMetaData) {
      if (currentMetaData.caption) {
        return <p className={'object-caption'}>{currentMetaData.caption}</p>;
      } else if (currentMetaData.type.length === 1) {
        if (viewSet.has(currentMetaData.type[0])) {
          if (currentMetaData.type[0] === 'street') {
            let arabic = t('Street view of ');
            let interpolated = arabic.replace('X', t(getShopName()));
            return <p>{interpolated}</p>;
          }
          return (
            <p className={'object-caption'}>
              {t(
                currentMetaData.type[0].charAt(0).toUpperCase() +
                  currentMetaData.type[0].slice(1).toLowerCase() +
                  ' view of '
              )}{' '}
              {getShopName()}
            </p>
          );
        } else if (
          currentMetaData.type[0] === 'crafts' ||
          currentMetaData.type[0] === 'craft'
        ) {
          return (
            <p className={'object-caption'}>
              {t(
                currentMetaData.type[0].charAt(0).toUpperCase() +
                  currentMetaData.type[0].slice(1).toLowerCase() +
                  ' produced by '
              )}{' '}
              {getShopName()}
            </p>
          );
        } else if (currentMetaData.type[0] === 'craftsperson') {
          return (
            <p className={'object-caption'}>
              {t(
                currentMetaData.type[0].charAt(0).toUpperCase() +
                  currentMetaData.type[0].slice(1).toLowerCase() +
                  ' of '
              )}{' '}
              {getShopName()}
            </p>
          );
        }
      } else if (currentMetaData.type.length === 2) {
        const craftspersonIndex = currentMetaData.type.indexOf('craftsperson');

        const storefrontIndex = currentMetaData.type.indexOf('storefront');
        const indoorMap = interiorKeywords.map((word) => {
          return currentMetaData.type.indexOf(word) > -1;
        });

        const craftMap = ['crafts', 'craft'].map((word) => {
          return currentMetaData.type.indexOf(word) > -1;
        });
        if (craftspersonIndex > -1 && storefrontIndex > -1) {
          return (
            <p className={'object-caption'}>
              {t('Craftsperson in front of ')} {getShopName()}
            </p>
          );
        } else if (craftspersonIndex > -1 && indoorMap.indexOf(true) > -1) {
          return (
            <p className={'object-caption'}>
              {' '}
              {t('Craftsperson inside ')} {getShopName()}
            </p>
          );
        } else if (
          craftMap.indexOf(true) > -1 &&
          indoorMap.indexOf(true) > -1
        ) {
          return (
            <p className={'object-caption'}>
              {t('Crafts produced in ')} {getShopName()}
            </p>
          );
        } else if (
          craftMap.indexOf(true) > -1 &&
          currentMetaData.type.indexOf('storefront') > -1
        ) {
          return (
            <p className={'object-caption'}>
              {t('Crafts displayed in storefront of ')} {getShopName()}
            </p>
          );
        }
      }
    }
  };

  const showImages = () => {
    return images.map((image, index) => {
      let source;
      if (preview) {
        source = imageSrc[index + 1];
      } else {
        source = imageSrc || image.src;
      }
      return (
        <img
          key={image.img_id}
          className={`${
            preserveAspect ? 'preserveRatio' : 'cropRatio'
          } mapCard-img objectSlider-img`}
          style={{
            width: '100%',
            height: '100%',
            marginRight: '10px',
            scrollSnapAlign: 'center',
          }}
          src={source}
          alt=""
        />
      );
    });
  };

  return (
    <>
      <Desktop>
        <div className={'popup-section slider'}>
          <div
            className={
              !preview
                ? 'object-slider-section'
                : 'object-slider-section-preview'
            }
          >
            {imageMetas?.length > 0 && (
              <MapCardSlider
                handleScroll={onScroll}
                children={showImages()}
                sliderStyle={mainSliderStyle}
                currentIndex={index}
              />
            )}
          </div>
        </div>

        <div className={'popup-section archival-card-section'}>
          <div className={'object-title-section'}>
            <h6 className={'object-name'}>
              {getShopName() || 'Archival Image'} &thinsp;
              <span>
                <Info
                  icon={
                    archive.info_type !== 'workshop_contribution'
                      ? 'check'
                      : 'question'
                  }
                  text={
                    archive.info_type !== 'workshop_contribution'
                      ? 'This archive image was reviewed and verified.'
                      : 'This archive image is still under review and is not verified yet.'
                  }
                />
              </span>
            </h6>

            <p className={'object-subtitle'}>
              {getPrimaryDecade()}
              {getSubtitle() && getPrimaryDecade() ? ' | ' : ''} {getSubtitle()}
            </p>
            {getCitation()}
            <br />
            {getCaption()}
          </div>
          <div className={'miniMap-container'}>
            <MiniMap
              workshop={archive}
              type={'archive'}
              lang={lang}
              i18n={i18n}
            />
          </div>
          {similarArchives ? (
            <div className={'object-suggestion-section'}>
              <p className={'object-caption'}>
                {t('Discover similar archival images')}
              </p>

              <div className={'object-suggestion-container'}>
                <div className={'object-suggestion-parent'}>
                  <Slider>
                    {similarArchives?.map((shop) => (
                      <div key={shop.ID} className="object-img">
                        <ImagePreview
                          workshop={shop}
                          grayscale={true}
                          routeToAPI={'../api/imageMetaData/'}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Desktop>

      <Tablet>
        <div className={'popup-section'}>
          <div className={'object-title-section'}>
            <h6 className={'object-name'}>
              {getShopName() || 'Archival Image'} &thinsp;
              <span>
                <Info
                  icon={
                    archive.info_type !== 'workshop_contribution'
                      ? 'check'
                      : 'question'
                  }
                  text={
                    archive.info_type !== 'workshop_contribution'
                      ? 'This archive image was reviewed and verified.'
                      : 'This archive image is still under review and is not verified yet.'
                  }
                />
              </span>
            </h6>

            <p className={'object-subtitle'}>
              {getPrimaryDecade()}
              {getSubtitle() && getPrimaryDecade() ? ' | ' : ''} {getSubtitle()}
            </p>
            {getCitation()}
            <br />
            {getCaption()}
          </div>

          <div
            className={
              !preview
                ? 'object-slider-section-tablet'
                : 'object-slider-section-preview'
            }
          >
            {imageMetas?.length > 0 && (
              <MapCardSlider
                handleScroll={onScroll}
                children={showImages()}
                sliderStyle={mainSliderStyle}
                currentIndex={index}
              />
            )}
          </div>

          <div className={'miniMap-container'}>
            <MiniMap
              workshop={archive}
              type={'archive'}
              lang={lang}
              i18n={i18n}
            />
          </div>

          {similarArchives ? (
            <div className={'object-suggestion-section'}>
              <p className={'object-caption'}>
                {t('Discover similar archival images')}
              </p>
              <div className={'object-suggestion-container'}>
                <div className={'object-suggestion-parent'}>
                  <Slider>
                    {similarArchives?.map((shop) => (
                      <div key={shop.ID} className="object-img">
                        <ImagePreview
                          workshop={shop}
                          grayscale={true}
                          routeToAPI={'../api/imageMetaData/'}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </Tablet>

      <Mobile>
        <div className={'popup-section'}>
          <div
            style={{
              position: 'sticky',
              top: '0px',
              backgroundColor: '#faf8f6',
              zIndex: 300,
              direction: 'ltr',
            }}
          >
            {handleClose ? (
              <button
                className={'close-card-btn object-mobile-close'}
                onClick={() => {
                  handleClose;
                }}
              >
                <FontAwesomeIcon icon={faXmark} size={'xs'} />
              </button>
            ) : null}
            <div
              className={
                !preview
                  ? 'object-mobile-heading'
                  : 'object-mobile-heading-preview'
              }
            >
              <div
                className={
                  !preview
                    ? 'object-mobile-heading-subcontainer'
                    : 'object-mobile-heading-subcontainer-preview'
                }
              >
                <p className={'object-mobile-title'}>
                  {getShopName() || 'Archival Image'} &thinsp;
                  <span>
                    <Info
                      icon={
                        archive.info_type !== 'workshop_contribution'
                          ? 'check'
                          : 'question'
                      }
                      text={
                        archive.info_type !== 'workshop_contribution'
                          ? 'This archive image was reviewed and verified.'
                          : 'This archive image is still under review and is not verified yet.'
                      }
                    />
                  </span>
                </p>

                <p className={'object-mobile-subtitle'}>
                  {getPrimaryDecade()}
                  {getSubtitle() && getPrimaryDecade() ? ' | ' : ''}{' '}
                  {getSubtitle()}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
            }}
          >
            <div
              className={
                !preview
                  ? 'object-slider-section-tablet'
                  : 'object-slider-section-tablet-preview'
              }
            >
              {imageMetas?.length > 0 && (
                <MapCardSlider
                  handleScroll={onScroll}
                  children={showImages()}
                  sliderStyle={mainSliderStyle}
                  currentIndex={index}
                />
              )}
              <div className={'object-mobile-section'}>
                {getCitation()}
                {getCaption()}
              </div>
            </div>

            <div className={'miniMap-container'}>
              <MiniMap
                workshop={archive}
                type={'archive'}
                lang={lang}
                i18n={i18n}
              />
            </div>

            {similarArchives ? (
              <div
                className={'object-mobile-section object-suggestion-section'}
              >
                <p className={'card-section-labels'}>
                  {t('Discover similar archival images')}
                </p>
                <div className={'object-suggestion-container'}>
                  <div className={'object-suggestion-parent'}>
                    <Slider>
                      {similarArchives?.map((shop) => (
                        <div key={shop.ID} className="object-img">
                          <ImagePreview
                            workshop={shop}
                            grayscale={true}
                            routeToAPI={'../api/imageMetaData/'}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Mobile>
    </>
  );
};

export default Archive;
