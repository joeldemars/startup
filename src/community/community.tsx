import * as React from 'react';
import { Card } from '../card/card';
import './community.css';
import { Command } from '../command/command';
import { addCommand, getCommands } from '../api/api';


interface CommunityProps {
    user: string | null;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState(getCommands());

    function generateRandomCommands(): number {
        return setInterval(() => {
            addCommand({
                id: crypto.randomUUID().toString(),
                title: `Generated Command ${commands.length}`,
                author: "Random",
                saves: 0,
                command: "ffmpeg -i in.mp4 out.mp4",
                infile: "in.mp4",
                container: "mp4",
                acodec: "aac",
                vcodec: "avc",
                outfile: "out",
            });
            updateCommands(getCommands());
        }, 5000);
    }

    React.useEffect(() => {
        let interval = generateRandomCommands();
        return () => clearInterval(interval);
    });

    return <main id="community">
        {commands.map((command: Command) => <Card key={command.id} {...command} user={user} />)}
    </main>;
}

export default Community;