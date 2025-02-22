import * as React from 'react';
import Card from '../card/card';
import Command from '../command/command';
import { VideoOptions } from '../command/command';
import './saved.css';

const Saved: React.FC = () => <main id="saved">
    <div className="card command-card">
        <h4 className="card-title">Saved command 1</h4>
        <p className="card-text">Description 1</p>
        <hr />
        <code>$ ffmpeg -i infile.mp4 outfile.webm</code>
        <br />
        <div>
            <button type='button' className="btn btn-outline-light card-button">Copy</button>
            <button type='button' className="btn btn-outline-light card-button">Edit</button>
        </div>
    </div>
    <div className="card command-card">
        <h4 className="card-title">Saved command 2</h4>
        <p className="card-text">Description 2</p>
        <hr />
        <code>$ ffmpeg -i infile.webm outfile.mp4</code>
        <br />
        <div>
            <button type='button' className="btn btn-outline-light card-button">Copy</button>
            <button type='button' className="btn btn-outline-light card-button">Edit</button>
        </div>
    </div>
    {/* <Card command={ new Command("Saved command 3", "Description 3", "$ ffmpeg ...", new VideoOptions("in.mp4", "MKV", "AVC", "AAC", "out.mp4"), 3) } /> */}
    <Card name="Saved command 3" description="Description 3" command="$ ffmpeg ..." options={new VideoOptions("in.mp4", "MKV", "AVC", "AAC", "out.mp4")} saves={3} />
</main>;

export default Saved;