import imageIlustration from '../assets/images/illustration.svg';
import imageLogo from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {

    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();


    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        if (newRoom.trim() === '') {
            return;
        }
        const roomsRef = database.ref('rooms');

        const firebaseRooms = roomsRef.push({
            title: newRoom,
            authorId: user?.id
        })
        history.push(`/room/${firebaseRooms.key}`);
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
                    <h1>{user?.name}</h1>
                    <img src={imageLogo} alt="imagem logo" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            onChange={event => setNewRoom(event.target.value)}
                            type="text"
                            placeholder='Nome da Sala'
                            value={newRoom}
                        />
                        <Button type='submit'>Entrar na sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente ? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )

}