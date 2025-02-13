import React from 'react';
import './saved.css';

export default function Saved() {
    return <main id="saved">
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
    </main>;
}