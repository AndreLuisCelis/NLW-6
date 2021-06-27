import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type Questions = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: any;
    isAnswered: boolean;
    isHighlighted: boolean;
    likesCount: number;
    likeId:string | undefined;
    
}

type FirebaseQuestion = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: any;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record <string,{
        authorId: string;
    }>;
}>

export function useRoom(roomId:string){
    const { user } = useAuth();
    const [questions, setquestions] = useState<Questions[]>([]);
    const [title, setTitle] = useState('');
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {};
            const parsedQuetions = Object.entries(firebaseQuestion)
                .map(([key, value]) => {
                    return {
                        id: key,
                        content: value.content,
                        author: value.author,
                        isAnswered: value.isAnswered,
                        isHighlighted: value.isHighlighted,
                        likesCount: Object.values(value.likes?? {}).length,
                        likeId: Object.entries(value.likes?? {}).find(([key,like ])=> like.authorId==user?.id)?.[0]
                    }
                })
            setTitle(databaseRoom.title);
            setquestions(parsedQuetions);
        })
        return ()=>{
            roomRef.off('value');
        }
    }, [roomId, user?.id]);
    return { questions , title};
}