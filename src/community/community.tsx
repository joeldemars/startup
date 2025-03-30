import * as React from 'react';
import { Card } from '../card/card';
import './community.css';
import { Command } from '../command/command';
import { getCommands, Message } from '../api/api';


interface CommunityProps {
    user: string | null;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    const handleMessage = async (message: Message) => {
        updateCommands(await getCommands());
    }

    React.useEffect(
        () => {
            (async () => updateCommands(await getCommands()))();
        },
        [],
    );

    React.useEffect(
        () => {
            const protocol = window.location.protocol == 'http:' ? 'ws' : 'wss';
            const socket = new WebSocket(`${protocol}://${window.location.host}`);
            socket.onmessage = (event) => handleMessage(JSON.parse(event.data) as Message);

            return () => socket.close();
        },
        [],
    );

    return <main id="community">
        {commands.map((command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}

export default Community;