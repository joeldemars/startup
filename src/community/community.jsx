import React from 'react';
import './community.css';

export default function Community() {
    return <main id="community">
        <div className="card command-card">
            <h4 className="card-title">Placeholder command 1</h4>
            <span className="card-subtitle">N saves</span>
            <p className="card-text">Description 1</p>
            <hr />
            <code>$ ffmpeg -i infile.mp4 outfile.webm</code>
            <br />
            <div>
                <button type='button' className="btn btn-outline-light card-button">Copy</button>
                <button type='button' className="btn btn-outline-light card-button">Save</button>
            </div>
        </div>
        <div className="card command-card">
            <h4 className="card-title">Placeholder command 2</h4>
            <span className="card-subtitle">(M saves)</span>
            <p className="card-text">Description 2</p>
            <hr />
            <code>$ ffmpeg -i infile.webm outfile.mp4</code>
            <br />
            <div>
                <button type='button' className="btn btn-outline-light card-button">Copy</button>
                <button type='button' className="btn btn-outline-light card-button">Save</button>
            </div>
        </div>
    </main>;
}