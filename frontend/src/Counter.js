import React, {useState, useEffect} from 'react';

const Counter = () => {
    const [number, setNumber] = useState(0);
    let dong = 0
    useEffect(()=>{
        console.log("asdfasdf")
    });
    // props = 정적인 데이터를 사용할 때,
    // state = 동적인 데이터를 사용할 때.

    // 정적, 동적 구분법
    // 렌더링이 필요한 지? (state, 변경되었을 때 수정되는 부분만 리렌더링)
    
    const plusNum = () => {
        setNumber(number+1)
    }
    const minusNum = () => {
        setNumber(number-1)
    }
    return (
    <>
        <h2>{number}입니다.</h2>
        <button onClick={plusNum}>+</button>
        <button onClick={minusNum}>-</button>
    </>
    )
};

export default Counter;
