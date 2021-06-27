import copyruncode from '../assets/images/copy.svg';
import '../styles/roomcode.scss';

type RoomCodeProps = {
    code: string,
}

export function RoomCode(props: RoomCodeProps) {

    function roomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code);
    }
    return (
        <button className="room-code" onClick={roomCodeToClipBoard}>
            <div>
                <img src={copyruncode} alt="imagem copiar room code" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}