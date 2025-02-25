import * as React from 'react';
import { Command, Container, AudioCodec, VideoCodec } from '../command/command';
import './home.css';

interface HomeProps {
    infile?: string;
    container?: Container;
    vcodec?: VideoCodec;
    acodec?: AudioCodec;
    outfile?: string;
}

const Home: React.FC<HomeProps> = (props) => {
    const [infile, updateInfile] = React.useState<string>(props.infile ?? "");
    const [container, updateContainer] = React.useState<Container>(props.container ?? "mp4");
    const [vcodec, updateVcodec] = React.useState<VideoCodec>(props.vcodec ?? "avc");
    const [acodec, updateAcodec] = React.useState<AudioCodec>(props.acodec ?? "aac");
    const [outfile, updateOutfile] = React.useState<string>(props.outfile ?? "");

    const command = generateCommand(infile, container, vcodec, acodec, outfile);

    const saveCommand = () => {
        let title = prompt("Input name for saved command");
        if (prompt == null) return;
        let commands: Command[] = JSON.parse(localStorage.getItem("userCommands") ?? "[]");
        commands.push({
            id: crypto.randomUUID().toString(),
            title: title!,
            saves: 0,
            command: command,
            infile: infile,
            container: container,
            acodec: acodec,
            vcodec: vcodec,
            outfile: outfile,
        });
        localStorage.setItem("userCommands", JSON.stringify(commands));
    }

    return <main id="home">
        <div className="card home-card">
            <span>
                <label htmlFor='infile'>Input file</label>
                <input name='infile' value={infile} onChange={(event) => updateInfile(event.target.value)} />
            </span>
            <span>
                <label htmlFor='container'>Container format</label>
                <select name='container' value={container} onChange={(event) => updateContainer(event.target.value as Container)}>
                    <option value='mp4'>MP4</option>
                    <option value='mkv'>MKV</option>
                    <option value='webm'>WebM</option>
                </select>
            </span>
            <span>
                <label htmlFor='vcodec'>Video codec</label>
                <select name='vcodec' value={vcodec} onChange={(event) => updateVcodec(event.target.value as VideoCodec)}>
                    <option value='avc'>AVC</option>
                    <option value='hevc'>HEVC</option>
                    <option value='vp9'>VP9</option>
                    <option value='av1'>AV1</option>
                </select>
            </span>
            <span>
                <label htmlFor='acodec'>Audio codec</label>
                <select name='acodec' value={acodec} onChange={(event) => updateAcodec(event.target.value as AudioCodec)}>
                    <option value='aac'>AAC</option>
                    <option value='opus'>Opus</option>
                    <option value='wav'>WAV</option>
                    <option value='flac'>FLAC</option>
                </select>
            </span>
            <span>
                <label htmlFor='outfile'>Output file</label>
                <div className="outfile-extension">
                    <input name='outfile' value={outfile} onChange={(event) => updateOutfile(event.target.value)} />
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

function generateCommand(infile: string, container: string, vcodec: string, acodec: string, outfile: string): string {
    let command = "ffmpeg ";

    if (infile == "") {
        command += "<input file> ";
    } else if (/ /.test(infile)) {
        command += "'" + infile + "' ";
    } else {
        command += infile + " ";
    }

    switch (vcodec) {
        case "avc":
            command += "-c:v libx264 ";
            break;
        case "hevc":
            command += "-c:v libx265 ";
            break;
        case "vp9":
            command += "-c:v libvpx-vp9 ";
            break;
        case "av1":
            command += "-c:v libaom-av1 ";
            break;
    }

    switch (acodec) {
        case "aac":
            command += "-c:a aac ";
            break;
        case "opus":
            command += "-c:a libopus ";
            break;
        case "wav":
            command += "-c:a pcm_s16le ";
            break;
        case "flac":
            command += "-c:a flac ";
            break;
    }

    if (outfile == "") {
        command += "<output file>." + container;
    } else if (/ /.test(outfile)) {
        command += "'" + outfile + "." + container + "'";
    } else {
        command += outfile + "." + container;
    }

    return command;
}