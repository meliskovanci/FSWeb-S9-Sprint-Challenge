import React, {useEffect, useState} from 'react'
import axios from 'axios';


// önerilen başlangıç stateleri
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 //  "B" nin bulunduğu indexi



export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  const initialGrid = [
    [1, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [3, 2],
    [1, 3], [2, 3], [3, 3]
  ]


  const [steps, setSteps] = useState(initialSteps)
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [index, setIndex] = useState(initialIndex)

  
 function getXY(initialGrid,index) {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
     return [initialGrid[index][0] ,initialGrid[index][1]]
  }


  // const [x,y]=getXY(initialGrid,index)
  // console.log(x,y)

  function getXYMesaj(getXY,initialGrid,index,steps) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    
    // return `(${getXY(initialGrid)[index][0]}, ${getXY(initialGrid)[index][1]})`
   const text=[];
   const [x,y]=getXY(initialGrid,index);
   console.log( getXY(initialGrid,index))
   text[0]=`(${x},${y})`;
   console.log(`(${x},${y})`)
   text[1]=steps;
   return text;

   
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setSteps(initialSteps)
    setIndex(initialIndex)
    setEmail(initialEmail)
    setMessage(initialMessage)
    
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.

    if(yon === 'sol' && index !==0 && index !==3 && index !==6) {
      setIndex(index - 1)
      setSteps(steps + 1)
      setMessage("")
    
  } else if (yon === 'sağ' && index !==2 && index !==5 && index !==8) {
      setIndex(index + 1)
      setSteps(steps +1)
      setMessage("")
    
  } else if (yon === 'aşağı' && index !==6 && index !==7 && index !==8) {
      setIndex(index + 3)
      setSteps(steps + 1)
      setMessage("")
  } else if(yon === 'yukarı' && index !==0 && index !== 1 && index !== 2) {
      setIndex(index - 3)
      setSteps(steps +1)
      setMessage("")
  } 
  else {
    if(yon === "sağ") {
      setMessage(`Sağa gidemezsiniz`)}
      else if(yon === "sol") {
        setMessage(`Sola gidemezsiniz`)}
        else if(yon === "yukarı") {
          setMessage(`Yukarıya gidemezsiniz`)}
          else {
            setMessage(`Aşağıya gidemezsiniz`)}
  }
  }
  

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
  
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault(evt)
    if (email === "") {
      setMessage("Ouch: email is required")
    } else{
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    


    const payLoad = {
    "x":initialGrid[index][0], 
    "y":initialGrid[index][1], 
    "steps":steps, 
    "email":email}

    axios
    .post( "http://localhost:9000/api/result" ,payLoad)
    .then(response=>
      // console.log(res.data)
      setMessage(response.data.message))
    .catch(error => 
      setMessage(error.response.data.message))
    .finally(()=>{
      setEmail(initialEmail);
     
    })

  }
    
}
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {getXYMesaj(getXY,initialGrid,index,steps)[0]}</h3>
        
        <h3 id="steps">{getXYMesaj(getXY,initialGrid,index,steps)[1]} kere ilerlediniz</h3>

      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (

            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>


              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={()=>sonrakiIndex("sol")} id="left">SOL</button>
        <button onClick={()=>sonrakiIndex("yukarı")} id="up">YUKARI</button>
        <button onClick={()=>sonrakiIndex("sağ")} id="right">SAĞ</button>
        <button onClick={()=>sonrakiIndex("aşağı")} id="down">AŞAĞI</button>
        <button onClick={reset} id="reset">reset</button>
      </div>
      <form onSubmit= {onSubmit}>
        <input onChange={(e)=>onChange(e)} value={email} id="email" type="email" placeholder="email girin"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
