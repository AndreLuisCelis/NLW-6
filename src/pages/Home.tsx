import imageIlustration from '../assets/images/illustration.svg';
import imageLogo from '../assets/images/logo.svg';
import logoGoogle from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useHistory } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

export function Home() {

    const history = useHistory();
    const {user, signWithGoogle} = useAuth();
    const [roomCode, setRoomcode]= useState('');

    let handleCreateRoom = async  ()=>{
        if(!user){
            await signWithGoogle()
        }
        history.push('/room/new');
    }

    async function handleJoinRoom(event:FormEvent){
        event.preventDefault();
        if(roomCode.trim()===''){
            return;
        }
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if(!roomRef.exists()){
            alert('Room  not exists');
            return;
        }
        history.push('/room/'+roomCode);
    }



    return (
        <div id='page-auth'>
            <aside>
                <img src={imageIlustration} alt="imagem ilustração" />
                <strong>Crie salas de Q&amp;A , ao vivo</strong>
                <p>Tire as dúvidas de sua audiencia ao vivo</p>
            </aside>
            <main  >
                <div className='main-content'>
                    <img src={imageLogo} alt="imagem logo" />
                    <button className='create-room' onClick={handleCreateRoom}>
                        <img  src={logoGoogle} alt="imagem logo google" />
                        Crie uma sala com o google
                    </button>
                    <div className='separator'>Ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder='Digite o código da Sala'
                            onChange={event => setRoomcode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )

}