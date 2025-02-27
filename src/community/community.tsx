import * as React from 'react';
import { Card } from '../card/card';
import './community.css';
import { Command } from '../command/command';

interface CommunityProps {
    user: string | null;
}

const Community: React.FC<CommunityProps> = ({ user }) => {
    const [commands, updateCommands] = React.useState(JSON.parse(localStorage.getItem("commands") ?? "[]"));

    function generateRandomCommands(): number {
        return setInterval(() => {
            let commands: Command[] = JSON.parse(localStorage.getItem("commands") ?? "[]");
            commands.push({
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
            localStorage.setItem("commands", JSON.stringify(commands));
            updateCommands(commands);
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

function generateRandomCommands() {
    setInterval(() => {

    }, 5000);
}

export default Community;