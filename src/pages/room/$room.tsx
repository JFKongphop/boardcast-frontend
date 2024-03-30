import { initialPos } from '@/type/initialRoom';
import { MultiPos, Pos } from '@/type/room';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BroadcastChannel } from 'broadcast-channel';


const boxHeight: number = 0.8;
const boxWidth: number = 0.9

const $room = () => {
  const { room } = useParams();
  const [position, setPosition] = useState<Pos>(initialPos);
  const [multiPosition, setMultiPosition] = useState<MultiPos[]>([])
  const pageRef = useRef<HTMLDivElement>(null);
  const [playerId, setPlayerId] = useState<number>(0);

  const { id } = useParams()

  const channel = new BroadcastChannel('1');

  const joinRoom = () => {
    const joinMessage: MultiPos = {
      message: 'join',
      playerId,
      position: { x:10, y: 10 },
      color: 'green'
    }
    channel.postMessage(joinMessage);
  }

  const syncItUp = () => {
    const message: MultiPos = {
      message: 'play',
      playerId,
      position,
      color: 'green'
    };
    return channel.postMessage(message);
  };

  useEffect(() => {
    channel.onmessage = (ev: MultiPos) => {
      if (multiPosition.length > 0) {
        console.log('have', ev.playerId === multiPosition[0].playerId)
      }
      
      if (ev.message === 'play') {
        const updatedMultiPos = multiPosition.map((multiPos) => multiPos.playerId === ev.playerId
          ?
          {
            ...multiPos,
            position: multiPos.position
          }
          :
          multiPos
        );
        console.log(updatedMultiPos)
        setMultiPosition(updatedMultiPos);
      }
      else if (ev.message === 'join') {
        setMultiPosition((mul) => [...mul, ev])
      }
    }
  }, [channel]);

  useEffect(() => {
    console.log(multiPosition)
  }, [multiPosition])

  const keyDownHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        return setPosition((prevPos) => {
          return {
            ...prevPos,
            y: prevPos.y - 10
          }
        });
      case 'ArrowLeft':
        return setPosition((prevPos) => {
          return {
            ...prevPos,
            x: prevPos.x - 10
          }
        });
      case 'ArrowRight':
        return setPosition((prevPos) => {
          return {
            ...prevPos,
            x: prevPos.x + 10
          }
        });
      case 'ArrowDown':
        return setPosition((prevPos) => {
          return {
            ...prevPos,
            y: prevPos.y + 10
          }
        });
    }
  };
 
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    if (position.x < 0) {
      return setPosition((prevPos) => {
        return {
          ...prevPos,
          x: 0
        }
      })
    }
    if (position.x > 990) {
      return setPosition((prevPos) => {
        return {
          ...prevPos,
          x: 990
        }
      })
    }
    if (position.y < 0) {
      return setPosition((prevPos) => {
        return {
          ...prevPos,
          y: 0
        }
      })
    }
    if (position.y > 490) {
      return setPosition((prevPos) => {
        return {
          ...prevPos,
          y: 490
        }
      })
    }
  }, [position]);

  useEffect(() => {
    syncItUp()
  }, [position])



  return (
    <div 
      ref={pageRef}
      className=' w-screen h-screen flex flex-col justify-center items-center'
    >
      <p>{JSON.stringify(multiPosition)}</p>
      <button onClick={joinRoom}>Join</button>
      <div className='relative ring-2 ring-black h-[500px] w-[1000px]'>
        <p 
          style={{
            top: `${position.y}px`,
            left: `${position.x}px`
          }}
          className='absolute bg-red-500 w-[10px] h-[10px] rounded-full' 
        />
        {
          multiPosition.map((data) => (
            <p 
            style={{
              top: `${data.position.y}px`,
              left: `${data.position.x}px`,
              backgroundColor: data.color
            }}
            className='absolute w-[10px] h-[10px] rounded-full' 
            />
          ))
        }
      </div>
    </div>
  )
}

export default $room