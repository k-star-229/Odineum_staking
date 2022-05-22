import { Key, useRef, useState, useCallback, SetStateAction } from 'react';
import HTMLFlipBook from 'react-pageflip';

function WhitePaper() {
  const flipBook = useRef();
  const pages = [
    "img/whitepaper/cover.png",
    "img/whitepaper/first_page.png",
    "img/whitepaper/second_page.png",
    "img/whitepaper/third_page.png",
    "img/whitepaper/fourth_page.png",
    "img/whitepaper/fifth_page.png",
    "img/whitepaper/last_page.png",
    "img/whitepaper/sub_header.png"
  ]
  const [clicked, setClicked] = useState<boolean>(true);

  return (
    <div className='whitepaper-bg'>
      <div className='whitepaper-size md-show'>
        {clicked && <div className='click' onClick={() => {
          setClicked(false);
        }}>
          <img src="img/triangle.png" alt="triangle" />
          <p>Click here</p>
        </div>}
        <HTMLFlipBook
          className='md-show'
          startPage={0}
          size='stretch'
          width={680}
          height={950}
          minWidth={375}
          maxWidth={2480}
          minHeight={667}
          maxHeight={3508}
          drawShadow={false}
          flippingTime={1000}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={1}
          showCover={false}
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={100}
          showPageCorners
          disableFlipByClick={false}
          style={{ margin: 'auto auto' }}
          ref={flipBook}
        >
          <div className='bg-logo' />
          {pages.map((item: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`image-${index}`}>
              <img className='w-full h-full' src={item} alt="" />
            </div>
          ))}
          <div className='bg-logo' />
        </HTMLFlipBook>
      </div>
      <div className='whitepaper-size md-hide'>
        {clicked && <div className='click' onClick={() => {
          setClicked(false);
        }}>
          <img src="img/triangle.png" alt="triangle" />
          <p>Click here</p>
        </div>}
        <HTMLFlipBook
          className='md-hide'
          startPage={0}
          size='stretch'
          width={680}
          height={950}
          minWidth={375}
          maxWidth={2480}
          minHeight={667}
          maxHeight={3508}
          drawShadow={false}
          flippingTime={1000}
          usePortrait
          startZIndex={0}
          autoSize
          maxShadowOpacity={1}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={100}
          showPageCorners
          disableFlipByClick={false}
          style={{ margin: 'auto auto' }}
          ref={flipBook}
        >
          {pages.map((item: string, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`image-${index}`}>
              <img className='w-full h-full' src={item} alt="" />
            </div>
          ))}
          <div className='bg-logo' />
        </HTMLFlipBook>
      </div>
    </div>
  );
}

export default WhitePaper;