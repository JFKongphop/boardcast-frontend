import { Pos, initialPos } from '@/type/room';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const boxHeight: number = 0.8;
const boxWidth: number = 0.9

const $room = () => {
  const { room } = useParams();
  const [pageSize, setPageSize] = useState<Pos>(initialPos);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageRef.current) {
      setPageSize({ 
        x: pageRef.current.offsetWidth,
        y: pageRef.current.offsetHeight
      });
    }
  }, [])

  return (
    <div 
      ref={pageRef}
      className=' w-screen h-screen flex justify-center items-center'
    >
      <div 
        style={{
          height: 500,
          width: 1000,
        }}
        className='border-2 border-red-500 relative'
      >
        {Array.from({ length: 100 }).map((_, num) => (
          
          <div 
            className="h-[500px] border-l-2 border-red-500 absolute"
            style={{
              left: `${(num) * 10}px`
            }}
          >
          </div>
        ))}
        {
          Array.from({ length: 49 }).map((_, num) => (
            <div 
              className=" w-[1000px] border-b-2 border-red-500 absolute"
              style={{
                top: `${(num + 1) * 10}px`
              }}
            >

            </div>
          ))
        }

        {/* <div className="h-[499px] border-l-2 border-red-500"></div> */}
        {/* <div className=" absolute top-0 right-0">
          <p>y: {pageSize.y * boxHeight}</p>
          <p>x: {pageSize.x * boxWidth}</p>
          <p>{532 / 32}</p>
          <p>{1296 / 32}</p>
          <p className=' bg-red-500 w-[10px] h-[10px]'></p>
        </div> */}
      </div>
      {/* {JSON.stringify(pageSize)} */}
    </div>
  )
}

export default $room