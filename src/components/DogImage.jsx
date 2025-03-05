import { useEffect, useState } from "react";

function DogImage() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNewImage();
    }, []);

    const fetchNewImage = async () => {
        setLoading(true); // 👈 Mostra "Loading..." prima di caricare l'immagine
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setImageUrl(data.message);
        setLoading(false); // 👈 Nasconde "Loading..." dopo il caricamento
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🐶 Random Dog Viewer</h2>

            <div className="relative">
                {loading && <p>Loading...</p>} {/* 👈 Qui viene mostrato "Loading..." */}
                {imageUrl && <img src={imageUrl} alt="Random Dog" className="rounded-lg shadow-md w-80 h-80 object-cover" />}
            </div>

            <button
                onClick={fetchNewImage}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all"
            >
                🔄 New Image
            </button>
        </div>
    );
}

export default DogImage;
