
import { FormEvent } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import imgLogo from '../assets/images/logo.svg';
import imgcheck from '../assets/images/check.svg';
import imgawnser from '../assets/images/answer.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRooms';
import { database } from '../services/firebase';
import remover from '../assets/images/delete.svg'

import '../styles/room.scss';


type RoomParans = {
    id: string;
}




export function AdminRoom() {
    const history = useHistory();
    const { user } = useAuth();
    const parans = useParams < RoomParans > ();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = parans.id;
    const { questions, title } = useRoom(roomId)


    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update({
            endedAt:new Date()
        })
        history.push('/')
    }

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm('tem certeza que deseja remover a pergunta ?')){
            const data = database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleQuestionAsAnswered(questionId:string){
        const data = database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true
        });
    }

    async function handleHighLightQuestion(questionId:string){
        const data = database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted:true
        });
    }
    function gotoRoomUser(){
        history.push(`/room/${roomId}`);
    }

    return (
        <div id="page-room">

            <header>
                <div className="content">
                    <img src={imgLogo} alt="" onClick={gotoRoomUser}/>
                    <div>
                    <RoomCode code={parans.id} />
                    <Button onClick={handleEndRoom}
                    isOutline>Encerrar sala</Button>
                    </div>
                    
                </div>
            </header>

            <main>
                <div className="content">
                    <div className="room-title">
                        <h1>Sala {title}</h1>
                        <span>{questions?.length > 0 && <span>{questions.length} perguntas(s)</span>}</span>
                    </div>
                    <div className="question-list">
                        {questions.map(question => {
                            return (
                                <Question
                                    key={question.id}
                                    content={question.content}
                                    isAnswered={question.isAnswered}
                                    isHighlighted={question.isHighlighted}
                                    author={question.author}>

                                        
                                        {!question.isAnswered && (
                                            <>
                                            <button 
                                            type='button'
                                            onClick={()=> handleQuestionAsAnswered(question.id)}>
                                                <img src={imgcheck} alt="marca pergunta como respondida" />
                                            </button>
    
                                            <button
                                            type='button'
                                            onClick={()=> handleHighLightQuestion(question.id)}>
                                                <img src={imgawnser} alt="Destaque para a pergunta" />
                                            </button>
                                            </>
                                        )}


                                        <button
                                        type='button'
                                        onClick={()=> handleDeleteQuestion(question.id)}>
                                            <img src={remover} alt="remover question" />
                                        </button>
                                </Question>
                            )
                        })}
                    </div>

                </div>
            </main>
        </div>
    );
}



