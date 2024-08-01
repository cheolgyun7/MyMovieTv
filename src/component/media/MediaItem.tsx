import React, { useState, useEffect } from 'react';
import { Media } from '../../types/Media';
import { IoIosInformationCircle } from 'react-icons/io';
import { FaRegHeart, FaHeart } from 'react-icons/fa'; // 채워진 하트를 위한 아이콘 추가
import { TfiBackRight } from 'react-icons/tfi';
import { useMovieStore } from '../../store/useStore';
import { useAuthStore } from '../../store/authStore';

import './mediaItem.css';

type MediaItemProps = {
  item: Media;
};

const MediaItem: React.FC<MediaItemProps> = ({ item }) => {
  const [flipped, setFlipped] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const addToCart = useMovieStore((state) => state.addToCart);
  const cart = useMovieStore((state) => state.cart);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      // 로그인된 사용자가 있으면 cart에서 현재 아이템이 있는지 확인
      const itemInCart = cart.some(
        (movie) => movie.userId === item.userId && movie.userId === user.uid
      );
      setIsInCart(itemInCart);
    }
  }, [cart, item.id, user]);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleAddToCart = () => {
    if (user) {
      addToCart({ ...item, userId: user.uid });
      setIsInCart(true); // 추가된 후 하트 아이콘을 채우기
    } else {
      alert('로그인해야 장바구니에 추가할 수 있습니다.');
    }
  };

  return (
    <div className='wrapper'>
      <div className={`CardBox ${flipped ? 'flipped' : ''}`}>
        <div className='card_Front'>
          <div className='info'>
            <div className='image-container'>
              <img
                alt={item.name}
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
              />
            </div>
            <div className='infoBox'>
              <IoIosInformationCircle
                color='white'
                size={24}
                onClick={handleFlip}
              />
            </div>
          </div>
        </div>
        <div className='card_Back'>
          <div className='info'>
            <h4>{item.title ? item.title : item.name}</h4>
            {isInCart ? (
              <FaHeart
                className='liked_svg'
                size={24}
                color='red'
                onClick={handleAddToCart}
              />
            ) : (
              <FaRegHeart
                className='liked_svg'
                size={24}
                color='red'
                onClick={handleAddToCart}
              />
            )}
            <TfiBackRight size={24} onClick={handleFlip} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaItem;
