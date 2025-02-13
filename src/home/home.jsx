import React from 'react';
import './home.css';

export default function Home() {
    return <main>
        <div className="card">
            <span id="mediaType">
                <select name='type'>
                    <option value='video'>Video</option>
                    <option value='audio'>Audio</option>
                    <option value='image'>Image</option>
                </select>
            </span>
            <span>
                <label for='infile'>Input file</label>
                <input name='infile'></input>
            </span>
            <span>
                <label for='container'>Container format</label>
                <select name='container'>
                    <option value='mp4'>MP4</option>
                    <option value='mkv'>MKV</option>
                    <option value='webm'>WebM</option>
                </select>
            </span>
            <span>
                <label for='vcodec'>Video Codec</label>
                <select name='vcodec'>
                    <option value='avc'>AVC</option>
                    <option value='hevc'>HEVC</option>
                    <option value='vp9'>VP9</option>
                    <option value='av1'>AV1</option>
                </select>
            </span>
            <span>
                <label for='acodec'>Audio Codec</label>
                <select name='acodec'>
                    <option value='aac'>AAC</option>
                    <option value='opus'>Opus</option>
                    <option value='wav'>WAV</option>
                    <option value='flac'>FLAC</option>
                </select>
            </span>
            <span>
                <label for='outfile'>Output file</label>
                <input name='outfile' />
            </span>
            <div className="card code">
                <code>$ ffmpeg -i</code>
                <button type='button' className="btn btn-outline-light">Copy</button>
            </div>
            <span>
                <button type='button' className="btn btn-outline-light">Save Command</button>
            </span>
        </div>
    </main>;
}