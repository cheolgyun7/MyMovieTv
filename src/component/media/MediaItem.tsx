import React, { useState } from 'react';
import { Media } from '../../types/Media';
import { IoIosInformationCircle } from 'react-icons/io';
import { TfiBackRight } from 'react-icons/tfi';

import './mediaItem.css';

type MediaItemProps = {
  item: Media;
};

const MediaItem: React.FC<MediaItemProps> = ({ item }) => {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className='wrapper'>
      <div className={`CardBox ${flipped ? 'flipped' : ''}`}>
        <div className='card_Front'>
          <p className='info'>
            <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} />
            <IoIosInformationCircle onClick={handleFlip} size={24} />
          </p>
        </div>
        <div className='card_Back'>
          <div className='info'>
            <h4>{item.title ? item.title : item.name}</h4>
            <TfiBackRight onClick={handleFlip} size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;