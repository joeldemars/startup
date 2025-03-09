import * as React from 'react';
import { AudioCodec, Command, Container, VideoCodec } from '../command/command';
import { useNavigate } from 'react-router-dom';
import { addCommand, markNewSave } from '../api/api';

interface CardProps {
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

export const Card: React.FC<CardProps> = (props) => {
    return <div className="card command-card">
        <h4 className="card-title">{props.title}</h4>
        <p>{props.saves == 1 ? "1 save" : props.saves + " saves"}</p>
        <hr />
        <code>$ {props.command}</code>
        <br />
        <div>
            <button
                type='button'
                className="btn btn-outline-light card-button"
                onClick={() => navigator.clipboard.writeText(props.command)}
            >
                Copy
            </button>
            {
                props.user == props.author
                    ? <EditButton {...props} />
                    : <SaveButton {...props} />
            }
        </div>
    </div>;
}

const EditButton: React.FC<Command> = (command) => {
    const navigate = useNavigate();

    return <button
        type='button'
        className="btn btn-outline-light card-button"
        onClick={() => navigate("home" + toQueryParameters(command))}
    >
        Edit
    </button>;
}

const SaveButton: React.FC<CardProps> = (props) => {
    const navigate = useNavigate();

    const saveCardAction = (command: Command) => {
        saveCard(command, props.user);
        navigate("/saved");
    }

    return <button
        type='button'
        className="btn btn-outline-light card-button"
        onClick={() => saveCardAction(props)}
    >
        Save
    </button>;
}

function toQueryParameters(command: Command): string {
    return `?id=${command.id}&title=${command.title}&saves=${command.saves}`
        + `&command=${command.command}&infile=${command.infile}&container=${command.container}`
        + `&acodec=${command.acodec}&vcodec=${command.vcodec}&outfile=${command.outfile}`;
}

function saveCard(command: Command, user: string | null) {
    if (user == null) {
        alert("Sign in to save commands");
        return;
    }

    markNewSave(command.id);
    addCommand({
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
}
