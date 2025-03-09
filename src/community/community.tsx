import * as React from 'react';
import { Card } from '../card/card';
import './community.css';
import { Command } from '../command/command';
import { getCommands } from '../api/api';


interface CommunityProps {
    user: string | null;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState<Command[]>([]);

    React.useEffect(() => {
        (async () => {
            updateCommands(await getCommands());
        })();
    },
        [],
    );

    return <main id="community">
        {commands.map((command: Command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}

export default Community;