import React from 'react';

export default function Card({ name, description }: { name: string; description: string }) {
    return (
        <div className="flex m-3 rounded border-2 border-black align-center">
            <h2 className="m-1">{name}</h2>
            <p className="m-1">{description}</p>
        </div>
    );
}

