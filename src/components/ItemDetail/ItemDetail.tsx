import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../../Qiita.tsx';
import './ItemDetail.css';

interface QiitaItem {
    id: string;
    title: string;
    body: string;
}

const ItemDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const [item, setItem] = useState<QiitaItem | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            if (id) {
                try {
                    const itemData = await getItemById(id);
                    if (itemData !== null && itemData !== undefined) {
                        setItem(itemData);
                    } else {
                        console.error('Item data is null or undefined.'); 
                    }
            } catch (error) {
                    console.error('Error fetching item by ID:', error);
                    setItem(null);
                }
            }
        };
        fetchItem();
    }, [id]);
    
    return (
        <div className="itemDetailContainer">
            {item ? (
                <div>
                    <h1>{item.title}</h1>
                    <p>{item.body}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ItemDetail;
