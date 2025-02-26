import * as React from 'react';
import { Command } from '../command/command';
import { useNavigate } from 'react-router-dom';
// import './card.css';

const Card: React.FC<Command> = (command) => {
    const navigate = useNavigate();

    return <div className="card command-card">
        <h4 className="card-title">{command.title}</h4>
        <hr />
        <code>$ {command.command}</code>
        <br />
        <div>
            <button type='button' className="btn btn-outline-light card-button" onClick={() => navigator.clipboard.writeText(command.command)}>Copy</button>
            <button type='button' className="btn btn-outline-light card-button" onClick={() => navigate("home" + toQueryParameters(command))}>Edit</button>
        </div>
    </div>;
}

function toQueryParameters(command: Command): string {
    return `?id=${command.id}&title=${command.title}&saves=${command.saves}`
    + `&command=${command.command}&infile=${command.infile}&container=${command.container}`
    + `&acodec=${command.acodec}&vcodec=${command.vcodec}&outfile=${command.outfile}`;
}

export default Card;