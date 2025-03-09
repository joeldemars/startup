import * as React from 'react';
import { Command, Container, AudioCodec, VideoCodec, generateCommand } from '../command/command';
import './home.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addCommand, updateCommand } from '../api/api';

interface HomeProps {
    user: string | null;
}

const Home: React.FC<HomeProps> = ({user}) => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [infile, updateInfile] = React.useState(params.get("infile") ?? "");
    const [container, updateContainer] = React.useState(params.get("container") as Container ?? "mp4");
    const [vcodec, updateVcodec] = React.useState(params.get("vcodec") as VideoCodec ?? "avc");
    const [acodec, updateAcodec] = React.useState(params.get("acodec") as AudioCodec ?? "aac");
    const [outfile, updateOutfile] = React.useState(params.get("outfile") ?? "");

    const command = generateCommand(infile, container, vcodec, acodec, outfile);

    const saveCommand = () => {
        if (user == null) {
            alert("Sign in to save commands");
            return;
        }

        let id = params.get("id");
        let title = params.get("title") ?? prompt("Input name for saved command");
        let saves = parseInt(params.get("saves") ?? "0");

        if (title == null) return;

        let newCommand = {
            id: id,
            author: user,
            title: title,
            saves: saves,
            command: command,
            infile: infile,
            container: container,
            acodec: acodec,
            vcodec: vcodec,
            outfile: outfile,
        };

        if (id == null) {
            newCommand.id = crypto.randomUUID().toString();
            addCommand(newCommand as Command);
        } else {
            updateCommand(newCommand as Command);
        }

        navigate("/saved");
    }

    return <main id="home">
        <div className="card home-card">
            <span>
                <label htmlFor='infile'>Input file</label>
                <input id='infile' value={infile} onChange={(event) => updateInfile(event.target.value)} />
            </span>
            <span>
                <label htmlFor='container'>Container format</label>
                <select id='container' value={container} onChange={(event) => updateContainer(event.target.value as Container)}>
                    <option value='mp4'>MP4</option>
                    <option value='mkv'>MKV</option>
                    <option value='webm'>WebM</option>
                </select>
            </span>
            <span>
                <label htmlFor='vcodec'>Video codec</label>
                <select id='vcodec' value={vcodec} onChange={(event) => updateVcodec(event.target.value as VideoCodec)}>
                    <option value='avc'>AVC</option>
                    <option value='hevc'>HEVC</option>
                    <option value='vp9'>VP9</option>
                    <option value='av1'>AV1</option>
                </select>
            </span>
            <span>
                <label htmlFor='acodec'>Audio codec</label>
                <select id='acodec' value={acodec} onChange={(event) => updateAcodec(event.target.value as AudioCodec)}>
                    <option value='aac'>AAC</option>
                    <option value='opus'>Opus</option>
                    <option value='wav'>WAV</option>
                    <option value='flac'>FLAC</option>
                </select>
            </span>
            <span>
                <label htmlFor='outfile'>Output file</label>
                <div className="outfile-extension">
                    <input id='outfile' value={outfile} onChange={(event) => updateOutfile(event.target.value)} />
                    .{container}
                </div>
            </span>
            <div className="card code">
                <code>$ {command}</code>
                <button type='button' className="btn btn-outline-light" onClick={() => navigator.clipboard.writeText(command)}>Copy</button>
            </div>
            <span>
                <button type='button' className="btn btn-outline-light" onClick={saveCommand}>Save Command</button>
            </span>
        </div>
    </main>
};

export default Home;