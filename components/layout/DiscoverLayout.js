// import { } from '../../lib/apiUtils';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ImageFeed from '../discover/ImageFeed';
import ImageFilter from '../discover/ImageFilter';
import { useMediaQuery } from 'react-responsive';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 687, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 688 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const DiscoverLayout = ({ children }) => {
  const router = useRouter();
  const [workshops, setWorkshops] = useState([]);
  const [archive, setArchive] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showFilter, setFilter] = useState(false);

  const [numberCrafts, setNumber] = useState(7);
  const [filteredCraftsImage, setCrafts] = useState([
    'architectural',
    'cuisine',
    'decorative',
    'fashion',
    'functional',
    'furniture',
    'textiles',
  ]);
  const [startYearImage, setStartYear] = useState(1890);
  const [endYearImage, setEndYear] = useState(2030);
  const [toggleImage, setToggle] = useState(false);
  const [resetToggleImage, setResetToggle] = useState(false);

  useEffect(() => {
    Promise.all([fetch('/api/workshops'), fetch('/api/archive')]).then(
      ([workshopsResponse, archiveResponse]) => {
        Promise.all([workshopsResponse.json(), archiveResponse.json()]).then(
          ([workshopsData, archiveData]) => {
            setWorkshops(workshopsData.response);
            setArchive(archiveData.response);
          }
        );
      }
    );
  }, []);

  useEffect(() => {
    const { show } = router.query;
    if (!show) {
      setSelectedCard(null);
      return;
    }

    const card = workshops.find((w) => w.ID === show);
    if (!card) {
      // No card matches that ID
      setSelectedCard(null);
      return;
    }

    setSelectedCard(show);
  }, [router.query.show]);

  const handleExpand = (id) => {
    router.push(`/discover?show=${id}`, undefined, { shallow: true });
  };

  const resetSelected = () => {
    router.push(`/discover`, undefined, { shallow: true });
  };

  const expandFilter = () => {
    setFilter(!showFilter);
  };

  const updateCrafts = (craftData) => {
    setCrafts(craftData);
    setNumber(craftData.length);
  };

  const updateYears = (yearData) => {
    setStartYear(yearData[0]);
    setEndYear(yearData[1]);
  };

  const updateToggle = (toggleData) => {
    setToggle(toggleData);
  };

  const handleReset = () => {
    setResetToggle(!resetToggleImage);
    setCrafts([
      'architectural',
      'cuisine',
      'decorative',
      'fashion',
      'functional',
      'furniture',
      'textiles',
    ]);
    setNumber(7);
    setStartYear(1890);
    setEndYear(2030);
    setToggle(false);
  };

  const handleClose = () => {
    setFilter(false);
  };

  const filterData = {
    filteredCrafts: filteredCraftsImage,
    filteredStartYear: startYearImage,
    filteredEndYear: endYearImage,
    filteredToggleStatus: toggleImage,
  };

  return (
    <>
      <Head>
        <title>Discover | Living Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1 className={'discover-text'}>DISCOVER</h1>
            <p className={'discover-text'}>
              Discover local workshops and archival images of craftsmanship in
              the Living Heritage Atlas | Beirut database
            </p>
          </div>

          <button
            className={'reset-btn image-filter-btn discover-text'}
            onClick={expandFilter}
          >
            <Desktop>
              <div className={'filter-section'}>
                <p>Filter By</p>
              </div>

              <span className={'filter-section'}>
                {showFilter ? (
                  <FontAwesomeIcon icon={faChevronUp} width={'1em'} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} width={'1em'} />
                )}
              </span>
            </Desktop>

            <Tablet>
              <div className={'filter-section'}>
                <p>Filter By</p>
              </div>

              <span className={'filter-section'}>
                {showFilter ? (
                  <FontAwesomeIcon icon={faChevronUp} width={'1em'} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} width={'1em'} />
                )}
              </span>
            </Tablet>

            <Mobile>
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 0L0 2L18 2V0L0 0ZM7 12H11V10H7V12ZM15 7L3 7V5L15 5V7Z"
                  fill="#AEAEAE"
                />
              </svg>
            </Mobile>
          </button>
        </div>
        <hr />
        {showFilter ? (
          <ImageFilter
            filteredCrafts={filteredCraftsImage}
            startYear={startYearImage}
            endYear={endYearImage}
            toggleStatus={toggleImage}
            updateCrafts={updateCrafts}
            updateYears={updateYears}
            updateToggle={updateToggle}
            reset={handleReset}
            resetToggle={resetToggleImage}
            close={handleClose}
          />
        ) : null}
        <ImageFeed
          objects={workshops.concat(archive)}
          selectedCard={selectedCard}
          onCloseCard={resetSelected}
          onExpandCard={handleExpand}
          imageFilterData={filterData}
        />
      </div>
      {children}
    </>
  );
};

// /* Retrieves workshops data from mongodb database */
// export async function getStaticProps() {
//   const workshops = await getAllWorkshops({ lean: true });
//   const archive = await getAllArchives({ lean: true, visualOnly: true });
//   return { props: { workshops, archive } };
// }

export default DiscoverLayout;
