import React, { useEffect, useState } from 'react'
import usePhoto from '../hooks/usePhoto'

function Main() {
    const { getPhotos } = usePhoto();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        getPhotos().then((response) => {
            setPhotos(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center w-full h-5/6 mb-2">
                <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl px-4 py-8 bg-white border-2 border-gray-300 rounded-lg shadow-xl">
                    <h1 className="text-2xl font-bold text-gray-900">Upload a photo</h1>
                    <p className="text-sm text-gray-500">Please upload a photo of your choice</p>
                    <div className="flex flex-col items-center justify-center w-full h-full mt-4">
                        <div className="flex flex-col items-center justify-center w-full h-full max-w-lg p-6 bg-gray-100 border-2 border-gray-300 rounded-lg">
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                <input type="file" name="file" id="file" className="w-full h-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-5/6">
                <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl px-4 py-8 bg-white border-2 border-gray-300 rounded-lg shadow-xl">
                    <h1 className="text-2xl font-bold text-gray-900">Uploaded photos</h1>
                    <p className="text-sm text-gray-500">Please upload a photo of your choice</p>
                    <div className="flex flex-col items-center justify-center w-full h-full mt-4">
                        <div className="flex flex-col items-center justify-center w-full h-full max-w-lg p-6 bg-gray-100 border-2 border-gray-300 rounded-lg">
                            <div className="flex flex-col items-center justify-center w-full h-full">
                                {
                                    photos.map((photo) => {
                                        return (
                                            <div className="flex flex-col items-center justify-center w-full h-full max-w-lg p-6 bg-gray-100 border-2 border-gray-300 rounded-lg">
                                                <div className="flex flex-col items-center justify-center w-full h-full">
                                                    <img src={"http://127.0.0.1:8000" + photo.image} alt="photo" />
                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main