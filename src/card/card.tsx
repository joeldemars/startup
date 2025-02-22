import * as React from 'react';
import Command from '../command/command';
// import './card.css';

const Card: React.FC<Command> = (command: Command) => <div className="card command-card">
    <h4 className="card-title">{ command.name }</h4>
    <p className="card-text">{ command.description }</p>
    <hr />
    <code>{ command.command }</code>
    <br />
    <div>
        <button type='button' className="btn btn-outline-light card-button">Copy</button>
        <button type='button' className="btn btn-outline-light card-button">Edit</button>
    </div>
</div>;

export default Card;