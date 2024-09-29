import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { ICard } from './types';
import Card from './components/card';

function App() {
  const [photos, setPhotos] = useState<ICard[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const appRef = useRef<HTMLDivElement | null>(null);
  const endlessscrollRef = useRef<HTMLDivElement | null>(null);

  const loadContent = (start: number = 0, limit: number = 2) => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_start=${start}`
    )
      .then((res) => {
        setTotalCount(Number(res.headers.get('x-total-count')));
        return res.json();
      })
      .then((res) => {
        setPhotos([...photos, ...res]);
        setOffset(offset + 2);
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && offset <= totalCount) {
        loadContent(offset);
      }
    });
    observer.observe(endlessscrollRef.current as Element);
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div
      ref={appRef}
      className="App"
    >
      {photos &&
        photos.map((photo) => (
          <Card
            key={photo.id}
            card={photo}
          />
        ))}
      <div
        ref={endlessscrollRef}
        className="endlessscroll"
      ></div>
    </div>
  );
}

export default App;
