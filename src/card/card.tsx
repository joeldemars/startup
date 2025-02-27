import * as React from 'react';
import { AudioCodec, Command, Container, VideoCodec } from '../command/command';
import { useNavigate } from 'react-router-dom';
// import './card.css';

export const SavedCard: React.FC<Command> = (command) => {
    const navigate = useNavigate();

    return <div className="card command-card">
        <h4 className="card-title">{command.title}</h4>
        <p>{command.saves == 1 ? "1 save" : command.saves + " saves"}</p>
        <hr />
        <code>$ {command.command}</code>
        <br />
        <div>
            <button type='button' className="btn btn-outline-light card-button" onClick={() => navigator.clipboard.writeText(command.command)}>Copy</button>
            <button type='button' className="btn btn-outline-light card-button" onClick={() => navigate("home" + toQueryParameters(command))}>Edit</button>
        </div>
    </div>;
}

interface CommunityCardProps {
    id: string;
    title: string;
    author: string;
    saves: number;
    command: string;
    infile: string;
    container: Container;
    acodec: AudioCodec;
    vcodec: VideoCodec;
    outfile: string;
    user: string | null;
}

export const CommunityCard: React.FC<CommunityCardProps> = (props) => {
    const navigate = useNavigate();

    const saveCardAction: (command: Command) => void = (command) => {
        saveCard(command, props.user);
        navigate("/saved");
    }

    return <div className="card command-card">
        <h4 className="card-title">{props.title}</h4>
        <p>{props.saves == 1 ? "1 save" : props.saves + " saves"}</p>
        <hr />
        <code>$ {props.command}</code>
        <br />
        <div>
            <button type='button' className="btn btn-outline-light card-button" onClick={() => navigator.clipboard.writeText(props.command)}>Copy</button>
            <button type='button' className="btn btn-outline-light card-button" onClick={() => saveCardAction(props)}>Save</button>
        </div>
    </div>;
}

// const Card: React.FC<Command> = (command) => {
//     const navigate = useNavigate();

//     return <div className="card command-card">
//         <h4 className="card-title">{command.title}</h4>
//         <p>{command.saves == 1 ? "1 save" : command.saves + " saves"}</p>
//         <hr />
//         <code>$ {command.command}</code>
//         <br />
//         <div>
//             <button type='button' className="btn btn-outline-light card-button" onClick={() => navigator.clipboard.writeText(command.command)}>Copy</button>
//             <button type='button' className="btn btn-outline-light card-button" onClick={() => navigate("home" + toQueryParameters(command))}>Edit</button>
//         </div>
//     </div>;
// }

function toQueryParameters(command: Command): string {
    return `?id=${command.id}&title=${command.title}&saves=${command.saves}`
    + `&command=${command.command}&infile=${command.infile}&container=${command.container}`
    + `&acodec=${command.acodec}&vcodec=${command.vcodec}&outfile=${command.outfile}`;
}

function saveCard(command: Command, user: string|null) {
    if (user == null) {
        alert("Sign in to save commands");
        return;
    }
    let commands: Command[] = JSON.parse(localStorage.getItem("commands") ?? "[]");
    let oldIndex = commands.findIndex((c) => c.id == command.id);
    commands[oldIndex].saves++;
    commands.push({
        id: crypto.randomUUID().toString(),
        title: command.title,
        author: user,
        saves: 0,
        command: command.command,
        infile: command.infile,
        container: command.container,
        acodec: command.acodec,
        vcodec: command.vcodec,
        outfile: command.outfile,
    });
    localStorage.setItem("commands", JSON.stringify(commands));
}

// export default Card;