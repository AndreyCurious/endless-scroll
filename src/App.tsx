import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { ICard } from './types';
import Card from './components/card';

function App() {
  const [photos, setPhotos] = useState<ICard[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const loadContetnt = (start: number = 0, limit: number = 20) => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${start}`
    )
      .then((res) => {
        setTotalCount(Number(res.headers.get('x-total-count')));
        return res.json();
      })
      .then((res) => {
        setPhotos([...photos, ...res]);
        setOffset(offset + 20);
      });
  };

  const scrollHandler = () => {
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop -
        window.innerHeight <
        100 &&
      totalCount > photos.length
    ) {
      loadContetnt(offset);
    }
  };

  const cacheScrollHandler = useCallback(scrollHandler, [
    offset,
    totalCount,
    photos,
  ]);

  useEffect(() => {
    loadContetnt();
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', cacheScrollHandler);
    return function () {
      document.removeEventListener('scroll', cacheScrollHandler);
    };
  }, [cacheScrollHandler]);

  return (
    <div className="App">
      {photos &&
        photos.map((photo) => (
          <Card
            key={photo.id}
            card={photo}
          />
        ))}
    </div>
  );
}

export default App;
