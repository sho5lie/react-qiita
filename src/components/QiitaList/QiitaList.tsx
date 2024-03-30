import React from 'react';
import { Link } from 'react-router-dom';
import './QiitaList.css';

interface QiitaItem {
    id: string;
    title: string;
}

interface Props {
    Items: QiitaItem[];
}

const QiitaList: React.FC<Props> = ({ Items }) => {
    return (
        <div>
            <div className="qiitaListCardContainer">
                <div className="qiitaListCard">
                    {Items.map(item => (
                        <Link to={`/detail/${item.id}`} key={item.id} className="qiitaCard">{item.title}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QiitaList;

