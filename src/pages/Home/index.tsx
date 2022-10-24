import React, { useState, useEffect } from 'react';
import {AiOutlineTwitter } from 'react-icons/ai'
import './styles.css';

//fazendo a importacao da typagem
//o card props e um vetor <CardProps[]>



import { Card, CardProps } from '../../components/Card';

type ProfileResponse = {
  name: string;
  avatar_url:string;
  twitter_username: string
  bio: string
}


type User = {
  name: string;
  avatar: string; 
  twitter: string 
  biografia: string

}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User);

  //tipo do nosso objeto e um User ele comeca como um objeto vazio 
  // coloca uma as mais o formato do objeto e um User que ira puxa a type com o name e avatar 


  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',       
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/offmak');
      const data = await response.json() as ProfileResponse;
      

      setUser({
        name: data.name,
        avatar: data.avatar_url,
        twitter: data.twitter_username,
        biografia: data.bio,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
           
            <p className='bio'>{user.biografia}</p>

          <strong>{user.name}</strong>
          <strong className='twitter'>{user.twitter}<AiOutlineTwitter/></strong>
           
          <img src={user.avatar} alt="Foto de perfil" />
          
        </div>
      </header>

  
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card
            key={student.time}
            name={student.name}
            time={student.time}
        
          />
        ))
      }
    </div>
  )
}
