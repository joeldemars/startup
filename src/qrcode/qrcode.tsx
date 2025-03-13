import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import './qrcode.css';

const QrCode: React.FC = () => {
    const [params] = useSearchParams();

    const qrCodeApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?color=6bddad&bgcolor=000&data='
        + (params.get("command") ?? "");

    return <main id="qrcode">
        <div className='card qr-card'>
            <img src={qrCodeApiUrl} />
        </div>
    </main>;
}

export default QrCode;