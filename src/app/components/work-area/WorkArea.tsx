'use client';

import React, { useRef, useEffect, useState } from 'react';
import Ruler from '@scena/react-ruler';
import Image from 'next/image';
import { MapInteractionCSS } from 'react-map-interaction';
import './WorkArea.css';

export default function WorkAreaComponent() {
  const rulerXRef = useRef<Ruler>(null);
  const rulerYRef = useRef<Ruler>(null);

  const [mounted, setMounted] = useState(false);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const [mapInteractionvalue, setMapInteractionValue] = useState({ scale: 1, translation: { x: 0, y: 0 } });

  const imageLoader = () => {
    return 'https://picsum.photos/800/600';
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrag = (e: { scale: number; translation: { x: number; y: number } }) => {
    const x = e.translation.x;
    const y = e.translation.y;

    setMapInteractionValue({ ...e });
    setScrollPos({ x, y });
  };

  useEffect(() => {
    if (rulerXRef.current && rulerYRef.current) {
      rulerXRef.current.resize();
      rulerYRef.current.resize();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        if (rulerXRef.current && rulerYRef.current) {
          rulerXRef.current.resize();
          rulerYRef.current.resize();
        }
      });
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {typeof window !== 'undefined' && (
          <>
            <Ruler
              ref={rulerXRef}
              type="horizontal"
              unit={50}
              zoom={1}
              scrollPos={scrollPos.x}
              style={{
                width: 'calc(100% - 30px)',
                height: '30px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                lineHeight: '30px',
                marginLeft: 'auto',
              }}
            />
            <Ruler
              ref={rulerYRef}
              type="vertical"
              unit={50}
              zoom={1}
              scrollPos={scrollPos.y}
              style={{
                width: '30px',
                height: '100%',
                backgroundColor: '#f0f0f0',
                color: '#333',
                lineHeight: '30px',
              }}
            />
          </>
        )}
        <div className="main-area">
          <MapInteractionCSS value={mapInteractionvalue} onChange={handleDrag}>
            <Image
              loader={imageLoader}
              src="."
              alt="Img"
              className="dark:invert"
              width={800}
              height={600}
              priority
            />
          </MapInteractionCSS>
        </div>
      </div>
    </>
  );
}
