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
        <div className='card_Front' onClick={handleFlip}>
          <p className='info'>
            <img
              alt={item.name}
              src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            />
            <IoIosInformationCircle size={24} />
          </p>
        </div>
        <div className='card_Back' onClick={handleFlip}>
          <div className='info'>
            <h4>{item.title ? item.title : item.name}</h4>
            <TfiBackRight size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
