import * as React from 'react';
import { Card } from '../card/card';
import './community.css';
import { Command } from '../command/command';
import { getCommands, Message } from '../api/api';


interface CommunityProps {
    user: string | null;
    socket: WebSocket;
}

const Community: React.FC<CommunityProps> = ({ user, socket }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    const handleMessage = async (message: Message) => {
        if (message.type == 'add') {
            updateCommands([...commands, message.command]);
        } else {
            const index = commands.findIndex((command) => command.id == message.command.id);
            if (index != -1) {
                commands[index] = message.command;
                updateCommands(commands);
            }
        }
    }

    React.useEffect(
        () => {
            (async () => updateCommands(await getCommands()))();
        },
        [],
    );

    React.useEffect(
        () => {
            socket.onmessage = (event) => handleMessage(JSON.parse(event.data) as Message);

            return () => { socket.onmessage = () => { } };
        },
        [],
    );

    return <main id="community">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}

export default Community;